import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import { createReply, getReplies } from "./reply.controller";
import { requireRole } from "../../middlewares/requireRole";

const router = Router();

router.post(
    "/:queryId/replies",
    requireAuth,
    requireRole("student", "Academician", "counsellor"),
    createReply
);

router.get(
    "/:queryId/replies",
    requireAuth,
    requireRole("student", "Academician", "counsellor"),    
    getReplies
);

export default router;
