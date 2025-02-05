import { Skeleton } from '@/components/ui/skeleton';

const EditProfileSkeleton = () => {
	return (
		<>
			<div className="w-min m-auto mb-10">
				<Skeleton className="w-[120px] h-[120px] rounded-full" />
			</div>
			<div className="space-y-8">
				<Skeleton className="w-full h-[72px]" />
				<Skeleton className="w-full h-[72px]" />
				<Skeleton className="w-full h-[72px]" />
				<div className="space-y-5 ">
					<Skeleton className="w-full h-[40px]" />
					<Skeleton className="w-full h-[40px]" />
				</div>
			</div>
		</>
	);
};

export default EditProfileSkeleton;
