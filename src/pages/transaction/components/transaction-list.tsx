import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import TransactionListSkeleton from './transaction-list-skeleton';
import {
	TRANSACTION_HISTORY_PAGE,
	useGetTransactionHistoryQuery,
} from '@/store/transaction/slice';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { cn, toRupiahFormat } from '@/lib/utils';
import { WalletCards } from 'lucide-react';
import { TransactionHistoryResponse } from '@/store/transaction/response';

const TransactionList = () => {
	const [offset, setOffset] = useState(0);

	const { data, isLoading, isFetching } = useGetTransactionHistoryQuery(
		{ offset },
		{
			selectFromResult: (result) => ({
				...result,
				data: result.data
					? {
							...result.data,
							data: {
								...result.data?.data,
								has_next_page:
									Number(result.data?.data.offset) === 0
										? Number(result.data?.data.records.length) ===
										  Number(TRANSACTION_HISTORY_PAGE)
										: Boolean(result.data?.data.has_next_page),
							},
					  }
					: undefined,
			}),
		}
	);
	const transactionHistories = data as TransactionHistoryResponse;

	return (
		<>
			<div className="space-y-8">
				{isLoading ? (
					<TransactionListSkeleton />
				) : (
					<>
						{transactionHistories &&
						transactionHistories.data.records.length > 0 ? (
							transactionHistories.data.records.map((transactionHistory) => {
								const isTopUp = transactionHistory.transaction_type === 'TOPUP';
								return (
									<Card
										key={transactionHistory.invoice_number}
										className="flex justify-between items-center p-5"
									>
										<div className="space-y-2">
											<p
												className={cn(
													'text-2xl',
													isTopUp ? 'text-green-500' : 'text-red-500'
												)}
											>
												{isTopUp ? '+' : '-'}{' '}
												{toRupiahFormat(transactionHistory.total_amount)}
											</p>
											<p className="text-sm">
												{format(transactionHistory.created_on, 'd MMMM y HH:m')}{' '}
												WIB
											</p>
										</div>
										<p>{transactionHistory.description}</p>
									</Card>
								);
							})
						) : (
							<>
								<div className="flex flex-col justify-center gap-y-5 w-60 m-auto  mt-20">
									<div className="w-20 h-20 mx-auto bg-gray-50 rounded-full shadow-sm justify-center items-center inline-flex">
										<WalletCards className="text-primary w-8 h-8" />
									</div>
									<h2 className="text-center text-black text-base font-semibold leading-relaxed pb-1">
										Tidak Ada Transaksi
									</h2>
								</div>
							</>
						)}
					</>
				)}
				{isFetching && <TransactionListSkeleton />}
			</div>

			<div className="w-full mt-10 text-center">
				{isLoading ? (
					<Skeleton className="w-[150px] h-[20px] m-auto" />
				) : (
					<>
						{transactionHistories &&
							transactionHistories.data.has_next_page && (
								<Button
									className="m-auto"
									variant="link"
									onClick={() => {
										if (
											transactionHistories &&
											transactionHistories.data.records.length > 0
										) {
											console.log('clicked');
											setOffset(
												Number(
													Number(transactionHistories.data.limit) +
														Number(transactionHistories.data.offset)
												)
											);
										}
									}}
									isLoading={isFetching}
								>
									Load More
								</Button>
							)}
					</>
				)}
			</div>
		</>
	);
};

export default TransactionList;
