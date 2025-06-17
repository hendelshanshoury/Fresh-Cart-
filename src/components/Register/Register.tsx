import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/images/google-icon-logo-svgrepo-com.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";

type FormValues = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

export default function Register() {
  const navigate = useNavigate();
  let { userToken, setUserToken } = useContext(UserContext);
  // ?=====================register================
  const register = (values: FormValues) => {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      values
    );
  };
  const { mutate, isSuccess, isError, data, error } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success("Account created successfully!");
      // localStorage.setItem("userToken", data.token);
      localStorage.setItem("userToken", data.data.token);
      setUserToken(data.data.token);
      navigate("/login");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong during registration."
      );
    },
  });

  console.log("data", data);
  console.log("mutate", mutate);
  console.log("isSuccess", isSuccess);

  // ?=====================validate================
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
  const phoneRegex = /^01[0125][0-9]{8}$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "min is 3")
      .max(15, "max is 15")
      .required("Name is required"),

    email: Yup.string()
      .matches(emailRegex, "Email must be in the format: example@domain.com")
      .required("Email is required"),

    password: Yup.string()
      .matches(
        passwordRegex,
        "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
      )
      .required("Password is required"),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("repassword is required"),

    phone: Yup.string()
      .matches(phoneRegex, "we need egyption phone number")
      .required("Phone number is required"),
  });
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });


  return (
    <>
      <div className=" flex  lg:w-[70%] lg:mx-auto mt-4 ">
        <div className=" w-full md:w-[55%] mx-4 md:mx-0 bg-primary py-5 rounded-3xl md:rounded-bl-3xl md:rounded-tl-3xl md:rounded-br-none md:rounded-tr-none px-4 lg:px-8">
          <h2 className="text-3xl text-main font-bold pb-2">Create Account </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3 pt-4">
              <label
                htmlFor="name"
                className="ps-3 block mb-2 text-sm font-medium text-main"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full input-custom ps-4"
                placeholder="Enter your full name"
                required
              />
              {formik.errors.name && formik.touched.name && (
                <div
                  className="px-4 py-1 my-1 text-sm text-red-800 rounded-3xl bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.name}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="ps-3 block mb-2 text-sm font-medium text-main"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full input-custom ps-4"
                placeholder="name@example.com"
                required
              />
              {formik.errors.email && formik.touched.email && (
                <div
                  className="px-4 py-1 my-1 text-sm text-red-800 rounded-3xl bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="phone"
                className="ps-3 block mb-2 text-sm font-medium text-main"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full input-custom ps-4"
                placeholder="Enter your phone number"
                required
              />
              {formik.errors.phone && formik.touched.phone && (
                <div
                  className="px-4 py-1 my-1 text-sm text-red-800 rounded-3xl bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.phone}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="ps-3 block mb-2 text-sm font-medium text-main"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full input-custom ps-4"
                placeholder="Create password"
                required
              />
              {formik.errors.password && formik.touched.password && (
                <div
                  className="px-4 py-1 my-1 text-sm text-red-800 rounded-3xl bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="rePassword"
                className="ps-3 block mb-2 text-sm font-medium text-main"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="rePassword"
                name="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full input-custom ps-4"
                placeholder="Re-enter password"
                required
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <div
                  className="px-4 py-1 my-1 text-sm text-red-800 rounded-3xl bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.rePassword}
                </div>
              )}
            </div>

            <div className="flex items-start justify-between mb-5 ps-3 ">
              <div>
                <div className="flex items-center  h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                  <label
                    htmlFor="remember"
                    className=" ps-3  text-sm font-medium text-main"
                  >
                    I agree with Terms and Conditions
                  </label>
                </div>
              </div>
            </div>
            {/* <Link to={""}> */}
            <button type="submit" className="button-custom w-full">
              Create Account
            </button>
            {/* </Link> */}
          </form>
          <p className="pt-3 text-center font-medium">
            Already have an account ?{" "}
            <Link to={"/login"} className="text-main underline">
              login{" "}
            </Link>{" "}
          </p>
          <div className="flex items-center gap-4 py-3">
            <div className="flex-grow h-px bg-main" />
            <span className="text-main text-xl pb-2 ">or</span>
            <div className="flex-grow h-px bg-main" />
          </div>

          <button
            type="submit"
            className="button-custom w-full flex justify-center items-center"
          >
            {/* <i className="fa-brands fa-google-plus-g text-lg me-2 pt-1"></i> */}
            <img src={google} className="w-[20px] me-3" alt="Icon" />
            Sign in with google{" "}
          </button>
        </div>
        <div className="w-[50%] px-6 text-center bg-main hidden md:flex text-white justify-center items-center rounded-br-3xl rounded-tr-3xl">
          <div>
            <h2 className=" text-4xl font-bold py-4">Welcome Back !</h2>
            <p>
              To Keep connected with us please login with your personal info{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
