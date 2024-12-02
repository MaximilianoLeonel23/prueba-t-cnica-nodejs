import { AppError } from '../../utils/error/AppError.js';
import User from '../../models/auth/User.js';
import bcrypt from 'bcrypt';
export const register = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		console.log('email and password', email, password);
		if (!email || !password) {
			throw new AppError('Email or password are missing', 400);
		}

		const isDuplicated = await User.findOne({ where: { email } });
		if (isDuplicated) {
			throw new AppError('User with this email already exists', 400);
		}

		const id = crypto.randomUUID();
		const hash = await bcrypt.hash(password, 10);
		const createdAt = new Date();
		const updatedAt = new Date();

		const newUser = {
			id,
			email,
			password: hash,
			createdAt,
			updatedAt,
		};

		const result = await User.create(newUser);

		res.status(200).json({ result: result.toJSON() });
	} catch (error) {
		console.log(error);
		next(error);
	}
};
