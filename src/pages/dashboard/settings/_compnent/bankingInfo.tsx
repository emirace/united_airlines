import { useEffect, useState } from "react";
import { useToastNotification } from "../../../../context/toastNotification";
import Loading from "../../../_components/loading";
import { useSetting } from "../../../../context/setting";

const BankingInfo = () => {
  const { settings, fetchSettings, updateSettinngs } = useSetting();
  const { addNotification } = useToastNotification();
  const [formData, setFormData] = useState({
    accountName: settings.bankingInfo.accountName || "",
    accountNumber: settings.bankingInfo.accountNumber || "",
    bankName: settings.bankingInfo.bankName || "",
    routing: settings.bankingInfo.routing || "",
    address: settings.bankingInfo.address || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(settings.bankingInfo);
  }, [settings]);

  useEffect(() => {
    const loadSetting = async () => {
      try {
        setLoading(true);

        await fetchSettings();
      } catch (error: any) {
        addNotification({
          message: error || "An error occurred while updating your profile.",
          error: true,
        });
      } finally {
        setLoading(false);
      }
    };
    loadSetting();
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (
      !formData.accountName ||
      !formData.accountNumber ||
      !formData.bankName
    ) {
      addNotification({
        message: "All fields are required.",
        error: true,
      });
      return;
    }

    try {
      setLoading(true);
      await updateSettinngs({ ...settings, bankingInfo: formData });
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
        <h2 className="text-2xl md:text-4xl font-bold  ">
          Banking Information
        </h2>
        <span className="block text-gray-600">
          Update your banking information
        </span>
      </div>
      <div className="p-6">
        <div>
          <label className="block text-gray-600">Enter your bank name</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-600">
            Enter your account number
          </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-600">Enter your account name</label>
          <input
            type="text"
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-600">Routing</label>
          <input
            type="text"
            name="routing"
            value={formData.routing}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-600">Enter Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="mt-4 px-6 py-2 bg-primary flex items-center justify-center gap-2 text-white rounded-lg w-full md:w-auto"
          >
            {loading && <Loading color={"white"} size="sm" />}Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankingInfo;
