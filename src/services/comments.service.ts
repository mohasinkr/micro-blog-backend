import { supabase } from "@/utils/supabaseClient";

const readComments = async (postId: string) => {
	const comments = await supabase
		.from("comments")
		.select("*")
		.eq("post_id", postId);
	return comments;
};

const createComment = async (postId: string, content: string) => {
	const { data, error } = await supabase
		.from("comments")
		.insert({ post_id: postId, content });
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

const deleteComment = async (commentId: string) => {
	const { error } = await supabase
		.from("comments")
		.delete()
		.eq("id", commentId);
	if (error) {
		throw new Error(error.message);
	}
};

export { readComments, createComment, deleteComment };
