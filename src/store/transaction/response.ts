import { Response } from '@/types/api';

export type BalanceResponse = Response<{ balance: number }>;

export type PaidTransactionResponse = Response<{
	invoice_number: string;
	service_code: string;
	service_name: string;
	transaction_type: string;
	total_amount: number;
	created_on: string;
}>;

export type TransactionHistoryResponse = Response<{
	offset: number;
	limit: number;
	records: Array<{
		invoice_number: string;
		transaction_type: string;
		description: string;
		total_amount: number;
		created_on: string;
	}>;
}>;
