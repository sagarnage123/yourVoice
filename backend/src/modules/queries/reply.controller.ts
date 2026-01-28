import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";
import { ReplyService } from "./reply.service";
import { replyPresenter } from "./reply.presenter";
import { getSingleParam } from "../../utils/param";

export const createReply = asyncHandler(
    async (req: Request, res: Response) => {
        const queryId = getSingleParam(
            req.params.queryId,
            "queryId"
        );

        const reply = await ReplyService.createReply(
            queryId,
            req.body,
            req.user!
        );

        return sendResponse(res, {
            statusCode: 201,
            message: "Reply sent",
            data: replyPresenter(reply),
        });
    }
);

export const getReplies = asyncHandler(
    async (req: Request, res: Response) => {
        const replies = await ReplyService.getReplies(
            req.params.queryId,
            req.user!
        );

        return sendResponse(res, {
            statusCode: 200,
            message: "Replies fetched",
            data: replies.map(replyPresenter),
        });
    }
);
