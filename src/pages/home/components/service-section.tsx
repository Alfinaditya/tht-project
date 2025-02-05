import { useService } from '@/api/information/queries';
import { useNavigate } from 'react-router-dom';
import ServiceSectionSkeleton from './service-section-skeleton';

const ServiceSection = () => {
	const navigate = useNavigate();
	const { isLoading: isServiceLoading, data: services } = useService();
	return (
		<>
			{isServiceLoading ? (
				<ServiceSectionSkeleton />
			) : (
				<div className="flex gap-x-10 mb-20">
					{services &&
						services.data.data.map((service) => (
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
