import { ReplyModel } from "./reply.model";
import { QueryModel } from "./query.model";
import { AppError } from "../../errors/AppError";

interface CreateReplyInput {
    content: string;
    clientMessageId: string;
}

export const ReplyService = {
    async createReply(
        queryId: string,
        input: CreateReplyInput,
        user: { userId: string; role: string }
    ) {
        const query = await QueryModel.findById(queryId);
        const { content, clientMessageId } = input;

        if (!query) {
            throw new AppError("Query not found", 404);
        }


        if (query.type === "public") {
            throw new AppError(
                "Replies are not supported for public queries yet",
                400
            );
        }


        if (user.role === "student") {
            if (query.createdBy.toString() !== user.userId) {
                throw new AppError("Access denied", 403);
            }
        } else if (
            user.role === "Academician" ||
            user.role === "counsellor"
        ) {
            if (query.assignedTo?.toString() !== user.userId) {
                throw new AppError("Access denied", 403);
            }
        } else {
            throw new AppError("Access denied", 403);
        }
        if (
            typeof content !== "string" ||
            !content.trim() ||
            typeof clientMessageId !== "string" ||
            !clientMessageId.trim()
        ) {
            throw new AppError(
                "Valid content and clientMessageId are required",
                400
            );
        }

        const existingReply = await ReplyModel.findOne({
            queryId: query._id,
            senderId: user.userId,
            clientMessageId,
        });

        if (existingReply) {
            return existingReply;
        }

        try {
            return await ReplyModel.create({
                queryId: query._id,
                senderId: user.userId,
                senderRole: user.role === "student" ? "student" : "staff",
                clientMessageId,
                content,
            });
        } catch (error: unknown) {
            if (
                typeof error === "object" &&
                error !== null &&
                "code" in error &&
                error.code === 11000
            ) {
                const reply = await ReplyModel.findOne({
                    queryId: query._id,
                    senderId: user.userId,
                    clientMessageId,
                });

                if (reply) return reply;
            }

            throw error;
        }
    },

    async getReplies(
        queryId: string,
        user: { userId: string; role: string }
    ) {
        const query = await QueryModel.findById(queryId);

        if (!query) {
            throw new AppError("Query not found", 404);
        }

        if (query.type === "private") {
            if (user.role === "student") {
                if (query.createdBy.toString() !== user.userId) {
                    throw new AppError("Access denied", 403);
                }
            } else if (
                user.role === "Academician" ||
                user.role === "counsellor"
            ) {
                if (query.assignedTo?.toString() !== user.userId) {
                    throw new AppError("Access denied", 403);
                }
            } else {
                throw new AppError("Access denied", 403);
            }
        }

        return ReplyModel.find({ queryId })
            .sort({ createdAt: 1 })
            .lean();
    },
   
};
