import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { cn, getAuthToken } from '@/lib/utils';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
const LINKS = [
	{
		id: crypto.randomUUID(),
		label: 'Top Up',
		href: '/top-up',
	},
	{
		id: crypto.randomUUID(),
		label: 'Transaction',
		href: '/transaction',
	},
	{
		id: crypto.randomUUID(),
		label: 'Akun',
		href: '/account',
	},
];
const DashboardLayout = () => {
	const location = useLocation();
	if (!getAuthToken()) {
		return <Navigate to="/login" replace />;
	}

	return (
		<>
			<Toaster />
			<nav className="shadow-sm p-5 mb-10">
				<ul className="flex items-center">
					<li className="flex-1">
						<Link to="/" className="flex items-center gap-x-2 font-bold">
							<img src="/assets/brand.png" alt="Brand" />
							SIMS PPOB
						</Link>
					</li>
					{LINKS.map((link) => (
						<li key={link.id}>
							<Button
								variant="link"
								className={cn(
									'font-semibold',
									link.href === location.pathname
										? 'text-red-500'
										: 'text-black'
								)}
								asChild
							>
								<Link to={link.href}>{link.label}</Link>
							</Button>
						</li>
					))}
				</ul>
			</nav>
			<div className="p-10">
				<Outlet />
			</div>
		</>
	);
};

export default DashboardLayout;
