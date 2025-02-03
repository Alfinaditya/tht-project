import { useQuery } from '@tanstack/react-query';
import { balance } from './fetchers';

export enum QueryKeys {
	BALANCE = 'balance',
}

export const useBalance = () =>
	useQuery({
		queryKey: [QueryKeys.BALANCE],
		queryFn: () => balance(),
	});
