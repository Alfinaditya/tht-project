import fetchQuery from '@/lib/http';
import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginInput, RegisterInput } from './dto';
import { LoginResponse, RegisterResponse } from './response';

export const entryApiSlice = createApi({
	reducerPath: 'entry',
	baseQuery: fetchQuery,
	tagTypes: ['ENTRY'],
	endpoints: (builder) => {
		return {
			login: builder.mutation<LoginResponse, LoginInput>({
				query: (data) => ({
					url: '/login',
					method: 'POST',
					body: data,
				}),
			}),
			register: builder.mutation<RegisterResponse, RegisterInput>({
				query: (data) => ({
					url: '/registration',
					method: 'POST',
					body: data,
				}),
			}),
		};
	},
});

export const { useLoginMutation, useRegisterMutation } = entryApiSlice;
