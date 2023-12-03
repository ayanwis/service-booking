import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data is stored in localStorage on page load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsloading(false);
  }, []);

  const login = async (userData) => {
    try {
      // Perform login logic and set the user
      const response = await axios({
        method: "POST",
        url: `${BASE_URL}/users/login`,
        data: userData,
        withCredentials: true,
      });
      // console.log(response.data?.user);
      setUser(response.data);
      // // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/services");
    } catch (error) {
      setError(error.message);
    }
  };
  const signup = async (userData) => {
    try {
      // Perform login logic and set the user
      const response = await axios({
        method: "POST",
        url: `${BASE_URL}/users/signup`,
        data: userData,
        withCredentials: true,
      });
      // console.log(response.data?.user);
      setUser(response.data);
      // // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/services");
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = () => {
    // Perform logout logic and clear the user
    setUser(null);
    // Remove user data from localStorage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, error, user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
