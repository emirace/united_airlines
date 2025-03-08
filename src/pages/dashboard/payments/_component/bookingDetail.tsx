import React from "react";
import { IBooking } from "../../../../context/booking";
import { baseChatURL } from "../../../../services/apiChat";

interface BookingDetailsProps {
  booking?: IBooking;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ booking }) => {
  console.log(booking);
  return (
    <div className="p-6 border rounded-xl  space-y-6">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p>
          <strong>Booking ID:</strong> {booking?.bookingId}
        </p>
        <p>
          <strong>Status:</strong> {booking?.status}
        </p>
        <p>
          <strong>Payment Status:</strong> {booking?.paymentStatus}
        </p>
        <p>
          <strong>Class:</strong> {booking?.class}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {booking?.createdAt && new Date(booking?.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold">Flight Details</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p>
            <strong>Flight Number:</strong> {booking?.flightId?.flightNumber}
          </p>
          <p>
            <strong>Origin:</strong> {booking?.flightId.origin.city} (
            {booking?.flightId.origin.code})
          </p>
          <p>
            <strong>Destination:</strong> {booking?.flightId.destination.city} (
            {booking?.flightId.destination.code})
          </p>
          <p>
            <strong>Departure:</strong>{" "}
            {booking &&
              new Date(booking?.flightId.departureTime).toLocaleString()}
          </p>
          <p>
            <strong>Arrival:</strong>{" "}
            {booking &&
              new Date(booking?.flightId.arrivalTime).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {booking?.flightId.status}
          </p>
        </div>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold">Seats</h3>
        <ul className="list-none text-gray-700">
          {booking?.seatId.map((seat, index) => (
            <li key={index} className="py-1">
              Seat {seat.seatNumber} ({seat.class})
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold">Travellers</h3>
        <div className="space-y-4">
          {booking?.travellers.map((traveller: any, index) => (
            <div key={index} className="p-4 border rounded-lg bg-white shadow">
              <img
                src={baseChatURL + traveller.image}
                className="object-contain "
              />
              <p>
                <strong>Name:</strong> {traveller.title} {traveller.firstName}{" "}
                {traveller.lastName}
              </p>
              <p>
                <strong>Date of Birth:</strong> {traveller.dob.day}/
                {traveller.dob.month}/{traveller.dob.year}
              </p>
              <p>
                <strong>Nationality:</strong> {traveller.nationality}
              </p>
              <p>
                <strong>Passport Number:</strong> {traveller.passportNumber}
              </p>
              <p>
                <strong>Passport Country:</strong> {traveller.passportCountry}
              </p>
              <p>
                <strong>Passport Expiry:</strong> {traveller.passportExpiry}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
