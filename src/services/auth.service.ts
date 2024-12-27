import AuthenticationError from "@/errors/authentication.error.js";
import { supabase } from "@/utils/supabaseClient.js";

const createUser = async (username: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email: username, password })
    if (error) {
        throw new AuthenticationError(error.message, 400);
    }
    return { statusCode: 200, response: data }
}

const loginUser = async (username: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email: username, password })
    if (error) {
        throw new AuthenticationError(error.message, 400);
    }
    return { statusCode: 200, response: data }
}

export { loginUser, createUser };