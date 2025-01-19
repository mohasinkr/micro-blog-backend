import CustomError from "./base.error.js";

class BadRequestError extends CustomError {
	constructor(message = "Bad Request", statusCode = 400) {
		super(message, statusCode);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default BadRequestError;
