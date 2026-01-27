import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signup } from "../service/operations/auth";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [cnfPassword, setCnfPassword] = useState();
  const [email, setEmail] = useState();
  const { authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = { name, password, confirmPassword: cnfPassword, email };

    const result = await signup(data, dispatch, navigate);
    if (result) {
      console.log("signup done");
    }
  };

  const googleSignup = () => {
    window.location.href =
      "https://scanmymenu-server.onrender.com/auth/shop/google";
  };

  if (authLoading) {
    return (
      <div className="h-screen w-screen flex items-center text-black justify-center">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="h-screen my-14 md:min-h-screen w-full flex items-center justify-center  to-white px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-50 px-8 py-10">
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Start managing your digital menu today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-gray-800 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 
              border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-gray-800 text-sm font-medium">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 
              border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-gray-800 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a strong password"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 
              border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-gray-800 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              onChange={(e) => setCnfPassword(e.target.value)}
              required
              placeholder="Re-enter your password"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 
              border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="mt-4 w-full cursor-pointer py-3 bg-orange-600 text-white font-semibold rounded-xl shadow-lg 
            hover:bg-orange-700 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-[2px] flex-1 bg-gray-300"></div>
          <p className="text-gray-600 text-xs uppercase tracking-wide">or</p>
          <div className="h-[2px] flex-1 bg-gray-300"></div>
        </div>

        {/* Google Signup */}
        <button
          className="w-full cursor-pointer flex items-center justify-center gap-3 py-3 bg-blue-600 text-white 
          font-semibold rounded-xl border  hover:bg-blue-400 hover:shadow-lg transition-all duration-300"
          onClick={googleSignup}
        >
          <FcGoogle />
          Sign Up with Google
        </button>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-orange-600 cursor-pointer font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
