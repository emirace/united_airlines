import {
  FaRegCalendar,
  FaUsers,
  FaRegFilePdf,
  FaShare,
  FaRegIdBadge,
  FaRegUser,
  FaRegCreditCard,
  FaRegMoneyBill1,
} from "react-icons/fa6";
import Navbar from "./home/_components/navbar";
import Footer from "./home/_components/footer";

const BookingConfirmation = () => {
  return (
    <div className="max-w-[75rem] mx-auto w-full px-4">
      <Navbar />
      <div className="flex items-center justify-center w-full h-[80vh]">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl mx-auto text-lg text-gray-900">
          {/* Heading */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🎉</span>
            <h2 className="text-4xl font-bold">Congratulations!</h2>
            <span className="text-2xl">🎉</span>
          </div>
          <p className="text-gray-600 text-center mb-2">
            Your flight has been booked
          </p>
          <h3 className="text-xl font-bold text-center text-primary mb-4">
            Beautiful Bali with Malaysia
          </h3>

          {/* Booking Details */}
          <div className="grid grid-cols-2 gap-20 mt-6">
            <div className="">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaRegIdBadge className="text-gray-600" />
                  <span>Booking ID:</span>
                </div>
                <span>BS-58678</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaRegUser className="text-gray-600" />
                  <span>Booked by:</span>
                </div>
                <span className="font-semibold">Frances Guerrero</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaRegCreditCard className="text-gray-600" />
                  <span>Payment Method:</span>
                </div>
                <span className="font-semibold">Credit card</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaRegMoneyBill1 className="text-gray-600" />
                  <span>Total Price:</span>
                </div>
                <span className="font-semibold">$1200</span>
              </div>
            </div>
            <div className="">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaRegCalendar className="text-gray-600" />
                  <span>Date Booked:</span>
                </div>
                <span>29 July 2022</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaRegCalendar className="text-gray-600" />
                  <span>Departure Date:</span>
                </div>
                <span>15 Aug 2022</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-gray-600" />
                  <span>Guests:</span>
                </div>
                <span>3</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6 space-x-4">
            <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300">
              <FaShare className="mr-2" /> Share
            </button>
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-indigo-700">
              <FaRegFilePdf className="mr-2" /> Download PDF
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
