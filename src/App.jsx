import { useState } from 'react'
import './App.css'
import Navbar from './components/common/Navbar'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Menu from "./pages/Menu";
import AdminDashboardPage from "./pages/AdminDashboard";
import Shops from "./components/core/Admin/Shops";
import Categories from "./components/core/Admin/Categories";
import AdminDashboard from "./components/core/Admin/Dashboard";
import AdminReviews from "./components/core/Admin/Review";
import AdminTags from "./components/core/Admin/Tags";
import AdminSupport from "./components/core/Admin/Issues";
import Dashboard from "./pages/Dashboard";
import ShopDashboardPage from "./pages/ShopDashboard";
import ShopDashboard from "./components/core/shop/Dashboard";
import More from "./components/core/shop/More";
import MenuManagement from "./components/core/shop/MenuManagement";
import Review from "./components/core/shop/Review";
import Offers from "./components/core/shop/Offers";
import Support from "./components/core/shop/Support";
import ShopProfile from "./components/core/shop/ShopProfile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setToken } from "./redux/slices/auth";
import MenuPage from "./pages/MenuPage";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      dispatch(setToken(token));

      const intent = localStorage.getItem("LOGIN_INTENT");
      if (intent) {
        localStorage.setItem("POST_LOGIN_INTENT", intent);
        localStorage.removeItem("LOGIN_INTENT");
      }

      navigate(location.pathname, { replace: true });
    }
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashbord" element={<Dashboard />} />

          <Route path="/menu/:shopId" element={<MenuPage />} />

          <Route path="/admin" element={<AdminDashboardPage />}>
            <Route index element={<AdminDashboard />} />
            <Route path="shops" element={<Shops />} />
            <Route path="categories" element={<Categories />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="tags" element={<AdminTags />} />
            <Route path="issues" element={<AdminSupport />} />
          </Route>

          <Route path="/shop" element={<ShopDashboardPage />}>
            <Route index element={<ShopProfile />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="reviews" element={<Review />} />
            <Route path="offers" element={<Offers />} />
            <Route path="support" element={<Support />} />
            <Route path="dashboard" element={<ShopDashboard />} />
            <Route path="more" element={<More />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App
