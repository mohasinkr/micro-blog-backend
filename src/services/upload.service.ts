import { randomBytes } from "node:crypto";
import { supabase } from "@/utils/supabaseClient";

const uploadFile = async (file: Express.Multer.File) => {
	// creating a random file name
	const randomFilename = randomBytes(8).toString("hex");
	const fileExt = file.originalname.split(".").pop();
	const filePath = `images/${Date.now()}-${randomFilename}.${fileExt}`;

	const { data, error } = await supabase.storage
		.from("post_media")
		.upload(filePath, file.buffer, {
			contentType: file.mimetype,
		});
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

const getPublicUrl = async (path: string) => {
	const { data } = await supabase.storage.from("post_media").getPublicUrl(path);
	return data;
};

export { uploadFile, getPublicUrl };
