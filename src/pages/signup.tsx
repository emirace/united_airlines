import { useState } from "react";
import IMAGES from "../assets/images";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useToastNotification } from "../context/toastNotification";
import { registerUser } from "../services/auth";
import Loading from "./_components/loading";
import { useSearchParams } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  const { addNotification } = useToastNotification();
  const [loading, setLoading] = useState(false);

  const [searchParams, _] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error state
  const [errors, setErrors] = useState<Record<string, string | null>>({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    general: null,
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      general: null,
    });

    const newErrors: Record<string, string | null> = {};

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = "A valid email is required";
    }

    if (!formData.password.trim() || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      if (redirect) {
        navigate(redirect);
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      setErrors({ ...errors, general: error });
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };
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
              <Link
                to={`/login?redirect=${redirect || ""}`}
                className="text-primary font-semibold"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Form Fields */}
          <form className="mt-6 space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter full name
              </label>
              <input
                type="text"
                name="fullName"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter email id
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
                >
                  {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
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
            <button
              disabled={loading}
              type="submit"
              className="mt-4 w-full flex items-center justify-center gap-3 bg-primary text-white font-semibold py-3 rounded-lg hover:bg-opacity-70 transition"
            >
              {loading && <Loading size="sm" color="white" />}
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
