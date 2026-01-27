import mongoose, { Schema, Document,Model } from "mongoose";
import crypto from "crypto";

export interface IAuthToken extends Document {
    identifier: string; // email or phone
    role: "student" | "teacher" | "counsellor" | "admin";

    tokenHash: string;

    expiresAt: Date;
    attempts: number;
    used: boolean;

    createdAt: Date;
}

interface AuthTokenModel extends Model<IAuthToken> {
    hashToken(token: string): string;
}

const authTokenSchema = new Schema<IAuthToken>(
    {
        identifier: {
            type: String,
            required: true,
            index: true,
        },

        role: {
            type: String,
            enum: ["student", "teacher", "counsellor", "admin"],
            required: true,
        },

        tokenHash: {
            type: String,
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
            index: true,
        },

        attempts: {
            type: Number,
            default: 0,
        },

        used: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);


authTokenSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

authTokenSchema.statics.hashToken = function (token: string) {
    return crypto.createHash("sha256").update(token).digest("hex");
};

export const AuthToken = mongoose.model<IAuthToken, AuthTokenModel>(
    "AuthToken",
    authTokenSchema
);
