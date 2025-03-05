import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IAirport, useAirport } from "../../../context/airport";
import Modal from "../../_components/modal";
import AirportForm from "./_components/airportForm";
import Loading from "../../_components/loading";
import moment from "moment";
import { FaTrash } from "react-icons/fa";

const Airports: React.FC = () => {
  const { airports, loading, removeAirport } = useAirport();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setisOpen] = useState(false);
  const itemsPerPage = 5;
  const [selectedAirport, setSelectedAirport] = useState<IAirport>();

  // Filter and paginate
  const filteredAirports = airports.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredAirports.length / itemsPerPage);

  const paginatedAirport = filteredAirports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (value: IAirport) => {
    setSelectedAirport(value);
    setisOpen(true);
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-4xl  font-bold">Airports </h2>
        <button
          onClick={() => setisOpen(true)}
          className="mt-4 px-6 py-2 bg-primary flex items-center gap-2 text-white rounded-lg"
        >
          Add
        </button>
      </div>
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm">
          {airports.length} Airports
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search"
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
        <div className="overflow-x-auto min-h-96">
          <table className="w-full border-collapse ">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {paginatedAirport.map((airport, index) => (
                <tr key={airport.code} className="border-b">
                  <td className="py-3 px-4">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 px-4 font-medium">{airport.code}</td>
                  <td className="py-3 px-4 font-medium">{airport.name}</td>
                  <td className="py-3 px-4 text-gray-500">{airport.city}</td>
                  <td className="py-3 px-4 text-gray-500">{airport.country}</td>
                  <td className="py-3 px-4 text-gray-500">
                    {moment(airport.createdAt).calendar()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleEdit(airport)}
                        className="text-primary hover:underline"
                      >
                        Edit
                      </button>
                      <FaTrash
                        onClick={() => removeAirport(airport._id!)}
                        className="text-red-500 text-xl"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <p>
          Showing{" "}
          {Math.min(currentPage * itemsPerPage, filteredAirports.length)} of{" "}
          {filteredAirports.length} entries
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
          setSelectedAirport(undefined);
          setisOpen(false);
        }}
      >
        <AirportForm
          onClose={() => setisOpen(false)}
          airport={selectedAirport}
        />
      </Modal>
    </div>
  );
};

export default Airports;
