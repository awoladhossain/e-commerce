import { Route, Routes } from "react-router-dom";
import AdminViewLayout from "./components/admin-view/Layout";
import Layout from "./components/auth/Layout";
import CheckAuth from "./components/common/CheckAuth";
import ShoppingLayout from "./components/shop-view/ShopLayout";
import AdminDashboard from "./pages/admin-pages/Dashboard";
import AdminFeatures from "./pages/admin-pages/Features";
import AdminOrders from "./pages/admin-pages/Orders";
import AdminProducts from "./pages/admin-pages/Products";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShoppingAccount from "./pages/shopping/Account";
import ShoppingCheckOut from "./pages/shopping/CheckOut";
import ShoppingHome from "./pages/shopping/Home";
import ShoppingListing from "./pages/shopping/Listing";
import UnAuth from "./pages/UnAuth/UnAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";

const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  console.log("Auth State:", { isAuthenticated, user, isLoading });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Layout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminViewLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckOut />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="home" element={<ShoppingHome />} />
        </Route>
        <Route path="/unauth-page" element={<UnAuth />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
