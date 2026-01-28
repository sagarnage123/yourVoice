import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";
import { QueryService } from "./query.services";
import { queryPresenter } from "./query.presenter";

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
