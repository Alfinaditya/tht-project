import { useNavigate } from 'react-router-dom';
import ServiceSectionSkeleton from './service-section-skeleton';
import { useGetServiceQuery } from '@/store/information/slice';

const ServiceSection = () => {
	const navigate = useNavigate();
	const { isLoading: isServiceLoading, data: services } = useGetServiceQuery();
	return (
		<>
			{isServiceLoading ? (
				<ServiceSectionSkeleton />
			) : (
				<div className="flex gap-x-10 mb-20">
					{services &&
						services.data.map((service) => (
							<div
								onClick={() => navigate(`/service/${service.service_code}`)}
								key={service.service_code}
								className="cursor-pointer w-[70px] transition-all hover:scale-125"
							>
								<img src={service.service_icon} alt={service.service_name} />
								<p className="w-full break-words text-xs text-center mt-2">
									{service.service_name}
								</p>
							</div>
						))}
				</div>
			)}
		</>
	);
};

export default ServiceSection;
