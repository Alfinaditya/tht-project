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
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUpdateProfileMutation } from '@/store/profile/slice';
import { ProfileResponse } from '@/store/profile/response';
import { UpdateProfileInput, UpdateProfileSchema } from '@/store/profile/dto';

interface Props {
	profile: ProfileResponse;
}

const EditProfileSection: React.FC<Props> = ({ profile }) => {
	const { toast } = useToast();
	const [isUpdateProfile, setIsUpdateProfile] = useState(false);
	const [updateProfileMutaton, { isLoading }] = useUpdateProfileMutation();

	const form = useForm<UpdateProfileInput>({
		resolver: zodResolver(UpdateProfileSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
		},
	});
	const onSubmit = async (data: UpdateProfileInput) => {
		try {
			await updateProfileMutaton({
				first_name: data.first_name,
				last_name: data.last_name,
			});
			setIsUpdateProfile(false);
			toast({
				title: 'Edit Profile Berhasil',
				variant: 'default',
				description: 'Profile Anda berhasil diperbarui',
			});
		} catch (error: any) {
			toast({
				title: 'Edit Profile Gagal',
				variant: 'destructive',
				description: error.data.message,
			});
		}
	};

	useEffect(() => {
		if (profile) {
			form.setValue('first_name', profile.data.first_name);
			form.setValue('last_name', profile.data.last_name);
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
						defaultValue={profile.data.email}
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
						<Button key={'save-button'} disabled={isLoading} type="submit">
							Simpan
						</Button>
						<Button
							variant="outline"
							key={'back-button'}
							disabled={isLoading}
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
								window.location.replace('/login');
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
