import type CustomError from "@/errors/base.error.js";
import FileUploadError from "@/errors/fileUpload.error.js";
import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";

// Define interface for error response
interface ErrorResponse {
	success: boolean;
	status: number;
	message: string;
	stack?: string;
	failedDetails?: { originalName: string; error: string }[];
}

dotenv.config();

// Production error handler
const handleProductionErrors = (err: CustomError, res: Response): void => {
	if (err.isOperational) {
		// Create the base response object
		const responseObj: ErrorResponse = {
			success: false,
			status: err.statusCode,
			message: err.message,
		};

		// Add failed files information if it's a FileUploadError
		if (err instanceof FileUploadError && err.failedDetails.length > 0) {
			responseObj.failedDetails = err.failedDetails;
		}

		res.status(err.statusCode).json(responseObj);
	} else {
		console.error("Non-operational error 💥:", err);
		res.status(500).json({
			success: false,
			status: 500,
			message: "Something went wrong. Please try again later.",
		} as ErrorResponse);
	}
};

// Development error handler
const handleDevelopmentErrors = (err: CustomError, res: Response): void => {
	console.error("Development error 💥:", err);

	// Create the base response object
	const responseObj: ErrorResponse = {
		success: false,
		status: err.statusCode,
		message: err.message,
	stack: err.stack, // Include stack trace in development
	};

	// Add failed files information if it's a FileUploadError
	if (err instanceof FileUploadError && err.getFailedDetails().length > 0) {
		responseObj.failedDetails = err.failedDetails;
	}

	res.status(err.statusCode).json(responseObj);
};

// Unified error handler middleware
export const globalErrorHandler = (
	err: CustomError,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void => {
	const isDevelopment = process.env?.ENVIRONMENT === "development";
	console.log("running the global error handler");
	console.log(isDevelopment, "isDevelopment");

	// Ensure defaults for unhandled errors
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	// Normalize the error object
	const normalizedError = {
		...err,
		statusCode,
		message,
	};

	if (isDevelopment) {
		handleDevelopmentErrors(normalizedError, res);
	} else {
		handleProductionErrors(normalizedError, res);
	}
};
