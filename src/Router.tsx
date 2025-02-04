import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login';
import DashboardLayout from './pages/layout/dashboard';
import HomePage from './pages/home';
import EntryLayout from './pages/layout/entry';
import RegisterPage from './pages/register';
import TopUpPage from './pages/top-up';
import ServiceDetails from './pages/service-details';
import TransactionPage from './pages/transaction';
import AccountPage from './pages/account';

const Router = () => {
	const router = createBrowserRouter([
		{
			id: 'dashboard',
			path: '/',
			element: <DashboardLayout />,
			children: [
				{
					index: true,
					element: <HomePage />,
				},
				{
					path: 'service/:id',
					element: <ServiceDetails />,
				},
				{
					path: 'top-up',
					element: <TopUpPage />,
				},
				{
					path: 'transaction',
					element: <TransactionPage />,
				},
				{
					path: 'account',
					element: <AccountPage />,
				},
			],
		},
		{
			id: 'entry',
			element: <EntryLayout />,
			children: [
				{
					path: 'login',
					element: <LoginPage />,
				},
				{
					path: 'register',
					element: <RegisterPage />,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
};
export default Router;
