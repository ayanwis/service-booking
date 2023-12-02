import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../store/authContext";

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

  return (
    <div className="mx-auto w-1/4">
      <h1>Login</h1>
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
          <ErrorMessage name="name" component="div" />
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
