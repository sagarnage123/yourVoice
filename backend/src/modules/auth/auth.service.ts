import crypto from "crypto";
import { AuthToken } from "./authToken.model";
import { AllowedIdentity } from "../admin/allowedIdentity.model";
import { User } from "../users/user.model";
import { AppError } from "../../errors/AppError";
import { signToken } from "../../utils/jwt";
import { presentUser } from "../users/user.presenter";


const OTP_EXPIRY_MINUTES = 5;
const MAX_ATTEMPTS = 5;

export class AuthService {
    static async requestAuthToken(
        identifier: string,
        role: "student" | "teacher" | "counsellor" | "admin"
    ) {
        const normalizedIdentifier = identifier.toLowerCase();

        const allowed = await AllowedIdentity.findOne({
            identifier: normalizedIdentifier,
            role,
            isActive: true,
        });

        if (!allowed) {
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
       
        const response: any = {
            success: true,
            message: "OTP sent successfully",
        };

        if (process.env.NODE_ENV === "development") {
            response.otp = otp;
            console.log(`Development mode: OTP for ${normalizedIdentifier} is ${otp}`);
        }

        return response;
    }

    static async verifyAuthToken(
        identifier: string,
        role: "student" | "teacher" | "counsellor" | "admin",
        token: string
    ) {
        const normalizedIdentifier = identifier.toLowerCase();

        const authToken = await AuthToken.findOne({
            identifier: normalizedIdentifier,
            role,
            used: false,
            expiresAt: { $gt: new Date() },
        }).sort({ createdAt: -1 });

        if (!authToken) {
            throw new AppError("Invalid or expired token", 401);
        }

        if (authToken.attempts >= MAX_ATTEMPTS) {
            authToken.used = true;
            await authToken.save();
            throw new AppError("Too many attempts", 429);
        }

        const tokenHash = AuthToken.hashToken(token);

        if (tokenHash !== authToken.tokenHash) {
            authToken.attempts += 1;
            await authToken.save();
            throw new AppError("Invalid token", 401);
        }

        authToken.used = true;
        await authToken.save();

        const userQuery = normalizedIdentifier.includes("@")
            ? { email: normalizedIdentifier }
            : { phone: normalizedIdentifier };

        let user = await User.findOne(userQuery);

        const allowedIdentity = await AllowedIdentity.findOne({
            identifier,
            role,
            isActive: true,
        });

        if (!allowedIdentity) {
            throw new AppError("Identity not allowed", 403);
        }

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
                    role === "teacher" || role === "counsellor"
                        ? allowedIdentity.fullName
                        : undefined,
                isVerified: true,
                lastLoginAt: new Date(),
            });
        } else {
            user.isVerified = true;
            user.lastLoginAt = new Date();
            await user.save();
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
