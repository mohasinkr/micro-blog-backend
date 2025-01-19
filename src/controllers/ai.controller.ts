import { generatePost } from "@/services/ai.service";
import { asyncHandler } from "@/utils/asyncHandler";
import type { Request, Response } from "express";

const generatePostController = asyncHandler(
	async (_req: Request, res: Response) => {
		const prompt =
			"Generate a post in under 255 characters for my micro blogging platform.";

		const response = await generatePost(prompt);
		console.log(response);
		res.status(200).json({
			success: true,
			status: 200,
			data: response,
		});
	},
);

export { generatePostController };
