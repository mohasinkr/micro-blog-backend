import CustomError from "@/errors/base.error.js";
import { ERROR_MESSAGES } from "@/utils/constants.js";

interface FailedFileDetail {
	originalName: string;
	error: string;
}

class FileUploadError extends CustomError {
	constructor(
		message: string = ERROR_MESSAGES.FILE_UPLOAD_ERROR,
		statusCode = 400,
		public failedDetails: FailedFileDetail[] = [],
	) {
		super(message, statusCode);
		this.name = this.constructor.name;
		this.isOperational = true;
        this.failedDetails = failedDetails;
		Error.captureStackTrace(this, this.constructor);
	}

	getFailedDetails(): FailedFileDetail[] {
		return this.failedDetails;
	}
}

export default FileUploadError;
