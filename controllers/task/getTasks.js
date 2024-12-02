import Task from '../../models/task/Task.js';
import { AppError } from '../../utils/error/AppError.js';

export const getTasks = async (req, res, next) => {
	try {
		const { page = 1, size = 10, status, title } = req.query;

		const where = {};
		if (status) where.status = status;
		if (title) where.title = { [Op.like]: `%${title}%` };

		const limit = parseInt(size);
		const offset = (parseInt(page) - 1) * limit;
		const currentPage = parseInt(page);
		const { count, rows: results } = await Task.findAndCountAll({
			where,
			limit,
			offset,
		});
		if (count === 0) {
			throw new AppError('Tasks not found', 404);
		}
		const tasks = results.map(task => task.toJSON());
		res.status(200).json({ results: tasks, limit, currentPage, count, offset });
	} catch (error) {
		next(error);
	}
};
