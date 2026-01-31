import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";
import { QueryFlagService } from "./queryFlag.service";
import { getSingleParam } from "../../utils/param";

export const flagQuery = asyncHandler(
    async (req: Request, res: Response) => {
        const queryId = getSingleParam(
            req.params.queryId,
            "queryId"
        );
       

        await QueryFlagService.flagQuery(
            queryId,
            req.body.reason,
            {
                userId: req.user!.userId,
                role: req.user!.role,
            }
        );

        return sendResponse(res,{
            statusCode: 200,
            message: "Query escalated to admin",
        });
    }
);
