import { supabase } from "@/utils/supabaseClient";

const likePost = async (postId: string) => {
	const { error } = await supabase.from("likes").insert({ post_id: postId });
	if (error) {
		throw new Error(error.message);
	}
};

const unlikePost = async (postId: string) => {
	const query = supabase.from("likes").delete().eq("post_id", postId);

	const { data, error } = await query;

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export { likePost, unlikePost };
