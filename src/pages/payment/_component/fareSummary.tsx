import { FaUser, FaTicketAlt } from "react-icons/fa";
import { IFlight, useFlight } from "../../../context/flight";
import { formatDuration } from "../../../utils";
import moment from "moment";
import { Link } from "react-router";

const FareSummary = ({ flight }: { flight: IFlight | null }) => {
  const { formData } = useFlight();
  return (
    <div className="w-full space-y-4">
      {/* Fare Summary */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-bold">Fare Summary</h2>

        <div className="flex justify-between text-gray-700">
          <span>
            Base Fare <span className="text-gray-400">ⓘ</span>
          </span>
          <span className="font-medium">
            $
            {flight?.price && formData.type === "Round Trip"
              ? flight?.price * 2
              : flight?.price}
          </span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span className="font-medium">+ $0</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Other Services</span>
          <span className="font-medium">$0</span>
        </div>

        <hr className="border-gray-300" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total Fare</span>
          <span>
            $
            {flight?.price && formData.type === "Round Trip"
              ? flight?.price * 2
              : flight?.price}
          </span>
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
            <p className="text-lg font-semibold">
              {flight?.origin?.city} → {flight?.destination?.city}
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            {moment(flight?.departureTime).format("D MMM")} • 1 Stop •{" "}
            {formatDuration(flight?.duration || 0)}
          </p>
        </div>

        <hr className="border-gray-300" />

        {/* Traveler Details */}
        <div className="space-y-2">
          <p className="text-gray-500 flex items-center space-x-2">
            <FaUser className="text-gray-600" />
            <span>Traveler detail</span>
          </p>
          {formData.travellersInfo.map((traveller) => (
            <>
              <p className="font-medium text-gray-800">
                {traveller?.firstName} {traveller?.lastName}
              </p>
              <p className="text-gray-600 text-sm">
                Adult • {traveller.nationality} • {traveller.dob.day}{" "}
                {traveller.dob.month} {traveller.dob.year}
              </p>
            </>
          ))}
        </div>

        <Link
          to="/booking"
          className="w-full text-indigo-600 font-medium hover:underline"
        >
          Review booking
        </Link>
      </div>
    </div>
  );
};

export default FareSummary;
