import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
const CategorySlider = () => {
  const [Categories, setCategories] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["[CategorySlider]"],
    queryFn: getCategories,
  });
  console.log(data?.data);
  console.log(isLoading);

  // if (isLoading) {
  //     return <Loading />;
  // }

  return (
    <>
      <p className="text-center text-3xl pt-5 text-main font-bold">
        Shop Popular Categories
      </p>

      <Slider {...settings}>
        {data?.data?.data?.map((category, index) => (
          <div key={index} className=" px-1 lg:px-3 my-5">
            <div className="bg-primary-light shadow-lg rounded-2xl my-5 transition hover:shadow-2xl ">
              <img
                src={category.image}
                alt={category.name}
                // className="w-full h-[200px] object-center"

                className="w-full  h-[250px] lg:h-[330px] object-center mx-auto rounded-t-2xl"
              />
              <p className="text-main text-lg md:text-xl p-4 font-semibold text-center">
                {category.name}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default CategorySlider;
