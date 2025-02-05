import { useInfiniteTransactionHistory } from '@/api/transaction/queries';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn, toRupiahFormat } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import TransactionListSkeleton from './transaction-list-skeleton';
import { WalletCards } from 'lucide-react';

const TransactionList = () => {
	const {
		data: infiniteData,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
		isLoading,
	} = useInfiniteTransactionHistory();

	const transactionHistoryRecords =
		infiniteData &&
		infiniteData.pages.map((page) => page.data.data.records).flat();
	return (
		<>
			<div className="space-y-8">
				{isLoading ? (
					<TransactionListSkeleton />
				) : (
					<>
						{transactionHistoryRecords &&
						transactionHistoryRecords.length > 0 ? (
							transactionHistoryRecords.map((transactionHistoryRecord) => {
								const isTopUp =
									transactionHistoryRecord.transaction_type === 'TOPUP';
								return (
									<Card
										key={transactionHistoryRecord.invoice_number}
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
												{toRupiahFormat(transactionHistoryRecord.total_amount)}
											</p>
											<p className="text-sm">
												{format(
													transactionHistoryRecord.created_on,
													'd MMMM y HH:m'
												)}{' '}
												WIB
												{/* {transactionHistoryRecord.created_on} */}
											</p>
										</div>
										<p>{transactionHistoryRecord.description}</p>
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
				{isFetchingNextPage && <TransactionListSkeleton />}
			</div>

			<div className="w-full mt-10 text-center">
				{isLoading ? (
					<Skeleton className="w-[150px] h-[20px] m-auto" />
				) : (
					<>
						{transactionHistoryRecords &&
							transactionHistoryRecords.length > 0 &&
							hasNextPage && (
								<Button
									className="m-auto"
									variant="link"
									onClick={() => fetchNextPage()}
									isLoading={isFetchingNextPage}
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
