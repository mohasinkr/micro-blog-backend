import AuthenticationError from "@/errors/authentication.error.js";
import { createUser, loginUser } from "@/services/auth.service.js";
import { INFO_MESSAGES } from "@/utils/constants.js";
import type { NextFunction, Request, Response } from "express";

const signupController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
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
	} catch (error) {
		next(error);
		console.log(error);
	}
};

const loginController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
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
	} catch (error) {
		next(error);
		console.log(error);
	}
};

export { signupController, loginController };
