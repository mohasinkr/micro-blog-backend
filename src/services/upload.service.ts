import { randomBytes } from "node:crypto";
import { supabase } from "@/utils/supabaseClient";

type UploadResult = {
	success: { filePath: string; originalName: string }[];
	failed: { originalName: string; error: string }[];
};

const uploadFile = async (
	files: Express.Multer.File[],
): Promise<UploadResult> => {
	const randomFilename = randomBytes(8).toString("hex");

	const success: UploadResult["success"] = [];
	const failed: UploadResult["failed"] = [];

	for (const file of files) {
		try {
			const fileExt = file.originalname.split(".").pop();
			const filePath = `images/${Date.now()}-${randomFilename}.${fileExt}`;

			const { error } = await supabase.storage
				.from("post_media")
				.upload(filePath, file.buffer, {
					contentType: file.mimetype,
				});

			if (error) {
				console.log(error, "error from uploadFile");
				failed.push({ originalName: file.originalname, error: error.message });
			} else {
				console.log("File uploaded successfully", filePath);
				success.push({ filePath, originalName: file.originalname });
			}
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err: any) {
			failed.push({ originalName: file.originalname, error: err.message });
		}
	}

	return { success, failed };
};

const getPublicUrl = async (path: string) => {
	const { data } = await supabase.storage.from("post_media").getPublicUrl(path);
	return data;
};

export { uploadFile, getPublicUrl };
