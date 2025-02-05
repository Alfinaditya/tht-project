import { useGetServiceQuery } from '@/store/information/slice';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ServiceDetailsSkeleton from './service-details-skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toRupiahFormat } from '@/lib/utils';
import { Banknote } from 'lucide-react';
import ConfirmPaidTransactionModal from './confirm-paid-transaction-modal';

const PaidTransactionForm = () => {
	const { id } = useParams();
	const [openConfirmModal, setOpenConfirmModal] = useState(false);
	const { isLoading: isServiceLoading, data: services } = useGetServiceQuery();
	const selectedService =
		services && services.data.find((service) => service.service_code === id);
	return (
		<>
			{isServiceLoading ? (
				<ServiceDetailsSkeleton />
			) : (
				<>
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
				</>
			)}
		</>
	);
};

export default PaidTransactionForm;
