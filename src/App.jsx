//

import { HashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import UserContextProvider from "./components/context/UserContext";
import CartContextProvider from "./components/context/CartContext";
import WishListContextProvider from "./components/context/WishListContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Loading from "./components/Loading/Loading";

// Lazy loaded components
const Layout = lazy(() => import("./components/Layout/Layout"));
const Register = lazy(() => import("./components/Register/Register"));
const Login = lazy(() => import("./components/Login/Login"));
const Home = lazy(() => import("./components/Home/Home"));
const Products = lazy(() => import("./components/Products/Products"));
const Brands = lazy(() => import("./components/Brands/Brands"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const Categories = lazy(() => import("./components/Categories/Categories"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const ForgetPassword = lazy(() =>
  import("./components/ForgetPassword/ForgetPassword")
);
const VerifyCode = lazy(() => import("./components/ForgetPassword/VerifyCode"));
const ProductDetails = lazy(() =>
  import("./components/ProductDetails/ProductDetails")
);
const WishList = lazy(() => import("./components/WishList/WishList"));
const CategoryDetails = lazy(() =>
  import("./components/CategoryDetails/CategoryDetails")
);
const BrandDetails = lazy(() =>
  import("./components/BrandDetails/BrandDetails")
);
const AddressCheckoutForm = lazy(() =>
  import("./components/AddressCheckoutForm/AddressCheckoutForm")
);
const PayByCash = lazy(() => import("./components/PayByCash/PayByCash"));
const PayByOnline = lazy(() => import("./components/PayByOnline/PayByOnline"));
const AllOrder = lazy(() => import("./components/AllOrder/AllOrder"));

const routers = HashRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "forgetpassword",
        element: (
          <Suspense fallback={<Loading />}>
            <ForgetPassword />
          </Suspense>
        ),
      },
      {
        path: "verifycode",
        element: (
          <Suspense fallback={<Loading />}>
            <VerifyCode />
          </Suspense>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Products />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Brands />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Categories />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Cart />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <WishList />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "PayByCash",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <PayByCash />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "paybyonline",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <PayByOnline />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <ProductDetails />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "categorydetails/:id",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <CategoryDetails />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "brandDetails/:id",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <BrandDetails />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "AddressCheckoutForm",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <AddressCheckoutForm />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "AllOrder",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <AllOrder />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "footer",
        element: (
          <Suspense fallback={<Loading />}>
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

const query = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={query}>
        <WishListContextProvider>
          <CartContextProvider>
            <UserContextProvider>
              <RouterProvider router={routers} />
              <Toaster />
            </UserContextProvider>
          </CartContextProvider>
        </WishListContextProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
