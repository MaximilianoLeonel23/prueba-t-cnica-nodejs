import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../../config/db/database.js';

class TaskFile extends Model {}
TaskFile.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		filePath: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		fileName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		taskId: {
			type: DataTypes.UUIDV4,
			allowNull: null,
			references: {
				model: 'task',
				key: 'id',
			},
			onDelete: 'CASCADE',
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
	{ sequelize, modelName: 'taskFile' },
);

export default TaskFile;
