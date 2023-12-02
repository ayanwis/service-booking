import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authContext";

function ProtectedLayout({ children }) {
  const { isLoading, user } = useAuth();

  if (isLoading) return null;
  if (!user) return <Navigate to="/login" />;

  return children;
}

export default ProtectedLayout;
