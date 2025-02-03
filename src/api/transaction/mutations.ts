import { useMutation } from '@tanstack/react-query';
import { paidTransaction, topUp } from './fetchers';
import { PaidTransactionInput, TopUpInput } from './dto';

export const useTopUpMutation = () => {
	return useMutation({
		mutationFn: async (data: TopUpInput) =>
			topUp({
				top_up_amount: data.top_up_amount,
			}),
	});
};

export const usePaidTransactionMutation = () => {
	return useMutation({
		mutationFn: async (data: PaidTransactionInput) =>
			paidTransaction({
				service_code: data.service_code,
			}),
	});
};
