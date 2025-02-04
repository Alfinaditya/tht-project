import { Card, CardContent } from './ui/card';
import { useBalance } from '@/api/transaction/queries';
import { Button } from './ui/button';
import { cn, toRupiahFormat } from '@/lib/utils';
import React from 'react';
import { Eye } from 'lucide-react';

const BalanceCard = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const [showBalance, setShowBalance] = React.useState(false);
	const { isLoading: isBalanceLoading, data: balance } = useBalance();
	return (
		<Card
			ref={ref}
			className={cn('bg-primary text-white p-5', className)}
			{...props}
		>
			<p>Saldo anda</p>
			{balance && (
				<p className="text-5xl my-4">
					{showBalance
						? toRupiahFormat(balance.data.data.balance)
						: '• • • • •'}
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
		</Card>
	);
});
BalanceCard.displayName = 'BalanceCard';

export { BalanceCard };
