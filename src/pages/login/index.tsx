import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInput, LoginSchema } from '@/api/entry/dto';
import { useLoginMutation } from '@/api/entry/mutations';
import axios from 'axios';
import { ExceptionResponse } from '@/api/types';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, User, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginPage = () => {
	const navigate = useNavigate();
	const [customErrorMessage, setCustomErrorMessage] = useState('');
	const [isShowPassword, setIsShowPassword] = useState(false);
	const { mutateAsync: loginMutateAsync, isPending } = useLoginMutation();
	const form = useForm<LoginInput>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: LoginInput) => {
		try {
			const res = await loginMutateAsync({
				email: data.email,
				password: data.password,
			});
			Cookies.set('sid', res.data.data.token);
			navigate('/');
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const err: ExceptionResponse = error;
				setCustomErrorMessage(err.response?.data.message as string);
				return;
			}
		}
	};
	return (
		<div className="flex flex-col justify-between h-full">
			<div />
			<div className="flex-col flex gap-y-20 w-[50%] m-auto ">
				<div className="text-center m-auto">
					<Link
						to="/"
						className="flex items-center justify-center gap-x-2 font-bold text-center text-2xl mb-10"
					>
						<img src="/assets/brand.png" alt="Brand" />
						SIMS PPOB
					</Link>
					<h1 className="text-3xl font-semibold">
						Masuk atau buat akun untuk memulai
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
												placeholder="Masukan password anda"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button isLoading={isPending} className="w-full" type="submit">
								Masuk
							</Button>
						</form>
					</Form>
					<p className="text-gray-400 text-sm text-center">
						Belum punya akun ? registrasi{' '}
						<Button className="font-semibold p-0" variant="link" asChild>
							<Link to="/register">di sini</Link>
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

export default LoginPage;
