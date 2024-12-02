import app from './app.js';
import { connectDatabase } from './config/db/database.js';

import dotenv from 'dotenv';
dotenv.config();
const PORT = 3000;

(async () => {
	await connectDatabase();
})();

app.listen(PORT, () => {
	console.log(`Listening at port ${PORT}.. `);
});
