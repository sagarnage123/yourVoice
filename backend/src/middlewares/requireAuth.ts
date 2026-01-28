import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../errors/AppError";

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

export const requireAuth = (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Authentication required", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    req.user = {
        userId: decoded.userId,
        role: decoded.role,
    };

    next();
};
