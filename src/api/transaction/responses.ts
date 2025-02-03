import { Response } from '../types';

export type BalanceResponse = Response<{ balance: number }>;

export type PaidTransactionResponse = Response<{
	invoice_number: string;
	service_code: string;
	service_name: string;
	transaction_type: string;
	total_amount: number;
	created_on: string;
}>;
