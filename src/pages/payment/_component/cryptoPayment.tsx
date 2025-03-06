import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { FaRegCopy } from "react-icons/fa";
import { useToastNotification } from "../../../context/toastNotification";
import { useSetting } from "../../../context/setting";
import Loading from "../../_components/loading";
import { processPayment } from "../../../services/payment";
import { useFlight } from "../../../context/flight";
import { useNavigate } from "react-router";
import { sendEmail } from "../../../services/email";
import { useUser } from "../../../context/user";

const CryptoPayment: React.FC<{ price?: number }> = ({ price }) => {
  const { user } = useUser();
  const { addNotification } = useToastNotification();
  const { formData } = useFlight();
  const [loadingPayment, setLoadingPayment] = useState(false);
  const navigate = useNavigate();
  const { settings, fetchSettings } = useSetting();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15 * 60 + 56); // 15:56 in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
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
      } has click crypto payment method and has requested to make payment`,
      "Payment requested"
    );
  }, []);

  useEffect(() => {
    if (settings && price) {
      setAmount(settings.cryptoInfo.rate * price);
    }
  }, [settings, price]);
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const formatWalletAddress = (address: string): string => {
    if (!address || address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handlePayment = async () => {
    try {
      setLoadingPayment(true);
      const paymentData = {
        seatNumber: formData.seats,
        flightId: formData.flightId,
        classType: formData.class,
        amount: amount!,
        currency: settings.cryptoInfo.name,
        paymentMethod: "crypto",
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
    <div className="h-[60vh] w-full flex justify-center items-center">
      <Loading />
    </div>
  ) : (
    <div className=" p-6 w-full ">
      {/* Header */}
      <h2 className="text-xl font-semibold text-center">
        Pay with <span className="capitalize">{settings.cryptoInfo.name}</span>
      </h2>
      <p className="text-sm text-gray-500 text-center mb-4">
        To complete this payment, send the amount due to the address below.
      </p>

      {/* QR Code */}
      <div className="flex flex-col items-center">
        <QRCodeSVG value={settings.cryptoInfo.address} size={120} />
        <p className="text-sm text-gray-500 mt-2 break-all text-center">
          {settings.cryptoInfo.address}
        </p>
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">
        Please make sure to only send {settings.cryptoInfo.name} to this
        address.
      </p>

      {/* Payment Details */}
      <div className="bg-gray-50 p-4 rounded-lg mt-4 border">
        {/* Amount Due */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Amount due</p>
          <p className="font-semibold">
            {amount} {settings.cryptoInfo.name}
          </p>
        </div>

        {/* ETH Address */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm text-gray-500">ETH address</p>
          <div className="flex items-center">
            <p className="font-semibold mr-2">
              {formatWalletAddress(settings.cryptoInfo.address)}
            </p>
            <button
              onClick={() => copyToClipboard(settings.cryptoInfo.address)}
            >
              <FaRegCopy className="text-gray-500 cursor-pointer" />
            </button>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm text-gray-500">Time left to pay</p>
          <p className="font-semibold">{formatTime(timeLeft)}</p>
        </div>
        {/* Confirm & Back Buttons */}
        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-primary text-white py-2 rounded-lg font-semibold flex items-center justify-center"
        >
          {loadingPayment && <Loading size="sm" color="white" />}I have made
          payment (${amount})
        </button>
      </div>
    </div>
  );
};

export default CryptoPayment;
