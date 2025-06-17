import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import { CartContext } from "./../context/CartContext";
import Loading from "../Loading/Loading";
import { WishListContext } from "../context/WishListContext";

const ProductDetails = () => {
  let { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState(null);
  let { addToCart } = useContext(CartContext);
  const { wishlistData } = useContext(WishListContext);

  const getProductDetails = (productId) => {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
  };
  let { data, isLoading } = useQuery({
    queryKey: [["specificProduct", id]],
    queryFn: () => getProductDetails(id),
    enabled: !!id,
  });
  console.log(data);

  console.log("data", data?.data.data);

  const Navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="ms-10 my-5">
        <button
          className="button-custom  "
          onClick={() => {
            Navigate("/products");
          }}
        >
          <i className="fa-solid fa-arrow-left me-2    " />
          Back To Products{" "}
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="Py-20 lg:px-10 mx-auto p-4 ">
          <div className="flex-col justify-center  py-6 items-center rounded-3xl  bg-primary lg:flex-row lg:flex  ">
            <div className="lg:w-[45%] w-full ">
              {data?.data?.data?.images && (
                <>
                  {" "}
                  <div className=" hidden lg:flex  md:flex-row  ">
                    {/* الصور المصغرة على الجنب */}

                    <Swiper
                      onSwiper={setThumbsSwiper}
                      direction="vertical"
                      spaceBetween={1}
                      slidesPerView={4}
                      watchSlidesProgress
                      freeMode
                      modules={[Thumbs]}
                      className="w-[90px] h-[500px] hidden md:block"
                    >
                      {data.data.data.images.map((image, index) => (
                        <SwiperSlide key={index} className="m-0 p-0 ">
                          <img
                            src={image}
                            alt={`Thumb ${index}`}
                            className="w-full h-[100px] object-cover border border-main rounded-xl cursor-pointer m-0"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    {/* الصورة الكبيرة */}
                    <Swiper
                      loop
                      spaceBetween={4}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[Thumbs]}
                      className="w-full max-w-[500px] h-[500px] rounded overflow-hidden m-0 shadow-2xl"
                    >
                      {data.data.data.images.map((image, index) => (
                        <SwiperSlide key={index} className="m-0 p-0 ">
                          <img
                            src={image}
                            alt={`Product ${index}`}
                            className="w-full h-full object-cover rounded-2xl "
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="lg:hidden flex  flex-col  ">
                    {/* الصورة الكبيرة */}
                    <Swiper
                      loop
                      spaceBetween={4}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[Thumbs]}
                      className="w-full max-w-[500px] h-[350px] rounded-3xl overflow-hidden m-0 shadow-2xl"
                    >
                      {data.data.data.images.map((image, index) => (
                        <SwiperSlide key={index} className="m-0 p-0 ">
                          <img
                            src={image}
                            alt={`Product ${index}`}
                            className="w-full h-full object-contain rounded-2xl "
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    {/* الصور المصغرة على الجنب */}

                    <Swiper
                      onSwiper={setThumbsSwiper}
                      direction="horizontal"
                      spaceBetween={1}
                      slidesPerView={4}
                      watchSlidesProgress
                      freeMode
                      modules={[Thumbs]}
                      className=" max-w-[450px]  md:max-w-[500px] h-[160px] hidden md:block  "
                    >
                      {data.data.data.images.map((image, index) => (
                        <SwiperSlide
                          key={index}
                          className="m-0 p-0   py-4 px-px "
                        >
                          <img
                            src={image}
                            alt={`Thumb ${index}`}
                            className="w-full h-[140px] object-cover  border border-main rounded-xl cursor-pointer m-0"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </>
              )}

              {/* <img src={data?.data.data.imageCover} alt={data?.data.data.title} /> */}
            </div>
            <div className="lg:w-[50%] w-full py-6 px-4 lg:ps-6 ">
              <h2 className="text-main font-semibold text-4xl pt-3">
                {" "}
                {data?.data.data.title}
              </h2>
              <div className="flex  items-center">
                <div className="flex items-center space-x-1 py-4 rtl:space-x-reverse">
                  {[...Array(5)].map((_, i) => {
                    const rating = data?.data.data.ratingsAverage || 0;
                    const fullStars = Math.floor(rating);
                    const hasHalfStar = rating - fullStars >= 0.5;

                    let fill = "gray"; // default = فارغة

                    if (i < fullStars) {
                      fill = "yellow";
                    } else if (i === fullStars && hasHalfStar) {
                      fill = "half"; // نستخدم تدرج لوني
                    }

                    return (
                      <svg
                        key={i}
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {fill === "half" && (
                          <defs>
                            <linearGradient
                              id={`half-gradient-${i}`}
                              x1="0"
                              x2="100%"
                              y1="0"
                              y2="0"
                            >
                              <stop offset="50%" stopColor="#FACC15" />{" "}
                              {/* yellow-300 */}
                              <stop offset="50%" stopColor="#E5E7EB" />{" "}
                              {/* gray-200 */}
                            </linearGradient>
                          </defs>
                        )}
                        <path
                          fill={
                            fill === "yellow"
                              ? "#FACC15"
                              : fill === "gray"
                              ? "#E5E7EB"
                              : `url(#half-gradient-${i})`
                          }
                          d="M12 .587l3.668 7.571 8.332 1.151-6.001 5.85 1.416 8.258L12 18.896l-7.415 4.521L6 15.159 0 9.309l8.332-1.151z"
                        />
                      </svg>
                    );
                  })}

                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-1">
                    {data?.data.data.ratingsAverage}
                  </span>
                </div>
                <div>
                  <p className="text-base ms-2 text-gray-500 font-semibold">
                    ({data?.data.data.quantity})
                  </p>
                </div>
                <div>
                  <p className="text-lg ms-1 text-gray-500 font-medium">
                    (Reviews)
                  </p>
                </div>
                <div>
                  <p className="text-lg ms-1 text-main font-semibold">
                    | In Stock 9{" "}
                  </p>
                </div>
                <div></div>
              </div>
              <h3 className="text-3xl py-1">{data?.data.data.price} EGP</h3>
              <h3 className="pt-2 text-xl text-gray-600">
                {data?.data.data.description}
              </h3>

              <h3 className="text-xl ps-2 pt-5 text-main">
                {data?.data.data.category.name}
              </h3>
              <div className="flex pt-8 justify-center">
                <div>
                  <button
                    onClick={() => addToCart(data?.data.data.id)}
                    className="w-[100%] button-custom  flex items-center justify-center gap-2 text-main bg-primary-light  text-lg font-semibold"
                  >
                    <i className="fa-solid fa-cart-shopping text-xl" />
                    Add To Cart{" "}
                  </button>
                </div>

                <div>
                  <button className=" ms-5 flex items-center justify-center text-red-500 hover:text-red-600 transition bg-primary-light border border-red-500 hover:bg-red-50 px-4 py-2 rounded-2xl shadow">
                    <i className="fa-solid fa-heart text-red-600" />
                    {wishlistData?.data?.count > 0 && (
                      <span className="absolute right-[30px] top-[-8px]  bg-main p-px px-1 w-8 h-8 rounded-full text-center text-lg text-white">
                        {wishlistData?.data?.count}
                      </span>
                    )}{" "}
                  </button>
                </div>
              </div>
              <div className="border my-8 rounded mx-auto md:w-[80%] ">
                <div className="border-b p-2 flex items-center">
                  <i className="fa-solid fa-truck-fast text-2xl mx-4 text-main" />
                  <div>
                    <h6 className="text-base font-semibold">Free Delivery</h6>
                    <small className="text-sm text-gray-600">
                      Enter your postal code for delivery availability
                    </small>
                  </div>
                </div>
                <div className="p-2 flex items-center">
                  <i
                    className="fa-solid fa-arrows-rotate text-2xl mx-4 text-main"
                    aria-hidden="true"
                  />
                  <div className="ms-2">
                    <h6 className="text-base font-semibold">Return Delivery</h6>
                    <small className="text-sm text-gray-600">
                      Free 30-day Delivery Returns Details
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
