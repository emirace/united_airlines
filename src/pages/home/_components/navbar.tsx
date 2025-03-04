import { NavLink } from "react-router";
import IMAGES from "../../../assets/images";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router";
import { IoSearchOutline } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";
import { useState } from "react";
import { useUser } from "../../../context/user";
import {
  HiOutlineUser,
  HiOutlineTicket,
  // HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/dashboard/bookings", label: "Bookings" },
    { path: "/contact", label: "Contact" },
  ];

  const sidebars = [
    { name: "Profile", icon: HiOutlineUser, path: "profile" },
    { name: "Booking", icon: HiOutlineTicket, path: "bookings" },
    // { name: "Settings", icon: HiOutlineCog, path: "settings" },
  ];

  return (
    <nav className="flex flex-col md:flex-row justify-between gap-4 md:items-center py-4 pb-12 md:pb-4 bg-white">
      <div className="flex items-center justify-between w-full md:w-auto ">
        <div className="flex items-center">
          <span className="text-xl font-bold flex items-center gap-2">
            <img src={IMAGES.logo} alt="logo" className="h-10 " /> Flyzone
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
        {user ? (
          <div className="relative">
            <div
              onClick={() => setOpenMenu(!openMenu)}
              className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
            >
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-full h-full object-cover bg-black"
              />
            </div>
            {openMenu && (
              <div className="absolute z-50 right-0 top-full bg-gray-100 rounded-xl p-4">
                <ul className="space-y-2">
                  {sidebars.map((sidebar) => (
                    <NavLink
                      onClick={() => setOpenMenu(false)}
                      to={sidebar.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer hover:text-primary hover:bg-primary/10  ${
                          isActive ? "text-primary bg-primary/10 " : ""
                        }`
                      }
                    >
                      <sidebar.icon size={20} />
                      <span>{sidebar.name}</span>
                    </NavLink>
                  ))}

                  <div className="mt-4">
                    <button
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                      className="flex whitespace-nowrap items-center gap-3 text-red-600 px-4 py-3 rounded-lg w-full hover:bg-red-50"
                    >
                      <HiOutlineLogout size={20} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 bg-primary text-primary bg-opacity-10 hover:bg-opacity-100 hover:text-white px-4 py-2 rounded-lg"
          >
            <FiLogIn />
            <span className="text-sm font-medium">Sign Up</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
