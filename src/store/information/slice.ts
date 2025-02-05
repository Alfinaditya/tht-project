import fetchQuery from '@/lib/http';
import { createApi } from '@reduxjs/toolkit/query/react';
import { BannerResponse, ServiceResponse } from './response';

export const informationApiSlice = createApi({
	reducerPath: 'information',
	baseQuery: fetchQuery,
	tagTypes: ['INFORMATION'],
	endpoints: (builder) => {
		return {
			getService: builder.query<ServiceResponse, void>({
				query: () => `/services`,
			}),
			getBanner: builder.query<BannerResponse, void>({
				query: () => `/banner`,
			}),
		};
	},
});

export const { useGetServiceQuery, useGetBannerQuery } = informationApiSlice;
