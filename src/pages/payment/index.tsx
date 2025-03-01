import { useState } from "react";
import Modal from "../_components/modal";
import Navbar from "../home/_components/navbar";
import FareSummary from "./_component/fareSummary";
import { CiBank } from "react-icons/ci";
import { FaCreditCard } from "react-icons/fa6";
import { MdCurrencyBitcoin } from "react-icons/md";
import Footer from "../home/_components/footer";

function Payment() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-[75rem] mx-auto w-full px-4">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-5 my-16 ">
        <div className="md:flex-[3]">
          <h1 className="text-3xl md:text-5xl font-bold">
            Select Payment Method
          </h1>
          <div className="mt-6 flex flex-col gap-6">
            {/* Bank Transfer Option */}
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
                onClick={() => setModalOpen(true)}
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
                  <div className="text-2xl font-bold">Credit / Debit Card</div>
                  <p className="text-gray-500 text-sm">
                    Pay instantly using your Visa, MasterCard, or other cards.
                  </p>
                </div>
              </div>

              <button className="bg-primary px-6 text-white font-semibold py-3 rounded-md hover:bg-opacity-70 transition">
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

              <button className="bg-primary px-6 text-white font-semibold py-3 rounded-md hover:bg-opacity-70 transition">
                Proceed To Payment
              </button>
            </div>
          </div>
        </div>

        <div className="md:flex-1 ">
          <FareSummary />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <p>This is the modal content! Add any custom information here.</p>
      </Modal>
      <Footer />
    </div>
  );
}

export default Payment;
