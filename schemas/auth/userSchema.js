import { z } from 'zod';

export const userSchema = z.object({
	id: z.string().uuid().optional(),
	email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
	password: z.string({ required_error: 'Password is required' }),
	createdAt: z.string().datetime().optional(),
	updatedAt: z.string().datetime().optional(),
	role: z.enum(['ADMIN', 'USER'], 'Invalid role').optional(),
});
