import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import { requireRole } from "../../middlewares/requireRole";
import { createQuery } from "./query.controller";
import { getQueryThread } from "./query.controller";
import { flagQuery } from "./queryFlag.controller";
const router = Router();

router.post(
    "/",
    requireAuth,
    requireRole("student"),
    createQuery
);

router.get(
    "/:queryId/thread",
    requireAuth,
    getQueryThread
);

router.post(
    "/:queryId/flag",
    requireAuth,
    flagQuery
);

export default router;
