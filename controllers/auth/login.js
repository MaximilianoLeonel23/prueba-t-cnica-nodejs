import jwt from 'jsonwebtoken';
import User from '../../models/auth/User.js';
import { AppError } from '../../utils/error/AppError.js';
import bcrypt from 'bcrypt';
export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw new AppError('Email or password are missing', 401);
		}

		const isFound = await User.findOne({ where: { email } });
		if (!isFound) {
			throw new AppError('Invalid email', 401);
		}

		const isPasswordValid = await bcrypt.compare(password, isFound.toJSON().password);
		if (!isPasswordValid) {
			throw new AppError('Password invalid', 401);
		}

		const data = isFound.toJSON();

		const user = {
			id: data.id,
			email: data.email,
			role: data.role,
		};

		const token = jwt.sign({ user }, process.env.JWT_SECRET, {
			algorithm: 'HS256',
			expiresIn: '1h',
		});

		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.json({ user });
	} catch (error) {
		next(error);
	}
};
