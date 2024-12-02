import crypto from 'crypto';
import Task from '../../models/task/Task.js';
import { AppError } from '../../utils/error/AppError.js';

export const createTask = async (req, res, next) => {
	try {
		const { title, description, status, categoryId } = req.body;
		if (!title || !description) {
			throw new AppError('Title or description is missing', 400);
		}

		const newTask = {
			id: crypto.randomUUID(),
			title,
			description,
			status,
			categoryId,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const result = await Task.create(newTask);

		const createdTask = result.toJSON();
		res.status(201).json({ result: createdTask });
	} catch (error) {
		next(error);
	}
};
