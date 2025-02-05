import TransactionList from './components/transaction-list';
import { WelcomeProfile } from '@/components/welcome-profile';
import { BalanceCard } from '@/components/balance-card';

const TransactionPage = () => {
	return (
		<div className="w-[90%] m-auto ">
			<div className="flex mb-10">
				<WelcomeProfile className="w-1/2" />
				<BalanceCard className="w-1/2" />
			</div>
			<TransactionList />
		</div>
	);
};

export default TransactionPage;
