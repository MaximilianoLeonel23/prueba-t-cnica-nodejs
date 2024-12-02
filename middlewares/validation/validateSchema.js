import z from 'zod';
import { ValidationError } from '../../utils/error/ValidationError.js';

export const validateSchema = schema => {
	return async (req, res, next) => {
		try {
			req.body = schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof z.ZodError) {
				const validationErrors = error.errors.map(err => ({
					field: err.path.join('.'),
					message: err.message,
				}));
				return next(new ValidationError(validationErrors));
			}
			next(error);
		}
	};
};
