import http from '@/lib/http';
import { LoginInput, RegisterInput } from './dto';
import { LoginResponse, RegisterResponse } from './responses';

export const login = async (data: LoginInput): Promise<LoginResponse> =>
	await http.post(`/login`, {
		email: data.email,
		password: data.password,
	} as typeof data);

export const register = async (
	data: RegisterInput
): Promise<RegisterResponse> =>
	await http.post(`/registration`, {
		email: data.email,
		first_name: data.first_name,
		last_name: data.last_name,
		password: data.password,
	} as typeof data);
