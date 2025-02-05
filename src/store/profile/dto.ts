import { z } from 'zod';

export const UpdateProfileSchema = z.object({
	first_name: z
		.string({ message: 'Nama Depan harus dalam format teks' })
		.min(1, { message: 'Nama Depan tidak boleh kosong' }),
	last_name: z
		.string({ message: 'Nama Belakang harus dalam format teks' })
		.min(1, { message: 'Nama Belakang tidak boleh kosong' }),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

export interface UpdateImageProfileInput {
	file: File;
}
