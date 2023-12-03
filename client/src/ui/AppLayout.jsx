import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../store/authContext";

import Spinner from "./Spinner";

export default function AppLayout() {
  const { isLoading, user, error } = useAuth();
  return (
    <div>
      <header className="sticky top-0 flex w-full justify-between bg-gray-200 px-96 py-4">
        <Link to="/" className="text-3xl font-bold text-blue-500">
          Easy Booking
        </Link>
        <nav className="flex items-center gap-4 text-xl">
          <Link to="/services">Services</Link>
          {isLoading && <Spinner />}
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
              My bookings
            </Link>
          )}
        </nav>
      </header>
      <main className="mx-96 min-h-[90vh]">
        <Outlet />
      </main>
      <footer className=" flex w-full items-center justify-center bg-black py-4 text-2xl text-white">
        ©Copyright. ayanghosh.dev@gmail.com
      </footer>
    </div>
  );
}
