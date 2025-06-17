import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

type formvalue = {
  resetCode: string;
};
const VerifyCode = () => {
  const navigate = useNavigate();
  const forgetPassword = (values) => {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
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
    resetCode: Yup.string()
      .matches(/^\d{6}$/, "Code must be exactly 6 digits")
      .required("Verification code is required"),
  });
  const formik = useFormik<formvalue>({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: (value) => {
      mutate(value);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.data?.message || "Verified Successfully");
      navigate("/login");
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
        <div className=" bg-primary  p-6  rounded-3xl   md:w-[40%] lg:w-[30%] py-10">
          <h1 className="text-2xl font-semibold py-2 text-center text-main">
            Verify Your Code
          </h1>
          <h3 className="pb-4 text-center">
            Please enter the code we just send to email{" "}
          </h3>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div className="mb-5 pt-4 ">
              <label
                htmlFor="code"
                className="block mb-2 text-sm font-medium text-main ms-3"
              >
                Verification Code
              </label>
              <input
                type="text"
                inputMode="numeric"
                name="resetCode"
                id="code"
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full  input-custom ps-4 "
                required
              />
              {formik.errors.resetCode && formik.touched.resetCode && (
                <div
                  className="px-4 py-1 my-1 text-sm text-red-800 rounded-3xl bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.resetCode}
                </div>
              )}
            </div>
            <div className="flex gap-2 py-3">
              <button type="submit" className="button-custom w-[50%]  ">
                Verify Code{" "}
              </button>
              <Link to={"/forgetpassword"} className="w-[50%]">
                <button type="submit" className="button-custom     ">
                  Resend Code{" "}
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyCode;
