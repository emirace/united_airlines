import { useState } from "react";
import { useNavigate } from "react-router";

const TravelerDetails = () => {
  const navigate = useNavigate();
  const [travelers, setTravelers] = useState(["Adult 1", "Adult 2"]);

  const addTraveler = () => {
    setTravelers([...travelers, `Adult ${travelers.length + 1}`]);
  };

  return (
    <div className="border mt-10 rounded-lg p-4 md:p-6 space-y-4">
      {/* Title */}
      <h2 className="text-2xl font-bold">Traveler Details</h2>

      {/* Alert Message */}
      <div className="flex items-center bg-red-100 text-red-700 px-4 py-3 rounded-md">
        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded mr-2">
          New
        </span>
        <span>Please make sure you enter the Name as per your passport</span>
      </div>

      {/* Add New Adult Button */}
      <button
        onClick={addTraveler}
        className="ml-auto block text-sm font-semibold text-primary border border-primary px-3 py-2 rounded-md hover:bg-indigo-100 transition"
      >
        Add New Adult
      </button>

      {/* Traveler List */}
      {travelers.map((traveler, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-md cursor-pointer"
        >
          <span className="font-medium">{traveler}</span>
          <span className="text-xl font-bold">+</span>
        </div>
      ))}

      {/* Booking Details */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          Booking detail will be sent to
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-primary"
            />
          </div>
        </div>
      </div>

      {/* Proceed to Payment Button */}
      <button
        onClick={() => navigate("/payment")}
        className="w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-opacity-70 transition"
      >
        Proceed To Payment
      </button>
    </div>
  );
};

export default TravelerDetails;
