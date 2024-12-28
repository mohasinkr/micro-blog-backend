import { Router } from "express";
import authRouter from "./auth.routes.js";
import postsRouter from "./posts.routes.js";

const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/posts", postsRouter);

export default indexRouter;
