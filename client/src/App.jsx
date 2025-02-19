import { Route, Routes } from 'react-router-dom';
import AdminViewLayout from './components/admin-view/Layout';
import Layout from './components/auth/Layout';
import ShoppingLayout from './components/shop-view/ShopLayout';
import AdminDashboard from './pages/admin-pages/Dashboard';
import AdminFeatures from './pages/admin-pages/Features';
import AdminOrders from './pages/admin-pages/Orders';
import AdminProducts from './pages/admin-pages/Products';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ShoppingAccount from './pages/shopping/Account';
import ShoppingCheckOut from './pages/shopping/CheckOut';
import ShoppingHome from './pages/shopping/Home';
import ShoppingListing from './pages/shopping/Listing';

const App = () => {
    return (
        <div className="flex flex-col overflow-hidden bg-white">
            <h1>Header component</h1>
            <Routes>
                <Route path="/auth" element={<Layout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route path="/admin" element={<AdminViewLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="features" element={<AdminFeatures />} />
                </Route>
                <Route path="/shop" element={<ShoppingLayout />}>
                    <Route path="account" element={<ShoppingAccount />} />
                    <Route path="checkout" element={<ShoppingCheckOut />} />
                    <Route path="listing" element={<ShoppingListing />} />
                    <Route path="home" element={<ShoppingHome />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
};

export default App;
