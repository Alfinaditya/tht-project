import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import Cookies from 'js-cookie';
import { AtSign, User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useUpdateProfileMutation } from '@/api/profile/mutations';
import { UpdateProfileInput, UpdateProfileSchema } from '@/api/profile/dto';
import { ProfileResponse } from '@/api/profile/responses';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ExceptionResponse } from '@/api/types';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
	profile: ProfileResponse;
}

const EditProfileSection: React.FC<Props> = ({ profile }) => {
	const [customErrorMessage, setCustomErrorMessage] = useState('');
	const [isUpdateProfile, setIsUpdateProfile] = useState(false);
	const {
		mutateAsync: updateProfileMutateAsync,
		isError: isUpdateProfileError,
		isPending: isUpdateProfilePending,
	} = useUpdateProfileMutation();
	const navigate = useNavigate();

	const form = useForm<UpdateProfileInput>({
		resolver: zodResolver(UpdateProfileSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
		},
	});
	const onSubmit = async (data: UpdateProfileInput) => {
		try {
			await updateProfileMutateAsync({
				first_name: data.first_name,
				last_name: data.last_name,
			});
			setIsUpdateProfile(false);
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const err: ExceptionResponse = error;
				setCustomErrorMessage(err.response?.data.message as string);
				return;
			}
		}
	};

	useEffect(() => {
		if (profile) {
			form.setValue('first_name', profile.data.data.first_name);
			form.setValue('last_name', profile.data.data.last_name);
		}
	}, [profile]);
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="space-y-2">
					<Label>Email</Label>
					<Input
						startAdornment={<AtSign className="w-4" />}
						disabled
						defaultValue={profile.data.data.email}
					/>
				</div>
				<FormField
					control={form.control}
					name="first_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama Depan</FormLabel>
							<FormControl>
								<Input
									maxLength={255}
									placeholder="Masukan nama awal anda"
									readOnly={!isUpdateProfile}
									startAdornment={<User className="w-4" />}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="last_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama Belakang</FormLabel>
							<FormControl>
								<Input
									maxLength={255}
									readOnly={!isUpdateProfile}
									startAdornment={<User className="w-4" />}
									placeholder="Masukan nama akhir anda"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{isUpdateProfile ? (
					<div className="flex-col gap-y-5 flex">
						<Button
							key={'save-button'}
							disabled={isUpdateProfilePending}
							type="submit"
						>
							Simpan
						</Button>
						<Button
							variant="outline"
							key={'back-button'}
							disabled={isUpdateProfilePending}
							type="button"
							onClick={() => setIsUpdateProfile(false)}
						>
							Kembali
						</Button>
					</div>
				) : (
					<div className="flex-col gap-y-5 flex">
						<Button
							key={'edit-profile-button'}
							type="button"
							onClick={() => setIsUpdateProfile(true)}
						>
							Edit Profile
						</Button>
						<Button
							key={'logout-button'}
							variant="outline"
							type="button"
							onClick={() => {
								Cookies.remove('sid');
								navigate('/login');
							}}
						>
							Logout
						</Button>
					</div>
				)}
			</form>
		</Form>
	);
};

export default EditProfileSection;
