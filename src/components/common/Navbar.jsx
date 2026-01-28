import React, { useState } from "react";
import logo from "../../assets/scanMenuLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/auth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* ================= TOP NAV ================= */}
      <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="ScanMyMenu Logo" width={44} />
            <h1 className="text-xl font-bold text-orange-600 tracking-tight">
              Scan<span className="text-gray-800">MyMenu</span>
            </h1>
          </a>

          {/* ===== Desktop Menu ===== */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <a href="/about" className="hover:text-orange-600">
              About
            </a>

            {/* Owner Only */}
            {token && user?.role === "owner" && (
              <a href="/shop" className="hover:text-orange-600">
                Shop
              </a>
            )}

            {/* Logged Out */}
            {!token && (
              <>
                <a href="/login" className="hover:text-orange-600">
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700"
                >
                  Sign Up
                </a>
              </>
            )}

            {/* Logged In */}
            {token && (
              <button
                onClick={logoutHandler}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Icon */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-gray-700 text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* ================= MOBILE SIDEBAR ================= */}

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 px-6 py-6 flex flex-col justify-between transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <img src={logo} alt="ScanMyMenu Logo" width={40} />
              <h1 className="text-xl font-bold text-orange-600">
                Scan<span className="text-gray-800">MyMenu</span>
              </h1>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <ul className="space-y-4 text-gray-800 font-medium">
            <li>
              <a href="/" onClick={() => setOpen(false)}>
                Home
              </a>
            </li>

            <li>
              <a href="/about" onClick={() => setOpen(false)}>
                About
              </a>
            </li>

            {/* Owner Only */}
            {token && user?.role === "owner" && (
              <li>
                <a href="/shop" onClick={() => setOpen(false)}>
                  Shop
                </a>
              </li>
            )}

            {/* Logged Out */}
            {!token && (
              <>
                <li>
                  <a href="/login" onClick={() => setOpen(false)}>
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="block bg-orange-600 text-white text-center py-2 rounded-xl"
                  >
                    Sign Up
                  </a>
                </li>
              </>
            )}

            {/* Logged In */}
            {token && (
              <li>
                <button
                  onClick={logoutHandler}
                  className="text-red-500 w-full text-left"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} ScanMyMenu
        </p>
      </div>
    </>
  );
};

export default Navbar;
