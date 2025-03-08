import React, { useState } from "react";
import Navbar from "./home/_components/navbar";
import Footer from "./home/_components/footer";
import { IBooking } from "../context/booking";
import { getBookingByBookingId } from "../services/booking";
import { useToastNotification } from "../context/toastNotification";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const Tracking: React.FC = () => {
  const [reference, setReference] = useState("");
  const { addNotification } = useToastNotification();
  const [booking, setBooking] = useState<IBooking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!reference) {
      setError("Please enter both Booking Reference and Email.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await getBookingByBookingId(reference);
      setBooking(res);
    } catch (error: any) {
      addNotification({ message: "Booking not found!", error: true });
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <Navbar />
      <div className="min-h-screen py-10">
        {/* Search Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Track Your Booking
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Booking Reference
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full p-3 border rounded-md"
                placeholder="Enter Reference (e.g., ABC123)"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition"
              >
                {loading ? "Searching..." : "Search Booking"}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>

        {/* Booking Details */}
        {booking && (
          <div className="mt-8 bg-gray-50 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-600 flex items-center">
              {booking.status === "Confirmed" ? (
                <FaCheckCircle className="mr-2 text-green-500" />
              ) : (
                <FaTimesCircle className="mr-2 text-red-500" />
              )}
              {booking.status}
            </h2>

            {/* Flight Details */}
            <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-bold text-gray-800">
                Flight Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <FaPlaneDeparture className="text-blue-500" />
                  <p className="text-gray-700">
                    <strong>From:</strong> {booking.flightId.origin.city} (
                    {booking.flightId.origin.code})
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaPlaneArrival className="text-green-500" />
                  <p className="text-gray-700">
                    <strong>To:</strong> {booking.flightId.destination.city} (
                    {booking.flightId.destination.code})
                  </p>
                </div>
                <p>
                  <strong>Flight Number:</strong>{" "}
                  {booking.flightId.flightNumber}
                </p>
                <p>
                  <strong>Departure Time:</strong>{" "}
                  {booking.flightId.departureTime}
                </p>
                <p>
                  <strong>Arrival Time:</strong> {booking.flightId.arrivalTime}
                </p>
                <p>
                  <strong>Class:</strong> {booking.class}
                </p>
              </div>
            </div>

            {/* Traveller Details */}
            <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-bold text-gray-800">
                Traveller Details
              </h3>
              {booking.travellers.map((traveller, index) => (
                <div key={index} className="border-b py-3">
                  <div className="flex items-center gap-3">
                    <FaUser className="text-blue-500" />
                    <p className="text-gray-700">
                      <strong>
                        {traveller.title} {traveller.firstName}{" "}
                        {traveller.lastName}
                      </strong>
                    </p>
                  </div>
                  {/* <p className="text-gray-600">
                    <strong>Nationality:</strong> {traveller.nationality}
                  </p>
                  <p className="text-gray-600">
                    <strong>Passport:</strong> {traveller.passportNumber} (
                    {traveller.passportCountry})
                  </p>
                  <p className="text-gray-600">
                    <strong>Expiry:</strong> {traveller.passportExpiry}
                  </p> */}
                </div>
              ))}
            </div>

            {/* Payment & Seat Details */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-bold text-gray-800">Payment</h3>
                <p className="text-gray-700">
                  <strong>Status:</strong> {booking.paymentStatus}
                </p>
              </div>
              <div className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-bold text-gray-800">Seat(s)</h3>
                {booking.seatId.map((seat, index) => (
                  <p key={index} className="text-gray-700">
                    <strong>Seat {index + 1}:</strong> {seat.seatNumber} (
                    {seat.class})
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Tracking;
