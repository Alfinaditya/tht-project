import http from '@/lib/http';
import {
	BalanceResponse,
	PaidTransactionResponse,
	TransactionHistoryResponse,
} from './responses';
import {
	PaidTransactionInput,
	TopUpInput,
	TransactionHistoryInput,
} from './dto';

export const balance = async (): Promise<BalanceResponse> =>
	await http.get(`/balance`);

export const topUp = async (data: TopUpInput): Promise<BalanceResponse> =>
	await http.post(`/topup`, {
		top_up_amount: data.top_up_amount,
	} as typeof data);

export const paidTransaction = async (
	data: PaidTransactionInput
): Promise<PaidTransactionResponse> =>
	await http.post(`/transaction`, {
		service_code: data.service_code,
	} as typeof data);

export const transactionHistory = async (
	data: TransactionHistoryInput
): Promise<TransactionHistoryResponse> =>
	await http.get(`/transaction/history`, {
		params: { limit: data.limit, offset: data.offset } as typeof data,
	});
