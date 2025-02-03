import http from '@/lib/http';
import { BalanceResponse } from './responses';

export const balance = async (): Promise<BalanceResponse> =>
	await http.get(`/balance`);
