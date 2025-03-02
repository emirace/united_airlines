import { useState } from "react";
import { useToastNotification } from "../../../../context/toastNotification";
import { useUser } from "../../../../context/user";
import Loading from "../../../_components/loading";

const UpdateEmail = () => {
  const { addNotification } = useToastNotification();
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData.email.trim()) {
      addNotification({
        message: "Email are required.",
        error: true,
      });
      return;
    }

    try {
      setLoading(true);

      // Prepare data for update
      const updateData: Record<string, any> = {
        email: formData.email,
      };

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
        <h2 className="text-2xl md:text-4xl font-bold  ">Update Email</h2>
        <label className="block text-gray-600">
          Your current email address is{" "}
          <span className="text-primary">{user?.email}</span>
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
          <button
            onClick={handleUpdate}
            className="mt-4 px-6 py-2 bg-primary flex items-center justify-center gap-2 text-white rounded-lg w-full md:w-auto"
          >
            {loading && <Loading />}Save Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmail;
