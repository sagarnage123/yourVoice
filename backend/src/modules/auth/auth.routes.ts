import { Router } from "express";
import { requestAuth, verifyAuth } from "./auth.controller";

const router = Router();

router.post("/request", requestAuth);
router.post("/verify", verifyAuth);

export default router;
