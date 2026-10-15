import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../errors/AppError";

export const requireAuth = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const token = req.cookies?.yourvoice_token;

    if (!token || typeof token !== "string") {
        throw new AppError("Authentication required", 401);
    }

    const decoded = verifyToken(token);

    req.user = {
        userId: decoded.userId,
        role: decoded.role,
    };

    next();
};
