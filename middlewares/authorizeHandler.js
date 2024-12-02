import { AppError } from '../utils/error/AppError.js';

export const authorizeRole = (req, res, next) => {
	console.log('Verify Role : ', req.user);
	const role = req.user.role;
	if (role !== 'ADMIN') {
		return next(new AppError('Unauthorized role', 403));
	}
	next();
};
