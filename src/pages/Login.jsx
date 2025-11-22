import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-white via-blue-50/40 to-white px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-50 px-8 py-10">
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back 👋
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Login to manage your digital menu & QR codes.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div className="space-y-1">
            <label className="text-gray-800 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-800 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Extra Options */}
          <div className="flex items-center justify-between text-sm mt-2">
            <label className="inline-flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-4 w-full py-3 bg-orange-600 text-white font-semibold rounded-xl shadow-lg 
            hover:bg-orange-700 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-[1px] flex-1 bg-gray-400" />
          <p className="text-gray-600 text-xs uppercase tracking-wide">or</p>
          <div className="h-[1px] flex-1 bg-gray-400" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 bg-orange-600 text-white font-semibold rounded-xl 
          border border-orange-700 hover:bg-orange-700 hover:shadow-lg transition-all duration-300"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google logo"
            className="w-6 h-6 bg-white p-1 rounded"
          />
          Continue with Google
        </button>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
