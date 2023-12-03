import ServiceCard from "../../components/ServiceCard";
import useServices from "../../hooks/useServices";

function Services() {
  const { isLoading, error, services } = useServices();

  if (isLoading) return null;
  return (
    <div>
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}

export default Services;
