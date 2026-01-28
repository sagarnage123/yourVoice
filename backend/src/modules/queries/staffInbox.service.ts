import { QueryModel } from "./query.model";
import { ReplyModel } from "./reply.model";
import { AppError } from "../../errors/AppError";

export const StaffInboxService = {
    async getInbox(user: { userId: string; role: string }) {
        if (user.role !== "teacher" && user.role !== "counsellor") {
            throw new AppError("Access denied", 403);
        }

     
        const queries = await QueryModel.find({
            type: "private",
            assignedTo: user.userId,
        })
            .sort({ updatedAt: -1 })
            .lean();

       
        const inboxItems = await Promise.all(
            queries.map(async (query) => {
                const lastReply = await ReplyModel.findOne({
                    queryId: query._id,
                })
                    .sort({ createdAt: -1 })
                    .select("createdAt")
                    .lean();

                return {
                    queryId: query._id,
                    isResolved: query.isResolved,
                    createdAt: query.createdAt,
                    lastMessageAt:
                        lastReply?.createdAt ?? query.createdAt,
                };
            })
        );

        inboxItems.sort(
            (a, b) =>
                b.lastMessageAt.getTime() -
                a.lastMessageAt.getTime()
        );

        return inboxItems;
    },
};
