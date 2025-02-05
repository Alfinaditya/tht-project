import { getAuthToken } from '@/lib/utils';
import { Navigate, Outlet } from 'react-router-dom';

const EntryLayout = () => {
	if (getAuthToken()) {
		return <Navigate to="/" replace />;
	}
	return (
		<div className="flex items-center h-screen">
			<div className="w-full h-full">
				<Outlet />
			</div>
			<div className="w-full h-full">
				<img
					src="/assets/entry-img.png"
					alt="Entry Image"
					className="h-full w-full"
					loading="eager"
				/>
			</div>
		</div>
	);
};

export default EntryLayout;
