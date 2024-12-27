import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { globalErrorHandler } from "./middleware/errorHandler.middleware.js";
import { initMiddlewares } from "./middleware/index.js";
import indexRouter from "./routes/index.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = process.env.HOST || "http://localhost";
const PORT = Number.parseInt(process.env.PORT || "4500");

const app = express();

// setup the common middlewares (logging,body parser, cors, rate limiter etc )
initMiddlewares(app);

app.set("views", `${__dirname}/views`);

app.set("view engine", "pug");

app.get("/", (_, res: express.Response) => {
	res.send(`Yep, the server is running🏃 on ${PORT}`);
});

app.get("/gen-error", () => {
	throw Error("Unknown excpetion occured!");
});

app.use("/api/v1", indexRouter);

app.get("/health-check", (_req, res, next) => {
	const uptimeInSeconds = process.uptime();
	const uptimeInHours = Math.floor(uptimeInSeconds / 3600);
	const uptimeInMinutes = Math.floor((uptimeInSeconds % 3600) / 60);
	const uptimeInSecondsRemaining = Math.floor(uptimeInSeconds % 60);

	const uptime = `${uptimeInHours}h ${uptimeInMinutes}m ${uptimeInSecondsRemaining}s`;
	const healthcheck = {
		uptime,
		message: "OK",
		timestamp: new Date().toISOString(),
	};
	res.send(healthcheck);
	next();
});

app.use(globalErrorHandler);

app.listen(PORT, async () => {
	console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
