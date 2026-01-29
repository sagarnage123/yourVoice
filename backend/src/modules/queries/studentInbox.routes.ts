import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import { getStudentInbox } from "./studentInbox.controller";

const router = Router();

router.get(
    "/student/queries",
    requireAuth,
    getStudentInbox
);

export default router;
