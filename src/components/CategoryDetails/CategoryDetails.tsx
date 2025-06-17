import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function CategoryDetails() {
  const { id } = useParams();
  // const [category, setCategory] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const Navigate = useNavigate();
  function getCategoriyDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/Categories/${id}`);
  }
  const { data: Categories, isLoading: loadingCategory } = useQuery({
    queryKey: ["CategoryDetails", id],
    queryFn: () => getCategoriyDetails(id),
  });
  console.log(Categories?.data?.data);

  loadingCategory;
  return (
    <>
      {" "}
      <div className="ms-10 my-5">
        <button
          className="button-custom  "
          onClick={() => {
            Navigate("/categories");
          }}
        >
          <i className="fa-solid fa-arrow-left me-2    " />
          Back To category{" "}
        </button>
      </div>
      {loadingCategory ? (
        <Loading />
      ) : (
        <div className="py-2 mt-10 relative">
          <div className="container mx-auto md:px-4  px-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-main">
              Category Details
            </h1>

            <div className="flex justify-center">
              <div className="w-full max-w-md bg-primary p-6 rounded-3xl shadow-lg border border-gray-200 hover:scale-[103%] ">
                <figure>
                  <img
                    src={Categories?.data.data.image}
                    alt={Categories?.data.data.name}
                    className="md:w-full h-[400px] w-[350px] object-center rounded-3xl mx-auto"
                  />
                </figure>
                <figcaption className="text-center mt-4">
                  <p className="text-2xl font-semibold text-main">
                    {Categories?.data.data.name}
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
