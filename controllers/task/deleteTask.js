import Task from '../../models/task/Task.js';
import { AppError } from '../../utils/error/AppError.js';

export const deleteTask = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			throw new AppError('Invalid task id provided', 400, 'params');
		}

		await Task.destroy({ where: { id } });
		res.status(204).json({ result: 'Task has been deleted' });
	} catch (error) {
		next(error);
	}
};
