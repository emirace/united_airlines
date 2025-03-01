import { useState } from "react";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="border  rounded-lg  w-full ">
      <div className="p-6 border-b">
        <h2 className="text-4xl font-bold  ">Update Password</h2>
        <label className="block text-gray-600">
          Your current email address is{" "}
          <span className="text-primary">example@gmail.com</span>
        </label>
      </div>
      <div className="p-6">
        <div>
          <label className="block text-gray-600">Current password</label>
          <input
            type="text"
            name="currentPassword"
            value={formData.currentPassword}
            placeholder="Enter current password"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600">Enter new password</label>
          <input
            type="text"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600">Confirm new password</label>
          <input
            type="text"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm new password"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="flex justify-end">
          <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg w-full md:w-auto">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
