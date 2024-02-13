import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { getService } from "../services/service";

function useServices() {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [services, setServices] = useState(null);

  useEffect(() => {
    getAllServices();
  }, []);

  const getAllServices = async () => {
    try {
      const { data: res } = await getService("/services", true);
      setServices(res.data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      setError(error.message);
    }
  };

  return { isLoading, error, services };
}

export default useServices;
