import { AppError } from '../utils/error/AppError.js';
import jwt from 'jsonwebtoken';
export const verifyToken = async (req, res, next) => {
	const token = req.cookies.access_token;

	if (!token) {
		return next(new AppError('Missing token', 401));
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload.user;
		next();
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			return next(new AppError('Token has expired', 401));
		}
		next(new AppError('Invalid token', 401));
	}
};
