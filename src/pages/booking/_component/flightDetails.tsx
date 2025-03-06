import { FaPlane, FaEye } from "react-icons/fa";
import { IFlight, useFlight } from "../../../context/flight";
import moment from "moment";
import { formatDuration } from "../../../utils";

const FlightDetails = ({ flight }: { flight: IFlight }) => {
  const { formData } = useFlight();
  return (
    <div className="w-full  bg-white border rounded-xl p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center border-b pb-3">
        <p className="text-gray-600">
          Travel Class: <span className="font-semibold">{formData.class}</span>
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
          <p className="text-3xl font-bold">{flight.origin.code}</p>
          <p className="text-xl font-semibold">
            {moment(flight.departureTime).format("HH:mm")}
          </p>
          <p className=" text-gray-500">
            {moment(flight.arrivalTime).format("ddd, DD MMM YYYY")}
          </p>
          <p className=" text-gray-500">
            {flight.origin.name} <br /> Terminal - 2, Gate - 25
          </p>
        </div>

        {/* Flight Duration */}
        <div className="flex flex-col items-center ">
          <p className="text-xl font-bold">{formatDuration(flight.duration)}</p>
          <FaPlane className="text-primary text-2xl" />
        </div>

        {/* Arrival Details */}
        <div className="md:text-right">
          <p className="text-3xl font-bold">{flight.destination.code}</p>
          <p className="text-xl font-semibold">
            {moment(flight.arrivalTime).format("HH:mm")}
          </p>
          <p className=" text-gray-500">
            {moment(flight.arrivalTime).format("ddd, DD MMM YYYY")}
          </p>
          <p className=" text-gray-500">
            {flight.destination.name} <br /> Terminal - 2E, Gate - 3
          </p>
        </div>
      </div>
      {formData.type === "Round Trip" && (
        <>
          <div className="bg-primary/10 text-primary p-2 text-center rounded-lg">
            Returning
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-between  md:items-center">
            {/* Departure Details */}
            <div className="text-left">
              <p className="text-3xl font-bold">{flight.destination.code}</p>
              <p className="text-xl font-semibold">
                {moment(flight.departureTime).format("HH:mm")}
              </p>
              <p className=" text-gray-500">
                {moment(flight.arrivalTime).format("ddd, DD MMM YYYY")}
              </p>
              <p className=" text-gray-500">
                {flight.destination.name} <br /> Terminal - 2, Gate - 25
              </p>
            </div>

            {/* Flight Duration */}
            <div className="flex flex-col items-center ">
              <p className="text-xl font-bold">
                {formatDuration(flight.duration)}
              </p>
              <FaPlane className="text-primary text-2xl" />
            </div>

            {/* Arrival Details */}
            <div className="md:text-right">
              <p className="text-3xl font-bold">{flight.origin.code}</p>
              <p className="text-xl font-semibold">
                {moment(flight.arrivalTime).format("HH:mm")}
              </p>
              <p className=" text-gray-500">
                {moment(flight.arrivalTime).format("ddd, DD MMM YYYY")}
              </p>
              <p className=" text-gray-500">
                {flight.origin.name} <br /> Terminal - 2E, Gate - 3
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FlightDetails;
