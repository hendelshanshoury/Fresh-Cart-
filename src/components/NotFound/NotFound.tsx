import React from "react";
import { Link } from "react-router-dom";
import notfound from "../../assets/images/error1.jpg";

export default function NotFound() {
  return (
    <>
      <div className=" container flex flex-col lg:flex-row items-center justify-between  py-5 lg:pt-3 lg:px-5 ">
        <div className=" flex flex-col justify-center items-center lg:justify-start lg:items-start lg:w-[35%] ps-8 ">
          <h1 className="md:text-6xl text-5xl font-bold text-main">Oops! </h1>
          <p className="md:text-5xl text-4xl mt-4 text-main font-semibold">
            Page Not Found
          </p>
          <p className=" text-base mt-4 text-main font-semibold text-center lg:text-start">
            The page you are looking for connot be found. take a break before
            trying agin{" "}
          </p>
          <Link
            to="/"
            className="mt-8 inline-block px-2 w-fit py-2 button-custom  "
          >
            Go Back Home Page
          </Link>
        </div>
        <div className="lg:w-[50%] pt-10 lg:pt-0">
          <img src={notfound} alt="w-full h-auto" />
        </div>
      </div>
    </>
  );
}
