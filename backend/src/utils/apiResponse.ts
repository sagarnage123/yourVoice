import { Response } from "express";

interface ApiResponseOptions {
    statusCode?: number;
    message: string;
    data?: any;
}

export const sendResponse = (
    res: Response,
    { statusCode = 200, message, data = null }: ApiResponseOptions
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
