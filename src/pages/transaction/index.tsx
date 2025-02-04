import { useInfiniteTransactionHistory } from '@/api/transaction/queries';
import { BalanceCard } from '@/components/balance-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { WelcomeProfile } from '@/components/welcome-profile';
import { format } from 'date-fns';
import { cn, toRupiahFormat } from '@/lib/utils';

const TransactionPage = () => {
	const {
		data: infiniteData,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteTransactionHistory();
	const transactionHistoryRecords =
		infiniteData &&
		infiniteData.pages.map((page) => page.data.data.records).flat();
	return (
		<div className="w-[90%] m-auto ">
			<div className="flex mb-10">
				<WelcomeProfile className="w-1/2" />
				<BalanceCard className="w-1/2" />
			</div>
			{hasNextPage ? 'Has Next Page' : 'NO Pages'}
			<div className="space-y-8">
				{transactionHistoryRecords &&
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
					})}
			</div>

			<div className="w-full mt-10 text-center">
				<Button
					className="m-auto"
					variant="link"
					onClick={() => fetchNextPage()}
					isLoading={isFetchingNextPage}
				>
					Load More
				</Button>
			</div>
		</div>
	);
};

export default TransactionPage;
