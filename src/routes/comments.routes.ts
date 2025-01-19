import {
	createCommentController,
	getAllCommentsController,
} from "@/controllers/comments.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

const router = Router();
router.use(authMiddleware);

router.get("/:id", getAllCommentsController);
router.post("/:id", createCommentController);

export default router;
