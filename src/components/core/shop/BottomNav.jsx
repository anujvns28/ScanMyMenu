import { NavLink } from "react-router-dom";
import {
  Home,
  MenuSquare,
  Star,
  BarChart,
  MoreHorizontal,
  ClipboardList,
} from "lucide-react";

const BottomNav = () => {
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 text-xs font-medium transition
     ${isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-500"}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md md:hidden">
      <nav className="flex justify-around py-2">
        <NavLink to="/shop" end className={linkClass}>
          <Home size={20} />
          Shop
        </NavLink>

        <NavLink to="/shop/menu" className={linkClass}>
          <MenuSquare size={20} />
          Menu
        </NavLink>

        <NavLink to="/shop/orders" className={linkClass}>
          <ClipboardList size={20} />
          Orders
        </NavLink>

        

        <NavLink to="/shop/more" className={linkClass}>
          <MoreHorizontal size={20} />
          More
        </NavLink>
      </nav>
    </div>
  );
};

export default BottomNav;
