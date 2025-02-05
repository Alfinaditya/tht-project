import { MAX_UPLOAD_IMAGE_SIZE } from '@/api/profile/common';
import { useUpdateImageProfileMutation } from '@/api/profile/mutations';
import { ProfileResponse } from '@/api/profile/responses';
import { ExceptionResponse } from '@/api/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface Props {
	profile: ProfileResponse;
}
const EditAvatarSection: React.FC<Props> = ({ profile }) => {
	const { toast } = useToast();
	const [newImage, setNewImage] = useState('');
	const inputFileRef = useRef<HTMLInputElement>(null);
	// const [customErrorMessage, setCustomErrorMessage] = useState('');
	const {
		mutateAsync: updateImageProfileMutateAsync,
		// isError: isUpdateImageProfileError,
		isPending: isUpdateImageProfilePending,
	} = useUpdateImageProfileMutation();

	const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			if (file.size > MAX_UPLOAD_IMAGE_SIZE) {
				toast({
					title: 'Edit Profile Gagal',
					variant: 'destructive',
					description:
						'Ukuran gambar harus 100KB atau kurang (maksimal 102.400 byte). Silakan pilih file yang lebih kecil.',
				});
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
					toast({
						title: 'Edit Profile Gagal',
						variant: 'destructive',
						description: err.response?.data.message as string,
					});
					return;
				}
			}
		}
	};
	return (
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
				disabled={isUpdateImageProfilePending}
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
	);
};

export default EditAvatarSection;
