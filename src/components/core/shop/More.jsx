import { Link, useNavigate } from "react-router-dom";
import { Gift, LifeBuoy, Star, Settings, LogOut, BarChart } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/auth";

const More = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="p-4 space-y-4">
      {/* Page Title */}
      <h1 className="text-xl font-bold text-gray-800">More</h1>

      {/* More Options */}
      <div className="bg-white rounded-xl shadow divide-y">
        <Link
          to="/shop/dashboard"
          className="flex items-center gap-3 p-4 hover:bg-gray-50 transition"
        >
          <BarChart size={20} />
          Dashboard
        </Link>

        <Link
          to="/shop/reviews"
          className="flex items-center gap-3 p-4 hover:bg-gray-50 transition"
        >
          <Star size={18} className="text-yellow-500" />
          <span className="font-medium text-gray-700">Reviews & Ratings</span>
        </Link>

        <Link
          to="/shop/offers"
          className="flex items-center gap-3 p-4 hover:bg-gray-50 transition"
        >
          <Gift size={18} className="text-pink-500" />
          <span className="font-medium text-gray-700">Offers & Discounts</span>
        </Link>

        <Link
          to="/shop/support"
          className="flex items-center gap-3 p-4 hover:bg-gray-50 transition"
        >
          <LifeBuoy size={18} className="text-blue-500" />
          <span className="font-medium text-gray-700">Support</span>
        </Link>
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-xl shadow divide-y">
        <Link
          to="/shop/settings"
          className="flex items-center gap-3 p-4 hover:bg-gray-50 transition"
        >
          <Settings size={18} className="text-gray-600" />
          <span className="font-medium text-gray-700">Settings</span>
        </Link>

        <button
          onClick={logoutHandler}
          className="w-full flex items-center gap-3 p-4 text-left hover:bg-red-50 transition"
        >
          <LogOut size={18} className="text-red-500" />
          <span className="font-medium text-red-600">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default More;
