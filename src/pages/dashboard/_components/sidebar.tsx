import {
  HiOutlineUser,
  HiOutlineTicket,
  // HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";
import { MdOutlineFlight } from "react-icons/md";
import { NavLink } from "react-router";
import { MdFlightTakeoff } from "react-icons/md";
import { useUser } from "../../../context/user";
import { useNavigate } from "react-router";

const sidebars = [
  { name: "Profile", icon: HiOutlineUser, path: "profile" },
  { name: "Booking", icon: HiOutlineTicket, path: "bookings" },
  // { name: "Settings", icon: HiOutlineCog, path: "settings" },
];

const adminSidebars = [
  { name: "Airports", icon: MdOutlineFlight, path: "airports" },
  { name: "Flights", icon: MdFlightTakeoff, path: "flights" },
];

const Sidebar = ({ close }: { close: () => void }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  return (
    <div className="w-72 md:bg-gray-100 rounded-xl p-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-full h-full object-cover bg-black"
          />
        </div>
        <h2 className="mt-3 text-xl font-bold">{user?.fullName}</h2>
        <p className="text-gray-500 text-sm">{user?.email}</p>
      </div>

      {/* Navigation */}
      <ul className="mt-6 space-y-2">
        {sidebars.map((sidebar) => (
          <NavLink
            onClick={close}
            to={sidebar.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer hover:text-primary hover:bg-primary/10  ${
                isActive ? "text-primary bg-primary/10 " : ""
              }`
            }
          >
            <sidebar.icon size={20} />
            <span>{sidebar.name}</span>
          </NavLink>
        ))}

        {user?.role === "Admin" &&
          adminSidebars.map((sidebar) => (
            <NavLink
              onClick={close}
              to={sidebar.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer hover:text-primary hover:bg-primary/10  ${
                  isActive ? "text-primary bg-primary/10 " : ""
                }`
              }
            >
              <sidebar.icon size={20} />
              <span>{sidebar.name}</span>
            </NavLink>
          ))}
      </ul>

      {/* Sign Out */}
      <div className="mt-4">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center gap-3 text-red-600 px-4 py-3 rounded-lg w-full hover:bg-red-50"
        >
          <HiOutlineLogout size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
