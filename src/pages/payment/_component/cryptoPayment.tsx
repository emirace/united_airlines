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
  const [selectedCrypto, setSelectedCrypto] = useState<any>(null); // Selected Crypto Object
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
          message: error || "An error occurred while fetching settings.",
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
      } clicked crypto payment and requested to make payment.`,
      "Payment requested"
    );
  }, []);

  useEffect(() => {
    if (selectedCrypto && price) {
      setAmount(selectedCrypto.rate * price);
    }
  }, [selectedCrypto, price]);

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
        currency: selectedCrypto.name,
        paymentMethod: "crypto",
        travellers: formData.travellersInfo,
        confirmEmail: formData.email,
      };

      const res = await processPayment(paymentData);

      sendEmail(
        "self",
        `A user ${
          user?.fullName || user?.email
        } clicked "I have made payment" for ${selectedCrypto.name}.`,
        "Confirm Payment"
      );

      navigate(
        `/confirm?bookingId=${res.booking._id}&paymentId=${res.payment._id}`
      );
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoadingPayment(false);
    }
  };

  return loading ? (
    <div className="h-[60vh] w-full flex justify-center items-center">
      <Loading />
    </div>
  ) : (
    <div className="p-6 w-full">
      {/* Select Crypto Dropdown */}
      <h2 className="text-xl font-semibold text-center">
        Select Cryptocurrency
      </h2>
      <select
        className="w-full p-2 border rounded-lg mt-2"
        value={selectedCrypto?.name || ""}
        onChange={(e) => {
          const crypto = settings.cryptoInfo.find(
            (c: any) => c.name === e.target.value
          );
          setSelectedCrypto(crypto || null);
        }}
      >
        <option value="">Select a cryptocurrency</option>
        {settings.cryptoInfo.map((crypto: any) => (
          <option key={crypto.name} value={crypto.name}>
            {crypto.name} ({crypto.network})
          </option>
        ))}
      </select>

      {/* Payment Details */}
      {selectedCrypto && (
        <>
          <h2 className="text-xl font-semibold text-center mt-4">
            Pay with <span className="capitalize">{selectedCrypto.name}</span>
          </h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Send the amount due to the address below.
          </p>

          {/* QR Code */}
          <div className="flex flex-col items-center">
            <QRCodeSVG value={selectedCrypto.address} size={120} />
            <p className="text-sm text-gray-500 mt-2 break-all text-center">
              {selectedCrypto.address}
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Please send only {selectedCrypto.name} to this address.
          </p>

          {/* Payment Details Box */}
          <div className="bg-gray-50 p-4 rounded-lg mt-4 border">
            {/* Amount Due */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Amount due</p>
              <p className="font-semibold">
                {amount} {selectedCrypto.name}
              </p>
            </div>

            {/* Wallet Address */}
            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-gray-500">Wallet Address</p>
              <div className="flex items-center">
                <p className="font-semibold mr-2">
                  {formatWalletAddress(selectedCrypto.address)}
                </p>
                <button onClick={() => copyToClipboard(selectedCrypto.address)}>
                  <FaRegCopy className="text-gray-500 cursor-pointer" />
                </button>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-gray-500">Time left to pay</p>
              <p className="font-semibold">{formatTime(timeLeft)}</p>
            </div>

            {/* Confirm Payment Button */}
            <button
              onClick={handlePayment}
              className="w-full mt-6 bg-primary text-white py-2 rounded-lg font-semibold flex items-center justify-center"
            >
              {loadingPayment && <Loading size="sm" color="white" />}I have made
              payment (${amount})
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoPayment;
