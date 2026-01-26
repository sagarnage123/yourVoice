import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const globalErrorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message
    });
};
