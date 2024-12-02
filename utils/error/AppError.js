export class AppError extends Error {
	constructor(message, statusCode, type = 'application') {
		super(message);
		this.statusCode = statusCode;
		this.type = type;
		Error.captureStackTrace(this, this.constructor);
	}

	toJson() {
		return {
			type: this.type,
			statusCode: this.statusCode,
			message: this.message,
		};
	}
}
