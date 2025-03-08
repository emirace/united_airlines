import {
  FaRegCalendar,
  FaUsers,
  // FaRegFilePdf,
  FaRegIdBadge,
  FaRegUser,
  FaRegCreditCard,
  FaRegMoneyBill1,
} from "react-icons/fa6";
import Navbar from "./home/_components/navbar";
import Footer from "./home/_components/footer";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { getBookingById } from "../services/booking";
import { getPaymentById } from "../services/payment";
import { IPayment } from "../context/payment";
import { IBooking } from "../context/booking";
import { useToastNotification } from "../context/toastNotification";
import moment from "moment";
import Loading from "./_components/loading";
import { Link } from "react-router";
import socket from "../socket";

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const { addNotification } = useToastNotification();
  const bookingId = searchParams.get("bookingId");
  const paymentId = searchParams.get("paymentId");
  const [booking, setBooking] = useState<IBooking | null>(null);
  const [payment, setPayment] = useState<IPayment | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(true);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const loadData = async () => {
      try {
        if (bookingId && paymentId) {
          setLoading(true);
          const res = await getBookingById(bookingId);
          const res2 = await getPaymentById(paymentId);
          setBooking(res);
          setPayment(res2);
        }
      } catch (error: any) {
        addNotification({ message: error, error: true });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [bookingId, paymentId, status]);

  useEffect(() => {
    if (!socket) return;
    socket.on("update-payment", ({ id, status }) => {
      if (id === payment?._id) {
        setConfirming(false);
        setStatus(status);
      }
    });
  }, []);

  return (
    <div className="max-w-[75rem] mx-auto w-full px-4">
      <Navbar />
      <div className="flex items-center justify-center w-full py-24">
        {loading ? (
          <Loading />
        ) : (
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl mx-auto text-lg text-gray-900">
            {/* Heading */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <h2 className="text-4xl font-bold capitalize">{status}!</h2>
            </div>
            {confirming ? (
              <div className="flex items-center justify-center text-xl w-full gap-4 mb-4">
                <Loading size="sm" /> Confirming payment
              </div>
            ) : (
              <div className="flex items-center justify-center text-xl w-full gap-4 mb-4">
                Payment {status}
              </div>
            )}
            <p className="text-gray-600 text-center mb-2">
              Your flight has been booked and an email wil be sent to you to
              confirm your booking when payment is confirmed
            </p>
            <h3 className="text-xl font-bold text-center text-primary mb-4">
              {booking?.flightId.origin.city} to{" "}
              {booking?.flightId.destination.city}
            </h3>

            {/* Booking Details */}
            <div className="grid grid-cols-2 gap-20 mt-6">
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaRegIdBadge className="text-gray-600" />
                    <span>Booking ID:</span>
                  </div>
                  <span>{booking?.bookingId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaRegUser className="text-gray-600" />
                    <span>Booked by:</span>
                  </div>
                  <span className="font-semibold">
                    {booking?.userId.fullName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaRegCreditCard className="text-gray-600" />
                    <span>Payment Method:</span>
                  </div>
                  <span className="font-semibold">
                    {payment?.paymentMethod}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaRegMoneyBill1 className="text-gray-600" />
                    <span>Total Price:</span>
                  </div>
                  <span className="font-semibold">
                    {payment?.currency}
                    {payment?.amount}
                  </span>
                </div>
              </div>
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaRegCalendar className="text-gray-600" />
                    <span>Date Booked:</span>
                  </div>
                  <span>{moment(booking?.createdAt).calendar()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaRegCalendar className="text-gray-600" />
                    <span>Departure Date:</span>
                  </div>
                  <span>
                    {moment(booking?.flightId?.departureTime).calendar()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaUsers className="text-gray-600" />
                    <span>Guests:</span>
                  </div>
                  <span>{booking?.travellers.length}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 space-x-4">
              {/* <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300">
                <FaShare className="mr-2" /> Share
              </button> */}
              <Link
                to="/dashboard/bookings"
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-indigo-700"
              >
                {/* <FaRegFilePdf className="mr-2" />  */}
                Go to Booking
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
