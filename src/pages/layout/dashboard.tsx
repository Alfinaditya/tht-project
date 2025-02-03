import { cn, getAuthToken } from '@/lib/utils';
import { Navigate, NavLink, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
	if (!getAuthToken()) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div>
			<ul>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink
						to="/top-up"
						className={({ isActive }) => cn(isActive && 'text-red-500')}
					>
						Top Up
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/transaction"
						className={({ isActive }) => cn(isActive && 'text-red-500')}
					>
						Transaction
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/account"
						className={({ isActive }) => cn(isActive && 'text-red-500')}
					>
						Akun
					</NavLink>
				</li>
			</ul>
			<Outlet />
		</div>
	);
};

export default DashboardLayout;
