import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";

function useServices() {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [services, setServices] = useState(null);

  useEffect(() => {
    getAllServices();
  }, []);

  const getAllServices = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${BASE_URL}/services`,
        withCredentials: true,
      });
      setServices(res.data.data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      setError(error.message);
    }
  };

  return { isLoading, error, services };
}

export default useServices;
