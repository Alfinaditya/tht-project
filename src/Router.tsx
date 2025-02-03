import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/root-layout';
import LoginPage from './pages/login';

const Router = () => {
	const router = createBrowserRouter([
		{
			id: 'root',
			path: '/',
			element: <RootLayout />,
			children: [
				{
					path: '/',
					element: <LoginPage />,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
};
export default Router;
