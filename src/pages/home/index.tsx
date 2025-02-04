import { useBanner, useService } from '@/api/information/queries';
import { BalanceCard } from '@/components/balance-card';
import { WelcomeProfile } from '@/components/welcome-profile';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const { isLoading: isServiceLoading, data: services } = useService();
	const { isLoading: isBannerLoading, data: banners } = useBanner();
	const navigate = useNavigate();
	return (
		<div>
			<WelcomeProfile />
			<BalanceCard />
			{services && (
				<div>
					{services.data.data.map((service) => (
						<div
							onClick={() => navigate(`/service/${service.service_code}`)}
							key={service.service_code}
							className="cursor-pointer"
						>
							<p>{service.service_name}</p>
						</div>
					))}
				</div>
			)}
			{banners && <div>{JSON.stringify(banners.data)}</div>}
		</div>
	);
};

export default HomePage;
