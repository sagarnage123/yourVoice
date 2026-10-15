
import { Router } from "express";
import {
    requestAuth,
    verifyAuth,
    logout,
} from "./auth.controller";
import { requireAuth } from "../../middlewares/requireAuth";

const router = Router();

router.post("/request", requestAuth);
router.post("/verify", verifyAuth);
router.post("/logout", logout);

router.get("/me", requireAuth, (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Authenticated user",
        data: {
            user: {
                id: req.user!.userId,
                role: req.user!.role,
            },
        },
    });
});

export default router;
