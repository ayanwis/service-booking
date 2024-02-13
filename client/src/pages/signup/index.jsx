import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../store/authContext";
import { Link } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import { postService } from "../../services/service";

const LoginSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name should be atleast 3 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Please enter you password")
    .min(8, "Password should be atleast 8 characters"),
});

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const { setUser, isLoading, error } = useAuth();

  const signup = async (formData) => {
    try {
      setLoading(true);
      // Perform signup logic and set the user
      const response = await postService("/users/signup", formData, false);

      setUser(response.data.user);
      setLoading(false);
      // // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/services");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-20 w-[20rem]">
      <h1 className="mb-10 flex justify-center text-3xl font-bold">Signup</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={signup}
      >
        <Form className="flex flex-col gap-4">
          <Field
            type="text"
            name="name"
            placeholder="name"
            className="rounded-md border-2 border-gray-200 px-4 py-3 outline-none"
          />
          <ErrorMessage name="name" component="div" className="text-red-500" />
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
            disabled={isLoading}
            className="rounded-md bg-blue-500 px-4 py-3 text-xl text-white hover:shadow-lg"
          >
            {isLoading ? <Spinner /> : "Signup"}
          </button>
        </Form>
      </Formik>

      <p className="mt-5 text-lg">
        Already have account?
        <Link to="/login" className="ml-4 text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
