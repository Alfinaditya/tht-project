import { Card, CardContent } from './ui/card';
import { useBalance } from '@/api/transaction/queries';
import { Button } from './ui/button';
import { toRupiahFormat } from '@/lib/utils';
import React from 'react';

const BalanceCard = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const [showBalance, setShowBalance] = React.useState(false);
	const { isLoading: isBalanceLoading, data: balance } = useBalance();
	return (
		<Card ref={ref} className={className} {...props}>
			<CardContent>
				{balance && (
					<p>
						Balance :{' '}
						{showBalance
							? toRupiahFormat(balance.data.data.balance)
							: '* * * *'}
					</p>
				)}
				<Button
					variant="ghost"
					onClick={() =>
						!isBalanceLoading && setShowBalance((showBalance) => !showBalance)
					}
				>
					Lihat Saldo
				</Button>
			</CardContent>
		</Card>
	);
});
BalanceCard.displayName = 'BalanceCard';

export { BalanceCard };
