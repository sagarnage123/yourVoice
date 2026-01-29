import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";
import { StaffService } from "./staff.service";

export const listStaff = asyncHandler(
    async (_req: Request, res: Response) => {
        const staff = await StaffService.listStaff();

        return sendResponse(res,{
            message: "Staff members retrieved successfully",
            statusCode: 200,
            data: staff.map((s) => ({
                id: s._id,
                name: s.fullName,
                role: s.role,
                rating: s.rating,
                profileImage: s.profileImage,
            })),
        });
    }
);
