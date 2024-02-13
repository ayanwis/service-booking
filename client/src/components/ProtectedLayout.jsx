import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authContext";

function ProtectedLayout({ children }) {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) return null;
  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
}

export default ProtectedLayout;
