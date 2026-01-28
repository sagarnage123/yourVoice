import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import { requireRole } from "../../middlewares/requireRole";
import { createQuery } from "./query.controller";

const router = Router();

router.post(
    "/",
    requireAuth,
    requireRole("student"),
    createQuery
);

export default router;
