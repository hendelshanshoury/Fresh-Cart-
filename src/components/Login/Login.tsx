import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";

type formvalue = {
  email: string;
  password: string;
};
export default function Login() {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
  const navigate = useNavigate();
  const login = (values: formvalue) => {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      values
    );
  };
  const { mutate, isSuccess, isError, data, error } = useMutation({
    mutationFn: login,
  });
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegex, "Email must be in the format: example@domain.com")
      .required("Email is required"),

    password: Yup.string()
      .matches(
        passwordRegex,
        "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
      )
      .required("Password is required"),
  });
  const formik = useFormik<formvalue>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Signed in successfully!");
      const token = data?.data?.token;
      if (token) {
        localStorage.setItem("userToken", token);
      }
      navigate("/home");
    }

    if (isError) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
      console.log(error?.response?.data?.message);
    }
  }, [isSuccess, isError, error, data, navigate]);

  return (
    <>
      <div className=" flex  lg:w-[65%] lg:mx-auto lg:mt-4">
        <div className=" w-full md:w-[55%] mx-4 md:mx-0 bg-primary py-10 rounded-3xl md:rounded-bl-3xl md:rounded-tl-3xl md:rounded-br-none md:rounded-tr-none px-4 lg:px-8">
          <h2 className="text-3xl text-main font-bold">Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5 pt-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-main"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full  input-custom ps-4 "
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-main"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full  input-custom ps-4"
                required
              />
            </div>
            <div className="flex items-start justify-between mb-5 ">
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
                    className="ms-2 text-sm font-medium text-main"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <Link to={"/forgetpassword"}>
                <p className="text-sm font-medium text-main pb-3 hover:underline">
                  Forget Password ?
                </p>
              </Link>
            </div>
            <button type="submit" className="button-custom w-full">
              Log in
            </button>
          </form>

          <p className="py-5 text-center font-medium">
            Don't have an account ?{" "}
            <Link to={"/"} className="text-main underline">
              Create Account
            </Link>{" "}
          </p>

          <div className="flex items-center gap-4 pt-2 ">
            <div className="flex-grow h-px bg-main" />
            <span className="text-main text-sm pb-2 ">
              or , use social media to log in
            </span>
            <div className="flex-grow h-px bg-main" />
          </div>

          <ul className="flex  py-4 list-none  justify-center">
            <li className="r mx-2 hover:cursor-pointer hover:shadow-input">
              <a
                href="#"
                className=" anchr w-10 h-10 bg-white flex justify-center items-center   text-main rounded-full hover:bg-main hover:text-primary-light"
              >
                <i className="fa-brands fa-facebook-f text-lg  "></i>
              </a>
            </li>
            <li className="r mx-2">
              <a
                href="#"
                className=" anchr w-10 h-10 bg-primary-light flex justify-center items-center   text-main rounded-full hover:bg-main hover:text-primary-light"
              >
                <i className="fa-brands fa-twitter text-lg "></i>
              </a>
            </li>
            <li className="r mx-2">
              <a
                href="#"
                className=" anchr w-10 h-10 bg-primary-light flex justify-center items-center   text-main rounded-full hover:bg-main hover:text-white"
              >
                <i className="fa-brands fa-google-plus-g text-lg "></i>
              </a>
            </li>
            <li className=" mx-2">
              <a
                href="#"
                className=" anchr w-10 h-10 bg-white flex justify-center items-center   text-main rounded-full hover:bg-main hover:text-white"
              >
                <i className="fa-brands fa-pinterest text-lg "></i>
              </a>
            </li>
          </ul>
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
