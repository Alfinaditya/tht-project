import { ModalProps } from '@/types/modal';
import React from 'react';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toRupiahFormat } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Check, Wallet, X } from 'lucide-react';
import { usePaidTransactionMutation } from '@/api/transaction/mutations';

interface Props extends ModalProps {
	selectedService:
		| {
				service_code: string;
				service_name: string;
				service_icon: string;
				service_tariff: number;
		  }
		| undefined;
}
const ConfirmPaidTransactionModal: React.FC<Props> = ({
	open,
	selectedService,
	setOpenModal,
}) => {
	const {
		mutateAsync: paidTransactionMutateAsync,
		isPending: isPaidTransactionLoading,
		isSuccess: isPaidTransactionSuccess,
		isError: isPaidTransactionError,
	} = usePaidTransactionMutation();
	const navigate = useNavigate();
	const handleSubmit = async () => {
		if (!selectedService) return;
		await paidTransactionMutateAsync({
			service_code: selectedService.service_code,
		});
	};
	if (!selectedService) {
		return <></>;
	}
	return (
		<AlertDialog onOpenChange={setOpenModal} open={open}>
			<AlertDialogContent className="w-[25%] min-w-min">
				{isPaidTransactionError ? (
					<>
						<AlertDialogHeader>
							<AlertDialogTitle>
								<div className="rounded-full bg-primary w-max p-3 m-auto">
									<X className="text-white w-8 h-8" />
								</div>
							</AlertDialogTitle>
							<AlertDialogDescription>
								<div className="text-center mt-4">
									<p>Top Up sebesar</p>
									<p className="text-xl font-bold text-black my-2">
										{toRupiahFormat(selectedService.service_tariff)}
									</p>
									<p>Gagal!</p>
								</div>
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<div className="flex flex-col w-full gap-y-1">
								<Button
									onClick={() => navigate('/')}
									variant="link"
									className="font-medium"
								>
									Kembali Ke Beranda
								</Button>
							</div>
						</AlertDialogFooter>
					</>
				) : (
					<>
						{isPaidTransactionSuccess ? (
							<>
								<AlertDialogHeader>
									<AlertDialogTitle>
										<div className="rounded-full bg-green-500 w-max p-3 m-auto">
											<Check className="text-white w-8 h-8" />
										</div>
									</AlertDialogTitle>
									<AlertDialogDescription>
										<div className="text-center mt-3">
											<p>Top Up sebesar</p>
											<p className="text-xl font-bold text-black my-2">
												{toRupiahFormat(selectedService.service_tariff)}
											</p>
											<p>Berhasil!</p>
										</div>
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<div className="flex flex-col w-full gap-y-1">
										<Button
											onClick={() => navigate('/')}
											variant="link"
											className="font-medium"
										>
											Kembali Ke Beranda
										</Button>
									</div>
								</AlertDialogFooter>
							</>
						) : (
							<>
								<AlertDialogHeader>
									<AlertDialogTitle>
										<div className="rounded-full bg-primary w-max p-3 m-auto">
											<Wallet className="text-white w-8 h-8" />
										</div>
									</AlertDialogTitle>
									<AlertDialogDescription>
										<div className="text-center mt-4">
											<p>Beli {selectedService.service_name} senilai </p>
											<p className="text-xl font-bold text-black">
												{toRupiahFormat(selectedService.service_tariff)} ?
											</p>
										</div>
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<div className="flex flex-col w-full gap-y-1">
										<Button
											onClick={handleSubmit}
											variant="link"
											className="font-medium"
											isLoading={isPaidTransactionLoading}
										>
											Ya, lanjutkan Top Up
										</Button>
										<Button
											variant="link"
											disabled={isPaidTransactionLoading}
											className="text-gray-500"
											onClick={() => setOpenModal(false)}
										>
											Batalkan
										</Button>
									</div>
								</AlertDialogFooter>
							</>
						)}
					</>
				)}
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ConfirmPaidTransactionModal;
