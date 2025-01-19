import upload from "@/config/multerConfig";
import { singleFileUploadController } from "@/controllers/file.upload.controller";
import {
	createPostController,
	deletePostController,
	editPostController,
	likePostController,
	listPostsController,
	unlikePostController,
} from "@/controllers/posts.controller";
import { authMiddleware } from "@/middleware/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

router.post("/", createPostController);

router.get("/", listPostsController);

router.post("/assets", upload.single("file"), singleFileUploadController);

router.get("/:id", listPostsController);

router.patch("/:id", editPostController);

router.delete("/:id", deletePostController);

router.post("/:id/like", likePostController);

router.delete("/:id/like", unlikePostController);

export default router;
