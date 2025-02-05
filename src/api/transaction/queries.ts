import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { balance, transactionHistory } from './fetchers';
import { TransactionHistoryResponse } from './responses';
import { TRANSACTION_HISTORY_PAGE } from './common';

export enum QueryKeys {
	BALANCE = 'balance',
	TRANSACTION_HISTORY = 'transaction_history',
}

export const useBalance = () =>
	useQuery({
		queryKey: [QueryKeys.BALANCE],
		queryFn: () => balance(),
	});

export const useInfiniteTransactionHistory = () =>
	useInfiniteQuery<TransactionHistoryResponse, Error>({
		queryKey: [QueryKeys.TRANSACTION_HISTORY],
		gcTime: 0,
		queryFn: async ({ pageParam }) =>
			transactionHistory({
				limit: TRANSACTION_HISTORY_PAGE,
				offset: pageParam as number,
			}),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			const lastPageItem = lastPage.data;
			if (
				lastPageItem &&
				lastPageItem.data.records.length < TRANSACTION_HISTORY_PAGE
			) {
				return;
			}
			return Number(lastPageItem.data.offset) + Number(lastPageItem.data.limit);
		},
	});
