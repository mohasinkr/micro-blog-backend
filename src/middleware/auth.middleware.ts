import AuthenticationError from "@/errors/authentication.error.js";
import { supabase } from "@/utils/supabaseClient.js";
import type { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader?.split(" ")[1];

		if (!token) {
			return next(new AuthenticationError("No token provided"));
		}

		const {
			data: { user },
		} = await supabase.auth.getUser(token);

		if (user) {
			req.user = user;
			return next();
		}
		return next(new AuthenticationError("Invalid token"));
	} catch (error) {
		console.error("Auth middleware error:", error);
		return next(new AuthenticationError("Authentication error"));
	}
};
