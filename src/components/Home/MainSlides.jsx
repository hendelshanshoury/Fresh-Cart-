import React from "react";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import banner1 from "../../assets/images/slider-2.jpeg";
import banner2 from "../../assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="flex pb-6 ">
        <div className="w-[65%]">
          <Slider {...settings}>
            <img
              src={slide1}
              className=" w-full h-[500px] md:h-[600px]"
              alt="slide1"
            />
            <img
              src={slide2}
              className=" w-full h-[500px] md:h-[600px]"
              alt="slide2"
            />
            <img
              src={slide3}
              className=" w-full h-[500px] md:h-[600px]"
              alt="slide3"
            />
          </Slider>
        </div>
        <div className="w-[40%] flex flex-col">
          <img
            src={banner1}
            className=" w-full h-[250px] md:h-[300px]"
            alt="banner1"
          />
          <img
            src={banner2}
            className=" w-full h-[250px] md:h-[300px]"
            alt="banner2"
          />
        </div>
      </div>
    </>
  );
}
