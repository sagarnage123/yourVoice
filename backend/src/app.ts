import express, { Application } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

// Core
import healthRoutes from "./routes/health.routes";

// Auth
import authRoutes from "./modules/auth/auth.routes";

// Users / Staff
import staffRoutes from "./modules/users/staff.routes";

// Queries (core domain)
import queryRoutes from "./modules/queries/query.routes";
import replyRoutes from "./modules/queries/reply.routes";
import publicQueryRoutes from "./modules/queries/publicQuery.routes";
import studentInboxRoutes from "./modules/queries/studentInbox.routes";

import staffInboxRoutes from "./modules/queries/staffInbox.routes";


import adminRoutes from "./modules/admin/admin.routes";

const app: Application = express();


app.use(express.json());


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
