import { getAuthToken } from '@/lib/utils';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
	return (
		<div>
			<h1>Root Layout</h1>
			<Outlet />
		</div>
	);
};

export default RootLayout;
