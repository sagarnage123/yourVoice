import express, { Application } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app: Application = express();

app.use(express.json());

app.use(globalErrorHandler);

export default app;
