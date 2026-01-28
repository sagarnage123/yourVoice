import { Router } from "express";
import {
    addAllowedIdentity,
    listAllowedIdentities,
    listAuditLogs,
    toggleAllowedIdentity,
} from "./admin.controller";
import { requireAuth } from "../../middlewares/requireAuth";
import { requireRole } from "../../middlewares/requireRole";

const router = Router();

router.use(requireAuth, requireRole("admin"));

router.post("/allowed-identities", addAllowedIdentity);
router.get("/allowed-identities", listAllowedIdentities);
router.patch(
    "/allowed-identities/:id/toggle",
    toggleAllowedIdentity
);
router.get("/audit-logs", listAuditLogs);
export default router;
