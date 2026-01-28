import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";
import { QueryService } from "./query.services";
import { queryPresenter } from "./query.presenter";
import { threadPresenter } from "./thread.presenter";
import { getSingleParam } from "../../utils/param";

export const createQuery = asyncHandler(
    async (req: Request, res: Response) => {
        const query = await QueryService.createQuery(
            req.body,
            req.user!.userId
        );

        return sendResponse(res,{
            statusCode: 201,
            message: "Query created successfully",
            data: queryPresenter(query),
        });
    }
);

export const getQueryThread = asyncHandler(
    async (req: Request, res: Response) => {
        const queryId = getSingleParam(
            req.params.queryId,
            "queryId"
        );

        const { query, replies } =
            await QueryService.getThread(queryId, {
                userId: req.user!.userId,
                role: req.user!.role,
            });

        return sendResponse(res,{
            statusCode: 200,
            message: "Query thread fetched",
            data: threadPresenter(query as any, replies as any),
        });
    }
);
