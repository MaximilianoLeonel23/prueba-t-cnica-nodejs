import { z } from 'zod';

export const CategorySchema = z.object({
	id: z.string().uuid('Id must be a UUID').readonly().optional(),
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, 'Name must contain at least one character.'),
	createdAt: z.string().datetime().optional(),
	updatedAt: z.string().datetime().optional(),
});
