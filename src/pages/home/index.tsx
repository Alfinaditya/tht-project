import { BalanceCard } from '@/components/balance-card';
import { WelcomeProfile } from '@/components/welcome-profile';
import BannerSection from './components/banner-section';
import ServiceSection from './components/service-section';

const HomePage = () => {
	return (
		<>
			<div className="w-[90%] m-auto ">
				<div className="flex mb-10">
					<WelcomeProfile className="w-1/2" />
					<BalanceCard className="w-1/2" />
				</div>
				<ServiceSection />
				<h1 className="font-semibold">Temukan promo menarik</h1>
			</div>
			<BannerSection />
		</>
	);
};

export default HomePage;
