import { useState, useEffect } from "react";
import { FaRegCopy } from "react-icons/fa";
import { useToastNotification } from "../../../context/toastNotification";
import { useSetting } from "../../../context/setting";
import Loading from "../../_components/loading";
import { generatePaymentLink } from "../../../services/payment";
import { useFlight } from "../../../context/flight";
import { Link, useNavigate } from "react-router";
// import { sendEmail } from "../../../services/email";
import { useUser } from "../../../context/user";

const LinkTransfer = ({
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
  const [link, setLink] = useState("");
  const navigate = useNavigate();

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
    handlePayment();
  }, []);

  useEffect(() => {
    // sendEmail(
    //   "self",
    //   `A user ${
    //     user?.fullName || user?.email
    //   } has click bank transfer payment method and has requested to make payment`,
    //   "Payment requested"
    // );
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handlePayment = async () => {
    try {
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

      const res = await generatePaymentLink(paymentData);

      setLink(res);
    } catch (error: any) {
      addNotification({
        message: error,
        error: true,
      });
      close();
    }
  };

  return loading ? (
    <div className="h-[60vh] w-full flex items-center justify-center">
      <div className="text-center flex flex-col gap-6 items-center justify-center">
        Generating payment link
        <Loading />
      </div>
    </div>
  ) : (
    <div className=" rounded-lg p-6 w-full ">
      <Link
        to={link}
        className="w-full bg-primary text-white py-2 rounded-lg font-semibold flex items-center justify-center mb-4"
      >
        Make Payment
      </Link>

      <div className="flex gap-4 items-center w-full justify-center text-center">
        <p className="text-sm text-gray-500">Copyayment link</p>
        <button onClick={() => copyToClipboard(link)}>
          <FaRegCopy className="text-gray-500 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default LinkTransfer;
