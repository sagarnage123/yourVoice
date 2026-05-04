import mongoose, { Schema, Document, Types } from "mongoose";

export interface IQueryLike extends Document {
    queryId: Types.ObjectId;
    userId: Types.ObjectId;
    createdAt: Date;
}

const QueryLikeSchema = new Schema<IQueryLike>(
    {
        queryId: {
            type: Schema.Types.ObjectId,
            ref: "Query",
            required: true,
            index: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

QueryLikeSchema.index(
    { queryId: 1, userId: 1 },
    { unique: true }
);

export const QueryLikeModel = mongoose.model<IQueryLike>(
    "QueryLike",
    QueryLikeSchema
);
