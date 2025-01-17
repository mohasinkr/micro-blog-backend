import BadRequestError from "@/errors/badRequest.error";
import { createComment, readComments } from "@/services/comments.service";
import { asyncHandler } from "@/utils/asyncHandler";
import { ERROR_MESSAGES, INFO_MESSAGES } from "@/utils/constants";
import type { Request, Response } from "express";

const getAllCommentsController = asyncHandler(
	async (req: Request, res: Response) => {
		const { id } = req.params;
		const comments = await readComments(id);
		res.json(comments);
	},
);

const createCommentController = asyncHandler(
	async (req: Request, res: Response) => {
		const { id } = req.params;
		const { content } = req.body;
		if (!content) {
			throw new BadRequestError(ERROR_MESSAGES.COMMENT_CONTENT_EMPTY);
		}
		const comment = await createComment(id, content);
		res.json({
			success: true,
			status: 201,
			message: INFO_MESSAGES.COMMENT_CREATED,
		});
	},
);

export { getAllCommentsController, createCommentController };
