import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const AddressCheckoutForm = () => {
  return (
    <>
      <div>
        <h1 className="text-main text-2xl px-4 font-semibold pb-8 lg:px-12">
          Pay your order to get it ready!
        </h1>
        <div className="flex justify-center items-center gap-3 mb-6">
          <Link to={"/paybycash"}>
            <button className="button-custom" onClick={(e) => {}}>
              pay  Cash
            </button>
          </Link>
          <Link to={"/paybyonline"}>
            <button className="button-custom" onClick={(e) => {}}>
              pay  Online
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddressCheckoutForm;
