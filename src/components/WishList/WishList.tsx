import React, { useContext, useEffect } from "react";
import { WishListContext } from "../context/WishListContext";
import Loading from "../Loading/Loading";
import { CartContext } from "../context/CartContext";

const WishList = () => {
  const {
    wishlistData,
    deleteWishlistItem,
    addProductToWishlist,
    getwishlistLoading,
  } = useContext(WishListContext);
  const { addToCart } = useContext(CartContext);

  console.log(wishlistData?.data); // This correctly logs the wishlist array
  useEffect(() => {
    if (wishlistData.data?.data?.data) {
      wishlistData;
    }
  }, [wishlistData.data]);
  return (
    <>
      <div className="  lg:py-20 lg:px-5 px-5 md:px-0 ">
        <h1 className="text-main text-center text-5xl  font-bold pb-3">
          WishList
        </h1>
        <h2 className="text-main  text-2xl  font-semibold py-3 ms-4 ">
          Total number of items:{" "}
          <span className="text-main">{wishlistData?.data?.count}</span>
        </h2>

        {getwishlistLoading ? (
          <Loading />
        ) : (
          <div className=" w-full  ">
            {wishlistData?.data?.data.map((item) => (
              <div key={item._id} className="">
                <div className="w-full bg-primary my-3 rounded-3xl ">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 border border-main rounded-3xl p-4">
                    <div className="w-full md:w-[30%] lg:w-[40%]">
                      <img
                        className="p-2 rounded-3xl h-[270px] w-full object-contain"
                        src={item.imageCover}
                        alt={item.slug}
                      />
                    </div>

                    <div className="w-full md:w-[30%] lg:w-[30%] flex flex-col items-center text-center">
                      <h4 className="text-main pt-2 text-xl">
                        {item.category.name}
                      </h4>
                      <h4 className="text-xl font-semibold">
                        {item.title.split(" ", 2).join(" ")}
                      </h4>

                      {/* تقييم */}
                      <div className="flex items-center justify-center mt-2 space-x-1 rtl:space-x-reverse">
                        {[...Array(5)].map((_, i) => {
                          const rating = item.ratingsAverage || 0;
                          const fullStars = Math.floor(rating);
                          const hasHalfStar = rating - fullStars >= 0.5;

                          let fill = "gray";
                          if (i < fullStars) fill = "yellow";
                          else if (i === fullStars && hasHalfStar)
                            fill = "half";

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
                                    <stop offset="50%" stopColor="#FACC15" />
                                    <stop offset="50%" stopColor="#E5E7EB" />
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
                        <p className="text-base text-gray-500 font-semibold ms-2">
                          ({item.quantity})
                        </p>
                      </div>

                      {/* السعر */}
                      <div className="py-2">
                        <span className="text-xl font-semibold text-gray-900">
                          {item.price} EGP
                        </span>
                      </div>
                    </div>

                    <div className="w-fit lg:w-[30%] flex flex-col items-center gap-2">
                      <button
                        className="button-custom w-full lg:w-auto"
                        onClick={() => addToCart(item._id)}
                      >
                        <i className="fa-solid fa-cart-shopping me-2" />
                        Add To Cart
                      </button>{" "}
                      <button
                        className="button-custom w-full lg:w-auto"
                        onClick={() => deleteWishlistItem(item._id)}
                      >
                        <i className="fa-solid fa-trash me-2 text-red-500"></i>{" "}
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WishList;
