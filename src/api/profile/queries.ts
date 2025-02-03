import { useQuery } from '@tanstack/react-query';
import { profile } from './fetchers';

export enum QueryKeys {
	PROFILE = 'profile',
}

export const useProfile = () =>
	useQuery({
		queryKey: [QueryKeys.PROFILE],
		queryFn: () => profile(),
	});
