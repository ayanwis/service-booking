import { useEffect, useState } from "react";
import { getService } from "../services/service";

function useMyBookings() {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = async () => {
    try {
      const { data: res } = await getService("/bookings/", true);
      setBookings(res.bookings);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      setError(error.message);
    }
  };

  return { isLoading, error, bookings };
}

export default useMyBookings;
