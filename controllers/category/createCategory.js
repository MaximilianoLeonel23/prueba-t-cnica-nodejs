import Category from '../../models/category/Category.js';

export const createCategory = async (req, res, next) => {
	try {
		const { name } = req.body;
		if (!name) {
			throw new AppError('Name is missing', 400);
		}

		const newCategory = {
			id: crypto.randomUUID(),
			name,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const result = await Category.create(newCategory);

		const createdCategory = result.toJSON();
		res.status(201).json({ result: createdCategory });
	} catch (error) {
		next(error);
	}
};
