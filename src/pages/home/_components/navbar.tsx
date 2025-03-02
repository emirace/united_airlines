import { NavLink } from "react-router";
import IMAGES from "../../../assets/images";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router";
import { IoSearchOutline } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/dashboard/bookings", label: "Bookings" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="flex flex-col md:flex-row justify-between gap-4 md:items-center py-4 pb-12 md:pb-4 bg-white">
      <div className="flex items-center justify-between w-full md:w-auto ">
        <div className="flex items-center">
          <span className="text-xl font-bold flex items-center gap-2">
            <img src={IMAGES.logo} alt="logo" className="h-10 " /> United
            Airlines
          </span>
        </div>
        <IoMenuOutline
          className="text-4xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div
        className={` flex-col md:flex-row md:items-center gap-4 md:gap-8 ${
          isOpen ? "flex" : "hidden md:flex"
        } `}
      >
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `hover:text-primary font-medium ${isActive ? "text-primary" : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
      <div
        className={`flex items-center gap-4 ${
          isOpen ? "flex" : "hidden md:flex"
        }`}
      >
        <IoSearchOutline className="text-3xl cursor-pointer" />
        <button
          onClick={() => navigate("/signup")}
          className="flex items-center gap-2 bg-primary text-primary bg-opacity-10 hover:bg-opacity-100 hover:text-white px-4 py-2 rounded-lg"
        >
          <FiLogIn />
          <span className="text-sm font-medium">Sign Up</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
