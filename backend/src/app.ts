import express, { Application } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";


import healthRoutes from "./routes/health.routes";


import authRoutes from "./modules/auth/auth.routes";


import staffRoutes from "./modules/users/staff.routes";


import queryRoutes from "./modules/queries/query.routes";
import replyRoutes from "./modules/queries/reply.routes";
import publicQueryRoutes from "./modules/queries/publicQuery.routes";
import studentInboxRoutes from "./modules/queries/studentInbox.routes";

import staffInboxRoutes from "./modules/queries/staffInbox.routes";

import cors from "cors";

import adminRoutes from "./modules/admin/admin.routes";
import {validateOrigin} from "./middlewares/validateOrigin";

const app: Application = express();

const allowedOrigins = [
    "https://yourvoice-zeta.vercel.app",
    "http://localhost:5173",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                
                return callback(null, true);
            }
            
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        optionsSuccessStatus: 200,
    })
);



app.use(express.json());
app.use(cookieParser());

app.use(validateOrigin);       


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
