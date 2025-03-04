import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoAirplaneOutline, IoCalendarClearOutline } from "react-icons/io5";
import { IFlight, useFlight } from "../../../../context/flight";
import { useToastNotification } from "../../../../context/toastNotification";
import Loading from "../../../_components/loading";
import Select from "../../../home/_components/select";
import { useAirport } from "../../../../context/airport";

interface FlightFormProps {
  onClose: () => void;
  flight?: IFlight;
}

const FlightForm: React.FC<FlightFormProps> = ({ onClose }) => {
  const { createFlight } = useFlight();
  const { addNotification } = useToastNotification();
  const { airports } = useAirport();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureTime: null as Date | null,
    arrivalTime: null as Date | null,
    price: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};

    if (!formData.origin.trim()) {
      newErrors.origin = "Origin is required";
      valid = false;
    }
    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required";
      valid = false;
    }
    if (!formData.departureTime) {
      newErrors.departureTime = "Departure time is required";
      valid = false;
    }
    if (!formData.arrivalTime) {
      newErrors.arrivalTime = "Arrival time is required";
      valid = false;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await createFlight({
        origin: formData.origin,
        destination: formData.destination,
        departureTime: formData.departureTime?.toISOString() || "",
        arrivalTime: formData.arrivalTime?.toISOString() || "",
        price: Number(formData.price),
      });
      setFormData({
        origin: "",
        destination: "",
        departureTime: null,
        arrivalTime: null,
        price: "",
      });
      addNotification({ message: "Flight created successfully" });
      onClose();
    } catch (error: any) {
      console.error("Error creating flight:", error);
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Flight</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Origin */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Origin
          </label>
          <Select
            options={airports
              .filter((airport) => airport._id !== formData.destination)
              .map((airport) => ({
                label: `${airport.city}(${airport.code})`,
                value: airport._id!,
              }))}
            placeholder="Select Location"
            onChange={(value) => setFormData({ ...formData, origin: value })}
            value={formData.origin}
          />
          {errors.origin && (
            <p className="text-red-500 text-sm">{errors.origin}</p>
          )}
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Destination
          </label>
          <Select
            options={airports
              .filter((airport) => airport._id !== formData.origin)
              .map((airport) => ({
                label: `${airport.city}(${airport.code})`,
                value: airport._id!,
              }))}
            placeholder="Select Location"
            onChange={(value) =>
              setFormData({ ...formData, destination: value })
            }
            value={formData.destination}
          />
          {errors.destination && (
            <p className="text-red-500 text-sm">{errors.destination}</p>
          )}
        </div>

        {/* Departure Time */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <IoCalendarClearOutline /> Departure Time
          </label>
          <DatePicker
            selected={formData.departureTime}
            onChange={(date) =>
              setFormData({ ...formData, departureTime: date })
            }
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholderText="Select departure time"
          />
          {errors.departureTime && (
            <p className="text-red-500 text-sm">{errors.departureTime}</p>
          )}
        </div>

        {/* Arrival Time */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <IoCalendarClearOutline /> Arrival Time
          </label>
          <DatePicker
            selected={formData.arrivalTime}
            onChange={(date) => setFormData({ ...formData, arrivalTime: date })}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholderText="Select arrival time"
          />
          {errors.arrivalTime && (
            <p className="text-red-500 text-sm">{errors.arrivalTime}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:scale-105 transition flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && <Loading color="white" size="sm" />}Create Flight
          <IoAirplaneOutline />
        </button>
      </form>
    </div>
  );
};

export default FlightForm;
