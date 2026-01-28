import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const signToken = (payload: {
    userId: string;
    role: string;
}) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET) as {
            userId: string;
            role: string;
            iat: number;
            exp: number;
        };
    } catch {
        throw new AppError("Invalid or expired token", 401);
    }
};
