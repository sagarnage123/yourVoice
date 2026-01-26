import mongoose, { Schema, Document } from "mongoose";

export interface IAllowedIdentity extends Document {
    identifier: string; // email or phone
    role: "student" | "teacher" | "counsellor" | "admin";

    isActive: boolean;

    addedBy?: mongoose.Types.ObjectId;

    createdAt: Date;
}

const allowedIdentitySchema = new Schema<IAllowedIdentity>(
    {
        identifier: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        role: {
            type: String,
            enum: ["student", "teacher", "counsellor", "admin"],
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        addedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);


allowedIdentitySchema.index(
    { identifier: 1, role: 1 },
    { unique: true }
);

export const AllowedIdentity = mongoose.model<IAllowedIdentity>(
    "AllowedIdentity",
    allowedIdentitySchema
);
