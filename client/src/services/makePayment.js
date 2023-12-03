import { BASE_URL } from "../utils/constant";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const makePayment = async (service) => {
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

export default makePayment;
