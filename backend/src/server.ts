import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";




const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        if(process.env.NODE_ENV === "development"){
            console.log("Connected to MongoDB in development environment");
        }
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Server failed to start");
       
        process.exit(1);
    }
};

startServer();
