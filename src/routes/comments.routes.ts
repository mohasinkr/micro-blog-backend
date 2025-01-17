import {
	createCommentController,
	getAllCommentsController,
} from "@/controllers/comments.controller";
import { Router } from "express";

const router = Router();

router.get("/:id", getAllCommentsController);
router.post("/:id", createCommentController);

export default router;
