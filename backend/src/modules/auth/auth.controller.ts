import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/apiResponse";
import { createHash } from "node:crypto";
import { closeConnectionsForSession } from "../../websocket/connectionManager";

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
                success: true
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

        const { token: jwtToken, id, role: userRole } = user;

        res.cookie("yourvoice_token", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        return sendResponse(res, {
            statusCode: 200,
            message: "Authentication successful",
            data: {
                user: {
                    id,
                    role: userRole,
                },
            },
        });
    }
);


export const logout = asyncHandler(
    async (_req: Request, res: Response) => {
        const token = _req.cookies.yourvoice_token;
             if (typeof token === "string" && token.length > 0) {
            const sessionKey = createHash("sha256")
                .update(token)
                .digest("hex");

            closeConnectionsForSession(sessionKey);
        }

        res.clearCookie("yourvoice_token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });

        return sendResponse(res, {
            statusCode: 200,
            message: "Logged out successfully",
        });
    }
);
