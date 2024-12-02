import multer from 'multer';
import { AppError } from '../utils/error/AppError.js';
import { ValidationError } from '../utils/error/ValidationError.js';

export const errorHandler = (error, req, res, next) => {
	console.log(error);
	if (error instanceof multer.MulterError) {
		return res.status(400).json({ message: error.message });
	}

	if (error instanceof AppError) {
		return res.status(error.statusCode).json(error.toJson());
	}
	if (error instanceof ValidationError) {
		return res.status(error.statusCode).json(error.toJson());
	}

	return res.status(500).json({
		type: 'application',
		statusCode: 500,
		error: 'Internal Server Error',
	});
};
