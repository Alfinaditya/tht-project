import EditProfileSection from './components/edit-profile-section';
import EditProfileSkeleton from './components/edit-profile-skeleton';
import EditAvatarSection from './components/edit-avatar-section';
import { useGetProfileQuery } from '@/store/profile/slice';

const AccountPage = () => {
	const { data: profile, isLoading } = useGetProfileQuery();
	return (
		<div className="w-[70%] m-auto">
			{isLoading ? (
				<EditProfileSkeleton />
			) : (
				<>
					{profile && (
						<>
							<EditAvatarSection profile={profile} />
							<EditProfileSection profile={profile} />
						</>
					)}
				</>
			)}
		</div>
	);
};

export default AccountPage;
