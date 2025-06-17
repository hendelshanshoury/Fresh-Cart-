import React from "react";
import banner1 from "../../assets/images/grocery-banner.png";
import banner2 from "../../assets/images/grocery-banner-2.jpeg";

export default function SecondSliderHome() {
  return (
    <>
      <section>
        <div className="py-5 mx-auto  px-5 md:px-0 ">
          <div className="flex flex-col md:flex-row gap-4 justify-between ">
            <div className="lg:w-[49%] md:w-[50%]  w-full">
              <div className="img1 relative">
                <img
                  src={banner1}
                  alt="banner 1"
                  className="  w-full h-[25vh] md:h-[30vh] lg:h-auto object-cover rounded-lg "
                />
                <div className="absolute md:top-12  top-9 left-3 ">
                  <h2 className="text-2xl font-bold  text-gray-800">
                    Fruits & Vegetables
                  </h2>
                  <p className="text-gray-500 font-semibold mt-1">
                    Get Upto 30% Off
                  </p>

                  <button
                    type="submit"
                    className="button-custom my-2"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:w-[49%] md:w-[50%] w-full">
              <div className="img1 relative">
                <img
                  src={banner2}
                  alt="banner 1"
                  className="  w-full h-[25vh] md:h-[30vh] lg:h-auto object-cover rounded-lg "
                />
                <div className="absolute md:top-12  top-9 left-3 ">
                  <h2 className="text-2xl font-bold  text-gray-800">
                    Freshly Baked Buns
                  </h2>
                  <p className="text-gray-500 font-semibold mt-1">
                    Get Upto 25% Off
                  </p>

                
                  <button
                    type="submit"
                    className="button-custom my-2"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
