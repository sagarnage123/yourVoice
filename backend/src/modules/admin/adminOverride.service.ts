import { QueryModel } from "../queries/query.model";
import { ReplyModel } from "../queries/reply.model";
import { User } from "../users/user.model";
import {AuditLog as AuditLogModel } from "./auditLog.model";
import { AppError } from "../../errors/AppError";

export const AdminOverrideService = {
    async getFlaggedQuery(
        queryId: string,
        admin: { userId: string; role: string }
    ) {
        if (admin.role !== "admin") {
            throw new AppError("Access denied", 403);
        }

        const query = await QueryModel.findById(queryId).lean();

        if (!query) {
            throw new AppError("Query not found", 404);
        }

        if (!query.isFlagged) {
            throw new AppError(
                "Query is not flagged for review",
                403
            );
        }

        const student = await User.findById(
            query.createdBy
        ).lean();

        if (!student) {
            throw new AppError("Student not found", 404);
        }

        const replies = await ReplyModel.find({
            queryId,
        })
            .sort({ createdAt: 1 })
            .lean();

        await AuditLogModel.create({
            actorId: admin.userId,
            actorRole: admin.role,
            action: "ADMIN_OVERRIDE_ACCESS",
            targetType: "QUERY",
            metadata: {
                queryId,
                reason: query.flagReason,
            },
        });

        return {
            query,
            replies,
            student: {
                userId: student._id,
                email: student.email,
                phone: student.phone,
            },
        };
    },

    async listFlaggedQueries(admin: { userId: string; role: string }) {
        if (admin.role !== "admin") {
            throw new AppError("Access denied", 403);
        }
      
        const queries = await QueryModel.find({
            isFlagged: true,
        })
            .select("_id createdAt flagReason")
            .sort({ createdAt: -1 })
            .lean();
        await AuditLogModel.create({
            actorId: admin.userId,
            actorRole: admin.role,
            action: "VIEW_FLAGGED_QUERIES",
            targetType: "QUERY",
        });

        return queries;
    }

};
