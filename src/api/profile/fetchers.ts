import http from '@/lib/http';
import { ProfileResponse } from './responses';
import { UpdateImageProfileInput, UpdateProfileInput } from './dto';

export const profile = async (): Promise<ProfileResponse> =>
	await http.get(`/profile`);

export const updateProfile = async (
	data: UpdateProfileInput
): Promise<ProfileResponse> =>
	await http.put(`/profile/update`, {
		first_name: data.first_name,
		last_name: data.last_name,
	} as typeof data);

export const updateImageProfile = async (
	data: UpdateImageProfileInput
): Promise<ProfileResponse> => {
	let formData = new FormData();
	formData.append('file', data.file);
	return await http.put('/profile/image', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};
