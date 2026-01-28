import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/apiResponse";

export const requestAuth = asyncHandler(
    async (req: Request, res: Response) => {
        const { identifier, role } = req.body;

        const result = await AuthService.requestAuthToken(
            identifier,
            role
        );

        return sendResponse(res, {
            statusCode: 200,
            message: result.message,
            data: {
                success: true,
                otp: result.otp,
            },
        });
    }
);

export const verifyAuth = asyncHandler(
    async (req: Request, res: Response) => {
        const { identifier, role, token } = req.body;

        const user = await AuthService.verifyAuthToken(
            identifier,
            role,
            token
        );

        return sendResponse(res, {
            statusCode: 200,
            message: "Authentication successful",
            data: {
                user,
            },
        });
    }
);
