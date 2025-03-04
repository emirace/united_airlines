import React, { useEffect, useState } from "react";
import { IAirport, useAirport } from "../../../../context/airport";
import { useToastNotification } from "../../../../context/toastNotification";
import Loading from "../../../_components/loading";

interface AirportFormProps {
  onClose: () => void;
  airport?: IAirport;
}

const AirportForm: React.FC<AirportFormProps> = ({ onClose, airport }) => {
  const { addAirport, editAirport } = useAirport();
  const { addNotification } = useToastNotification();
  const [loading, setLoading] = useState(false);
  const isEditing = !!airport;

  const [formData, setFormData] = useState<
    Omit<IAirport, "createdAt" | "updatedAt">
  >({
    name: "",
    code: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    if (airport) {
      setFormData({
        name: airport.name,
        code: airport.code,
        city: airport.city,
        country: airport.country,
      });
    }
  }, [airport]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    let newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Airport name is required";
    if (!formData.code) newErrors.code = "Airport code is required";
    if (formData.code.length !== 3)
      newErrors.code = "Airport code must be exactly 3 letters";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      if (isEditing) {
        await editAirport(airport._id!, formData); // Call update function
      } else {
        await addAirport(formData); // Call create function
      }

      onClose();
      addNotification({ message: "Airport created successfully" });
      setLoading(false);
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg w-full">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Airport" : "Create Airport"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Airport Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">
            Airport Code (3 letters)
          </label>
          <input
            type="text"
            name="code"
            maxLength={3}
            value={formData.code}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1 uppercase"
          />
          {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 border rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-3 px-4 py-2 bg-primary text-white rounded-md hover:scale-105"
          >
            {loading && <Loading color="white" size="sm" />}
            {isEditing ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AirportForm;
