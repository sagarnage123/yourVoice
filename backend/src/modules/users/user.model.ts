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
            default: function (this: IUser) {
                if (this.role === "teacher") return "Teacher";
                if (this.role === "counsellor") return "Counsellor";
                return undefined;
            },
        },

        verifiedBadge: {
            type: Boolean,
            default: false,
        },

        profileImage: {
            type: String,
            trim: true,
            default: function (this: IUser) {
                if (this.role === "teacher") {
                    return "https://ui-avatars.com/api/?name=Teacher&background=E0E7FF&color=3730A3";
                }
                if (this.role === "counsellor") {
                    return "https://ui-avatars.com/api/?name=Counsellor&background=D1FAE5&color=065F46";
                }
                return undefined;
            },
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
userSchema.index(
    { phone: 1, role: 1 },
    {
        unique: true,
        sparse: true,
    }
);

userSchema.index(
    { email: 1, role: 1 },
    {
        unique: true,
        sparse: true,
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
