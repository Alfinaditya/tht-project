import { Response } from '../types';

export type ServiceResponse = Response<
	Array<{
		service_code: string;
		service_name: string;
		service_icon: string;
		service_tariff: number;
	}>
>;

export type BannerResponse = Response<
	Array<{
		banner_name: string;
		banner_image: string;
		description: string;
	}>
>;
