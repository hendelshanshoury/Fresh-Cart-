import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "./../Loading/Loading";

export default function Categories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/Categories`);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["[category]"],
    queryFn: getCategories,
  });
  console.log("branddata", data);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center md:p-5 lg:py-20 ">
          <h1 className="text-main text-center text-5xl  font-bold py-5">
            Categories
          </h1>
          <div className="flex flex-wrap justify-center md:py-5 ">
            {data?.data.data.map((Category) => (
              <div key={Category._id} className="   md:w-1/2 p-5 lg:w-1/4  ">
                <Link to={`/categoryDetails/${Category._id}`}>
                  <div className="pb-2 hover:shadow-shadow border border-main rounded-3xl shadow-2xl  hover:scale-[103%] duration-300 cursor-pointer">
                    <img
                      className="md:w-full h-[400px] w-[350px] object-center rounded-3xl"
                      src={Category.image}
                      alt={Category.name}
                    />
                    <p className="text-main text-2xl text-center font-semibold py-2">
                      {Category.name}
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
