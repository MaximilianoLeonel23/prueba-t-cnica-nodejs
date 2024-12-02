import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../../config/db/database.js';
class User extends Model {}
User.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
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
		role: {
			type: DataTypes.ENUM,
			values: ['ADMIN', 'USER'],
			defaultValue: 'USER',
			allowNull: false,
		},
	},
	{ sequelize, modelName: 'user' },
);

export default User;
