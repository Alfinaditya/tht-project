import { z } from 'zod';

export const TopUpSchema = z.object({
	top_up_amount: z
		.string()
		.min(1, 'Jumlah top up tidak boleh kosong')
		.refine((val) => {
			const numericValue = Number(val.replace(/\D/g, ''));
			return numericValue >= 10_000;
		}, 'Jumlah top up minimal Rp 10.000')
		.refine((val) => {
			const numericValue = Number(val.replace(/\D/g, ''));
			return numericValue <= 1_000_000;
		}, 'Jumlah top up maximum 1.000.000'),
});

export type TopUpInput = z.infer<typeof TopUpSchema>;

export interface PaidTransactionInput {
	service_code: string;
}

export interface TransactionHistoryInput {
	offset: number;
	limit: number;
}
