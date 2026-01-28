import { QueryModel } from "./query.model";
import { AppError } from "../../errors/AppError";

export const QueryFlagService = {
    async flagQuery(
        queryId: string,
        reason: string,
        user: { userId: string; role: string }
    ) {
        if (
            user.role !== "teacher" &&
            user.role !== "counsellor"
        ) {
            throw new AppError("Access denied", 403);
        }

        if (!reason || reason.trim().length < 10) {
            throw new AppError(
                "Flag reason is required and must be descriptive",
                400
            );
        }

        const query = await QueryModel.findById(queryId);

        if (!query) {
            throw new AppError("Query not found", 404);
        }

        if (query.type !== "private") {
            throw new AppError(
                "Only private queries can be flagged",
                400
            );
        }

        if (query.assignedTo?.toString() !== user.userId) {
            throw new AppError("Access denied", 403);
        }

        if (query.isFlagged) {
            throw new AppError("Query already flagged", 400);
        }

        query.isFlagged = true;
        query.flagReason = reason.trim();
        query.flaggedAt = new Date();

        await query.save();

        return true;
    },
};
