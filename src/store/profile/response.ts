import { Response } from '@/types/api';

export type ProfileResponse = Response<{
	email: string;
	first_name: string;
	last_name: string;
	profile_image: string;
}>;
