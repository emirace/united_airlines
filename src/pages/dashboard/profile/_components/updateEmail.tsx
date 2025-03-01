import { useState } from "react";

const UpdateEmail = () => {
  const [formData, setFormData] = useState({
    email: "hello@gmail.com",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="border  rounded-lg  w-full ">
      <div className="p-6 border-b">
        <h2 className="text-4xl font-bold  ">Update Email</h2>
        <label className="block text-gray-600">
          Your current email address is{" "}
          <span className="text-primary">example@gmail.com</span>
        </label>
      </div>
      <div className="p-6">
        <div>
          <label className="block text-gray-600">
            Enter your new email id*
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="flex justify-end">
          <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg w-full md:w-auto">
            Save Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmail;
