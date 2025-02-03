import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { useProfile } from '@/api/profile/queries';

const WelcomeProfile = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { isLoading: isProfileLoading, data: profile } = useProfile();
	return (
		<div>
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
		</div>
	);
});
WelcomeProfile.displayName = 'WelcomeProfile';

export { WelcomeProfile };
