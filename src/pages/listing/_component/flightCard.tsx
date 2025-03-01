import { FaPlane, FaEye } from "react-icons/fa";
import { Link } from "react-router";

const FlightCard = () => {
  return (
    <div className="border rounded-lg p-6 bg-white flex flex-col space-y-4 w-full">
      {/* Airline Info */}
      <div className="flex justify-between items-center">
        <div className="flex-1 hidden md:block" />
        <p className="text-gray-500 text-sm">
          Travel Class: <span className="font-semibold">Economy</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between md:w-3/4 gap-6 ">
          <div className="text-left">
            <p className="text-2xl font-bold">14:50</p>
            <p className="text-sm text-gray-500">BOM – Terminal 2</p>
            <p className="text-xs text-gray-400">Mumbai, India</p>
          </div>

          <div className="flex flex-col items-center text-gray-500">
            <p className="text-sm font-semibold">9hr 50min</p>
            <FaPlane className="text-primary text-2xl" />
          </div>

          <div className="md:text-right">
            <p className="text-2xl font-bold">07:35</p>
            <p className="text-sm text-gray-500">JFK – Terminal 2</p>
            <p className="text-xs text-gray-400">New York, USA</p>
          </div>
        </div>

        <div className="flex flex-col md:items-end md:w-1/4 gap-2">
          <p className="text-2xl font-bold text-black">$18,500</p>
          <div className="flex flex-row md:flex-col gap-4">
            <Link
              to="/booking"
              className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800"
            >
              Book Now
            </Link>

            <div className="text-blue-500 text-sm flex items-center space-x-1 cursor-pointer hover:underline">
              <FaEye />
              <p>Flight Details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Availability & Refund Policy */}
      <div className="flex justify-between items-center text-sm bg-gray-100 rounded-lg p-2">
        <p className="text-red-500 font-semibold">Only 10 Seats Left</p>
        <p className="text-gray-500">Non-Refundable</p>
      </div>
    </div>
  );
};

export default FlightCard;
