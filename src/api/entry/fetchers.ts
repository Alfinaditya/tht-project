import http from '@/lib/http';
import { LoginInput } from './dto';
import { LoginResponse } from './responses';

export const login = async (data: LoginInput): Promise<LoginResponse> =>
	await http.post(`/login`, {
		email: data.email,
		password: data.password,
	} as typeof data);
