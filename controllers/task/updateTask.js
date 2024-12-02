import Task from '../../models/task/Task.js';
import { AppError } from '../../utils/error/AppError.js';

export const updateTask = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id || isNaN(Number(id))) {
			throw new AppError('Invalid task id provided', 400, 'params');
		}
		const { title, description, status } = req.body;
		if (!title && !description && !status) {
			throw new AppError('At least one field must be provided', 400);
		}
		const taskFound = await Task.findByPk(id);
		if (!taskFound) {
			throw new AppError(`Task witd id ${id} doesn't exist`);
		}

		const updatedTask = {
			title: title ? title : taskFound.title,
			description: description ? description : taskFound.description,
			status: status ? status : taskFound.status,
			updatedAt: new Date(),
		};

		const result = await Task.update(updatedTask, { where: { id } });

		if (!result[0]) {
			throw new AppError("Task hasn't been updated", 400);
		}

		const newTask = await Task.findByPk(id);

		res.status(200).json({ result: newTask });
	} catch (error) {
		next(error);
	}
};
