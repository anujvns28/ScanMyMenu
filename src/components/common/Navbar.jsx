import React, { useState, useEffect } from "react";
import logo from "../../assets/scanMenuLogo.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      {/* TOP NAV */}
      <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <a href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={logo} alt="ScanMyMenu Logo" width={44} />
              <h1 className="text-xl font-bold text-orange-600 tracking-tight">
                Scan<span className="text-gray-800">MyMenu</span>
              </h1>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <a href="/about" className="hover:text-orange-600">
              About
            </a>

            {/* If NOT logged in */}
            {!token ? (
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
            ) : (
              <>
                <a href="/dashboard" className="hover:text-orange-600">
                  Dashboard
                </a>
              </>
            )}
          </div>

          {/* Mobile Icon */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-gray-700 hover:text-orange-600"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* ================= MOBILE SIDEBAR ================= */}

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-[60] px-6 py-6 flex flex-col justify-between transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <img src={logo} alt="ScanMyMenu Logo" width={40} />
              <h1 className="text-xl font-bold text-orange-600 tracking-tight">
                Scan<span className="text-gray-800">MyMenu</span>
              </h1>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-700 hover:text-orange-600"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <ul className="space-y-4 text-gray-800 text-[15px] font-medium">
            <li>
              <a href="/" className="block hover:text-orange-600">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="block hover:text-orange-600">
                About
              </a>
            </li>

            {!token ? (
              <>
                <li>
                  <a href="/login" className="block hover:text-orange-600">
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/signup"
                    className="block bg-orange-600 text-white text-center py-2 rounded-xl hover:bg-orange-700"
                  >
                    Sign Up
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/dashboard" className="block hover:text-orange-600">
                    Dashboard
                  </a>
                </li>
                <li>
                  <button className="block w-full text-left text-red-500 hover:text-red-600">
                    Logout
                  </button>
                </li>
              </>
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
