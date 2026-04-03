import { Router } from "express";
import {
    addAllowedIdentity,
    listAllowedIdentities,
    listAuditLogs,
    toggleAllowedIdentity,
    updateAllowedIdentityProfile,
} from "./admin.controller";
import { requireAuth } from "../../middlewares/requireAuth";
import { requireRole } from "../../middlewares/requireRole";
import { getFlaggedQueryOverride ,listFlaggedQueries} from "./adminOverride.controller";

const router = Router();

router.use(requireAuth, requireRole("admin"));

router.post("/allowed-identities", addAllowedIdentity);


router.patch(
    "/allowed-identities/:identityId/profile",
    updateAllowedIdentityProfile
);


router.get("/allowed-identities", listAllowedIdentities);
router.patch(
    "/allowed-identities/:id/toggle",
    toggleAllowedIdentity
);
router.get("/audit-logs", listAuditLogs);
router.get("/queries/:queryId/override", getFlaggedQueryOverride);
router.get("/flagged-queries", listFlaggedQueries);

export default router;
