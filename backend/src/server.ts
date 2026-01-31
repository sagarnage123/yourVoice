import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { AllowedIdentity } from "./modules/admin/allowedIdentity.model";
import { User } from "./modules/users/user.model";



const PORT = process.env.PORT || 5000;
let flag=false;
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Server failed to start");
        console.error(error);
        process.exit(1);
    }
};

startServer();
