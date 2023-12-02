import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authContext";

function AuthLayout({ children }) {
  const { isLoading, user } = useAuth();

  if (isLoading) return null;
  if (user) return <Navigate to="/services" />;

  return children;
}

export default AuthLayout;
