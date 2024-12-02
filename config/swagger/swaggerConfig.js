import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API Documentation',
			version: '1.0.0',
			description: 'API Documentation for your application',
		},
		servers: [
			{
				url: 'http://localhost:3000',
			},
		],
	},
	apis: ['./routes/*.js'],
};

export default swaggerOptions;
