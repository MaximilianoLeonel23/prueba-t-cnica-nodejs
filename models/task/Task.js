import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/db/database.js';
import TaskFile from './TaskFile.js';

class Task extends Model {}
Task.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM,
			values: ['completed', 'pending', 'in-progress'],
			defaultValue: 'pending',
		},
		categoryId: {
			type: DataTypes.UUIDV4,
			allowNull: true,
		},
		createdAt: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false,
		},
		updatedAt: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false,
		},
	},
	{ sequelize, modelName: 'task' },
);

Task.hasMany(TaskFile, { foreignKey: 'taskId', as: 'files' });
TaskFile.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });

export default Task;
