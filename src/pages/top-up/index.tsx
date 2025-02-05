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
import { useState } from 'react';
import { Banknote } from 'lucide-react';
import ConfirmTopUpModal from './components/confirm-top-up-modal';
import { TopUpInput, TopUpSchema } from '@/store/transaction/dto';

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
	const [confirmTopUpModal, setConfirmTopUpModal] = useState(false);
	const form = useForm<TopUpInput>({
		resolver: zodResolver(TopUpSchema),

		defaultValues: {
			top_up_amount: '',
		},
	});
	// const {
	// 	mutateAsync: topUpMutateAsync,
	// 	isPending,
	// 	isError,
	// } = useTopUpMutation();
	// const currencyInput = useMaskito({options:{mask:{}} });
	const onSubmit = async () => {
		setConfirmTopUpModal(true);
	};

	return (
		<div className="w-[90%] m-auto ">
			<div className="flex mb-10">
				<WelcomeProfile className="w-1/2" />
				<BalanceCard className="w-1/2" />
			</div>

			<div className="mb-10">
				<p className="text-2xl">Silahkan masukan</p>
				<p className="text-4xl font-medium">Nominal Top Up</p>
			</div>
			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="flex gap-x-8">
							<div className="flex flex-col justify-between flex-1">
								<FormField
									control={form.control}
									name="top_up_amount"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<CurrencyInput
													placeholder="Masukan nominal top up"
													startAdornment={<Banknote className="w-4" />}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button disabled={!form.watch('top_up_amount')} type="submit">
									Top Up
								</Button>
							</div>
							<div className="grid grid-cols-3 gap-2 ">
								{BALANCE_OPTIONS.map((balanceOption) => (
									<Button
										size="lg"
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
							</div>
						</div>
					</form>
				</Form>
				<ConfirmTopUpModal
					open={confirmTopUpModal}
					setOpenModal={setConfirmTopUpModal}
					topUpAmount={Number(
						form.getValues('top_up_amount').replace(/\D/g, '')
					)}
				/>
			</div>
		</div>
	);
};

export default TopUpPage;
