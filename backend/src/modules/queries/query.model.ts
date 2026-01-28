import mongoose, { Schema, Document, Types } from "mongoose";

export type QueryType = "public" | "private";
export type AssignedRole = "teacher" | "counsellor";

export interface IQuery extends Document {
    type: QueryType;
    content: string;

    
    createdBy: Types.ObjectId;

  
    assignedTo?: Types.ObjectId;
    assignedRole?: AssignedRole;
    likes: number;

    isResolved: boolean;
    isFlagged: boolean;
    flagReason?: string;
    flaggedAt?: Date;
    
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

        likes: {
            type: Number,
            default: 0,
            min: 0,
        },


        isResolved: {
            type: Boolean,
            default: false,
        },
        isFlagged: {
            type: Boolean,
            default: false,
        },

        flagReason: {
            type: String,
        },

        flaggedAt: {
            type: Date,
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

