import multer from 'multer';
import path from 'path';
import fs from 'fs';
const destinationPath = path.resolve('uploads/taskFiles/');
if (!fs.existsSync(destinationPath)) {
	fs.mkdirSync(destinationPath, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, destinationPath);
	},

	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(null, `${uniqueSuffix}-${file.originalname}`);
	},
});

// const fileFilter = (req, file, cb) => {
// 	const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'multipart/form-data'];
// 	console.log(file);
// 	if (allowedTypes.includes(file.mimetype)) {
// 		cb(null, true);
// 	} else {
// 		cb(new AppError('Invalid file type', 400), false);
// 	}
// };

export const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 },
});
