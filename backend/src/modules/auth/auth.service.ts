import crypto from "crypto";
import { AuthToken } from "./authToken.model";
import { AllowedIdentity } from "../admin/allowedIdentity.model";
import { User } from "../users/user.model";
import { AppError } from "../../errors/AppError";
import { signToken } from "../../utils/jwt";

import { sendOtpEmail,isValidEmail } from "../../utils/sendOtpEmail";

const OTP_EXPIRY_MINUTES = 5;
const MAX_ATTEMPTS = 5;

export class AuthService {
    static async requestAuthToken(
        identifier: string,
        role: "student" | "Academician" | "counsellor" | "admin"
    ) {
        const normalizedIdentifier = identifier.toLowerCase();

        const allowed = await AllowedIdentity.findOne({
            identifier: normalizedIdentifier,
            role,
        });
       
        if (!allowed) {
            console.log(`Unauthorized OTP request for ${normalizedIdentifier} with role ${role}`);
            throw new AppError("Access not allowed", 403);
        }
        
        
        await AuthToken.updateMany(
            {
                identifier: normalizedIdentifier,
                role,
                used: false,
                expiresAt: { $gt: new Date() },
            },
            { used: true }
        );

        const otp = crypto.randomInt(100000, 999999).toString();
        const tokenHash = AuthToken.hashToken(otp);

        const expiresAt = new Date(
            Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
        );
        
        await AuthToken.create({
            identifier: normalizedIdentifier,
            role,
            tokenHash,
            expiresAt,
        });
        console.log(`Generatedeee OTP for ${normalizedIdentifier} with role ${role}`);

        const response: any = {
            success: true,
            message: "OTP sent successfully",
        };
        const recipientEmail = isValidEmail(identifier)
            ? identifier
            : process.env.OTP_FALLBACK_EMAIL!;
            console.log(`Sending OTP to ${recipientEmail} for ${normalizedIdentifier}`);
        if (process.env.NODE_ENV === "development") {
            console.log(`Development mode: OTP for ${normalizedIdentifier} is ${otp}`);
        }
        else{
            await sendOtpEmail({
                to: recipientEmail,
                otp,
            });
            console.log(`OTP sent to ${recipientEmail} for ${normalizedIdentifier} is ${otp}`);
        }

        return response;
    }

    static async verifyAuthToken(
        identifier: string,
        role: "student" | "Academician" | "counsellor" | "admin",
        token: string
    ) {
        const normalizedIdentifier = identifier.toLowerCase();
        
        const authToken= await AuthToken.findOneAndUpdate({
                    identifier: normalizedIdentifier,
                    role,
                    used: false
                }, {
                    $inc: { attempts: 1 }
                }).sort({ createdAt: -1 });
               
       if(!authToken){
        throw new AppError("Invalid or expired token", 401);
       }
       if (authToken.attempts >= MAX_ATTEMPTS) {
           authToken.used = true;
           await authToken.save();
           throw new AppError("Too many attempts", 429);
        }
        
        const tokenHash = AuthToken.hashToken(token);
        
        if (tokenHash !== authToken.tokenHash) {
            await authToken.save();
            throw new AppError("Invalid token", 401);
        }
        
        authToken.used = true;
        await authToken.save();
        
        const userQuery = normalizedIdentifier.includes("@")
            ? { email: normalizedIdentifier, role }
            : { phone: normalizedIdentifier, role };
        
        
        const allowedIdentity = await AllowedIdentity.findOne({
            identifier,
            role,
            isActive: true,
        });
        
        if (!allowedIdentity) {
            throw new AppError("Identity not allowed", 403);
        }

        let user = await User.findOne(userQuery);
        
        if (!user) {
            user = await User.create({
                role,
                email: normalizedIdentifier.includes("@")
                ? normalizedIdentifier
                : undefined,
                phone: normalizedIdentifier.includes("@")
                ? undefined
                : normalizedIdentifier,
                fullName:
                role === "Academician" || role === "counsellor"
                ? allowedIdentity.fullName
                : undefined,
                isVerified: true,
                lastLoginAt: new Date(),
            });
        
        }
        
        const jwtToken = signToken({
            userId: user._id.toString(),
            role: user.role,
        });

        return {
            token: jwtToken,
            id: user._id.toString(),
            role: user.role,
        };

    }
}
