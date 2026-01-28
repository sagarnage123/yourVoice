import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import {
    getPublicQueries,
    likePublicQuery,
    unlikePublicQuery,
} from "./publicQuery.controller";

const router = Router();

router.get("/queries/public", requireAuth, getPublicQueries);

router.post(
    "/queries/:queryId/like",
    requireAuth,
    likePublicQuery
);

router.delete(
    "/queries/:queryId/like",
    requireAuth,
    unlikePublicQuery
);

export default router;
