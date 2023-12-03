import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../store/authContext";

export default function AppLayout() {
  const { isLoading, user, error } = useAuth();
  return (
    <div className="mx-96">
      <header className="flex justify-between py-4">
        <Link to="/" className="text-3xl font-bold text-blue-500">
          Easy Booking
        </Link>
        <nav className="flex items-center gap-4 text-2xl">
          <Link to="/services">Services</Link>
          {isLoading && <span>loading</span>}
          {!isLoading && !user && (
            <Link
              to="/login"
              className="rounded-md bg-black px-4 py-2 text-white"
            >
              Login
            </Link>
          )}
          {!isLoading && user && (
            <Link
              to="/my-bookings"
              className="rounded-md bg-black px-4 py-2 text-white"
            >
              Your bookings
            </Link>
          )}
        </nav>
      </header>
      <main className="h-[90vh]">
        <Outlet />
      </main>
      <footer>this is footer</footer>
    </div>
  );
}
