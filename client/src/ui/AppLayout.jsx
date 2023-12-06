import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <main className="min-h-[90vh] px-3">
        <Outlet />
      </main>
      <footer className="flex w-full items-center justify-center bg-black p-4 text-sm text-white">
        ©Copyright. ayanghosh.dev@gmail.com
      </footer>
    </div>
  );
}
