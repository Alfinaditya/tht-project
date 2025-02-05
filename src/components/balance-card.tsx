import { Card } from './ui/card';
import { Button } from './ui/button';
import { cn, toRupiahFormat } from '@/lib/utils';
import React from 'react';
import { Eye } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { useGetBalanceQuery } from '@/store/transaction/slice';

const BalanceCard = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const [showBalance, setShowBalance] = React.useState(false);
	const { isLoading: isBalanceLoading, data: balance } = useGetBalanceQuery();
	return (
		<Card
			ref={ref}
			className={cn('bg-primary text-white p-5', className)}
			{...props}
		>
			{isBalanceLoading ? (
				<div className="flex flex-col justify-between h-full">
					<Skeleton className="w-[20%] h-[24px] bg-secondary" />
					<Skeleton className="w-[50%] h-[48px] my-4 bg-secondary" />
					<Skeleton className="w-[25%] h-[40px] bg-secondary" />
				</div>
			) : (
				<>
					<p>Saldo anda</p>
					{balance && (
						<p className="text-5xl my-4">
							{showBalance ? toRupiahFormat(balance.data.balance) : '• • • • •'}
						</p>
					)}
					<Button
						variant="link"
						onClick={() =>
							!isBalanceLoading && setShowBalance((showBalance) => !showBalance)
						}
						className="text-white px-0"
					>
						{showBalance ? 'Tutup' : 'Lihat'} Saldo <Eye />
					</Button>
				</>
			)}
		</Card>
	);
});
BalanceCard.displayName = 'BalanceCard';

export { BalanceCard };
