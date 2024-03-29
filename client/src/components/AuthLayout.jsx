import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authContext";

function AuthLayout({ children }) {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) return null;
  if (isLoggedIn) return <Navigate to="/services" />;

  return children;
}

export default AuthLayout;
