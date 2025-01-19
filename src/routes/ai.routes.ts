import { Router } from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import { generatePostController } from "@/controllers/ai.controller";

const router = Router();
// router.use(authMiddleware);

router.get("/generate-post", generatePostController);

export default router;
