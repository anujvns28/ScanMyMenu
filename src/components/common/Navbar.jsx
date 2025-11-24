import React, { useState } from "react";
import logo from "../../assets/scanMenuLogo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
            <a href="/login" className="hover:text-orange-600">
              Login
            </a>
            <a
              href="/signup"
              className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Icon */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-gray-700 hover:text-orange-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* ================= MOBILE SIDEBAR ================= */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-[60] px-6 py-6 flex flex-col justify-between transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* TOP SECTION */}
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
          </ul>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} ScanMyMenu
        </p>
      </div>
    </>
  );
};

export default Navbar;
