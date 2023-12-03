import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";

function useAllBookings() {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${BASE_URL}/bookings/admin`,
        withCredentials: true,
      });
      setBookings(res.data.bookings);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      setError(error.message);
    }
  };

  return { isLoading, error, bookings };
}

export default useAllBookings;
