import { RegisterInput, RegisterSchema } from '@/api/entry/dto';
import { useRegisterMutation } from '@/api/entry/mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
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
import axios from 'axios';
import { ExceptionResponse } from '@/api/types';

const RegisterPage = () => {
	const [customErrorMessage, setCustomErrorMessage] = useState('');
	const navigate = useNavigate();
	const {
		mutateAsync: registerMutateAsync,
		isPending,
		isError,
	} = useRegisterMutation();
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
		console.log(data);
		try {
			await registerMutateAsync({
				email: data.email,
				first_name: data.first_name,
				last_name: data.last_name,
				password: data.password,
				password_confirmation: data.password_confirmation,
			});
			navigate('/login');
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const err: ExceptionResponse = error;
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
						name="first_name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										maxLength={255}
										type="text"
										placeholder="Nama depan"
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
										maxLength={255}
										type="text"
										placeholder="Nama belakang"
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
										type="password"
										placeholder="Buat password"
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
										type="password"
										placeholder="Konirmasi password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} type="submit">
						Registrasi
					</Button>
				</form>
			</Form>
			<Link to="/login">Login</Link>
		</div>
	);
};
export default RegisterPage;
