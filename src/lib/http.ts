import {
	BaseQueryApi,
	FetchArgs,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './constants';
import Cookies from 'js-cookie';
import { getAuthToken } from './utils';

// Enhancing the baseQuery with custom error handling
const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	prepareHeaders: (headers) => {
		headers.set('Authorization', `Bearer ${getAuthToken()}`);
		return headers;
	},
});

const fetchQuery = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: {}
) => {
	const result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		// Handle the 401 error here, e.g., redirecting to login
		Cookies.remove('sid');
		window.location.href = '/login';
		// Or dispatch an action to log out the user, etc.
		// api.dispatch(logoutUser());
	}
	return result;
};

export default fetchQuery;
