import { z } from 'zod';

export const LoginSchema = z.object({
	email: z
		.string({ message: 'Email must be string' })
		.min(1, { message: 'Email tidak boleh kosong' })
		.email({ message: 'Email tidak valid' }),
	password: z
		.string({ message: 'Password must be string' })
		.min(8, { message: 'Password tidak boleh kurang dari 8 karakter' }),
});

export type LoginInput = z.infer<typeof LoginSchema>;
