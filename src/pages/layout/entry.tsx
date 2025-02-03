import { getAuthToken } from '@/lib/utils';
import { Navigate, Outlet } from 'react-router-dom';

const EntryLayout = () => {
	if (getAuthToken()) {
		return <Navigate to="/" replace />;
	}
	return (
		<div>
			EntryLayout <Outlet />
		</div>
	);
};

export default EntryLayout;
