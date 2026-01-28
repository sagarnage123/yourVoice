import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";
import { PublicQueryService } from "./publicQuery.service";
import { publicQueryPresenter } from "./publicQuery.presenter";
import { getSingleParam } from "../../utils/param";

export const getPublicQueries = asyncHandler(
    async (req: Request, res: Response) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const result = await PublicQueryService.getPublicQueries(
            page,
            limit,
            req.user?.userId
        );

        return sendResponse(res, {
            statusCode: 200,
            message: "Public queries fetched successfully", 
            data: {
                queries: result.queries.map(publicQueryPresenter),
                pagination: result.pagination,
            },
        });
    }
);
export const likePublicQuery = asyncHandler(
    async (req: Request, res: Response) => {
        const queryId = getSingleParam(req.params.queryId, "queryId");

        const likes = await PublicQueryService.likeQuery(
            queryId,
            req.user!.userId
        );

        return sendResponse(res,{
            statusCode: 200,
            message: "Agreement recorded",
            data: { likes },
        });
    }
);

export const unlikePublicQuery = asyncHandler(
    async (req: Request, res: Response) => {
        const queryId = getSingleParam(req.params.queryId, "queryId");

        await PublicQueryService.unlikeQuery(
            queryId,
            req.user!.userId
        );

        return sendResponse(res,{
            statusCode: 200,
            message: "Agreement removed",
        });
    }
);
