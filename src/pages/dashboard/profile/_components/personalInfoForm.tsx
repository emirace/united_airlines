import { useState } from "react";
import Select from "../../../home/_components/select";

const PersonalInfoForm = () => {
  const [formData, setFormData] = useState({
    fullName: "Jacqueline Miller",
    email: "hello@gmail.com",
    mobile: "222 555 666",
    nationality: "Paris",
    dob: "1996-08-29",
    gender: "male",
    address: "2119 N Division Ave, New Hampshire, York, United States",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="border  rounded-lg  w-full ">
      <h2 className="text-4xl font-bold  p-6 border-b">Personal Information</h2>
      <div className="p-6">
        <label className="block text-gray-600 mb-2">
          Upload your profile photo*
        </label>
        <div className="flex items-center gap-4 mb-4">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover bg-black"
          />
          <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg">
            Change
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600">Email address*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600">Mobile number*</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600">Nationality*</label>
            <Select options={[{ label: "Paris", value: "Paris" }]} />
          </div>
          <div>
            <label className="block text-gray-600">Date of Birth*</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600">Select Gender*</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="others"
                  checked={formData.gender === "others"}
                  onChange={handleChange}
                />
                Others
              </label>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-gray-600">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            rows={3}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg w-full md:w-auto">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
