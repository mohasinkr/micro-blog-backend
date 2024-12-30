import {
	createPostController,
	deletePostController,
	editPostController,
	listPostsController,
} from "@/controllers/posts.controller";
import { authMiddleware } from "@/middleware/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

router.post("/", createPostController);

router.get("/", listPostsController);

router.get("/:id", listPostsController);

router.patch("/:id", editPostController);

router.delete("/:id", deletePostController);

export default router;
