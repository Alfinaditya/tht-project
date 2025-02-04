import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { useProfile } from '@/api/profile/queries';

const WelcomeProfile = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
	const { isLoading: isProfileLoading, data: profile } = useProfile();
	return (
		<div ref={ref} {...props}>
			{profile && (
				<>
					<Avatar className="w-[60px] h-[60px] mb-2">
						<AvatarImage
							src={profile.data.data.profile_image}
							className="object-cover"
						/>
						<AvatarFallback>
							{profile.data.data.first_name} {profile.data.data.last_name}
						</AvatarFallback>
					</Avatar>
					<p className="mb-1">Selamat Datang,</p>
					<p className="text-2xl font-medium">
						{profile.data.data.first_name} {profile.data.data.last_name}
					</p>
				</>
			)}
		</div>
	);
});
WelcomeProfile.displayName = 'WelcomeProfile';

export { WelcomeProfile };
