import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function BrandDetails() {
  const { id } = useParams();

  const Navigate = useNavigate();
  function getBrandDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }
  const { data: brands, isLoading: loadingbrands } = useQuery({
    queryKey: ["brandsDetails", id],
    queryFn: () => getBrandDetails(id),
  });
  console.log(brands?.data?.data);

  return (
    <>
      {" "}
      <div className="ms-10 my-5">
        <button
          className="button-custom  "
          onClick={() => {
            Navigate("/brands");
          }}
        >
          <i className="fa-solid fa-arrow-left me-2    " />
          Back To brands{" "}
        </button>
      </div>
      {loadingbrands ? (
        <Loading />
      ) : (
        <div className="py-2 mt-10 relative">
          <div className="container mx-auto md:px-4  px-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-main">
              Brand Details
            </h1>

            <div className="flex justify-center">
              <div className="w-full max-w-md bg-primary py-6 rounded-3xl shadow-lg border border-gray-200 hover:scale-[103%] ">
                <figure>
                  <img
                    src={brands?.data.data.image}
                    alt={brands?.data.data.name}
                    className="md:w-full h-[300px] w-[380px] object-center rounded-3xl mx-auto"
                  />
                </figure>
                <figcaption className="text-center mt-4">
                  <p className="text-2xl font-semibold text-main">
                    {brands?.data.data.name}
                  </p>
                </figcaption>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
