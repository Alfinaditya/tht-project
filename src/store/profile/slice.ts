import fetchQuery from '@/lib/http';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ProfileResponse } from './response';
import { UpdateImageProfileInput, UpdateProfileInput } from './dto';

export const MAX_UPLOAD_IMAGE_SIZE = 102400;

export const profileApiSlice = createApi({
	reducerPath: 'profile',
	baseQuery: fetchQuery,
	tagTypes: ['PROFILE'],
	endpoints: (builder) => {
		return {
			getProfile: builder.query<ProfileResponse, void>({
				query: () => `/profile`,
			}),
			updateProfile: builder.mutation<ProfileResponse, UpdateProfileInput>({
				query: (data) => ({
					url: '/profile/update',
					method: 'PUT',
					body: data,
				}),
			}),
			updateImageProfile: builder.mutation<
				ProfileResponse,
				UpdateImageProfileInput
			>({
				query: (data) => {
					const formData = new FormData();
					formData.append('file', data.file);

					return {
						url: '/profile/image',
						method: 'PUT',
						body: formData, // Directly return the `FormData` object
					};
				},
			}),
		};
	},
});

export const {
	useUpdateProfileMutation,
	useUpdateImageProfileMutation,
	useGetProfileQuery,
} = profileApiSlice;
