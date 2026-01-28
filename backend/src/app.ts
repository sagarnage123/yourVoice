import express, { Application } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import healthRoutes from "./routes/health.routes";
import authRoutes from "./modules/auth/auth.routes";
import { requireAuth } from "./middlewares/requireAuth";


const app: Application = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);

app.use(globalErrorHandler);

export default app;
