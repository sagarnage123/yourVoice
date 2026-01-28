import { ReplyModel } from "./reply.model";
import { QueryModel } from "./query.model";
import { AppError } from "../../errors/AppError";

interface CreateReplyInput {
    content: string;
}

export const ReplyService = {
    async createReply(
        queryId: string,
        input: CreateReplyInput,
        user: { userId: string; role: string }
    ) {
        const query = await QueryModel.findById(queryId);

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
        }

        if (user.role === "teacher" || user.role === "counsellor") {
            if (query.assignedTo?.toString() !== user.userId) {
                throw new AppError("Access denied", 403);
            }
        }

        if (user.role === "admin") {
            
            throw new AppError("Admins cannot participate in replies", 403);
        }

        return ReplyModel.create({
            queryId: query._id,
            senderId: user.userId,
            senderRole: user.role === "student" ? "student" : "staff",
            content: input.content,
        });
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
            }

            if (user.role === "teacher" || user.role === "counsellor") {
                if (query.assignedTo?.toString() !== user.userId) {
                    throw new AppError("Access denied", 403);
                }
            }

            if (user.role === "admin") {
                throw new AppError("Admins cannot view replies", 403);
            }
        }

        return ReplyModel.find({ queryId })
            .sort({ createdAt: 1 })
            .lean();
    },
};
