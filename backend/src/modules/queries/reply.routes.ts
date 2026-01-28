import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import { createReply, getReplies } from "./reply.controller";

const router = Router();

router.post(
    "/:queryId/replies",
    requireAuth,
    createReply
);

router.get(
    "/:queryId/replies",
    requireAuth,
    getReplies
);

export default router;
