import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";

const FareSummary = () => {
  const [coupon, setCoupon] = useState("");

  return (
    <div className=" space-y-4">
      {/* Fare Summary Box */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-bold">Fare Summary</h2>

        <div className="flex justify-between text-gray-700">
          <span>
            Base Fare <span className="text-gray-400">ⓘ</span>
          </span>
          <span className="font-medium">$38,660</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span className="font-medium">+ $2,560</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Other Services</span>
          <span className="font-medium">$20</span>
        </div>

        <hr className="border-gray-300" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total Fare</span>
          <span>$36,500</span>
        </div>
      </div>

      {/* Offer & Discount Section */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-bold">Offer & Discount</h2>
        <div className="flex">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Coupon code"
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-primary"
          />
          <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-70 transition">
            Apply
          </button>
        </div>
      </div>

      {/* Cancellation & Date Change Charges */}
      <div className="border rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-bold">
          Cancellation & Date Change Charges
        </h2>
        <p className="text-red-600 font-semibold">Non Refundable</p>
        <p className="text-gray-700 text-sm">
          The Cancellation penalty on this booking will depend on how close to
          the departure date you cancel your ticket. View fare rules to know
          more.
        </p>
        <Link
          to="#"
          className="text-primary font-medium flex items-center gap-2"
        >
          <FaEye />
          View Detail
        </Link>
      </div>
    </div>
  );
};

export default FareSummary;
