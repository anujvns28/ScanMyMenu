import { NavLink } from "react-router-dom";

const TopNav = () => {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition
     ${
       isActive
         ? "bg-blue-100 text-blue-600"
         : "text-gray-600 hover:bg-gray-100"
     }`;

  return (
    <div className="hidden md:block bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo / Title */}
          <div className="flex flex-col leading-tight">
  <span className="text-sm font-semibold text-gray-800">
    Sharma Dhaba
  </span>
  <span className="text-xs text-gray-500">
    ⭐ 4.6 · 120 Reviews
  </span>
</div>


          {/* Navigation */}
          <nav className="flex gap-2">
            <NavLink to="/shop" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/shop/menu" className={linkClass}>
              Menu
            </NavLink>
            <NavLink to="/shop/reviews" className={linkClass}>
              Reviews
            </NavLink>
            <NavLink to="/shop/offers" className={linkClass}>
              Offers
            </NavLink>
            <NavLink to="/shop/support" className={linkClass}>
              Support
            </NavLink>
            <NavLink to="/shop/profile" className={linkClass}>
              Profile
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
