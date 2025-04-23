import BadRequestError from "@/errors/badRequest.error";
import FileUploadError from "@/errors/fileUpload.error";
import { uploadFile } from "@/services/upload.service";
import { asyncHandler } from "@/utils/asyncHandler";
import { ERROR_MESSAGES, INFO_MESSAGES } from "@/utils/constants";
import type { Request, Response } from "express";

const fileUploadController = asyncHandler(
	async (req: Request, res: Response) => {
		const uploadedFiles = req.files as Express.Multer.File[];

		if (Array.isArray(uploadedFiles) && uploadedFiles.length > 5) {
			throw new BadRequestError("Too many files uploaded");
		}

		if (!uploadedFiles) {
			throw new BadRequestError(ERROR_MESSAGES.FILE_EMPTY);
		}

		const response = await uploadFile(uploadedFiles);

		if (response.failed.length > 0) {
			// Pass the failed files information directly
			throw new FileUploadError(
				"Failed to upload some files",
				400,
				response.failed,
			);
		}

		res.status(200).json({
			message: INFO_MESSAGES.FILE_UPLOADED,
			data: response,
		});
	},
);

export { fileUploadController };
