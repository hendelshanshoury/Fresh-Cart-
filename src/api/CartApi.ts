import axios from "axios";
import React from "react";

const headers = {
  token: localStorage.getItem("userToken"),
};

//   ?================== display user cart ===================
export function displayUserCart(productId) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers,
  });
}
//   ?================== add product to cart ===================
export function addProductToCart(productId) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    { productId },
    {
      headers,
    }
  );
}
//   ?================== update All Products Cart ===================
export function updateProductcountToCart(productId, count) {
  return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count },
    {
      headers,
    }
  );
}
//   ?================== delete Product from Cart ===================
export function deleteProductFromCart(productId) {
  return axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      headers,
    }
  );
}
//   ?================== delete  Cart ===================
export function deleteCart() {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers,
  });
}
