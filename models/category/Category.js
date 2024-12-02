import { Model, Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../../config/db/database.js';
import Task from '../task/Task.js';
class Category extends Model {}
Category.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING(50),
			allowNull: false,
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
	{ sequelize, modelName: 'category' },
);

Category.hasMany(Task, { foreignKey: 'categoryId', as: 'tasks' });
Task.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

export default Category;
