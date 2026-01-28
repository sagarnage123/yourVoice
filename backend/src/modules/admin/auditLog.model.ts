import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
    actorId: mongoose.Types.ObjectId;
    actorRole: string;

    action: string;
    targetType: string;
    targetId?: string;

    metadata?: Record<string, any>;

    createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
    {
        actorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        actorRole: {
            type: String,
            required: true,
        },

        action: {
            type: String,
            required: true,
        },

        targetType: {
            type: String,
            required: true,
        },

        targetId: {
            type: String,
        },

        metadata: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

export const AuditLog = mongoose.model<IAuditLog>(
    "AuditLog",
    auditLogSchema
);
