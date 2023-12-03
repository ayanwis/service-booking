import ServiceCard from "../../components/ServiceCard";
import useServices from "../../hooks/useServices";
import Spinner from "../../ui/Spinner";

function Services() {
  const { isLoading, error, services } = useServices();

  if (isLoading)
    return (
      <div>
        <h1 className="py-5 text-2xl">Our Services</h1>
        <Spinner /> Loading..
      </div>
    );
  return (
    <section>
      <h1 className="py-5 text-2xl">Our Services</h1>
      <div className="flex flex-wrap gap-4">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </section>
  );
}

export default Services;
