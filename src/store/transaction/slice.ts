import fetchQuery from '@/lib/http';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
	BalanceResponse,
	PaidTransactionResponse,
	TransactionHistoryResponse,
} from './response';
import {
	PaidTransactionInput,
	TopUpInput,
	TransactionHistoryInput,
} from './dto';

export const TRANSACTION_HISTORY_PAGE = 5;

export const transactionApiSlice = createApi({
	reducerPath: 'transaction',
	baseQuery: fetchQuery,
	tagTypes: ['TRANSACTION'],
	endpoints: (builder) => {
		return {
			getBalance: builder.query<BalanceResponse, void>({
				query: () => `/balance`,
			}),
			getTransactionHistory: builder.query<
				TransactionHistoryResponse,
				TransactionHistoryInput
			>({
				query: ({ offset }) =>
					`/transaction/history?limit=${TRANSACTION_HISTORY_PAGE}&offset=${offset}`,

				serializeQueryArgs: ({ endpointName }) => {
					return endpointName;
				},
				merge: (currentCache, newItems) => {
					console.log('@@ new items', newItems);
					return {
						...currentCache,
						data: {
							limit: newItems.data.limit,
							offset: newItems.data.offset,
							records: [...currentCache.data.records, ...newItems.data.records],
							has_next_page:
								Number(newItems.data.records.length) ===
								Number(TRANSACTION_HISTORY_PAGE),
						},
					};
				},
				forceRefetch({ currentArg, previousArg }) {
					return currentArg !== previousArg;
				},
				providesTags: ['TRANSACTION'],
			}),
			topUp: builder.mutation<BalanceResponse, TopUpInput>({
				query: (data) => ({
					url: '/topup',
					method: 'POST',
					body: data,
				}),
			}),
			paidTransaction: builder.mutation<
				PaidTransactionResponse,
				PaidTransactionInput
			>({
				query: (data) => ({
					url: '/transaction',
					method: 'POST',
					body: data,
				}),
			}),
		};
	},
});

export const {
	useGetBalanceQuery,
	useGetTransactionHistoryQuery,
	useTopUpMutation,
	usePaidTransactionMutation,
} = transactionApiSlice;
