import { Link } from "react-router-dom";
import { useAuth } from "../store/authContext";
import Spinner from "./Spinner";
import { getUserDetails } from "../services/session";

function Header() {
  const { isLoading, isLoggedIn, error, logout } = useAuth();

  if (isLoading) return null;
  return (
    <header className="sticky top-0 flex w-full items-center justify-between  bg-gray-200 px-3 py-4">
      <Link to="/" className="text-xl font-bold text-blue-500">
        EasyBooking
      </Link>
      <nav className="flex items-center gap-4 text-xl">
        <Link to="/services" className="text-sm font-bold uppercase">
          Services
        </Link>
        {!isLoggedIn && (
          <Link
            to="/login"
            className="rounded-md bg-black p-3  text-xs text-white"
          >
            Login
          </Link>
        )}
        {isLoggedIn && (
          <Link
            to="/my-bookings"
            className="rounded-md bg-black p-3 text-xs text-white"
          >
            My bookings
          </Link>
        )}
        {isLoggedIn && getUserDetails().role === "admin" && (
          <Link
            to="/admin"
            className="rounded-md bg-black p-3 text-xs text-white"
          >
            All Bookings
          </Link>
        )}

        {isLoggedIn && (
          <button
            onClick={logout}
            className="rounded-md bg-black p-3 text-xs text-white"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
