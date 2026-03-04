import { lazy, useEffect, Suspense } from "react";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import MenuPage from "./pages/MenuPage";
import { useDispatch } from "react-redux";
import LoaderComponent from "./components/common/LoaderComponent";
import { setToken } from "./redux/slices/auth";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const About = lazy(() => import("./pages/About"));
const Menu = lazy(() => import("./pages/Menu"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboard"));
const Shops = lazy(() => import("./components/core/Admin/Shops"));
const Categories = lazy(() => import("./components/core/Admin/Categories"));
const AdminDashboard = lazy(() => import("./components/core/Admin/Dashboard"));
const AdminReviews = lazy(() => import("./components/core/Admin/Review"));
const AdminTags = lazy(() => import("./components/core/Admin/Tags"));
const AdminSupport = lazy(() => import("./components/core/Admin/Issues"));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const ShopDashboardPage = lazy(() => import("./pages/ShopDashboard"));
const ShopDashboard = lazy(() => import("./components/core/shop/Dashboard"));
const More = lazy(() => import("./components/core/shop/More"));
const MenuManagement = lazy(
  () => import("./components/core/shop/MenuManagement"),
);
const Review = lazy(() => import("./components/core/shop/Review"));
const Offers = lazy(() => import("./components/core/shop/Offers"));
const Support = lazy(() => import("./components/core/shop/Support"));
const ShopProfile = lazy(() => import("./components/core/shop/ShopProfile"));
const Orders = lazy(() => import("./components/core/shop/Orders"));
const ChangePassword = lazy(() => import("./components/core/shop/Setting"));

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
        <Suspense fallback={<LoaderComponent />}>
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
              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<ChangePassword />} />
            </Route>
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}

export default App;
