import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";
import { StudentInboxService } from "./studentInbox.service";

export const getStudentInbox = asyncHandler(
    async (req: Request, res: Response) => {
        const inbox = await StudentInboxService.getInbox({
            userId: req.user!.userId,
            role: req.user!.role,
        });

        return sendResponse(res,{
            message: "Student inbox retrieved successfully",
            statusCode: 200,
            data: inbox,
        });
    }
);
