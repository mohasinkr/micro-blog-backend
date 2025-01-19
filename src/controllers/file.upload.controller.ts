import BadRequestError from "@/errors/badRequest.error";
import { uploadFile } from "@/services/upload.service";
import { asyncHandler } from "@/utils/asyncHandler";
import { ERROR_MESSAGES, INFO_MESSAGES } from "@/utils/constants";
import type { Request, Response } from "express";

const singleFileUploadController = asyncHandler(
	async (req: Request, res: Response) => {
		const uploadedFile = req.file;
		console.log(req.file);
		if (!uploadedFile) {
			throw new BadRequestError(ERROR_MESSAGES.FILE_EMPTY);
		}

		const response = await uploadFile(uploadedFile);

		res.status(200).json({
			message: INFO_MESSAGES.FILE_UPLOADED,
			data: response,
		});
	},
);

export { singleFileUploadController };
