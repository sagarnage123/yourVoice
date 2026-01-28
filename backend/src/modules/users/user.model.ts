import mongoose, { Schema, Document } from "mongoose";


export interface IUser extends Document {
    role: "student" | "teacher" | "counsellor" | "admin";

    email?: string;
    phone?: string;

    isVerified: boolean;

   
    fullName?: string;
    verifiedBadge?: boolean;

    rating?: {
        average: number;
        count: number;
    };

    profileImage?: string;


   
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        role: {
            type: String,
            enum: ["student", "teacher", "counsellor", "admin"],
            required: true,
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
            sparse: true, // allows multiple nulls
        },

        phone: {
            type: String,
            trim: true,
            sparse: true,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        // Staff-only fields
        fullName: {
            type: String,
            trim: true,
        },

        verifiedBadge: {
            type: Boolean,
            default: false,
        },

        profileImage: {
            type: String,
            trim: true,
        },

        rating: {
            average: {
                type: Number,
                min: 0,
                max: 5,
                default: 0,
            },
            count: {
                type: Number,
                default: 0,
            },
        },

        lastLoginAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre<IUser>("save", async function () {
    if (this.role === "student") {
        this.fullName = undefined;
        this.verifiedBadge = undefined;
        this.profileImage = undefined;
        this.rating = undefined;
    }
});


export const User = mongoose.model<IUser>("User", userSchema);
