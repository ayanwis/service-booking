import { useState } from "react";
import makePayment from "../services/makePayment";
import Spinner from "../ui/Spinner";

function ServiceCard({ service }) {
  const [isLoading, setIsLoading] = useState(false);
  const clickHandler = () => {
    setIsLoading(true);
    makePayment(service);
  };

  return (
    <div className="flex w-60 flex-col gap-4 rounded-md border bg-blue-200 p-4 shadow-md">
      <div className="flex justify-between gap-2 text-3xl font-semibold">
        <span className="capitalize">{service.name}</span>
        <span>${service.price}</span>
      </div>
      <p className="capitalize">{service.description}</p>
      <button
        className="flex w-fit items-center justify-center rounded-md bg-black px-4 py-3 text-white"
        onClick={clickHandler}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner /> loading...
          </>
        ) : (
          "Book now"
        )}
      </button>
    </div>
  );
}

export default ServiceCard;
