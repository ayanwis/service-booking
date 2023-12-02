import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <header>this is header</header>
      <main>
        <Outlet />
      </main>
      <footer>this is footer</footer>
    </div>
  );
}
