import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "./../Loading/Loading";

export default function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["[brands]"],
    queryFn: getBrands,
  });
  console.log("branddata", data);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center md:p-5 lg:py-20 lg:px-8 ">
          <h1 className="text-main text-center text-5xl  font-bold py-3">
            Brands
          </h1>
          <div className="flex flex-wrap justify-center md:p-5 ">
            {data?.data.data.map((brand) => (
              <div key={brand._id} className="   md:w-1/2 p-5 lg:w-1/4  ">
                <Link to={`/brandDetails/${brand._id}`}>
                  <div className="pb-2 hover:shadow-shadow border border-main rounded-3xl shadow-2xl  hover:scale-[103%] duration-300 cursor-pointer">
                    <img
                      className="w-full h-[200px] object-center rounded-3xl"
                      src={brand.image}
                      alt={brand.name}
                    />
                    <p className="text-main text-2xl text-center font-semibold py-2">
                      {brand.name}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
