import React from "react";
import { useFlight } from "../../../context/flight";

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

  return (
    <div className="">
      {formData.travellersInfo.map((passenger) => (
        <div key={passenger.id} className="mb-4 border rounded-md ">
          <div
            className="flex justify-between items-center px-4 py-3 bg-gray-100 cursor-pointer"
            onClick={() => toggleExpand(passenger.id)}
          >
            <h2 className="text-lg font-semibold">Adult {passenger.id}</h2>
            <span className="text-xl">{passenger.expanded ? "-" : "+"}</span>
          </div>

          {passenger.expanded && (
            <div className="p-4 grid gap-4 grid-cols-2">
              {/* Title & Name */}
              <div>
                <label className="block text-sm font-semibold">Title</label>
                <select className="w-full p-2 border rounded-md">
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
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold">Month</label>
                  <select className="w-full p-2 border rounded-md">
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
                  />
                </div>
              </div>

              {/* Nationality & Passport */}
              <div>
                <label className="block text-sm font-semibold">
                  Nationality
                </label>
                <select className="w-full p-2 border rounded-md">
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
                <select className="w-full p-2 border rounded-md">
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
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter passport number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">
                  Passport Expiry
                </label>
                <input type="date" className="w-full p-2 border rounded-md" />
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
