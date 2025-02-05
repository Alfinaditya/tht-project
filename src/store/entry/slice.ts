import fetchQuery from '@/lib/http';
import { Response } from '@/types/api';
import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginInput } from './dto';

export const entryApiSlice = createApi({
	reducerPath: 'entry',
	baseQuery: fetchQuery,
	tagTypes: ['ENTRY'],
	endpoints: (builder) => {
		return {
			login: builder.mutation<Response<{ token: string }>, LoginInput>({
				query: (post) => ({
					url: '/login',
					method: 'POST',
					body: post,
				}),
			}),
		};
	},
});

export const { useLoginMutation } = entryApiSlice;
