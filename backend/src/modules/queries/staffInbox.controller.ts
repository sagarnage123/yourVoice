import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";
import { StaffInboxService } from "./staffInbox.service";
import { staffInboxPresenter } from "./staffInbox.presenter";

export const getStaffInbox = asyncHandler(
    async (req: Request, res: Response) => {
        const inbox = await StaffInboxService.getInbox({
            userId: req.user!.userId,
            role: req.user!.role,
        });

        return sendResponse(res,{
            statusCode: 200,
            message: "Staff inbox fetched successfully",
            data: inbox.map(staffInboxPresenter),
        });
    }
);
