import axios, { HttpStatusCode } from 'axios';
import { BASE_URL } from './constants';
import Cookies from 'js-cookie';

const http = axios.create({
	baseURL: BASE_URL,
	// headers: {
	// 	'Accept-Encoding': 'gzip, deflate, br',
	// },
});

// Request Interceptor for Adding Authorization Header
http.interceptors.request.use(
	async (config) => {
		try {
			const session = await Cookies.get('sid');
			if (session) {
				config.headers.Authorization = `Bearer ${session}`;
			} else {
				delete config.headers.Authorization;
			}
		} catch (error) {
			console.error('Error fetching session:', error);
		}
		return config;
	},
	(error) => {
		console.error('Request Interceptor Error:', error);
		return Promise.reject(error);
	}
);

// Response Interceptor for Handling Errors
http.interceptors.response.use(
	(response) => response,
	async (error) => {
		const statusCode = error.response?.status || null;

		if (statusCode === HttpStatusCode.Unauthorized) {
			Cookies.remove('sid');
			window.location.replace('/login');
		}

		if (statusCode === HttpStatusCode.Forbidden) {
			throw new Error(`Forbidden. You don't have access to this resource.`);
			// Optional: Add custom logic for 403 errors.
		}

		if (!error.response) {
			console.error('Network error or server not reachable.');
		}

		return Promise.reject(error);
	}
);

export default http;
