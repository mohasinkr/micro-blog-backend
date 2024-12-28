import {
	loginController,
	signupController,
} from "@/controllers/auth.controller.js";
import { validateRequest } from "@/middleware/validation.middleware.js";
import { loginSchema } from "@/validators/login.schema.js";
import { signupSchema } from "@/validators/signup.schema.js";
import { Router } from "express";

const router = Router();

router.post("/login", validateRequest(loginSchema), loginController);
router.post("/signup", validateRequest(signupSchema), signupController);

export default router;
