import AuthenticationError from "@/errors/authentication.error.js";
import { createUser, loginUser } from "@/services/auth.service.js";
import { asyncHandler } from "@/utils/asyncHandler";
import { INFO_MESSAGES } from "@/utils/constants.js";
import type { NextFunction, Request, Response } from "express";

const signupController = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { username, password, password_confirmation } = req.body;
		if (password !== password_confirmation) {
			throw new AuthenticationError("Passwords do not match", 400);
		}
		const result = await createUser(username, password);
		res.status(result.statusCode).json({
			success: true,
			status: result.statusCode,
			messages: INFO_MESSAGES.VERIFICATION_EMAIL_SENT,
		});
	},
);

const loginController = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { username, password } = req.body;
		const { statusCode, response } = await loginUser(username, password);
		res.status(statusCode).json({
			success: true,
			status: statusCode,
			messages: INFO_MESSAGES.LOGIN_SUCCESS,
			data: {
				token: response.session.access_token,
				user: response.user,
			},
		});
	},
);

export { signupController, loginController };
