import { useProfile } from '@/api/profile/queries';
import EditProfileSection from './components/edit-profile-section';
import EditProfileSkeleton from './components/edit-profile-skeleton';
import EditAvatarSection from './components/edit-avatar-section';

const AccountPage = () => {
	const { data: profile, isLoading } = useProfile();
	return (
		<div className="w-[90%] m-auto">
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
