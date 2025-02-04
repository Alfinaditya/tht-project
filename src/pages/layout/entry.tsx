import { getAuthToken } from '@/lib/utils';
import { Navigate, Outlet } from 'react-router-dom';

const EntryLayout = () => {
	if (getAuthToken()) {
		return <Navigate to="/" replace />;
	}
	return (
		<div className="flex items-center h-screen">
			<div className="w-full">
				<Outlet />
			</div>
			<img src="/assets/entry-img.png" alt="Entry Image" className="h-full" />
		</div>
	);
};

export default EntryLayout;
