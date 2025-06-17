import React, { useContext, useEffect } from "react";
import { useCartData } from "../../Hooks/UseCart";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Loading from "../Loading/Loading";

export default function Cart() {
  // const { data, isLoading, error } = useCartData();
  // const updateCart?.data?.data?.products = updateCart?.data?.data?.products || [];

  let {
    updateCart,
    addToCartStatus,
    deleteProductFromCart,
    updateProductcountToCart,
    deleteAllCart,
  } = useContext(CartContext);
  console.log("updateCart", updateCart);
  console.log("updateCart", updateCart?.data?.data?.data?.products);
  console.log("deleteAllCart", deleteAllCart);

  console.log(deleteProductFromCart);
  useEffect(() => {
    if (updateCart.data?.data?.data) {
      updateCart;
    }
  }, [updateCart.data]);
  return (
    <>
      {addToCartStatus.isLoading ? (
        <Loading />
      ) : (
        <div className="container px-10 md:p-5 lg:py-20 lg:px-5">
          <div className="flex flex-col text-center md:text-start md:flex-row justify-between items-center">
            <div className="py-4">
              <h3 className="text-4xl  font-semibold text-main py-1">
                Shop Cart:{" "}
              </h3>
              <h6 className="text-main  text-2xl font-semibold py-3">
                <span className="text-gray-700">Total Cart Price: </span>
                {updateCart?.data?.data?.data?.totalCartPrice} EGP
              </h6>
            </div>
            <button className=" button-custom mb-2 ">
              <Link className=" text-lg" to={"/addresscheckoutform"}>
                Checkout
                <i className="fa-solid fa-basket-shopping fa-lg ms-2"></i>
              </Link>
            </button>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-base text-white uppercase bg-main">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-primary">
                {updateCart?.data?.data?.data?.products.map((item, index) => (
                  <tr key={index} className="border border-main">
                    <td className="p-4 w-[30%]">
                      <img
                        src={item.product.imageCover}
                        className="p-2 rounded-3xl h-[250px] w-full object-contain"
                        alt={item.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 w-1/5 font-semibold text-main text-lg">
                      {item.product.title.split(" ", 2).join(" ")}
                    </td>
                    <td className="px-6 py-4 w-1/5">
                      <div className="flex items-center">
                        <button
                          // disabled={item.count === 1}
                          onClick={() => {
                            if (item.count === 1) {
                              updateProductcountToCart(
                                item.product.id,
                                item.count - 1
                              );
                            } else {
                              deleteProductFromCart(item.product.id);
                            }
                          }}
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>

                        <div>
                          <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {item.count}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            updateProductcountToCart(item.product.id, item.count + 1);
                          }}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="w-1/5 px-6 py-4 font-semibold text-main text-lg">
                      {item.price * item.count} EGP
                    </td>
                    <td className="px-2 py-4 w-1/5">
                      <button
                        onClick={() => {
                          deleteProductFromCart(item._id);
                        }}
                        className="text-red-600 hover:underline text-lg flex items-center cursor-pointer "
                      >
                        <i className="fa-solid fa-trash me-2"></i>{" "}
                        <span>Remove</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="block md:hidden space-y-4">
            {updateCart?.data?.data?.data?.products.map((item, index) => (
              <div
                key={index}
                className="border border-main rounded-xl p-4 bg-primary"
              >
                <div className="flex gap-4 justify-around items-center">
                  <img
                    src={item.product.imageCover}
                    className="h-[200px] w-[200px] object-contain rounded-lg"
                    alt={item.product.title}
                  />
                  <div className="flex flex-col">
                    <h2 className="text-main font-semibold text-lg mb-1 ">
                      {item.product.title.split(" ", 2).join(" ")}
                    </h2>
                    <p className="text-main text-base mb-1">
                      <span className="text-gray-700 me-2">Quantity: </span>
                      <strong>{item.count}</strong>
                    </p>
                    <p className="text-main text-base mb-2">
                      <span className="text-gray-700 me-2">Price:</span>
                      <strong>{item.price * item.count} EGP</strong>
                    </p>
                    <div className="flex flex-col items-start justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          // disabled={item.count === 1}
                          onClick={() => {
                            if (item.count === 1) {
                              updateProductcountToCart(
                                item.product.id,
                                item.count - 1
                              );
                              console.log(item.product.id);
                            } else {
                              deleteProductFromCart(item.product.id);
                            }
                          }}
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>

                        <div>
                          <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {item.count}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            updateProductcountToCart(
                              item.product.id,
                              item.count + 1
                            );
                          }}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() => deleteProductFromCart(item.product.id)}
                        className="text-red-500 text-base hover:underline cursor-pointer py-2"
                      >
                        <i className="fa-solid fa-trash "></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center py-8">
            {" "}
            <button className="button-custom  " onClick={() => deleteAllCart}>
              Clear Your Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
