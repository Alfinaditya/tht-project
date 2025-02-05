import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import BannerSectionSkeleton from './banner-section-skeleton';
import { useGetBannerQuery } from '@/store/information/slice';

const BannerSection = () => {
	const { isLoading: isBannerLoading, data: banners } = useGetBannerQuery();
	return (
		<div className="w-full">
			{isBannerLoading ? (
				<BannerSectionSkeleton />
			) : (
				<ScrollArea className="w-full whitespace-nowrap">
					<div className="flex w-max space-x-10 p-4">
						{banners &&
							banners.data.map((banner, i) => (
								<figure key={i} className="shrink-0">
									<div className="overflow-hidden rounded-md">
										<img src={banner.banner_image} alt={banner.banner_name} />
									</div>
								</figure>
							))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			)}
		</div>
	);
};

export default BannerSection;
