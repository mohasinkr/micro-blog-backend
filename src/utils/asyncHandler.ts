import type { NextFunction, Request, Response } from "express";

// Generic asyncHandler that accepts any type that extends Request
export const asyncHandler = <T>(
	fn: (req: T, res: Response, next: NextFunction) => Promise<void>,
) => {
	return (req: T, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};
