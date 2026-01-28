import mongoose, { Schema, Document, Types } from "mongoose";

export type QueryType = "public" | "private";
export type AssignedRole = "teacher" | "counsellor";

export interface IQuery extends Document {
    type: QueryType;
    content: string;

    
    createdBy: Types.ObjectId;

  
    assignedTo?: Types.ObjectId;
    assignedRole?: AssignedRole;

    isResolved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const QuerySchema = new Schema<IQuery>(
    {
        type: {
            type: String,
            enum: ["public", "private"],
            required: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            index: true,
        },

        assignedRole: {
            type: String,
            enum: ["teacher", "counsellor"],
        },

        isResolved: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);


QuerySchema.pre("validate", function (next) {
    if (this.type === "private") {
        if (!this.assignedTo || !this.assignedRole) {
            throw new Error("Private queries must have assignedTo and assignedRole set");
        }
    }
});

export const QueryModel = mongoose.model<IQuery>(
    "Query",
    QuerySchema
);

