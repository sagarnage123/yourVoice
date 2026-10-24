
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const allowedOrigins = new Set([
  "https://yourvoice-zeta.vercel.app",
  "http://localhost:5173",
]);

const safeMethods = new Set(["GET", "HEAD", "OPTIONS"]);

export function validateOrigin(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (safeMethods.has(req.method)) {
    return next();
  }

  const origin = req.get("Origin");

  if (origin && !allowedOrigins.has(origin)) {
    throw new AppError("Invalid request origin", 403);
  }

  next();
}
