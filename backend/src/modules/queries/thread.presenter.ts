import { IQuery } from "./query.model";
import { IReply } from "./reply.model";
import { queryPresenter } from "./query.presenter";
import { replyPresenter } from "./reply.presenter";

export const threadPresenter = (
    query: IQuery,
    replies: IReply[]
) => {
    return {
        query: queryPresenter(query),
        messages: replies.map(replyPresenter),
    };
};
