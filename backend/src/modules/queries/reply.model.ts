import mongoose, { Schema, Document, Types } from "mongoose";

export type SenderRole = "student" | "staff";

export interface IReply extends Document {
    queryId: Types.ObjectId;
    senderRole: SenderRole;

    // Internal only — NEVER exposed
    senderId: Types.ObjectId;

    content: string;
    createdAt: Date;
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
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export const ReplyModel = mongoose.model<IReply>(
    "Reply",
    ReplySchema
);
