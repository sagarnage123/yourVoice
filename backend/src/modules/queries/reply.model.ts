import mongoose, { Schema, Document, Types } from "mongoose";

export type SenderRole = "student" | "staff";

export interface IReply extends Document {
    queryId: Types.ObjectId;
    senderRole: SenderRole;

    senderId: Types.ObjectId;

    content: string;
    createdAt: Date;
    clientMessageId?: string;
    deliveryStatus: "pending" | "delivered";
    deliveredAt?: Date;
}

const ReplySchema = new Schema<IReply>(
    {
        queryId: {
            type: Schema.Types.ObjectId,
            ref: "Query",
            required: true,
            index: true,
        },

        senderRole: {
            type: String,
            enum: ["student", "staff"],
            required: true,
        },

        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000,
        },
        clientMessageId: {
            type: String,
            trim: true,
        },

        deliveryStatus: {
            type: String,
            enum: ["pending", "delivered"],
            default: "pending",
            required: true,
        },

        deliveredAt: {
            type: Date,
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);
ReplySchema.index(
    { queryId: 1, senderId: 1, clientMessageId: 1 },
    {
        unique: true,
        partialFilterExpression: {
            clientMessageId: { $type: "string" },
        },
    }
);

export const ReplyModel = mongoose.model<IReply>(
    "Reply",
    ReplySchema
);
