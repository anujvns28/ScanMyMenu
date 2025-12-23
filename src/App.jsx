import { useState } from 'react'
import './App.css'
import Navbar from './components/common/Navbar'
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import MobilePremiumMenu from "./pages/Menu";
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

function App() {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<MobilePremiumMenu />} />
          <Route path="/dashbord" element={<Dashboard />} />

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
