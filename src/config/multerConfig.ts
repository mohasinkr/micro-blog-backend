import type { Request } from "express";
import multer from "multer";
import type { FileFilterCallback } from "multer";
import { memoryStorage } from "multer";

const storage = memoryStorage();

const fileFilter = (
	_req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback,
) => {
	const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

export default upload;
