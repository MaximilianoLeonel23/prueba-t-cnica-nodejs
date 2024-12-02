import { z } from 'zod';

export const TaskSchema = z.object({
	id: z.string().uuid('Id must be a UUID').readonly().optional(),
	title: z
		.string({ required_error: 'Title is required' })
		.min(1, 'Title must contain at least one character.')
		.max(100, 'Title must not contain more than 100 characters'),
	description: z
		.string({ required_error: 'Description is required' })
		.min(1, 'Description must contain at least one character'),
	status: z.enum(['pending', 'completed', 'in-progress']).optional(),
	categoryId: z.string().uuid().optional(),
	createdAt: z.string().datetime().optional(),
	updatedAt: z.string().datetime().optional(),
});
