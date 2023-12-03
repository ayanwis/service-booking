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
            <Route path="/canel" element={<Cancel />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
