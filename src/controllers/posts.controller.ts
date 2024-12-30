import {
	createPost,
	deletePost,
	readPosts,
	updatePost,
} from "@/services/posts.service";
import type { RequestWithUser } from "@/types/request.types";
import { asyncHandler } from "@/utils/asyncHandler";
import { INFO_MESSAGES } from "@/utils/constants";
import { supabase } from "@/utils/supabaseClient";
import type { NextFunction, Response } from "express";

const createPostController = asyncHandler(
	async (req: RequestWithUser, res: Response, _next: NextFunction) => {
		const { content } = req.body;
		// const { user } = req;

		await createPost(content);
		res.status(201).json({
			success: true,
			status: 201,
			message: INFO_MESSAGES.POST_CREATED,
		});
	},
);

const listPostsController = asyncHandler(
	async (_req: RequestWithUser, res: Response, _next: NextFunction) => {
		const posts = await readPosts();
		res.status(200).json({
			success: true,
			status: 200,
			data: posts,
		});
	},
);

const deletePostController = asyncHandler(
	async (req: RequestWithUser, res: Response, _next: NextFunction) => {
		const { id } = req.params;
		console.log(id, "id");
		await deletePost(id);
		res.json({
			success: true,
			status: 200,
			message: INFO_MESSAGES.POST_DELETED,
		});
	},
);

const editPostController = asyncHandler(
	async (req: RequestWithUser, res: Response, _next: NextFunction) => {
		const { id } = req.params;
		const { content } = req.body;
		const response = await updatePost(id, content);
		res.status(200).json({
			success: true,
			status: 200,
			message: INFO_MESSAGES.POST_UPDATED,
			data: {
				response,
			},
		});
	},
);

export {
	createPostController,
	listPostsController,
	editPostController,
	deletePostController,
};
