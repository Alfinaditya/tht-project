import { useMutation } from '@tanstack/react-query';
import { updateImageProfile, updateProfile } from './fetchers';
import { UpdateImageProfileInput, UpdateProfileInput } from './dto';

export const useUpdateProfileMutation = () => {
	return useMutation({
		mutationFn: async (data: UpdateProfileInput) =>
			updateProfile({
				first_name: data.first_name,
				last_name: data.last_name,
			}),
	});
};

export const useUpdateImageProfileMutation = () => {
	return useMutation({
		mutationFn: async (data: UpdateImageProfileInput) =>
			updateImageProfile({
				file: data.file,
			}),
	});
};
