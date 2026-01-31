
import { rateQuery } from "./queryRating.service";
import { sendResponse } from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { getSingleParam } from "../../utils/param";
import { Request,Response } from "express";
export const rateQueryController = asyncHandler(
    async (req: Request, res: Response) => {

        const queryId = getSingleParam(
            req.params.queryId,
            "queryId"
        );
        const { rating } = req.body;
       

        await rateQuery(
            queryId,
            req.user!.userId,
            rating
        );

        return sendResponse(res, {
            statusCode: 200,
            message: "Rating submitted",
        });
    }
);
