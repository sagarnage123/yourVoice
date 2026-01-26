import express, { Application } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import healthRoutes from "./routes/health.routes";

const app: Application = express();

app.use(express.json());

app.use("/api/health", healthRoutes);

app.use(globalErrorHandler);

export default app;
