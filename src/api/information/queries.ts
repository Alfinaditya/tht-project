import { useQuery } from '@tanstack/react-query';
import { banner, service } from './fetchers';

export enum QueryKeys {
	SERVICE = 'service',
	BANNER = 'banner',
}

export const useService = () =>
	useQuery({
		queryKey: [QueryKeys.SERVICE],
		queryFn: () => service(),
	});

export const useBanner = () =>
	useQuery({
		queryKey: [QueryKeys.BANNER],
		queryFn: () => banner(),
	});
