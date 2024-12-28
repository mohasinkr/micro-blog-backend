import AuthenticationError from "@/errors/authentication.error.js";
import { supabase } from "@/utils/supabaseClient.js";
import type { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) {
    next(new AuthenticationError("Invalid token"));
  }
  next();
};
