import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import moment from "moment";
import { useBooking } from "../../../context/booking";
import Loading from "../../_components/loading";

const AllBookings: React.FC = () => {
  const { bookings, fetchBookings, cancelUserBooking } = useBooking();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        await fetchBookings();
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  // Filter bookings by flight number or user name
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.flightId.flightNumber
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      booking.userId.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginated = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="border rounded-lg p-6 w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-4xl font-bold">Bookings</h2>
      </div>

      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm">
          {bookings.length} Bookings
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by Flight No. or Passenger Name"
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
        <div className="overflow-x-auto min-h-96 whitespace-nowrap">
          <table className="border-collapse w-full">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Passenger</th>
                <th className="py-3 px-4">Flight No.</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Seat</th>
                <th className="py-3 px-4">Booking Status</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4">Booked On</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            {bookings.length <= 0 && (
              <div className="pt-4">No bookings available</div>
            )}
            <tbody>
              {paginated.map((booking, index) => (
                <tr key={booking._id} className="border-b">
                  <td className="py-3 px-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-3 px-4 font-medium">{booking.bookingId}</td>
                  <td className="py-3 px-4">{booking.userId.fullName}</td>
                  <td className="py-3 px-4">{booking.flightId.flightNumber}</td>
                  <td className="py-3 px-4">{booking.class}</td>
                  <td className="py-3 px-4">{booking.seatId}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        booking.status === "confirmed"
                          ? "bg-green-500"
                          : booking.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        booking.paymentStatus === "completed"
                          ? "bg-green-500"
                          : booking.paymentStatus === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {booking.paymentStatus.charAt(0).toUpperCase() +
                        booking.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {moment(booking.createdAt).format("MMM D, YYYY HH:mm")}
                  </td>
                  <td className="py-3 px-4 flex gap-4">
                    <FaTrash
                      onClick={() => cancelUserBooking(booking._id!)}
                      className="text-red-500 text-xl cursor-pointer"
                    />
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
          {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of{" "}
          {filteredBookings.length} entries
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
    </div>
  );
};

export default AllBookings;
