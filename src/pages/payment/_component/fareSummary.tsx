import { FaUser, FaTicketAlt } from "react-icons/fa";

const FareSummary = () => {
  return (
    <div className="w-full space-y-4">
      {/* Fare Summary */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-bold">Fare Summary</h2>

        <div className="flex justify-between text-gray-700">
          <span>
            Base Fare <span className="text-gray-400">ⓘ</span>
          </span>
          <span className="font-medium">$38,660</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span className="font-medium">+ $2,560</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Other Services</span>
          <span className="font-medium">$20</span>
        </div>

        <hr className="border-gray-300" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total Fare</span>
          <span>$36,500</span>
        </div>
      </div>

      {/* Booking Details */}
      <div className="border rounded-lg p-4 space-y-4">
        <h2 className="text-lg font-bold">Your Booking</h2>

        {/* Flight Info */}
        <div className="space-y-2">
          <p className="text-gray-500 flex items-center space-x-2">
            <FaTicketAlt className="text-gray-600" />
            <span>Flight Ticket</span>
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-4 bg-orange-500 rounded-sm"></div>
            <p className="text-lg font-semibold">Mumbai → New York</p>
          </div>
          <p className="text-gray-600 text-sm">25 Jan • 1 Stop • 05h 25m</p>
        </div>

        <hr className="border-gray-300" />

        {/* Traveler Details */}
        <div className="space-y-2">
          <p className="text-gray-500 flex items-center space-x-2">
            <FaUser className="text-gray-600" />
            <span>Traveler detail</span>
          </p>
          <p className="font-medium text-gray-800">Carolyn Ortiz</p>
          <p className="text-gray-600 text-sm">Adult • Female • Dec-2-1990</p>
        </div>

        <button className="w-full text-indigo-600 font-medium hover:underline">
          Review booking
        </button>
      </div>
    </div>
  );
};

export default FareSummary;
