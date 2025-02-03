import { z } from 'zod';

export const LoginSchema = z.object({
	email: z
		.string({ message: 'Email harus dalam format teks' })
		.min(1, { message: 'Email tidak boleh kosong' })
		.email({ message: 'Email tidak valid' }),
	password: z
		.string({ message: 'Password harus dalam format teks' })
		.min(8, { message: 'Password tidak boleh kurang dari 8 karakter' }),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
	email: z
		.string({ message: 'Email harus dalam format teks' })
		.min(1, { message: 'Email tidak boleh kosong' })
		.email({ message: 'Email tidak valid' }),
	first_name: z
		.string({ message: 'Nama Depan harus dalam format teks' })
		.min(1, { message: 'Nama Depan tidak boleh kosong' }),
	last_name: z
		.string({ message: 'Nama Belakang harus dalam format teks' })
		.min(1, { message: 'Nama Belakang tidak boleh kosong' }),
	password: z
		.string({ message: 'Password harus dalam format teks' })
		.min(8, { message: 'Password tidak boleh kurang dari 8 karakter' }),
	password_confirmation: z
		.string({ message: 'Konfirmasi Password harus dalam format teks' })
		.min(8, {
			message: 'Konfirmasi password tidak boleh kurang dari 8 karakter',
		}),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
