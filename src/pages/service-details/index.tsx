import { BalanceCard } from '@/components/balance-card';
import PaidTransactionForm from './components/paid-transaction-form';
import { WelcomeProfile } from '@/components/welcome-profile';

const ServiceDetails = () => {
	return (
		<div className="w-[90%] m-auto ">
			<div className="flex mb-10">
				<WelcomeProfile className="w-1/2" />
				<BalanceCard className="w-1/2" />
			</div>
			<p>Pembayaran</p>
			<PaidTransactionForm />
		</div>
	);
};

export default ServiceDetails;
