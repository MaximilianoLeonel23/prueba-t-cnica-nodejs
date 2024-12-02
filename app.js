import e from 'express';
import taskRouter from './routes/taskRouter.js';
import authRouter from './routes/authRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { AppError } from './utils/error/AppError.js';
import cookieParser from 'cookie-parser';
import { verifyToken } from './middlewares/jwt.js';
import { serve, setup } from 'swagger-ui-express';
import swaggerOptions from './config/swagger/swaggerConfig.js';
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors';
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = e();
app.use(e.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/docs', serve, setup(swaggerSpec));
app.use('/api/auth', authRouter);
app.use('/api/tasks', verifyToken, taskRouter);
app.use('/api/categories', verifyToken, categoryRouter);
app.get('/api/', (req, res) => {
	res.send('Welcome');
});
app.use((req, res, next) => {
	const notFound = new AppError('Route not found', 404);
	next(notFound);
});
app.use(errorHandler);
export default app;
