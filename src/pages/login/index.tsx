import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
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

const LoginPage = () => {
	const [customErrorMessage, setCustomErrorMessage] = useState('');
	const {
		mutateAsync: loginMutateAsync,
		isPending,
		isError,
	} = useLoginMutation();
	const form = useForm<LoginInput>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: LoginInput) => {
		console.log(data);
		try {
			const res = await loginMutateAsync({
				email: data.email,
				password: data.password,
			});
			Cookies.set('sid', res.data.data.token);
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const err: ExceptionResponse = error;
				console.log(err.response?.data.message);
				setCustomErrorMessage(err.response?.data.message as string);
				return;
			}
		}
	};
	return (
		<div>
			{isError && <p>{customErrorMessage}</p>}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										maxLength={255}
										type="email"
										placeholder="Masukan email anda"
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
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										maxLength={255}
										type="password"
										placeholder="Masukan password anda"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} type="submit">
						Masuk
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default LoginPage;
