import http from '@/lib/http';
import { ProfileResponse } from './responses';

export const profile = async (): Promise<ProfileResponse> =>
	await http.get(`/profile`);
