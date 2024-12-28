import { corsOptions } from "@/config/corsOptions.js";
import cors from "cors";
import express from "express";
import type { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimiter } from "./rateLimiter.middleware.js";

export const initMiddlewares = (app: Application) => {
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cors(corsOptions));
	app.use(morgan("dev"));
	app.use(helmet());
	app.use(rateLimiter);
};
