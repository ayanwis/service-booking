import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Services from "./pages/services";
import Home from "./pages/home";
import Success from "./pages/success";
import Cancel from "./pages/cancel";

import { AuthProvider } from "./store/authContext";
import AuthLayout from "./components/AuthLayout";
import ProtectedLayout from "./components/ProtectedLayout";
import AdminPage from "./pages/admin";
import AdminLayout from "./components/AdminLayout";
import Bookings from "./pages/bookings";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthLayout>
                  <Signup />
                </AuthLayout>
              }
            />
            <Route
              path="/services"
              element={
                <ProtectedLayout>
                  <Services />
                </ProtectedLayout>
              }
            />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />

            <Route
              path="/admin"
              element={
                <AdminLayout>
                  <AdminPage />
                </AdminLayout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedLayout>
                  <Bookings />
                </ProtectedLayout>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
