import { useState } from "react";
import IMAGES from "../assets/images";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden flex">
        {/* Left Section - Image */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-100">
          <img
            src={IMAGES.hero}
            alt="Login Illustration"
            className="w-full object-cover h-full object-right"
          />
        </div>

        {/* Right Section - Login Form */}
        <div className="flex-1 p-10">
          <div className="flex flex-col items-start">
            <Link to="/">
              <img src={IMAGES.logo} alt="logo" className="h-10 " />
            </Link>
            <h2 className="mt-4 text-4xl font-bold text-gray-900">
              Create a new account
            </h2>
            <p className="mt-2 text-gray-600 text-sm">
              Already a member?{" "}
              <Link to="/login" className="text-primary font-semibold">
                Login
              </Link>
            </p>
          </div>

          {/* Form Fields */}
          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter email id
              </label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>
            </div>
            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded"
                />
                <span>Keep me signed in?</span>
              </label>
            </div>
            {/* Login Button */}
            <button className="mt-4 w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-opacity-70 transition">
              Sign Up
            </button>

            <p className="mt-6 text-xs text-gray-500 text-center">
              Copyrights ©2025 Booking.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
