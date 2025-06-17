import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

type formvalue = {
  email: string;
};
const ForgetPassword = () => {
  const navigate = useNavigate();
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const forgetPassword = (values) => {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      values
    );
  };
  const { mutate, isSuccess, isError, data, error } = useMutation({
    mutationFn: forgetPassword,
  });
  console.log("isSuccess", isSuccess);
  console.log("isError", isError);
  console.log("data", data);
  console.log("error", error);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegex, "Email must be in the format: example@domain.com")
      .required("Email is required"),
  });
  const formik = useFormik<formvalue>({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.data?.message || "Reset code sent to your email");
      navigate("/verifycode");
    }

    if (isError) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong during registration."
      );
    }
  }, [isSuccess, isError, error]);

  return (
    <>
      <div className="container flex justify-center items-center mx-auto  py-10 rounded-3xl">
        <div className=" bg-primary  p-6 mx-auto rounded-3xl w-[90%] md:w-[60%] lg:w-[35%] py-10">
          <h2 className="text-2xl font-semibold py-2 text-center text-main">
            Forgot Your Password ?
          </h2>
          <h3 className="pb-4 text-center">
            No worries, just enter your email and we will help you reset it.
          </h3>
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="mb-5 pt-4 ">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-main ms-3"
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
              {formik.errors.email && formik.touched.email && (
                <div
                  className="px-4 py-1 my-1 text-sm text-red-800 rounded-3xl bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.email}
                </div>
              )}
            </div>
            <button type="submit" className="button-custom w-full ">
              Reset Password
            </button>
          </form>
          <p className="font-medium py-4 ms-3">
            Go back to the{" "}
            <Link to={"/login"} className="text-main hover:underline">
              Login
            </Link>{" "}
            page{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
