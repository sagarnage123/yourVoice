import mongoose from "mongoose";

export const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("🗄️ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection failed");
        throw error;
    }
};
