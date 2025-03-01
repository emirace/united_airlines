import Select from "./select";
import {
  IoLocationOutline,
  IoPaperPlaneOutline,
  IoCalendarClearOutline,
} from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router";

const classes = [
  { label: "Economy", value: "Economy" },
  { label: "Premium Economy", value: "Premium Economy" },
  { label: "Business", value: "Business" },
  { label: "First Class", value: "First Class" },
];

const travelers = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];

const BookingForm = () => {
  return (
    <div className="relative bg-white shadow-lg p-6 pb-12 rounded-lg w-full ">
      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4 justify-between">
        <div className="flex md:justify-center font-bold">
          <button className="px-4 py-2 bg-black text-white rounded-l-lg">
            One Way
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-r-lg">
            Round Trip
          </button>
        </div>
        <div className="flex flex-col mdflex-row md:items-center gap-4 md:w-1/2">
          <Select options={classes} placeholder="Select Class" />
          <Select options={travelers} placeholder="Select Travelers" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <IoLocationOutline />
            From
          </div>
          <Select options={[]} placeholder="Select Location" bg="bg-white" />
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <IoPaperPlaneOutline />
            To
          </div>
          <Select options={[]} placeholder="Select Location" bg="bg-white" />
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <IoCalendarClearOutline />
            Departure
          </div>
          <Select options={[]} placeholder="Select Location" bg="bg-white" />
        </div>
      </div>
      <Link
        to="/listing"
        className="flex items-center absolute right-6 -bottom-5 gap-3 justify-center bg-primary text-white  mt-4 py-2 px-4 rounded-lg"
      >
        Find Flight
        <IoIosArrowRoundForward className="text-xl" />
      </Link>
    </div>
  );
};

export default BookingForm;
