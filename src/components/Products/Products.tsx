import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../context/CartContext";
import { WishListContext } from "../context/WishListContext";
import Categories from "./../Categories/Categories";
import ResponsivePagination from "react-responsive-pagination";

export default function Products() {
  const { addToCart } = useContext(CartContext);
  const { addProductToWishlist, wishlistData } = useContext(WishListContext);
  console.log(addProductToWishlist);
  // console.log(wishlistData);
  const wishlistProductIds = wishlistData?.data?.data.map((item) => item.id);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [products, setProducts] = useState([]);
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(20);
  // const [sort, setSort] = useState("-ratingsAverage");
  // const [keyword, setKeyword] = useState("");
  // const [brand, setBrand] = useState("");
  // const [category, setCategory] = useState("");
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(20000);
  // console.log(brand);
  // console.log(category);

  // const [filters, setFilters] = useState({
  //   limit,
  //   sort,
  //   keyword,
  //   brand,
  //   category,
  //   minPrice,
  //   maxPrice,
  // });
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  const { data: allProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  // console.log(allProducts?.data);
  // function getProductsFilter({ queryKey }) {
  //   const [, filters] = queryKey;
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
  //     params: filters,
  //   });
  // }
  // const { data } = useQuery({
  //   queryKey: ["productsfilter", filters],
  //   queryFn: getProductsFilter,
  // });

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/Categories`);
  }
  const { data: Categories, isLoading: loadingCategory } = useQuery({
    queryKey: ["[category]"],
    queryFn: getCategories,
  });
  // console.log("Categories", Categories?.data.data);

  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  const { data: brands, isLoading: loadingBrands } = useQuery({
    queryKey: ["[brands]"],
    queryFn: getBrands,
  });

  // const handleSort = (e) => {
  //   const value = e.target.value;
  //   setSort(value);
  //   console.log(e.target.value);
  // };

  // useEffect(() => {
  //   getProductsFilter;
  // }, [page, sort]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="pb-4">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-2 p-4 lg:px-16  px-8 ">
              <form className="w-[95%] lg:w-full ">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-main sr-only "
                >
                  Search
                </label>

                <div className="relative max-w-md w-full mx-auto">
                  <input
                    type="search"
                    id="default-search"
                    placeholder="Search products..."
                    className="block w-full py-2.5 ps-10 pe-24 text-sm text-main border border-main bg-gray-50 rounded-3xl focus:ring-1 focus:ring-main focus:border-main outline-none"
                    // onChange={(e) =>
                    //   setFilters((prev) => ({
                    //     ...prev,
                    //     keyword: e.target.value,
                    //   }))
                    // }
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-main"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="absolute top-1/2 -translate-y-1/2 end-2 bg-main text-primary font-medium rounded-2xl px-4 py-1.5 text-sm hover:bg-primary border-main border hover:text-main hover:border hover:border-main transition "
                  >
                    Search
                  </button>
                </div>
              </form>

              <div className="flex flex-col gap-4 py-4 items-stretch md:flex-row md:items-center md:justify-center w-[80%] ">
                {/* Category Filter */}
                <div className="flex  md:flex-row md:items-center md:gap-3 w-full md:w-auto">
                  <label
                    htmlFor="category"
                    className="font-semibold text-main text-xl mb-1 md:mb-0 px-2"
                  >
                    Category 
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Categories</option>
                    {Categories?.data?.data.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div className="flex  md:flex-row md:items-center md:gap-3 w-full md:w-auto">
                  <label
                    htmlFor="brand"
                    className="font-semibold text-main text-xl mb-1 md:mb-0 px-2"
                  >
                    Brand
                  </label>
                  <select
                    id="brand"
                    name="brand"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Brands</option>
                    {brands?.data?.data.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div className="flex  md:flex-row md:items-center md:gap-3 w-full md:w-auto">
                  <label
                    htmlFor="sort"
                    className="font-semibold text-main text-xl mb-1 md:mb-0 px-2"
                  >
                    Sort
                  </label>
                  <select
                    id="sort"
                    name="sort"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="title">A - Z</option>
                    <option value="-price">High - Low</option>
                    <option value="-title">Z - A</option>
                    <option value="price">Low - High</option>
                    <option value="-ratingsAverage">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Products Section */}
            <div className="flex-1 p-4 px-14 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {allProducts?.data?.data?.map((product) => (
                  <div
                    key={product.id}
                    className="transform hover:scale-[104%] hover:shadow-2xs hover:rounded-3xl duration-500 overflow-hidden"
                  >
                    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                      <div className=" mx-auto bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden ">
                        <div className="relative overflow-hidden group">
                          <img
                            className="p-2 relative rounded-t-lg h-[250px] w-full object-contain "
                            src={product.imageCover}
                            alt={product.slug}
                          />
                          <div className="layer flex flex-col gap-6  cursor-pointer justify-center items-start px-2 rounded-3xl bg-primary absolute top-6  translate-x-[-35%] left-[120%] group-hover:translate-x-[-35%]  transition-transform duration-700 h-[80%] w-full text-main ">
                            <button
                              type="button"
                              className="mx-1 text-2xl cursor-pointer hover:scale-110 transition-transform"
                              onClick={() => addToCart(product.id)}
                            >
                              <i className="fa-solid fa-cart-shopping"></i>
                            </button>

                            <button
                              type="button"
                              className="mx-1 text-2xl cursor-pointer hover:scale-110 transition-transform"
                              onClick={() => addProductToWishlist(product.id)}
                            >
                              {wishlistProductIds?.includes(product.id) ? (
                                <i className="fa-solid fa-heart text-red-600"></i>
                              ) : (
                                <i className="fa-regular fa-heart"></i>
                              )}
                            </button>

                            <Link
                              to={`/productDetails/${product.id}`}
                              className=" "
                            >
                              <i className="fa-regular fa-eye  mx-1 text-2xl cursor-pointer  hover:scale-110    "></i>
                            </Link>
                          </div>
                        </div>
                        <div className="px-5 pb-5">
                          <h4 className="text-main pt-2 text-lg">
                            {product.category.name}
                          </h4>
                          <h4 className="text-xl font-semibold">
                            {product.title.split(" ", 2).join(" ")}
                          </h4>
                          <div className="flex justify-between items-center mt-2.5 mb-1">
                            {/* Rating stars */}
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => {
                                const rating = product.ratingsAverage || 0;
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
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    {fill === "half" && (
                                      <defs>
                                        <linearGradient
                                          id={`half-${i}`}
                                          x1="0"
                                          x2="100%"
                                          y1="0"
                                          y2="0"
                                        >
                                          <stop
                                            offset="50%"
                                            stopColor="#FACC15"
                                          />
                                          <stop
                                            offset="50%"
                                            stopColor="#E5E7EB"
                                          />
                                        </linearGradient>
                                      </defs>
                                    )}
                                    <path
                                      fill={
                                        fill === "yellow"
                                          ? "#FACC15"
                                          : fill === "gray"
                                          ? "#E5E7EB"
                                          : `url(#half-${i})`
                                      }
                                      d="M12 .587l3.668 7.571 8.332 1.151-6.001 5.85 1.416 8.258L12 18.896l-7.415 4.521L6 15.159 0 9.309l8.332-1.151z"
                                    />
                                  </svg>
                                );
                              })}
                              <p className="text-base text-gray-500 font-semibold">
                                ({product.quantity})
                              </p>
                            </div>
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                              {product.price} EGP
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="text-main text-lg font-semibold bg-primary w-full py-2 rounded-b-3xl"
                        >
                          <i className="fa-solid fa-cart-shopping text-xl mx-3" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ResponsivePagination
            total={totalPages}
            current={currentPage}
            // onPageChange={page => handlePageChange(page)}
            maxWidth={""}
            extraClassName="justify-content-center  "
          />
          :
        </>
      )}
    </>
  );
}
