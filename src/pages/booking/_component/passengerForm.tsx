import React, { ChangeEvent, useState } from "react";
import { useFlight } from "../../../context/flight";
import { CiImageOn } from "react-icons/ci";
import { compressImageUpload } from "../../../utils/image";
import { useToastNotification } from "../../../context/toastNotification";
import Loading from "../../_components/loading";
import { baseChatURL } from "../../../services/apiChat";

const countries = ["United States", "United Kingdom", "Canada", "India"];
const titles = ["Mr", "Mrs", "Ms", "Dr"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const PassengerForm: React.FC = () => {
  const { formData, updateFormData } = useFlight();
  const { addNotification } = useToastNotification();
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (id: number, field: string, value: any) => {
    updateFormData({
      travellersInfo: formData.travellersInfo.map((passenger) =>
        passenger.id === id ? { ...passenger, [field]: value } : passenger
      ),
    });
  };

  const handleDOBChange = (id: number, field: string, value: string) => {
    updateFormData({
      travellersInfo: formData.travellersInfo.map((passenger) =>
        passenger.id === id
          ? { ...passenger, dob: { ...passenger.dob, [field]: value } }
          : passenger
      ),
    });
  };

  const addPassenger = () => {
    updateFormData({
      travellersInfo: [
        ...formData.travellersInfo,
        {
          id: formData.travellersInfo.length + 1,
          title: "Mr",
          firstName: "",
          lastName: "",
          dob: { day: "", month: "", year: "" },
          nationality: "",
          passportNumber: "",
          passportCountry: "",
          passportExpiry: "",
          expanded: true,
        },
      ],
    });
  };

  const toggleExpand = (id: number) => {
    updateFormData({
      travellersInfo: formData.travellersInfo.map((p) =>
        p.id === id ? { ...p, expanded: !p.expanded } : p
      ),
    });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      const file = e.target.files?.[0];
      if (!file) throw Error("No image found");

      const imageUrl = await compressImageUpload(file, 1024);

      updateFormData({ image: imageUrl });

      addNotification({ message: "Image uploaded", error: true });
    } catch (err) {
      addNotification({ message: "Failed uploading image", error: true });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {formData.travellersInfo.map((passenger) => (
        <div key={passenger.id} className="mb-4 border rounded-md">
          <div
            className="flex justify-between items-center px-4 py-3 bg-gray-100 cursor-pointer"
            onClick={() => toggleExpand(passenger.id)}
          >
            <h2 className="text-lg font-semibold">Adult {passenger.id}</h2>
            <span className="text-xl">{passenger.expanded ? "-" : "+"}</span>
          </div>

          {passenger.expanded && (
            <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2">
              {/* Title & Name */}
              <div>
                <label className="block text-sm font-semibold">Title</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={passenger.title}
                  onChange={(e) =>
                    handleChange(passenger.id, "title", e.target.value)
                  }
                >
                  {titles.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-semibold">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="First name"
                    value={passenger.firstName}
                    onChange={(e) =>
                      handleChange(passenger.id, "firstName", e.target.value)
                    }
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Last name"
                    value={passenger.lastName}
                    onChange={(e) =>
                      handleChange(passenger.id, "lastName", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="col-span-2 flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-semibold">Date</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    placeholder="DD"
                    value={passenger.dob.day}
                    onChange={(e) =>
                      handleDOBChange(passenger.id, "day", e.target.value)
                    }
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold">Month</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={passenger.dob.month}
                    onChange={(e) =>
                      handleDOBChange(passenger.id, "month", e.target.value)
                    }
                  >
                    {months.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold">Year</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    placeholder="YYYY"
                    value={passenger.dob.year}
                    onChange={(e) =>
                      handleDOBChange(passenger.id, "year", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Nationality & Passport */}
              <div>
                <label className="block text-sm font-semibold">
                  Nationality
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={passenger.nationality}
                  onChange={(e) =>
                    handleChange(passenger.id, "nationality", e.target.value)
                  }
                >
                  <option>Select Nationality</option>
                  {countries.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold">
                  Passport Issuing Country
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={passenger.passportCountry}
                  onChange={(e) =>
                    handleChange(
                      passenger.id,
                      "passportCountry",
                      e.target.value
                    )
                  }
                >
                  <option>Select Country</option>
                  {countries.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Passport Details */}
              <div>
                <label className="block text-sm font-semibold">
                  Passport Number
                </label>

                <div className="text-xs text-gray-400 ">
                  Enter a valid passport number, this may affect your booking
                  confirmation
                </div>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter passport number"
                  value={passenger.passportNumber}
                  onChange={(e) =>
                    handleChange(passenger.id, "passportNumber", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">
                  Passport Expiry
                </label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  value={passenger.passportExpiry}
                  onChange={(e) =>
                    handleChange(passenger.id, "passportExpiry", e.target.value)
                  }
                />
              </div>
              <div>
                <div className="block text-sm font-semibold">
                  Passport Photo
                </div>
                <label htmlFor="image" className="cursor-pointer">
                  {formData.image ? (
                    <img
                      src={baseChatURL + formData.image}
                      alt="Selected"
                      className="w-40 h-40 object-cover rounded-lg border border-gray-300"
                    />
                  ) : (
                    <CiImageOn className="text-9xl text-gray-500" />
                  )}
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageUpload}
                  />
                </label>
                {uploading && <Loading size="sm" />}
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addPassenger}
        className="ml-auto block text-sm mt-4 font-semibold text-primary border border-primary px-3 py-2 rounded-md hover:bg-indigo-100 transition"
      >
        Add New Adult
      </button>
    </div>
  );
};

export default PassengerForm;
