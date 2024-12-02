import Task from '../../models/task/Task.js';
import TaskFile from '../../models/task/TaskFile.js';
import { AppError } from '../../utils/error/AppError.js';
import crypto from 'crypto';
export const uploadTaskFiles = async (req, res, next) => {
	try {
		const { taskId } = req.body;
		if (!taskId) {
			throw new AppError('Task id is missing', 400);
		}

		const task = await Task.findByPk(taskId);
		if (!task) {
			throw new AppError('Task not found', 404);
		}
		if (!req.files || req.files.length === 0) {
			throw new AppError('No files were uploaded', 400);
		}

		const newTaskFiles = await Promise.all(
			req.files.map(file => {
				return TaskFile.create({
					id: crypto.randomUUID(),
					filePath: file.path,
					fileName: file.filename,
					createdAt: new Date(),
					updatedAt: new Date(),
					taskId,
				});
			}),
		);

		res.status(201).json({ message: 'Files uploaded successfully', result: newTaskFiles });
	} catch (error) {
		next(error);
	}
};
