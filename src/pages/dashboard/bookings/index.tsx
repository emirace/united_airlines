import { useEffect, useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineXCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { IoAirplane } from "react-icons/io5";
import { useBooking } from "../../../context/booking";
import { useToastNotification } from "../../../context/toastNotification";
import moment from "moment";
import Loading from "../../_components/loading";
import { HiOutlineClock } from "react-icons/hi2";

const Booking = () => {
  const { fetchUserBookings, bookings, loading } = useBooking();
  const { addNotification } = useToastNotification();
  const [activeTab, setActiveTab] = useState("pending");

  const tabItems = [
    {
      id: "pending",
      label: "Pending Booking",
      icon: <HiOutlineClock size={18} />,
    },
    {
      id: "confirmed",
      label: "Upcoming Booking",
      icon: <HiOutlineCalendar size={18} />,
    },
    {
      id: "cancelled",
      label: "Canceled Booking",
      icon: <HiOutlineXCircle size={18} />,
    },
    {
      id: "completed",
      label: "Completed Booking",
      icon: <HiOutlineCheckCircle size={18} />,
    },
  ];

  const filteredBookings = bookings.filter((b) => b.status === activeTab);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        await fetchUserBookings();
      } catch (error: any) {
        addNotification({ message: error, error: true });
      }
    };
    loadBooking();
  }, []);

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
        {loading ? (
          <Loading />
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking._id} className="border  rounded-lg mb-4">
              <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    <IoAirplane />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {booking.flightId.origin.city} to{" "}
                      {booking.flightId.destination.city}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Booking ID: {booking.bookingId} • {booking.class}
                    </p>
                  </div>
                </div>
                <button className="md:ml-auto px-4 py-2 text-primary bg-primary/10 rounded-md">
                  Manage Booking
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3 text-sm text-gray-700 p-4">
                <div>
                  <p className="text-gray-500">Departure time</p>
                  <p className="font-semibold">
                    {moment(booking.flightId.departureTime).format(
                      "ddd DD MMM hh:mm A"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Arrival time</p>
                  <p className="font-semibold">
                    {moment(booking.flightId.arrivalTime).format(
                      "ddd DD MMM hh:mm A"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Booked by</p>
                  <p className="font-semibold">{booking.userId.fullName}</p>
                </div>
              </div>
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
