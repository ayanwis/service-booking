import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../store/authContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Please enter you password"),
});

export default function Login() {
  const { login, isLoading, error } = useAuth();

  const submitHandler = (values) => {
    login(values);
  };

  return (
    <div className="mx-auto w-1/4">
      <h1>Login</h1>
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
          <ErrorMessage name="email" component="div" />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="border-2 border-gray-200 px-4 py-3 outline-none"
          />
          <ErrorMessage name="password" component="div" />
          <button
            type="submit"
            className="bg-blue-500 px-4 py-3 text-xl text-white hover:shadow-lg"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}
