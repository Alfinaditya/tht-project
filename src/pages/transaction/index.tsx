import { useInfiniteTransactionHistory } from '@/api/transaction/queries';
import { BalanceCard } from '@/components/balance-card';
import { Button } from '@/components/ui/button';
import { WelcomeProfile } from '@/components/welcome-profile';

const TransactionPage = () => {
	const {
		data: infiniteData,
		isPending,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteTransactionHistory();
	const transactionHistoryRecords =
		infiniteData &&
		infiniteData.pages.map((page) => page.data.data.records).flat();
	return (
		<div>
			<WelcomeProfile />
			<BalanceCard />
			{hasNextPage ? 'Has Next Page' : 'NO Pages'}
			{transactionHistoryRecords &&
				transactionHistoryRecords.map((transactionHistoryRecord) => (
					<div
						key={transactionHistoryRecord.invoice_number}
						className="flex gap-x-2"
					>
						<p>{transactionHistoryRecord.invoice_number}</p>
						<p>{transactionHistoryRecord.total_amount}</p>
					</div>
				))}
			<Button onClick={() => fetchNextPage()}>Load More</Button>
		</div>
	);
};

export default TransactionPage;
