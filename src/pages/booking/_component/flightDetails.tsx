import { FaPlane, FaEye } from "react-icons/fa";

const FlightDetails = () => {
  return (
    <div className="w-full  bg-white border rounded-xl p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center border-b pb-3">
        <p className="text-gray-600">
          Travel Class: <span className="font-semibold">Economy</span>
        </p>
        <div className="text-blue-500 flex md:tems-center text-center space-x-1 cursor-pointer hover:underline">
          <FaEye />
          <p>Baggage & Fare Rules</p>
        </div>
      </div>

      {/* Flight Segment 1 */}
      <div className="flex flex-col sm:flex-row gap-6 justify-between  md:items-center">
        {/* Departure Details */}
        <div className="text-left">
          <p className="text-3xl font-bold">BOM</p>
          <p className="text-xl font-semibold">14:50</p>
          <p className=" text-gray-500">Sun, 29 Jan 2023</p>
          <p className=" text-gray-500">
            Chhatrapati Shivaji Int'l Airport <br /> Terminal - 2, Gate - 25
          </p>
        </div>

        {/* Flight Duration */}
        <div className="flex flex-col items-center ">
          <p className="text-xl font-bold">9hr 50min</p>
          <FaPlane className="text-primary text-2xl" />
        </div>

        {/* Arrival Details */}
        <div className="md:text-right">
          <p className="text-3xl font-bold">CDG</p>
          <p className="text-xl font-semibold">11:50</p>
          <p className=" text-gray-500">Sun, 29 Jan 2023</p>
          <p className=" text-gray-500">
            Ch. De Gaulle, Paris, France <br /> Terminal - 2E, Gate - 3
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
