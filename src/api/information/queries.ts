import { useQuery } from '@tanstack/react-query';
import { banner, service } from './fetchers';

export enum QueryKeys {
	SERVICE = 'service',
	BANNER = 'banner',
}

export const useService = ({ enabled = true }: { enabled?: boolean } = {}) =>
	useQuery({
		queryKey: [QueryKeys.SERVICE],
		queryFn: () => service(),
		enabled: enabled,
	});

export const useBanner = () =>
	useQuery({
		queryKey: [QueryKeys.BANNER],
		queryFn: () => banner(),
	});
