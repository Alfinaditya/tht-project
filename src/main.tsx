import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './Router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';

// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		mutations: {
// 			retry: 0,
// 		},
// 		queries: {
// 			refetchOnWindowFocus: false,
// 		},
// 	},
// });

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<Router />
	</Provider>
);
