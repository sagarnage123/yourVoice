import { QueryModel } from "./query.model";
import { AppError } from "../../errors/AppError";
import { User } from "../users/user.model";
import { ReplyModel } from "./reply.model";

interface CreateQueryInput {
    type: "public" | "private";
    content: string;
    assignedTo?: string;
}

export const QueryService = {
    async createQuery(
        input: CreateQueryInput,
        studentId: string
    ) {
        const { type, content, assignedTo } = input;

        if (type === "private") {
            if (!assignedTo) {
                throw new AppError(
                    "Private query must be assigned to a staff member",
                    400
                );
            }

            const staff = await User.findById(assignedTo).lean();

            if (!staff) {
                throw new AppError("Selected staff not found", 404);
            }

            if (
                staff.role !== "teacher" &&
                staff.role !== "counsellor"
            ) {
                throw new AppError(
                    "Queries can only be assigned to teachers or counsellors",
                    400
                );
            }

            return QueryModel.create({
                type,
                content,
                createdBy: studentId,
                assignedTo: staff._id,
                assignedRole: staff.role,
            });
        }

        
        return QueryModel.create({
            type,
            content,
            createdBy: studentId,
        });
    },

    async getThread(
        queryId: string,
        user: { userId: string; role: string }
    ) {
        const query = await QueryModel.findById(queryId).lean();

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
                throw new AppError(
                    "Admins cannot view private conversations",
                    403
                );
            }
        }

        const replies = await ReplyModel.find({ queryId })
            .sort({ createdAt: 1 })
            .lean();

        return { query, replies };
    },
};

