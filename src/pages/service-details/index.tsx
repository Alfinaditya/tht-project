import { useService } from '@/api/information/queries';
import { BalanceCard } from '@/components/balance-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WelcomeProfile } from '@/components/welcome-profile';
import { toRupiahFormat } from '@/lib/utils';
import { Banknote } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ConfirmPaidTransactionModal from './components/confirm-paid-transaction-modal';

const ServiceDetails = () => {
	const { id } = useParams();
	const [openConfirmModal, setOpenConfirmModal] = useState(false);
	const { isLoading: isServiceLoading, data: services } = useService({
		enabled: !!id,
	});
	const selectedService =
		services &&
		services.data.data.find((service) => service.service_code === id);

	return (
		<div className="w-[90%] m-auto ">
			<div className="flex mb-10">
				<WelcomeProfile className="w-1/2" />
				<BalanceCard className="w-1/2" />
			</div>
			<p>Pembayaran</p>
			{selectedService && (
				<>
					<div className="mt-4 mb-10">
						<div className="flex items-center gap-x-2">
							<img
								src={selectedService.service_icon}
								className="w-10 h-10"
								alt=""
							/>
							<p className="font-bold">{selectedService.service_name}</p>
						</div>
					</div>
					<Input
						defaultValue={toRupiahFormat(selectedService.service_tariff)}
						startAdornment={<Banknote className="w-4" />}
						readOnly
					/>
					<Button
						className="w-full mt-5"
						disabled={isServiceLoading}
						onClick={() => setOpenConfirmModal(true)}
					>
						Bayar
					</Button>
					<ConfirmPaidTransactionModal
						open={openConfirmModal}
						setOpenModal={setOpenConfirmModal}
						selectedService={selectedService}
					/>
				</>
			)}
		</div>
	);
};

export default ServiceDetails;
