import { useState, useEffect } from "react";
import { FaRegCopy, FaExclamationCircle } from "react-icons/fa";
import IMAGES from "../../../assets/images";
import { useToastNotification } from "../../../context/toastNotification";
import { useSetting } from "../../../context/setting";
import Loading from "../../_components/loading";
import { processPayment } from "../../../services/payment";
import { useFlight } from "../../../context/flight";
import { useNavigate } from "react-router";
import { sendEmail } from "../../../services/email";
import { useUser } from "../../../context/user";

const BankTransfer = ({
  amount,
  close,
}: {
  amount?: number;
  close: () => void;
}) => {
  const { user } = useUser();
  const { addNotification } = useToastNotification();
  const { settings, fetchSettings } = useSetting();
  const { formData } = useFlight();
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3600);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadSetting = async () => {
      try {
        setLoading(true);

        await fetchSettings();
      } catch (error: any) {
        addNotification({
          message: error || "An error occurred while updating your profile.",
          error: true,
        });
      } finally {
        setLoading(false);
      }
    };
    loadSetting();
  }, []);

  useEffect(() => {
    sendEmail(
      "self",
      `A user ${
        user?.fullName || user?.email
      } has click mobile transfer payment method and has requested to make payment`,
      "Payment requested"
    );
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 10;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handlePayment = async () => {
    try {
      setLoadingPayment(true);
      const paymentData = {
        seatNumber: formData.seats,
        flightId: formData.flightId,
        classType: formData.class,
        amount: amount!,
        currency: "USD",
        paymentMethod: "bank_transfer",
        travellers: formData.travellersInfo,
        confirmEmail: formData.email,
      };

      const res = await processPayment(paymentData);

      sendEmail(
        "self",
        `A user ${
          user?.fullName || user?.email
        } has click i have  made payment please confirm payment`,
        "Confirm Payment"
      );
      navigate(
        `/confirm?bookingId=${res.booking._id}&paymentId=${res.payment._id}`
      );
    } catch (error: any) {
      addNotification({
        message: error,
        error: true,
      });
    } finally {
      setLoadingPayment(false);
    }
  };

  return loading ? (
    <div className="h-[60vh] w-full flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    <div className=" rounded-lg p-6 w-full ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <img src={IMAGES.logo} alt="logo" className="h-10 " />
        <div className="text-right">
          {/* <p className="text-sm text-gray-500">+2349043312267</p> */}
          <p className="text-lg font-bold">${amount}</p>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold">Bank transfer</h2>
      <p className="text-sm text-gray-500 mb-4">
        Make transfer to the account details provided
      </p>

      {/* Account Details */}
      <div className="bg-gray-50 p-4 rounded-lg mb-4 border">
        <div className="flex gap-4 items-center">
          <p className="text-sm text-gray-500">Account number</p>
          <button
            onClick={() => copyToClipboard(settings.bankingInfo.accountNumber)}
          >
            <FaRegCopy className="text-gray-500 cursor-pointer" />
          </button>
        </div>
        <p className="font-semibold text-lg">
          {settings.bankingInfo.accountNumber}
        </p>

        <p className="text-sm text-gray-500 mt-3">Account name</p>
        <p className="font-semibold">{settings.bankingInfo.accountName}</p>
        
        <p className="text-sm text-gray-500 mt-3">Routing</p>
        <p className="font-semibold">{settings.bankingInfo.routing}</p>

        <p className="text-sm text-gray-500 mt-3">Address</p>
        <p className="font-semibold">{settings.bankingInfo.address}</p>
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-sm text-gray-500">Bank name</p>
            <p className="font-semibold uppercase">
              {settings.bankingInfo.bankName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Account number refresh</p>
            <p className="font-semibold">{formatTime(countdown)}</p>
          </div>
        </div>
      </div>

      {/* Confirmation Notice */}
      <p className="text-xs text-gray-500 flex items-center justify-center mb-2">
        <FaExclamationCircle className="text-gray-500 mr-1" />
        Only confirm if you have made the transfer
      </p>

      {/* Confirm & Back Buttons */}
      <button
        onClick={handlePayment}
        disabled={loadingPayment}
        className="w-full bg-primary text-white py-2 rounded-lg font-semibold flex items-center justify-center"
      >
        {loadingPayment && <Loading size="sm" color="white" />}I have made
        Payment (${amount})
      </button>
      <button
        onClick={close}
        className="w-full mt-3 border border-gray-300 py-2 rounded-lg font-semibold"
      >
        Back to payment methods
      </button>
    </div>
  );
};

export default BankTransfer;
