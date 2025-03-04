import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Modal from "../../_components/modal";
import Loading from "../../_components/loading";
import moment from "moment";
import FlightForm from "./_components/flightForm";
import { IFlight, useFlight } from "../../../context/flight";

const Flights: React.FC = () => {
  const { flights, fetchFlights, removeFlight } = useFlight();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setisOpen] = useState(false);
  const itemsPerPage = 5;
  const [selectedFlight, setSelectedFlight] = useState<IFlight>();
  const [loading, setLoading] = useState(true);

  // Filter and paginate
  const filteredFlights = flights.filter((flight) =>
    flight.flightNumber.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);
  const paginated = filteredFlights.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (flight: IFlight) => {
    setSelectedFlight(flight);
    setisOpen(true);
  };

  useEffect(() => {
    const loadFlights = async () => {
      try {
        setLoading(true);
        await fetchFlights({});
        setLoading(false);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    loadFlights();
  }, []);

  return (
    <div className="border rounded-lg p-6 w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-4xl font-bold">Flights</h2>
        <button
          onClick={() => setisOpen(true)}
          className="mt-4 px-6 py-2 bg-primary flex items-center gap-2 text-white rounded-lg w-full md:w-auto"
        >
          Add
        </button>
      </div>
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm">
          {flights.length} Flights
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by Flight Number"
            className="border w-full border-gray-300 rounded-md py-2 pl-8 pr-3 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-2 top-3 text-gray-500" />
        </div>
        <button className="flex items-center border border-gray-300 rounded-md px-4 py-2">
          Sort by <IoIosArrowDown className="ml-2" />
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className=" overflow-x-auto min-h-96">
          <table className=" border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4 whitespace-nowrap">Flight No.</th>
                <th className="py-3 px-4">Origin</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Departure</th>
                <th className="py-3 px-4">Arrival</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Seats</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((flight, index) => (
                <tr key={flight._id} className="border-b">
                  <td className="py-3 px-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {flight.flightNumber}
                  </td>
                  <td className="py-3 px-4">
                    {flight.origin.city}({flight.origin.code})
                  </td>
                  <td className="py-3 px-4">
                    {flight.destination.city}({flight.destination.code})
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {moment(flight.departureTime).format("MMM D, YYYY HH:mm")}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {moment(flight.arrivalTime).format("MMM D, YYYY HH:mm")}
                  </td>
                  <td className="py-3 px-4">{flight.duration / 60} hrs</td>
                  <td className="py-3 px-4">{flight.availableSeats}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        flight.status === "scheduled"
                          ? "bg-blue-500"
                          : flight.status === "delayed"
                          ? "bg-yellow-500"
                          : flight.status === "cancelled"
                          ? "bg-red-500"
                          : flight.status === "departed"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {flight.status.charAt(0).toUpperCase() +
                        flight.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">${flight.price.toFixed(2)}</td>
                  <td className="py-3 px-4 flex gap-4">
                    <button
                      onClick={() => handleEdit(flight)}
                      className="text-primary hover:underline"
                    >
                      Edit
                    </button>
                    <FaTrash
                      onClick={() => removeFlight(flight._id!)}
                      className="text-red-500 text-xl cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-4 text-sm">
        <p>
          Showing {Math.min(currentPage * itemsPerPage, filteredFlights.length)}{" "}
          of {filteredFlights.length} entries
        </p>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-primary"
            }`}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1 ? "bg-primary text-white" : "text-primary"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-primary"
            }`}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setSelectedFlight(undefined);
          setisOpen(false);
        }}
      >
        <FlightForm flight={selectedFlight} onClose={() => setisOpen(false)} />
      </Modal>
    </div>
  );
};

export default Flights;
