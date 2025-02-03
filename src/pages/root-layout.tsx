import { Outlet } from 'react-router-dom';

const RootLayout = () => {
	return (
		<div className="mt-10">
			<Outlet />
		</div>
	);
};

export default RootLayout;
