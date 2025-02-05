import { TRANSACTION_HISTORY_PAGE } from '@/api/transaction/common';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const TransactionListSkeleton = () => {
	return (
		<>
			{Array.from(Array(TRANSACTION_HISTORY_PAGE).keys()).map((i) => (
				<Card key={i} className="flex justify-between items-center p-5">
					<div className="space-y-2 w-full">
						<Skeleton className="w-[15%] h-[32px]" />
						<Skeleton className="w-[25%] h-[20px]" />
					</div>
					<Skeleton className="w-[20%] h-[24px]" />
				</Card>
			))}
		</>
	);
};

export default TransactionListSkeleton;
