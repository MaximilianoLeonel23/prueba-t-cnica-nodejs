import { AppError } from './AppError.js';

export class ValidationError extends AppError {
	constructor(errors, message = 'Validation failed') {
		super(message, 400, 'validation');
		this.errors = errors;
	}

	toJson() {
		return {
			type: this.type,
			statusCode: this.statusCode,
			message: this.message,
			errors: this.errors,
		};
	}
}
