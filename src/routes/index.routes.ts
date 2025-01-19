import { Router } from "express";
import authRouter from "./auth.routes.js";
import commentsRouter from "./comments.routes.js";
import postsRouter from "./posts.routes.js";
import aiRouter from "./ai.routes.js";

const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/ai", aiRouter);
indexRouter.use("/posts", postsRouter);
indexRouter.use("/comments", commentsRouter);

export default indexRouter;
