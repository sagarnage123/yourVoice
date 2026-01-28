import { Types } from "mongoose";
import { IAuditLog } from "./auditLog.model";

export const auditLogPresenter = (log: IAuditLog) => {
    return {
        id: log._id,
        action: log.action,
        actor: {
            id: log.actorId,
            role: log.actorRole,
        },
        target: log.targetType,
        metadata: log.metadata ?? {},
        createdAt: log.createdAt,
    };
};
