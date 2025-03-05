import { useState } from "react";
import { useNavigate } from "react-router";
import { IFlight, useFlight } from "../../../context/flight";
import { useUser } from "../../../context/user";
import Modal from "../../_components/modal";
import FlightSeatSelection from "./flightSeatSelection";
import PassengerForm from "./passengerForm";
import { useToastNotification } from "../../../context/toastNotification";

const TravelerDetails = ({ flight }: { flight: IFlight }) => {
  const navigate = useNavigate();
  const { addNotification } = useToastNotification();
  const { user } = useUser();
  const { formData, updateFormData } = useFlight();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (selectedSeats: string[]) => {
    updateFormData({ seats: selectedSeats });
    if (!user) {
      navigate(`/login?redirect=/booking?id=${flight._id}`);
      return;
    }
    navigate("/payment");
  };

  const handleContinue = () => {
    if (!formData.email) {
      addNotification({ message: "Enter email" });
      return;
    }

    if (!formData.phone) {
      addNotification({ message: "Enter mobile number" });
      return;
    }
    setIsOpen(true);
  };

  return (
    <div className="border mt-10 rounded-lg p-4 md:p-6 space-y-4">
      {/* Title */}
      <h2 className="text-2xl font-bold">Traveler Details</h2>

      {/* Alert Message */}
      <div className="flex items-center bg-red-100 text-red-700 px-4 py-3 rounded-md">
        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded mr-2">
          New
        </span>
        <span>Please make sure you enter the Name as per your passport</span>
      </div>
      <PassengerForm />

      {/* Booking Details */}
      <div className="space-y-2 mt-6">
        <h3 className="text-lg font-semibold">
          Booking detail will be sent to
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              onChange={(e) => updateFormData({ phone: e.target.value })}
              value={formData.phone}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-primary"
            />
          </div>
        </div>
      </div>

      {/* Proceed to Payment Button */}
      <button
        onClick={handleContinue}
        className="w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-opacity-70 transition"
      >
        Continue
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <FlightSeatSelection
          bookedSeats={["A1", "B2", "C3"]}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default TravelerDetails;
