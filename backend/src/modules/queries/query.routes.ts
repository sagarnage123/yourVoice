import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import { requireRole } from "../../middlewares/requireRole";
import { createQuery } from "./query.controller";
import { getQueryThread } from "./query.controller";
import { flagQuery } from "./queryFlag.controller";
import { rateQueryController ,checkIfRatedController} from "./queryRating.controller";
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
    requireRole("student", "Academician", "counsellor"),
    getQueryThread
);

router.post(
    "/:queryId/flag",
    requireAuth,
    requireRole("Academician", "counsellor"),
    flagQuery
);

router.post(
    "/:queryId/rate",
    requireAuth,
    requireRole("student"),
    rateQueryController
);
router.get(
    "/:queryId/rated",
    requireAuth,
    requireRole("student", "Academician", "counsellor"),
    checkIfRatedController
);

export default router;
