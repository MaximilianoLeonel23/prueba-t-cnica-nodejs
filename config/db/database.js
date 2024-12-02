import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
	database: 'nodejs_task_manager_db',
	username: 'root',
	password: 'root',
	host: 'localhost',
	port: 3306,
	dialect: 'mysql',
});

export const connectDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log('Successful connection to database');
	} catch (error) {
		console.error("Couldn't connect to database: ", error.message);
	}
};
