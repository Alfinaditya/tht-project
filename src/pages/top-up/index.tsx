import { TopUpInput, TopUpSchema } from '@/api/transaction/dto';
import { useTopUpMutation } from '@/api/transaction/mutations';
import { BalanceCard } from '@/components/balance-card';
import { WelcomeProfile } from '@/components/welcome-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CurrencyInput } from '@/components/currency-input';
import axios from 'axios';
import { ExceptionResponse } from '@/api/types';
import { useState } from 'react';
const BALANCE_OPTIONS = [
	{
		id: crypto.randomUUID(),
		value: '10.000',
	},
	{
		id: crypto.randomUUID(),
		value: '20.000',
	},
	{
		id: crypto.randomUUID(),
		value: '50.000',
	},
	{
		id: crypto.randomUUID(),
		value: '100.000',
	},
	{
		id: crypto.randomUUID(),
		value: '250.000',
	},
	{
		id: crypto.randomUUID(),
		value: '500.000',
	},
];
const TopUpPage = () => {
	const [customErrorMessage, setCustomErrorMessage] = useState('');
	const form = useForm<TopUpInput>({
		resolver: zodResolver(TopUpSchema),

		defaultValues: {
			top_up_amount: '',
		},
	});
	const {
		mutateAsync: topUpMutateAsync,
		isPending,
		isError,
	} = useTopUpMutation();
	// const currencyInput = useMaskito({options:{mask:{}} });
	const onSubmit = async (data: TopUpInput) => {
		try {
			await topUpMutateAsync({
				top_up_amount: data.top_up_amount.replace(/\D/g, ''),
			});
			form.reset();
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
			<WelcomeProfile />
			<BalanceCard />
			<p>Silahkan masukan</p>
			<p>Nominal Top Up</p>
			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="top_up_amount"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<CurrencyInput
											{...field}
											placeholder="Masukan nominal top up"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{BALANCE_OPTIONS.map((balanceOption) => (
							<Button
								type="button"
								key={balanceOption.id}
								onClick={() =>
									form.setValue('top_up_amount', balanceOption.value)
								}
								variant="outline"
							>
								Rp.{balanceOption.value}
							</Button>
						))}
						<Button
							disabled={isPending || !form.watch('top_up_amount')}
							type="submit"
						>
							Registrasi
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default TopUpPage;
