import { UpdateProfileInput, UpdateProfileSchema } from '@/api/profile/dto';
import {
	useUpdateImageProfileMutation,
	useUpdateProfileMutation,
} from '@/api/profile/mutations';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useProfile } from '@/api/profile/queries';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MAX_UPLOAD_IMAGE_SIZE } from '@/api/profile/common';
import axios from 'axios';
import { ExceptionResponse } from '@/api/types';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AtSign, Pencil, User } from 'lucide-react';
import { Label } from '@/components/ui/label';

const AccountPage = () => {
	const [isUpdateProfile, setIsUpdateProfile] = useState(false);
	const [customErrorMessage, setCustomErrorMessage] = useState('');
	const [newImage, setNewImage] = useState('');
	const { data: profile } = useProfile();
	const navigate = useNavigate();
	const inputFileRef = useRef<HTMLInputElement>(null);
	const {
		mutateAsync: updateProfileMutateAsync,
		isError: isUpdateProfileError,
		isPending: isUpdateProfilePending,
	} = useUpdateProfileMutation();

	const {
		mutateAsync: updateImageProfileMutateAsync,
		isError: isUpdateImageProfileError,
		isPending: isUpdateImageProfilePending,
	} = useUpdateImageProfileMutation();

	const form = useForm<UpdateProfileInput>({
		resolver: zodResolver(UpdateProfileSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
		},
	});

	useEffect(() => {
		if (profile) {
			form.setValue('first_name', profile.data.data.first_name);
			form.setValue('last_name', profile.data.data.last_name);
		}
	}, [profile]);

	const onSubmit = async (data: UpdateProfileInput) => {
		alert(data);
		// try {
		// 	await updateProfileMutateAsync({
		// 		first_name: data.first_name,
		// 		last_name: data.last_name,
		// 	});
		// 	setIsUpdateProfile(false);
		// } catch (error: any) {
		// 	if (axios.isAxiosError(error)) {
		// 		const err: ExceptionResponse = error;
		// 		setCustomErrorMessage(err.response?.data.message as string);
		// 		return;
		// 	}
		// }
	};

	const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			if (file.size > MAX_UPLOAD_IMAGE_SIZE) {
				alert(
					'File size must be 100KB or less (max 102,400 bytes). Please select a smaller file.'
				);
				return;
			}
			try {
				const res = await updateImageProfileMutateAsync({
					file: file,
				});
				setNewImage(res.data.data.profile_image);
			} catch (error: any) {
				if (axios.isAxiosError(error)) {
					const err: ExceptionResponse = error;
					setCustomErrorMessage(err.response?.data.message as string);
					return;
				}
			}
		}
	};

	if (!profile) {
		return <></>;
	}
	return (
		<div className="w-[90%] m-auto">
			{isUpdateImageProfileError && <p>{customErrorMessage}</p>}
			{isUpdateProfileError && <p>{customErrorMessage}</p>}
			<div className="relative w-min m-auto mb-10">
				<Avatar className="w-[120px] h-[120px] border-primary">
					<AvatarImage
						className="object-cover"
						src={newImage ? newImage : profile.data.data.profile_image}
					/>
					<AvatarFallback>
						{profile.data.data.first_name} {profile.data.data.last_name}
					</AvatarFallback>
				</Avatar>
				<Button
					size="icon"
					variant="outline"
					className="rounded-full absolute right-0 bottom-0"
					onClick={() => inputFileRef.current?.click()}
				>
					<Pencil />
				</Button>
				<Input
					type="file"
					ref={inputFileRef}
					multiple={false}
					onChange={handleChangeAvatar}
					accept="image/*"
					className="hidden"
				/>
			</div>

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
		</div>
	);
};

export default AccountPage;
