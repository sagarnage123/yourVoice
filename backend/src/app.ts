import express, { Application } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

import healthRoutes from "./routes/health.routes";


import authRoutes from "./modules/auth/auth.routes";


import staffRoutes from "./modules/users/staff.routes";


import queryRoutes from "./modules/queries/query.routes";
import replyRoutes from "./modules/queries/reply.routes";
import publicQueryRoutes from "./modules/queries/publicQuery.routes";
import studentInboxRoutes from "./modules/queries/studentInbox.routes";

import staffInboxRoutes from "./modules/queries/staffInbox.routes";


import adminRoutes from "./modules/admin/admin.routes";

const app: Application = express();


app.use(express.json());

import cors from "cors";

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true); 

            const allowedOrigins = [
                "https://yourvoice-frontend.vercel.app",
            ];

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);


app.use("/api/health", healthRoutes);

app.use("/api/auth", authRoutes);


app.use("/api", staffRoutes);


app.use("/api/queries", queryRoutes);        
app.use("/api/queries", replyRoutes);        
app.use("/api", publicQueryRoutes);          
app.use("/api", studentInboxRoutes);        
app.use("/api", staffInboxRoutes);           

app.use("/api/admin", adminRoutes);

app.use(globalErrorHandler);

export default app;
