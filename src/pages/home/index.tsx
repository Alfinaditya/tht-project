import { useBanner, useService } from '@/api/information/queries';
import { useProfile } from '@/api/profile/queries';
import { BalanceCard } from '@/components/balance-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';

const HomePage = () => {
	const { isLoading: isProfileLoading, data: profile } = useProfile();
	const { isLoading: isServiceLoading, data: services } = useService();
	const { isLoading: isBannerLoading, data: banners } = useBanner();
	return (
		<div>
			<Button onClick={() => Cookies.remove('sid')}>Logout</Button>
			{profile && (
				<>
					<Avatar>
						<AvatarImage src={profile.data.data.profile_image} />
						<AvatarFallback>
							{profile.data.data.first_name} {profile.data.data.last_name}
						</AvatarFallback>
					</Avatar>
					<p>
						Selamat Datang {profile.data.data.first_name}{' '}
						{profile.data.data.last_name}
					</p>
				</>
			)}
			<BalanceCard />
			{services && <div>{JSON.stringify(services.data)}</div>}
			{banners && <div>{JSON.stringify(banners.data)}</div>}
		</div>
	);
};

export default HomePage;
