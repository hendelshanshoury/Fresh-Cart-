import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProductToCart,
  displayUserCart,
  updateProductcountToCart,
  deleteProductFromCart,
  deleteCart,
} from "../api/CartApi";
import toast from "react-hot-toast";

// ✅ هوك إضافة منتج إلى السلة
export function useAddProductToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => addProductToCart(productId),

    onSuccess: (data) => {
      toast.success("تمت الإضافة إلى السلة!");
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // 👈 إعادة جلب بيانات السلة
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "فشل في الإضافة للسلة");
    },
  });
}

// ✅ هوك عرض السلة
export function useCartData() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: displayUserCart,
  });
}

// ✅ هوك تحديث الكمية
export function useUpdateCart() {
  return useMutation({
    mutationFn: ({ productId, count }: { productId: string; count: number }) =>
      updateProductcountToCart(productId, count),
    onSuccess: () => toast.success("تم تحديث الكمية!"),
  });
}

// ✅ هوك حذف منتج من السلة
export function useDeleteCartItem() {
  return useMutation({
    mutationFn: deleteProductFromCart,
    onSuccess: () => toast.success("تم حذف المنتج!"),
  });
}

// ✅ هوك حذف السلة كاملة
export function useDeleteCart() {
  return useMutation({
    mutationFn: deleteCart,
    onSuccess: () => toast.success("تم حذف السلة!"),
  });
}
