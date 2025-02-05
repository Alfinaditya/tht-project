import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { AtSign, Eye, EyeOff, LockKeyhole, User, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRegisterMutation } from '@/store/entry/slice';
import { RegisterInput, RegisterSchema } from '@/store/entry/dto';

const RegisterPage = () => {
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
	const [customErrorMessage, setCustomErrorMessage] = useState('');
	const navigate = useNavigate();
	const [registerMutation, { isLoading }] = useRegisterMutation();
	const form = useForm<RegisterInput>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			first_name: '',
			last_name: '',
			password: '',
			password_confirmation: '',
		},
	});

	const onSubmit = async (data: RegisterInput) => {
		try {
			await registerMutation({
				email: data.email,
				first_name: data.first_name,
				last_name: data.last_name,
				password: data.password,
				password_confirmation: data.password_confirmation,
			}).unwrap();
			navigate('/login');
		} catch (error: any) {
			setCustomErrorMessage(error.data.message);
		}
	};
	return (
		<div className="flex flex-col justify-between  h-full">
			<div />
			<div className="flex-col flex gap-y-20 w-[50%] m-auto">
				<div className="text-center m-auto">
					<Link
						to="/"
						className="flex items-center justify-center gap-x-2 font-bold text-center text-2xl mb-10"
					>
						<div className="w-[32px] h-[32px] rounded-full">
							<img src="/assets/brand.png" alt="Brand" />
						</div>
						SIMS PPOB
					</Link>
					<h1 className="text-3xl font-semibold">
						Lengkapi data untuk membuat akun
					</h1>
				</div>
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												type="email"
												placeholder="Masukan email anda"
												startAdornment={<AtSign className="w-4" />}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												type="text"
												placeholder="Nama depan"
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
										<FormControl>
											<Input
												type="text"
												placeholder="Nama belakang"
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
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												maxLength={255}
												placeholder="Buat password"
												type={isShowPassword ? 'text' : 'password'}
												startAdornment={<LockKeyhole className="w-4" />}
												endAdornment={
													isShowPassword ? (
														<EyeOff
															onClick={() => setIsShowPassword(false)}
															className="w-4 cursor-pointer"
														/>
													) : (
														<Eye
															onClick={() => setIsShowPassword(true)}
															className="w-4 cursor-pointer"
														/>
													)
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password_confirmation"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												maxLength={255}
												placeholder="Konirmasi password"
												type={isShowConfirmPassword ? 'text' : 'password'}
												startAdornment={<LockKeyhole className="w-4" />}
												endAdornment={
													isShowConfirmPassword ? (
														<EyeOff
															onClick={() => setIsShowConfirmPassword(false)}
															className="w-4 cursor-pointer"
														/>
													) : (
														<Eye
															onClick={() => setIsShowConfirmPassword(true)}
															className="w-4 cursor-pointer"
														/>
													)
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button isLoading={isLoading} type="submit" className="w-full">
								Registrasi
							</Button>
						</form>
					</Form>
					<p className="text-gray-400 text-sm text-center">
						Sudah punya akun ? login{' '}
						<Button className="font-semibold p-0" variant="link" asChild>
							<Link to="/login">di sini</Link>
						</Button>
					</p>
				</div>
			</div>
			<div className="w-[90%] mx-auto h-20 ">
				{customErrorMessage && (
					<Alert className="flex items-center justify-between px-4 py-1 bg-secondary text-primary">
						<AlertDescription>{customErrorMessage}</AlertDescription>
						<Button
							className="hover:bg-primary/80 hover:text-white rounded-full"
							onClick={() => setCustomErrorMessage('')}
							variant="ghost"
							size="icon"
						>
							<X />
						</Button>
					</Alert>
				)}
			</div>
		</div>
	);
};
export default RegisterPage;
