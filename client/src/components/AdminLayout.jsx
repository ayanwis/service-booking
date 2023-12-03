import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authContext";

function AdminLayout({ children }) {
  const { isLoading, user } = useAuth();

  if (isLoading) return null;
  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
}

export default AdminLayout;
