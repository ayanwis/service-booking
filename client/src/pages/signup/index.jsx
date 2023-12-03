import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../store/authContext";
import { Link } from "react-router-dom";
import Spinner from "../../ui/Spinner";

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
  const { signup, isLoading, error } = useAuth();

  const submitHandler = (values) => {
    signup(values);
  };

  console.log(isLoading);

  return (
    <div className="mx-auto mt-20 w-1/3">
      <h1 className="mb-10 flex justify-center text-3xl font-bold">Signup</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={submitHandler}
      >
        <Form className="flex flex-col gap-4">
          <Field
            type="text"
            name="name"
            placeholder="name"
            className="border-2 border-gray-200 px-4 py-3 outline-none"
          />
          <ErrorMessage name="name" component="div" className="text-red-500" />
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="border-2 border-gray-200 px-4 py-3 outline-none"
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="border-2 border-gray-200 px-4 py-3 outline-none"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 px-4 py-3 text-xl text-white hover:shadow-lg"
          >
            {isLoading ? <Spinner /> : "Signup"}
          </button>
        </Form>
      </Formik>

      <p className="mt-5 text-lg">
        Already have account?
        <Link to="/login" className="ml-4 hover:underline">
          login
        </Link>
      </p>
    </div>
  );
}
