import { generatePostController } from "@/controllers/ai.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

const router = Router();
// router.use(authMiddleware);

router.get("/generate-post", generatePostController);

export default router;
