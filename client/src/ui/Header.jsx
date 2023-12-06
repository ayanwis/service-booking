import { Link } from "react-router-dom";
import { useAuth } from "../store/authContext";
import Spinner from "./Spinner";

function Header() {
  const { isLoading, user, error } = useAuth();
  return (
    <header className="sticky top-0 flex w-full items-center justify-between  bg-gray-200 px-3 py-4">
      <Link to="/" className="text-xl font-bold text-blue-500">
        EasyBooking
      </Link>
      <nav className="flex items-center gap-4 text-xl">
        <Link to="/services" className="text-sm font-bold uppercase">
          Services
        </Link>
        {isLoading && <Spinner />}
        {!isLoading && !user && (
          <Link
            to="/login"
            className="rounded-md bg-black p-3  text-xs text-white"
          >
            Login
          </Link>
        )}
        {!isLoading && user && (
          <Link
            to="/my-bookings"
            className="rounded-md bg-black p-3 text-xs text-white"
          >
            My bookings
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
