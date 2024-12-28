import { authMiddleware } from "@/middleware/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

router.post("/", (_req, res) => {});

router.get("/", (_req, res) => {
	res.json("get posts endpoint");
});

router.get("/:id", (_req, res) => {
	res.json("get post by id endpoint");
});

router.put("/:id", (_req, res) => {
	res.json("update post by id endpoint");
});

router.delete("/:id", (_req, res) => {
	res.json("delete post by id endpoint");
});

export default router;
