import { useService } from '@/api/information/queries';
import { usePaidTransactionMutation } from '@/api/transaction/mutations';
import { ExceptionResponse } from '@/api/types';
import { BalanceCard } from '@/components/balance-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WelcomeProfile } from '@/components/welcome-profile';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetails = () => {
	let { id } = useParams();
	const [customErrorMessage, setCustomErrorMessage] = useState('');
	const {
		isLoading: isServiceLoading,
		data: services,
		isError,
	} = useService({
		enabled: !!id,
	});
	const { mutateAsync: paidTransactionMutateAsync } =
		usePaidTransactionMutation();
	const selectedService =
		services &&
		services.data.data.find((service) => service.service_code === id);

	const handleSubmit = async () => {
		if (!selectedService) return;
		try {
			await paidTransactionMutateAsync({
				service_code: selectedService.service_code,
			});
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const err: ExceptionResponse = error;
				setCustomErrorMessage(err.response?.data.message as string);
				return;
			}
		}
		// try {

		// await paidTransactionMutateAsync({
		// 	service_code: selectedService.service_code,
		// });
		// } catch (error) {

		// }
	};
	return (
		<div>
			<WelcomeProfile />
			<BalanceCard />
			{isError && <p>{customErrorMessage}</p>}
			<h1>Service Details</h1>
			{JSON.stringify(selectedService)}
			{selectedService && (
				<Input defaultValue={selectedService.service_tariff} readOnly />
			)}
			<Button disabled={isServiceLoading} onClick={handleSubmit}>
				Bayar
			</Button>
		</div>
	);
};

export default ServiceDetails;
