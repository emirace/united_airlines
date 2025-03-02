import { useState } from "react";
import { useToastNotification } from "../../../../context/toastNotification";
import { useUser } from "../../../../context/user";
import Loading from "../../../_components/loading";

const UpdatePassword = () => {
  const { addNotification } = useToastNotification();
  const { user, updateUser } = useUser();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (formData.newPassword) {
      if (formData.newPassword.length < 6) {
        addNotification({
          message: "New password must be at least 6 characters.",
          error: true,
        });
        return;
      } else if (formData.newPassword !== formData.confirmPassword) {
        addNotification({
          message: "Password do not match",
          error: true,
        });
        return;
      } else if (!formData.confirmPassword) {
        addNotification({
          message: "Current password is required",
          error: true,
        });
        return;
      }
    }

    try {
      setLoading(true);

      // Prepare data for update
      const updateData: Record<string, any> = {};

      // Include password if provided
      if (formData.currentPassword && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      // Send update to backend
      await updateUser(updateData);

      addNotification({ message: "Profile updated successfully!" });
    } catch (error: any) {
      addNotification({
        message: error || "An error occurred while updating your profile.",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border  rounded-lg  w-full ">
      <div className="p-6 border-b">
        <h2 className="text-2xl md:text-4xl font-bold  ">Update Password</h2>
        <label className="block text-gray-600">
          Your current email address is{" "}
          <span className="text-primary">{user?.email}</span>
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
          <button
            onClick={handleUpdate}
            className="mt-4 px-6 py-2 bg-primary flex items-center justify-center gap-2 text-white rounded-lg w-full md:w-auto"
          >
            {loading && <Loading />} Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
