import React from "react";
import MainSlider from "./MainSlides";
import CategorySlider from "./CategorySlider";
import Testimonial from "../Testimonial/Testimonial";
import Products from "../Products/Products";
import SecondSliderHome from "./SecondSliderHome";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <SecondSliderHome />
      <Products />

      <Testimonial />

      {/*=================================products ========================================  */}
    </>
  );
}
