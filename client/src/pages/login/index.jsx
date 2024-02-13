import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../store/authContext";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import { postService } from "../../services/service";
import toast from "react-hot-toast";
import { setItem } from "../../services/session";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string().required("Please enter you password"),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const login = async (formData) => {
    console.log("login called");
    try {
      setLoading(true);
      const { data: res } = await postService("/users/login", formData, false);
      setIsLoggedIn(true);
      setItem("access_token", res.token);
      setLoading(false);
      if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/services");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const adminLogin = () =>
    login({ email: "admin@gmail.com", password: "adminadmin" });

  const userLogin = () =>
    login({ email: "user@gmail.com", password: "useruser" });

  return (
    <div className="mx-auto mt-20 w-[20rem]">
      <h1 className="mb-10 flex justify-center text-3xl font-bold">Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={login}
      >
        <Form className="flex flex-col gap-4">
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="rounded-md border-2 border-gray-200 px-4 py-3 outline-none"
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="rounded-md border-2 border-gray-200 px-4 py-3 outline-none"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-3 text-xl text-white hover:shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Spinner /> Logging
              </div>
            ) : (
              "Login"
            )}
          </button>
        </Form>
      </Formik>
      <p className="mt-5 text-lg">
        Don't have account?
        <Link to="/signup" className="ml-4 text-blue-500 hover:underline">
          Signup
        </Link>
      </p>
      <p className="cursor-pointer hover:underline" onClick={userLogin}>
        Login as user
      </p>
      <p className="cursor-pointer hover:underline" onClick={adminLogin}>
        Login as admin
      </p>
    </div>
  );
}
