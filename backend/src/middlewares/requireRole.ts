import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors/AppError";

export const requireRole = (...allowedRoles: string[]) => {
    return (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            throw new AppError("Authentication required", 401);
        }

        if (!allowedRoles.includes(req.user.role)) {
            throw new AppError(
                "You are not authorized to perform this action",
                403
            );
        }

        next();
    };
};
