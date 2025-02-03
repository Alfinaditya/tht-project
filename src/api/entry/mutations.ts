import { useMutation } from '@tanstack/react-query';
import { LoginInput } from './dto';
import { login } from './fetchers';

export const useLoginMutation = () => {
	return useMutation({
		mutationFn: async (data: LoginInput) =>
			login({
				email: data.email,
				password: data.password,
			}),
	});
};
