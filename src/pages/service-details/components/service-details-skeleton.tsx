import { Skeleton } from '@/components/ui/skeleton';

const ServiceDetailsSkeleton = () => {
	return (
		<>
			<div className="mt-4 mb-10">
				<div className="flex items-center gap-x-2">
					<Skeleton className="w-[40px] h-[40px]" />
					<Skeleton className="w-[10%] h-[24px]" />
				</div>
			</div>
			<Skeleton className="w-full h-[38px]" />
			<Skeleton className="w-full h-[40px] mt-5" />
		</>
	);
};

export default ServiceDetailsSkeleton;
