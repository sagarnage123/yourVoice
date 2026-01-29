import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import { listStaff } from "./staff.controller";

const router = Router();

router.get("/staff", requireAuth, listStaff);

export default router;
