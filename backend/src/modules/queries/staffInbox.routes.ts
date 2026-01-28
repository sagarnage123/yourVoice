import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import { getStaffInbox } from "./staffInbox.controller";

const router = Router();

router.get(
    "/staff/queries",
    requireAuth,
    getStaffInbox
);

export default router;
