import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {sendResponse } from "../../utils/apiResponse";
import { AdminOverrideService } from "./adminOverride.service";
import { getSingleParam } from "../../utils/param";

export const getFlaggedQueryOverride = asyncHandler(
    async (req: Request, res: Response) => {
        const queryId = getSingleParam(
            req.params.queryId,
            "queryId"
        );

        const data =
            await AdminOverrideService.getFlaggedQuery(
                queryId,
                {
                    userId: req.user!.userId,
                    role: req.user!.role,
                }
            );

        return sendResponse(res,{
            statusCode: 200,
            message: "Admin override access granted",
            data,
        });
    }
);

export const listFlaggedQueries = asyncHandler(
    async (req: Request, res: Response) => {
        
        const data = await AdminOverrideService.listFlaggedQueries({
            userId: req.user!.userId,
            role: req.user!.role,
        });
        return sendResponse(res, {
            message: "Flagged queries fetched",
            data,
        });
    }
);
