import { Skeleton } from '@/components/ui/skeleton';

const ServiceSectionSkeleton = () => {
	return (
		<div className="flex gap-x-10 mb-20 h-[126px]">
			{Array.from(Array(12).keys()).map((i) => (
				<div key={i} className="w-[70px]">
					<Skeleton className="w-full h-[70px] mb-2" />
					<Skeleton className="w-full h-[16px] mt-2" />
				</div>
			))}
		</div>
	);
};

export default ServiceSectionSkeleton;
