import { useState, useEffect, ChangeEvent } from "react";
import {
  FaRegCopy,
  FaExclamationCircle,
  FaPlaneArrival,
  FaPlaneDeparture,
} from "react-icons/fa";
import { useSetting } from "../../context/setting";
import { useToastNotification } from "../../context/toastNotification";
import { sendEmail } from "../../services/email";
import Loading from "../_components/loading";
import { IPayment } from "../../context/payment";
import Navbar from "../home/_components/navbar";
import Footer from "../home/_components/footer";
import { useParams } from "react-router";
import { getPaymentByToken, updatePaymentImage } from "../../services/payment";
import { compressImageUpload } from "../../utils/image";
import { baseChatURL } from "../../services/apiChat";
import { useNavigate } from "react-router";

const BookingPayment = () => {
  const { addNotification } = useToastNotification();
  const { settings, fetchSettings } = useSetting();
  const { paymentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [payment, setPayment] = useState<IPayment | null>(null);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadSetting = async () => {
      if (!paymentId) {
        return;
      }
      try {
        setLoading(true);

        await fetchSettings();
        const res = await getPaymentByToken(paymentId);
        setPayment(res);
        setImage(res?.image || "");
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadSetting();
  }, [paymentId]);

  useEffect(() => {
    // sendEmail(
    //   "self",
    //   `A user ${
    //     user?.fullName || user?.email}
    //    has click bank transfer payment method and has requested to make payment`,
    //   "Payment requested"
    // );
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handlePayment = async () => {
    try {
      if (!paymentId) return;
      setLoadingPayment(true);

      const res = await updatePaymentImage(paymentId, image);
      setPayment(res);

      sendEmail(
        "self",
        `A user ${
          payment?.userId?.fullName || payment?.userId?.email
        } has uploaded payment receipt`,
        "Uploaded Payment Receipt"
      );
      navigate("/confirm?paymentId=" + paymentId);
    } catch (error: any) {
      addNotification({
        message: error,
        error: true,
      });
    } finally {
      setLoadingPayment(false);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      const file = e.target.files?.[0];
      if (!file) throw Error("No image found");

      const imageUrl = await compressImageUpload(file, 1024);

      setImage(imageUrl);

      addNotification({ message: "Image uploaded" });
    } catch (err) {
      addNotification({ message: "Failed uploading image", error: true });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-[75rem] mx-auto px-4">
      <Navbar />
      {loading ? (
        <div className="h-[60vh] w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className=" rounded-lg p-6 w-full ">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div />
            <div className="text-right">
              <p className="text-lg font-bold">
                ${payment?.bookingId?.flightId?.price}
              </p>
            </div>
          </div>

          {/* Flight Details */}
          <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-bold text-gray-800">
              Flight Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="flex items-center gap-2">
                <FaPlaneDeparture className="text-primary" />
                <p className="text-gray-700">
                  <strong>From:</strong>{" "}
                  {payment?.bookingId?.flightId?.origin?.city} (
                  {payment?.bookingId?.flightId?.origin?.code})
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaPlaneArrival className="text-green-500" />
                <p className="text-gray-700">
                  <strong>To:</strong>{" "}
                  {payment?.bookingId?.flightId?.destination?.city} (
                  {payment?.bookingId?.flightId?.destination?.code})
                </p>
              </div>
              <p>
                <strong>Flight Number:</strong>{" "}
                {payment?.bookingId?.flightId?.flightNumber}
              </p>
              <p>
                <strong>Departure Time:</strong>{" "}
                {payment?.bookingId?.flightId?.departureTime}
              </p>
              <p>
                <strong>Arrival Time:</strong>{" "}
                {payment?.bookingId?.flightId?.arrivalTime}
              </p>
              <p>
                <strong>Class:</strong> {payment?.bookingId?.class}
              </p>
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
                onClick={() =>
                  copyToClipboard(settings.bankingInfo.accountNumber)
                }
              >
                <FaRegCopy className="text-gray-500 cursor-pointer" />
              </button>
            </div>
            <p className="font-semibold text-lg">
              {settings.bankingInfo.accountNumber}
            </p>

            <p className="text-sm text-gray-500 mt-3">Account name</p>
            <p className="font-semibold">{settings.bankingInfo.accountName}</p>

            <div className="flex justify-between items-center mt-3">
              <div>
                <p className="text-sm text-gray-500">Bank name</p>
                <p className="font-semibold uppercase">
                  {settings.bankingInfo.bankName}
                </p>
              </div>
              {/* <div className="text-right">
            <p className="text-sm text-gray-500">Account number refresh</p>
            <p className="font-semibold">{formatTime(countdown)}</p>
          </div> */}
            </div>

            <p className="text-sm text-gray-500 mt-3">Routing</p>
            <p className="font-semibold">{settings.bankingInfo.routing}</p>

            <p className="text-sm text-gray-500 mt-3">Address</p>
            <p className="font-semibold">{settings.bankingInfo.address}</p>
          </div>

          {/* Confirmation Notice */}
          <p className="text-xs text-gray-500 flex items-center justify-center mb-2">
            <FaExclamationCircle className="text-gray-500 mr-1" />
            Only confirm if you have made the transfer
          </p>

          {/* Confirm & Back Buttons */}
          {!image ? (
            <label
              htmlFor="img"
              className="w-full bg-primary gap-3 text-white py-2 rounded-lg font-semibold flex items-center justify-center"
            >
              {uploading && <Loading size="sm" color="white" />}
              Upload Receipt
              <input
                type="file"
                id="img"
                className="sr-only"
                onChange={handleImageUpload}
              />
            </label>
          ) : (
            <div className="w-full">
              <img src={baseChatURL + image} className="object-contain mb-4" />
              <button
                onClick={handlePayment}
                disabled={loadingPayment}
                className="w-full bg-primary gap-3 text-white py-2 rounded-lg font-semibold flex items-center justify-center"
              >
                {loadingPayment && <Loading size="sm" color="white" />}
                Confirm
              </button>
            </div>
          )}
          {/* <button
        onClick={close}
        className="w-full mt-3 border border-gray-300 py-2 rounded-lg font-semibold"
      >
        Back to payment methods
      </button> */}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BookingPayment;
