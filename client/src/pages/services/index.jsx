import useServices from "../../hooks/useServices";

function Services() {
  const { isLoading, error, services } = useServices();

  if (isLoading) return null;
  return (
    <div>
      {services.map((service) => (
        <h1 key={service._id}>{service.name}</h1>
      ))}
    </div>
  );
}

export default Services;
