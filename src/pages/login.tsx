import { useState } from "react";
import IMAGES from "../assets/images";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router";
import { loginUser } from "../services/auth";
import { useToastNotification } from "../context/toastNotification";
import { useUser } from "../context/user";
import { useNavigate } from "react-router";
import Loading from "./_components/loading";
import { useSearchParams } from "react-router";

const Login = () => {
  const { addNotification } = useToastNotification();
  const { getUser } = useUser();
  const [searchParams, _] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log(redirect);

  // Error state
  const [errors, setErrors] = useState<Record<string, string | null>>({
    email: null,
    password: null,
    general: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      email: null,
      password: null,
      general: null,
    });

    const newErrors: Record<string, string | null> = {};

    // Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("authToken", res.token);
      await getUser();
      setFormData({
        email: "",
        password: "",
      });
      if (redirect) {
        navigate(redirect);
      } else {
        navigate("/dashboard/profile");
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
              Welcome back
            </h2>
            <p className="mt-2 text-gray-600 text-sm">
              New here?{" "}
              <Link
                to={`/signup?redirect=${redirect || ""}`}
                className="text-primary font-semibold"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Form Fields */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter email id
              </label>
              <input
                name="email"
                type="email"
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
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  required
                  onChange={handleChange}
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
                <span>Remember me?</span>
              </label>
              <a href="#" className="text-primary font-medium">
                Forgot password?
              </a>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="mt-4 w-full flex items-center gap-3 justify-center bg-primary text-white font-semibold py-3 rounded-lg hover:bg-opacity-70 transition"
              disabled={loading}
            >
              {loading && <Loading size="sm" color="white" />}
              Login
            </button>

            <p className="mt-6 text-xs text-gray-500 text-center">
              Copyrights ©2023 Booking.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
