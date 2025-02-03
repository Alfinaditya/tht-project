import { useMutation } from '@tanstack/react-query';
import { LoginInput, RegisterInput } from './dto';
import { login, register } from './fetchers';

export const useLoginMutation = () => {
	return useMutation({
		mutationFn: async (data: LoginInput) =>
			login({
				email: data.email,
				password: data.password,
			}),
	});
};

export const useRegisterMutation = () => {
	return useMutation({
		mutationFn: async (data: RegisterInput) =>
			register({
				email: data.email,
				first_name: data.first_name,
				last_name: data.last_name,
				password: data.password,
				password_confirmation: data.password_confirmation,
			}),
	});
};
