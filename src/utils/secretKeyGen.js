import crypto from "node:crypto";
import { appendFile } from "node:fs";
import path from "node:path";

function generateSecretKey() {
	const randomKey = crypto.randomBytes(32).toString("hex");
	const secretKey = `\nJWT_SECRET=${randomKey}`;

	const currentDir = process.cwd();

	// Construct the path to the .env file in the root of the project
	const envFilePath = path.resolve(currentDir, ".env");

	appendFile(envFilePath, secretKey, () => {
		console.log("Done!");
	});
}

generateSecretKey();
