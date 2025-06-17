import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

const AllOrder = () => {
  //   const { id } = jwtDecode(localStorage.getItem("userToken"));

  function getAllOrders() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders`);
  }

  const { data: allorders, isLoading: loadingAllOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  console.log(allorders?.data?.data);

  //   const orders = allorders?.data || [];

  return (
    <>
      {loadingAllOrders ? (
        <Loading />
      ) : (
        <section className="bg-gray-50 py-10">
          <div className="container mx-auto px-4 md:w-11/12">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <h2 className="text-3xl font-bold text-gray-800">My Orders</h2>
              <Link to="/" className="button-custom">
                Back to Home
              </Link>
            </div>
            <div className="address">
              <h2 className="md:text-3xl text-xl py-5 font-medium text-center text-main">
                {" "}
                Your order has been confirmed successfully!
              </h2>

              {allorders?.data?.data.map((order) => (
                <div
                  key={order._id}
                  className="bg-primary shadow-md rounded-lg p-4 mb-10"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-center border-main border-b pb-4 mb-4 flex-wrap gap-2">
                    <div>
                      <h3 className="text-xl font-semibold text-main">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-sm text-left text-main">
                      <p>
                        <strong>Status:</strong>{" "}
                        {order.isDelivered ? (
                          <span className="text-emerald-600">Delivered</span>
                        ) : (
                          <span className="text-yellow-500">In Transit</span>
                        )}
                      </p>
                      <p>
                        <strong>Payment:</strong>{" "}
                        {order.isPaid ? (
                          <span className="text-emerald-600">Paid</span>
                        ) : (
                          <span className="text-red-500">Unpaid</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {order.cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex gap-4 border-main border rounded-md p-3 shadow-sm bg-gray-50 items-center"
                      >
                        <div className="relative w-30">
                          <img
                            src={item.product?.imageCover}
                            alt={item.product?.title}
                            className="w-full h-full object-contain rounded-md"
                          />
                          {item.count > 1 && (
                            <span className="absolute -top-2 -right-2 bg-main text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                              {item.count}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-md font-semibold text-gray-700">
                            {item.product?.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {item.product?.brand?.name}
                          </p>
                          <p className="text-sm font-bold text-main">
                            {item.price} EGP
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Products */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* {order?.shippingAddress?.map((address) => (
                      <div
                        key={address._id}
                        className="flex gap-4 border-main border rounded-md p-3 shadow-sm bg-gray-50 items-center"
                      >
                        <div className="mt-6 border-main border-t pt-4 grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">
                              Shipping Address
                            </h4>
                            <p className="text-sm text-main">
                              {address.shippingAddress.details},{" "}
                              {address.shippingAddress.city}
                            </p>
                            <p className="text-sm text-main">
                              Phone: {address.shippingAddress.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))} */}
                    <div>
                      <h4 className="text-xl font-semibold text-main mb-2">
                        Payment & Total
                      </h4>
                      <p className="text-lg text-gray-800 ">
                        Payment Method:{" "}
                        <span className="font-bold text-main">
                          {order.paymentMethodType}{" "}
                        </span>
                      </p>
                      <p className="text-lg text-gray-800">
                        Total Price:{" "}
                        <span className="font-bold text-main">
                          {order.totalOrderPrice}EGP
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AllOrder;
