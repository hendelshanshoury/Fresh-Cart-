import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";

export const WishListContext = createContext();
const headers = {
  token: localStorage.getItem("userToken"),
};

export default function WishListContextProvider({ children }) {
  const queryClient = useQueryClient();

  // Fetch wishlist data
  function displayProductToWihList() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist
`,
      {
        headers,
      }
    );
  }
  const { data: wishlistData, isLoading: getwishlistLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: displayProductToWihList,
  });

  function addWihList(productId) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist
`,
      { productId },
      {
        headers,
      }
    );
  }
  // Mutation for adding a product to wishlist
  const addProductToWishlist = useMutation({
    mutationFn: (productId) => addWihList(productId),

    onSuccess: (data) => {
      toast.success(`${data?.data.message}`);
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      console.log("data add to :", data);
      // console.log("data add to :", data?.data.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "فشل في الإضافة للسلة");
    },
  });

  // Mutation for deleting a wishlist item
  function deleteProductToWihList(productId) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers,
      }
    );
  }
  const deleteWishlistItem = useMutation({
    mutationFn: (productId) => deleteProductToWihList(productId),

    onSuccess: (data) => {
      toast.success(`${data?.data?.message}`);
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      console.log("data delete :", data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "فشل في الإضافة للسلة");
    },
  });

  return (
    <WishListContext.Provider
      value={{
        wishlistData,
        getwishlistLoading,
        addProductToWishlist: addProductToWishlist.mutate,
        deleteWishlistItem: deleteWishlistItem.mutate,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
