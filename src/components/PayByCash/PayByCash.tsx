import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { CartContext } from "../context/CartContext";
import { log } from "console";
import { Link } from "react-router-dom";
const PayByCash = () => {
  let { PayByCash, updateCart } = useContext(CartContext);
  const validationSchema = Yup.object({
    details: Yup.string().required("Address Details is Required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(
        /^(\+2){0,1}(01)[0125][0-9]{8}$/gm,
        "Enter a valid phone number"
      ),
    city: Yup.string().required("city is required"),
  });
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const cartId = updateCart?.data?.data.cartId;
      if (!cartId) return;
      PayByCash({ cartId, values });
    },
  });
  return (
    <>
      <div>
        <h1 className="text-main text-2xl px-4 font-semibold pb-8 lg:px-12">
          Pay your order to get it ready!
        </h1>
        <div className="flex justify-center items-center gap-3 mb-6">
          <Link to={"/paybycash"}>
            <button className="button-custom" onClick={(e) => {}}>
              pay Cash
            </button>
          </Link>
          <Link to={"/paybyonline"}>
            <button className="button-custom" onClick={(e) => {}}>
              pay Online
            </button>
          </Link>
        </div>
        <div className="w-[80%] mx-auto md:w-[60%] lg:w-[40%]">
          <form method="post" onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="details"
                className="block mb-2 text-sm font-medium text-main"
              >
                Enter Address Details{" "}
              </label>
              <input
                type="details"
                id="details"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full  input-custom ps-4"
                required
              />
              {formik.errors.details && formik.touched.details && (
                <div
                  className="px-4 py-1 my-1 text-sm text-red-800 rounded-3xl bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.details}
                </div>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-main"
              >
                Your Phone{" "}
              </label>
              <input
                type="phone"
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full  input-custom ps-4"
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
            <div className="mb-5">
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-main"
              >
                Address City{" "}
              </label>
              <input
                type="city"
                id="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full  input-custom ps-4"
                required
              />
              {formik.errors.city && formik.touched.city && (
                <div
                  className="px-4 py-1 my-1 text-sm text-red-800 rounded-3xl bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.city}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="button-custom w-[50%] mx-auto flex justify-center "
            >
              {" "}
              Pay By Cash
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PayByCash;
