import { QueryModel } from "./query.model";
import { AppError } from "../../errors/AppError";
import { User } from "../users/user.model";

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
};
