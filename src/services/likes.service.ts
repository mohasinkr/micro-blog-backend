import { supabase } from "@/utils/supabaseClient";

const likePost = async (postId: string) => {
	const { error } = await supabase.from("likes").insert({ post_id: postId });

	const { error: incrementError } = await supabase.rpc("increment_like_count", {
		row_id: postId,
	});
	if (error || incrementError) {
		throw new Error(error?.message || incrementError?.message);
	}
};

const unlikePost = async (postId: string) => {
	const { data, error } = await supabase
		.from("likes")
		.delete()
		.eq("post_id", postId)
		.eq("user_id", (await supabase.auth.getUser()).data.user?.id);

	const { error: decrementError } = await supabase.rpc("decrement_like_count", {
		row_id: postId,
	});

	if (error || decrementError) {
		throw new Error(error?.message || decrementError?.message);
	}

	return data;
};

const getLikes = async (postId: string) => {
	const { data, error } = await supabase
		.from("likes")
		.select("*")
		.eq("post_id", postId);
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export { likePost, unlikePost, getLikes };
