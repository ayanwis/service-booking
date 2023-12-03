import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../store/authContext";
import { Link } from "react-router-dom";
import Spinner from "../../ui/Spinner";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string().required("Please enter you password"),
});

export default function Login() {
  const { login, isLoading, error } = useAuth();

  const submitHandler = (values) => {
    login(values);
  };

  return (
    <div className="mx-auto mt-20 w-1/3">
      <h1 className="mb-10 flex justify-center text-3xl font-bold">Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={submitHandler}
      >
        <Form className="flex flex-col gap-4">
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
            className="bg-blue-500 px-4 py-3 text-xl text-white hover:shadow-lg"
          >
            {isLoading ? <Spinner /> : "Login"}
          </button>
        </Form>
      </Formik>
      <p className="mt-5 text-lg">
        Don't have account?
        <Link to="/signup" className="ml-4 hover:underline">
          Signup
        </Link>
      </p>
    </div>
  );
}
