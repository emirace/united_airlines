import { useEffect, useState } from "react";
import Modal from "../_components/modal";
import Navbar from "../home/_components/navbar";
import FareSummary from "./_component/fareSummary";
import { CiBank, CiPhone } from "react-icons/ci";
import { FaCreditCard } from "react-icons/fa6";
import { MdCurrencyBitcoin } from "react-icons/md";
import Footer from "../home/_components/footer";
import BankTransfer from "./_component/bankTransfer";
import { useFlight, IFlight } from "../../context/flight";
import Loading from "../_components/loading";
import { useNavigate } from "react-router";
import CryptoPayment from "./_component/cryptoPayment";
import CardPayment from "./_component/cardPayment";
import LinkTransfer from "./_component/LinkTransfer";

function Payment() {
  const { getFlight, formData } = useFlight();
  const [flight, setFlight] = useState<IFlight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [showCrypto, setShowCrypto] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();
  const [linkTransfer, setLinkTransfer] = useState(false);

  useEffect(() => {
    const loadFlight = async () => {
      if (formData.flightId) {
        try {
          setLoading(true);
          setError("");
          const res = await getFlight(formData.flightId);
          setFlight(res as any);
        } catch (error: any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate(-1);
      }
    };
    loadFlight();
  }, []);

  return (
    <div className="max-w-[75rem] mx-auto w-full px-4">
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center h-[90vh] ">
          <Loading />
        </div>
      ) : error ? (
        <div className="pt-16 text-xl text-red-500 h-[80vh]">{error}</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-5 my-16 ">
          <div className="md:flex-[3]">
            <h1 className="text-3xl md:text-5xl font-bold">
              Select Payment Method
            </h1>
            <div className="mt-6 flex flex-col gap-6">
              {/* Bank Transfer Option */}
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between p-5 rounded-xl border">
                <div className="flex items-start gap-4">
                  <CiPhone size={40} />
                  <div>
                    <div className="text-2xl font-bold">Mobile Transfer</div>
                    <p className="text-gray-500 text-sm">
                      Securely transfer funds directly from your mobile bank
                      account.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-primary px-6 text-white font-semibold py-3 rounded-md hover:bg-opacity-70 transition"
                >
                  Proceed To Payment
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between p-5 rounded-xl border">
                <div className="flex items-start gap-4">
                  <CiBank size={40} />
                  <div>
                    <div className="text-2xl font-bold">Bank Transfer</div>
                    <p className="text-gray-500 text-sm">
                      Securely transfer funds directly from your bank account.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setLinkTransfer(true)}
                  className="bg-primary px-6 text-white font-semibold py-3 rounded-md hover:bg-opacity-70 transition"
                >
                  Proceed To Payment
                </button>
              </div>

              {/* Card Payment Option */}
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between p-5 rounded-xl border">
                <div className="flex items-start gap-4">
                  <FaCreditCard size={40} />
                  <div>
                    <div className="text-2xl font-bold">
                      Credit / Debit Card
                    </div>
                    <p className="text-gray-500 text-sm">
                      Pay instantly using your Visa, MasterCard, or other cards.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowCard(true)}
                  className="bg-primary px-6 text-white font-semibold py-3 rounded-md hover:bg-opacity-70 transition"
                >
                  Proceed To Payment
                </button>
              </div>

              {/* Cryptocurrency Option */}
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between p-5 rounded-xl border">
                <div className="flex items-start gap-4">
                  <MdCurrencyBitcoin size={40} />
                  <div>
                    <div className="text-2xl font-bold">Cryptocurrency</div>
                    <p className="text-gray-500 text-sm">
                      Pay using Bitcoin, Ethereum, or other cryptocurrencies.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowCrypto(true)}
                  className="bg-primary px-6 text-white font-semibold py-3 rounded-md hover:bg-opacity-70 transition"
                >
                  Proceed To Payment
                </button>
              </div>
            </div>
          </div>

          <div className="md:flex-1 ">
            <FareSummary flight={flight} />
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <BankTransfer
          amount={
            flight?.price && formData.type === "Round Trip"
              ? flight?.price * 2
              : flight?.price
          }
          close={() => setModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={linkTransfer} onClose={() => setLinkTransfer(false)}>
        <LinkTransfer
          amount={
            flight?.price && formData.type === "Round Trip"
              ? flight?.price * 2
              : flight?.price
          }
          close={() => setLinkTransfer(false)}
        />
      </Modal>

      <Modal isOpen={showCrypto} onClose={() => setShowCrypto(false)}>
        <CryptoPayment
          price={
            flight?.price && formData.type === "Round Trip"
              ? flight?.price * 2
              : flight?.price
          }
        />
      </Modal>

      <Modal isOpen={showCard} onClose={() => setShowCard(false)}>
        <CardPayment />
      </Modal>
      <Footer />
    </div>
  );
}

export default Payment;
