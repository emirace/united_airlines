import { useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineXCircle,
  HiOutlineCheckCircle,
  HiOutlineTruck,
} from "react-icons/hi";
import { IoAirplane } from "react-icons/io5";

const bookingsData = [
  {
    id: 1,
    type: "completed",
    transport: "flight",
    title: "France to New York",
    bookingId: "CGDSUAHA12548",
    class: "Business class",
    departure: "Tue 05 Aug 12:00 AM",
    arrival: "Tue 06 Aug 4:00 PM",
    bookedBy: "Frances Guerrero",
  },
  {
    id: 2,
    type: "completed",
    transport: "car",
    title: "Chicago to San Antonio",
    bookingId: "CGDSUAHA12548",
    class: "Camry, Accord",
    pickup: "40764 Winchester Rd",
    drop: "11185 Mary Ball Rd",
    bookedBy: "Frances Guerrero",
  },
];

const Booking = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const tabItems = [
    {
      id: "upcoming",
      label: "Upcoming Booking",
      icon: <HiOutlineCalendar size={18} />,
    },
    {
      id: "canceled",
      label: "Canceled Booking",
      icon: <HiOutlineXCircle size={18} />,
    },
    {
      id: "completed",
      label: "Completed Booking",
      icon: <HiOutlineCheckCircle size={18} />,
    },
  ];

  const filteredBookings = bookingsData.filter((b) => b.type === activeTab);

  return (
    <div className=" border rounded-xl p-6 min-h-[80vh]">
      <h2 className="text-4xl font-bold">My Bookings</h2>

      {/* Tabs */}
      <div className="flex gap-6 mt-4 border-b overflow-x-auto w-full">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 pb-2 px-3 text-lg font-bold whitespace-nowrap ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Booking List */}
      <div className="mt-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="border  rounded-lg mb-4">
              <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {booking.transport === "flight" ? (
                      <IoAirplane />
                    ) : (
                      <HiOutlineTruck />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{booking.title}</h3>
                    <p className="text-gray-500 text-sm">
                      Booking ID: {booking.bookingId} • {booking.class}
                    </p>
                  </div>
                </div>
                <button className="md:ml-auto px-4 py-2 text-primary bg-primary/10 rounded-md">
                  Manage Booking
                </button>
              </div>

              {/* Flight Details */}
              {booking.transport === "flight" && (
                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3 text-sm text-gray-700 p-4">
                  <div>
                    <p className="text-gray-500">Departure time</p>
                    <p className="font-semibold">{booking.departure}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Arrival time</p>
                    <p className="font-semibold">{booking.arrival}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Booked by</p>
                    <p className="font-semibold">{booking.bookedBy}</p>
                  </div>
                </div>
              )}

              {/* Car Details */}
              {booking.transport === "car" && (
                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3 text-sm text-gray-700 p-4">
                  <div>
                    <p className="text-gray-500">Pickup address</p>
                    <p className="font-semibold">{booking.pickup}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Drop address</p>
                    <p className="font-semibold">{booking.drop}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Booked by</p>
                    <p className="font-semibold">{booking.bookedBy}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-6">
            No {activeTab} bookings available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Booking;
