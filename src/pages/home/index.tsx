import { useBanner, useService } from '@/api/information/queries';
import { BalanceCard } from '@/components/balance-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WelcomeProfile } from '@/components/welcome-profile';
import { Scrollbar } from '@radix-ui/react-scroll-area';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const { isLoading: isServiceLoading, data: services } = useService();
	const { isLoading: isBannerLoading, data: banners } = useBanner();
	const navigate = useNavigate();
	return (
		<>
			<div className="w-[90%] m-auto ">
				<div className="flex mb-10">
					<WelcomeProfile className="w-1/2" />
					<BalanceCard className="w-1/2" />
				</div>
				{services && (
					<div className="flex gap-x-10 mb-20">
						{services.data.data.map((service) => (
							<div
								onClick={() => navigate(`/service/${service.service_code}`)}
								key={service.service_code}
								className="cursor-pointer w-[70px] transition-all hover:scale-125"
							>
								<img src={service.service_icon} alt="" />
								<p className="w-full break-words text-xs text-center mt-2 font-medium">
									{service.service_name}
								</p>
							</div>
						))}
					</div>
				)}
				<h1>Temukan promo menarik</h1>
			</div>
			<div className="w-full">
				{banners && (
					<ScrollArea className="w-full whitespace-nowrap">
						<div className="flex w-max space-x-10 p-4">
							{banners.data.data.map((banner, i) => (
								<figure key={i} className="shrink-0">
									<div className="overflow-hidden rounded-md">
										<img src={banner.banner_image} alt={banner.banner_name} />
									</div>
								</figure>
							))}
						</div>
						<Scrollbar orientation="horizontal" />
					</ScrollArea>
				)}
			</div>
		</>
	);
};

export default HomePage;
