import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authContext";
import { getUserDetails } from "../services/session";

function AdminLayout({ children }) {
  const { isLoading, user } = useAuth();

  if (isLoading) return null;
  if (getUserDetails().role !== "admin") return <Navigate to="/" />;

  return children;
}

export default AdminLayout;
