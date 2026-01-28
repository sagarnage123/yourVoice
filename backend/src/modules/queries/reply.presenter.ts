import { IReply } from "./reply.model";

export const replyPresenter = (reply: IReply) => {
    return {
        id: reply._id,
        sender: reply.senderRole, 
        content: reply.content,
        createdAt: reply.createdAt,
    };
};
