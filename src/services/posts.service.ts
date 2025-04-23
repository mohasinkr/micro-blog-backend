import { supabase } from "@/utils/supabaseClient";

const createPost = async (content: string, assets?: string[]) => {
	const { error } = await supabase.from("posts").insert({ content, assets });
	if (error) {
		throw new Error(error.message);
	}
};

const readPosts = async (postId?: string) => {
	let query = supabase.from("posts").select("*").order("created_at", { ascending: false });

	if (postId) {
		query = query.eq("id", postId);
	}

	const { data, error } = await query;

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

const updatePost = async (id: string, content: string) => {
	const { error } = await supabase
		.from("posts")
		.update({ content })
		.eq("id", id)
		.select();
	if (error) {
		throw new Error(error.message);
	}
};

const deletePost = async (id: string) => {
	const { error } = await supabase.from("posts").delete().eq("id", id);
	if (error) {
		throw new Error(error.message);
	}
};

export { createPost, readPosts, deletePost, updatePost };
