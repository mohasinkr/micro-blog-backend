// Error codes
const ERROR_CODES = {
	INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
};

const ERROR_MESSAGES = {
	VALIDATION_FAILED: "Validation failed. Please check your input.",
	DATABASE_ERROR: "An error occurred while interacting with the database.",
	RESOURCE_NOT_FOUND: "The requested resource could not be found.",
	FORBIDDEN: "You do not have permission to access this resource.",
	CONFLICT: "A conflict occurred with the current state of the resource.",
	TOO_MANY_REQUESTS: "You have made too many requests. Please try again later.",
	SERVER_ERROR: "Internal server error. Please try again later.",
	UNAUTHORIZED: "You are not authorized to perform this action.",
	MISSING_CREDENTIALS: "Missing username or password.",
	INVALID_CREDENTIALS: "Invalid username or password.",
	USER_EXISTS: "A user with this username already exists.",
	OPERATION_NOT_ALLOWED: "The operation is not allowed.",
	POST_CONTENT_EMPTY: "Post content cannot be empty.",
	COMMENT_CONTENT_EMPTY: "Comment content cannot be empty.",
	FILE_EMPTY: "File cannot be empty.",
};

const INFO_MESSAGES = {
	USER_CREATED: "User created successfully.",
	VERIFICATION_EMAIL_SENT:
		"A verification email has been sent to your email address. Please check your inbox for further instructions.",
	PASSWORD_RESET:
		"Your password has been reset successfully. Please log in with your new password.",
	PASSWORD_CHANGED: "Your password has been changed successfully.",
	EMAIL_VERIFIED: "Your email address has been verified successfully.",
	LOGIN_SUCCESS: "You have successfully logged in.",
	POST_CREATED: "Post created successfully.",
	POST_DELETED: "Post deleted successfully.",
	POST_UPDATED: "Post updated successfully.",
	COMMENT_CREATED: "Comment created successfully.",
	COMMENT_DELETED: "Comment deleted successfully.",
	COMMENT_UPDATED: "Comment updated successfully.",
	FILE_UPLOADED: "File uploaded successfully.",
};

export { ERROR_CODES, ERROR_MESSAGES, INFO_MESSAGES };
