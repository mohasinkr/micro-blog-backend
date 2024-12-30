import type { User } from "@supabase/supabase-js";
import type { Request } from "express";

interface RequestWithUser extends Request {
	user: User;
}

export type { RequestWithUser };
