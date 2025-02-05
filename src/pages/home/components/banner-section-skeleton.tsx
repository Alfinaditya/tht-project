import { Skeleton } from '@/components/ui/skeleton';

const BannerSectionSkeleton = () => {
	return (
		<div className="flex flex-row gap-x-10 p-4">
			{Array.from(Array(5).keys()).map((i) => (
				<Skeleton key={i} className="w-[270px] h-[121px]" />
			))}
		</div>
	);
};

export default BannerSectionSkeleton;
