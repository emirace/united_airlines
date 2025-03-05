import React, { useState } from "react";
import Navbar from "./home/_components/navbar";
import Footer from "./home/_components/footer";

const Tracking: React.FC = () => {
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [booking] = useState<any | null>(null);
  const [error] = useState("");

  const handleSearch = () => {
    // const foundBooking = mockBookings.find(
    //   (b) =>
    //     b.reference === reference.toUpperCase() &&
    //     b.email.toLowerCase() === email.toLowerCase()
    // );
    // if (foundBooking) {
    //   setBooking(foundBooking);
    //   setError("");
    // } else {
    //   setBooking(null);
    //   setError("No booking found with this reference number.");
    // }
  };

  return (
    <div className=" max-w-[75rem] mx-auto px-4">
      <Navbar />
      <div className="min-h-screen">
        <div className="w-full mt-16 bg-gray-100 rounded-lg p-6">
          <h1 className="text-4xl font-bold  mb-4">Track Your Booking</h1>
          <div className="space-y-4 flex flex-col md:flex-row md:items-end w-full gap-6">
            <div className="flex-1">
              <label className="block font-medium">Booking Reference</label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Reference (e.g., ABC123)"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Email"
              />
            </div>
            <button
              onClick={handleSearch}
              className=" p-2 px-6 bg-primary text-white rounded-md"
            >
              Search Booking
            </button>
          </div>

          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
        {booking && (
          <div className="mt-6 p-4 bg-gray-50 border rounded-md">
            <h2 className="text-xl font-semibold text-green-600">
              {booking.status}
            </h2>
            <p className="text-gray-700 mt-1">
              <strong>Flight:</strong> {booking.flight.flightNumber} (
              {booking.flight.airline})
            </p>
            <p className="text-gray-700">
              <strong>Route:</strong> {booking.flight.from} →{" "}
              {booking.flight.to}
            </p>
            <p className="text-gray-700">
              <strong>Date & Time:</strong> {booking.flight.date},{" "}
              {booking.flight.time}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Tracking;
