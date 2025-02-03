import http from '@/lib/http';
import { BannerResponse, ServiceResponse } from './responses';

export const service = async (): Promise<ServiceResponse> =>
	await http.get(`/services`);

export const banner = async (): Promise<BannerResponse> =>
	await http.get(`/banner`);
