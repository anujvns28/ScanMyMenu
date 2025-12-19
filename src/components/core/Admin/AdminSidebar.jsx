import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const linkClass = ({ isActive }) => {
    return `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition
     ${
       isActive
         ? "bg-blue-100 text-blue-600"
         : "text-gray-600 hover:bg-gray-100"
     }`;
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen sticky top-0">
      <nav className="px-2 h-full flex flex-col justify-between">

        {/* Top Section */}
        <div>
          <div className="p-6 text-2xl font-bold text-blue-600 border-b mb-4">
            Admin
          </div>

          <ul className="space-y-2">
            <li>
              <NavLink end to="/admin" className={linkClass}>
                📊 Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/shops" className={linkClass}>
                🏪 Shops
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/categories" className={linkClass}>
                🍽️ Categories
              </NavLink>
            </li>

            {/* NEW: Tags */}
            <li>
              <NavLink to="/admin/tags" className={linkClass}>
                🏷️ Tags
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/reviews" className={linkClass}>
                ⭐ Reviews
              </NavLink>
            </li>

            {/* NEW: Support / Issues */}
            <li>
              <NavLink to="/admin/issues" className={linkClass}>
                🛠️ Support Requests
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logout */}
        <div className="w-full px-4 pb-6">
          <button className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-medium hover:bg-red-200">
            Logout
          </button>
        </div>

      </nav>
    </div>
  );
};

export default AdminSidebar;
