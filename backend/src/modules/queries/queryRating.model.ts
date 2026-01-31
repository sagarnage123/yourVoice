
import mongoose from "mongoose";

const queryRatingSchema = new mongoose.Schema(
    {
        queryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Query",
            required: true,
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
    },
    { timestamps: true }
);

queryRatingSchema.index(
    { queryId: 1, studentId: 1 },
    { unique: true }
);

export const QueryRating = mongoose.model(
    "QueryRating",
    queryRatingSchema
);
