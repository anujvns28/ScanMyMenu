import React from "react";
import logo from "../../assets/scanMenuLogo.png";

const Navbar = () => {
  return (
    <nav className=" m-auto w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo Section */}
        <a href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="ScanMyMenu Logo" width={48} height={48} />
            <h1 className="text-2xl font-bold text-orange-600 tracking-tight">
              Scan<span className="text-gray-800">MyMenu</span>
            </h1>
          </div>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a
            href="/about"
            className="hover:text-orange-600 transition duration-200"
          >
            About
          </a>
          <a
            href="/login"
            className="hover:text-orange-600 transition duration-200"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition duration-300"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile Menu Button (for future use) */}
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-orange-600">
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
      </div>
    </nav>
  );
};

export default Navbar;
