import { BASE_URL } from "../utils/constant";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function ServiceCard({ service }) {
  // Payment integration
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51OJ8BiSHFnsnHRC0CIo29WvZlviSqrDQA1YARqCCPM4Ytt1DDoRqaYTNgyisVtdtMWQHL1xspWIEP4k3vbs9Upit00R4DCyvBa",
      );
      // 1. Req to the server for payment & book service
      const response = await axios({
        url: `${BASE_URL}/bookings`,
        method: "POST",
        data: service,
        withCredentials: true,
      });
      console.log(response);

      // 2. In response we will get a session id
      // using session id we will redirect user to stripe checkout page
      const result = stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="m-2 flex w-60 flex-col gap-4 rounded-sm border bg-blue-200 p-2 shadow-md">
      <div className="flex justify-between gap-2 text-2xl font-semibold">
        <span>{service.name}</span>
        <span>${service.price}</span>
      </div>
      <button
        className="w-fit rounded-md bg-black px-2 py-1 text-white"
        onClick={makePayment}
      >
        book now
      </button>
    </div>
  );
}

export default ServiceCard;
