import axios from "axios";
import React, { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export let CartContext = createContext(null);

const headers = {
  token: localStorage.getItem("userToken"),
};

const CartContextProvider = ({ children }) => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  // ================== Display User Cart ==================
  function updateUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers,
    });
  }

  const updateCart = useQuery({
    queryKey: ["cart"],
    queryFn: updateUserCart,
  });

  // ================== Add Product to Cart ==================
  function addProductToCart(productId) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId },
      { headers }
    );
  }

  const addMutation = useMutation({
    mutationFn: (productId: string) => addProductToCart(productId),
    onSuccess: (data) => {
      toast.success(`${data?.data?.message}`);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console.log("Product added to cart:", data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    },
  });

  // ================== Update Product Count in Cart ==================
  function updateProductcountToCart(productId, count) {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers }
    );
  }

  const updateMutation = useMutation({
    mutationFn: ({ productId, count }) =>
      updateProductcountToCart(productId, count),

    onSuccess: (data) => {
      toast.success(
        `${data?.data?.message}` || "Quantity updated successfully"
      );
      console.log("updatadata", data);

      queryClient.invalidateQueries({ queryKey: ["cart"] });
      updateCart.refetch();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update quantity"
      );
      console.log("error", error);
    },
  });

  // ================== Delete One Product from Cart ==================
  function deleteProductFromCart(productId) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { headers }
    );
  }

  const deleteOneMutation = useMutation({
    mutationFn: (productId) => deleteProductFromCart(productId),

    onSuccess: (data) => {
      toast.success("Product removed from cart");
      console.log("dataremove", data);

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to remove product");
    },
  });

  // ================== Delete All Cart ==================
  function deleteCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers,
    });
  }

  const deleteAllMutation = useMutation({
    mutationFn: deleteCart,
    onSuccess: (data) => {
      toast.success(`${data?.data?.message}` || "Cart cleared successfully");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console.log("Cart deleted:", data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to clear cart");
    },
  });

  // ================== Pay by Cash ==================
  function PayByCash({ cartId, values }) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        shippingAddress: values,
      },
      { headers }
    );
  }

  const PayByCashMutation = useMutation({
    mutationFn: ({ cartId, values }) => PayByCash({ cartId, values }),
    onSuccess: (data) => {
      toast.success("Cash payment completed and cart cleared successfully");
      console.log(data);
    },
    onError: () => {
      toast.error("Cash payment failed");
    },
  });

  // ================== Pay Online ==================
  function PayByOnline({ CartId, values }) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${CartId}?url=http://localhost:5173/`,
      {
        shippingAddress: values,
      },
      { headers }
    );
  }

  const PayByOnlineMutation = useMutation({
    mutationFn: ({ CartId, values }) => PayByOnline({ CartId, values }),
    onSuccess: (data) => {
      toast.success("Online payment completed successfully");

      console.log("online", data);
    },
    onError: () => {
      toast.error("Online payment failed");
    },
  });

  return (
    <CartContext.Provider
      value={{
        updateCart,
        addToCart: addMutation.mutate,
        addToCartStatus: addMutation,
        deleteProductFromCart: deleteOneMutation.mutate,
        updateProductcountToCart: updateMutation.mutate,
        deleteAllCart: deleteAllMutation.mutate,
        PayByOnline: PayByOnlineMutation.mutate,
        PayByCash: PayByCashMutation.mutate,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
