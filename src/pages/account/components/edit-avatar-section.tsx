import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ProfileResponse } from '@/store/profile/response';
import {
	MAX_UPLOAD_IMAGE_SIZE,
	useUpdateImageProfileMutation,
} from '@/store/profile/slice';
import { Pencil } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface Props {
	profile: ProfileResponse;
}
const EditAvatarSection: React.FC<Props> = ({ profile }) => {
	const { toast } = useToast();
	const [newImage, setNewImage] = useState('');
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [updateImageProfileMutation, { isLoading }] =
		useUpdateImageProfileMutation();

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
				const res = await updateImageProfileMutation({
					file: file,
				}).unwrap();
				setNewImage(res.data.profile_image);
			} catch (error: any) {
				toast({
					title: 'Edit Profile Gagal',
					variant: 'destructive',
					description: error.data.message,
				});
			}
		}
	};
	return (
		<div className="relative w-min m-auto mb-10">
			<Avatar className="w-[120px] h-[120px] border-primary">
				<AvatarImage
					className="object-cover"
					src={newImage ? newImage : profile.data.profile_image}
				/>
				<AvatarFallback>
					{profile.data.first_name} {profile.data.last_name}
				</AvatarFallback>
			</Avatar>
			<Button
				size="icon"
				variant="outline"
				className="rounded-full absolute right-0 bottom-0"
				disabled={isLoading}
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
