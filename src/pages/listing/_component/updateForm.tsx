import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  IoLocationOutline,
  IoPaperPlaneOutline,
  IoCalendarClearOutline,
} from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import Select from "../../home/_components/select";
import { useFlight } from "../../../context/flight";
import { useToastNotification } from "../../../context/toastNotification";
import { useNavigate } from "react-router";
import { useAirport } from "../../../context/airport";

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

const UpdateForm = () => {
  const { airports } = useAirport();
  const { addNotification } = useToastNotification();
  const navigate = useNavigate();
  const { formData, updateFormData } = useFlight();

  const handleSubmit = () => {
    if (!formData.from) {
      addNotification({
        message: "Please select a departure location.",
        error: true,
      });
      return;
    }
    if (!formData.to) {
      addNotification({ message: "Please select a destination.", error: true });
      return;
    }
    if (!formData.date) {
      addNotification({
        message: "Please select a departure date.",
        error: true,
      });
      return;
    }
    if (!formData.class) {
      addNotification({
        message: "Please select a travel class.",
        error: true,
      });
      return;
    }
    if (!formData.travelers) {
      addNotification({
        message: "Please select the number of travelers.",
        error: true,
      });
      return;
    }

    navigate("/listing");
  };
  return (
    <div className="relative bg-white border  p-6 pb-12 rounded-xl w-full ">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 justify-between">
        <div className="flex md:justify-center font-bold">
          <button
            onClick={() => updateFormData({ type: "One Way" })}
            className={`px-4 py-2 rounded-l-lg ${
              formData.type === "One Way"
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            One Way
          </button>
          <button
            onClick={() => updateFormData({ type: "Round Trip" })}
            className={`px-4 py-2 rounded-r-lg ${
              formData.type === "Round Trip" ? "bg-black text-white" : ""
            }`}
          >
            Round Trip
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:w-1/2">
          <Select
            options={classes}
            placeholder="Select Class"
            onChange={(value) => updateFormData({ class: value })}
            value={formData.class}
          />
          <Select
            options={travelers}
            placeholder="Select Travelers"
            onChange={(value) =>
              updateFormData({ travelers: parseFloat(value) })
            }
            value={`${formData.travelers}`}
          />
        </div>
      </div>
      <div
        className={`grid grid-cols-1 ${
          formData.type === "Round Trip" ? "md:grid-cols-4" : "md:grid-cols-3"
        } gap-6`}
      >
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <IoLocationOutline />
            From
          </div>
          <Select
            options={airports
              .filter((airport) => airport._id !== formData.to)
              .map((airport) => ({
                label: `${airport.city}(${airport.code})`,
                value: airport._id!,
              }))}
            placeholder="Select Location"
            bg="bg-white"
            onChange={(value) => updateFormData({ from: value })}
            value={formData.from}
          />
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <IoPaperPlaneOutline />
            To
          </div>
          <Select
            options={airports
              .filter((airport) => airport._id !== formData.from)
              .map((airport) => ({
                label: `${airport.city}(${airport.code})`,
                value: airport._id!,
              }))}
            placeholder="Select Location"
            bg="bg-white"
            onChange={(value) => updateFormData({ to: value })}
            value={formData.to}
          />
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <IoCalendarClearOutline />
            Departure
          </div>
          <DatePicker
            selected={formData.date ? new Date(formData.date) : null}
            onChange={(date) => updateFormData({ date: date?.toISOString() })}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Date"
            className="w-full bg-white border p-2 rounded-md text-gray-900"
          />
        </div>

        {formData.type === "Round Trip" && (
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <IoCalendarClearOutline />
              Return
            </div>
            <DatePicker
              selected={
                formData.returnDate ? new Date(formData.returnDate) : null
              }
              onChange={(date) =>
                updateFormData({ returnDate: date?.toISOString() })
              }
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date"
              className="w-full bg-white border p-2 rounded-md text-gray-900"
            />
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="flex items-center absolute right-6 -bottom-5 gap-3 justify-center bg-primary text-white  mt-4 py-2 px-4 rounded-lg"
      >
        Update
        <IoIosArrowRoundForward className="text-xl" />
      </button>
    </div>
  );
};

export default UpdateForm;
