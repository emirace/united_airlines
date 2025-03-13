import { useEffect, useState } from "react";
import { useToastNotification } from "../../../../context/toastNotification";
import Loading from "../../../_components/loading";
import { useSetting } from "../../../../context/setting";

const WhatsAppLink = () => {
  const { addNotification } = useToastNotification();
  const { settings, fetchSettings, updateSettinngs } = useSetting();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState("");

  useEffect(() => {
    setFormData(settings.whatsApp);
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

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData(e.target.value);
  };

  const handleUpdate = async () => {
    if (!formData) {
      addNotification({
        message: "All fields are required.",
        error: true,
      });
      return;
    }

    try {
      setLoading(true);
      await updateSettinngs({ ...settings, whatsApp: formData });
      addNotification({ message: "Updated successfully!" });
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
        <h2 className="text-2xl md:text-4xl font-bold  ">WhatsApp Link</h2>
        <span className="block text-gray-600">
          Update your whatsapp information
        </span>
      </div>
      <div className="p-6">
        <div>
          <label className="block text-gray-600">Enter link</label>
          <input
            type="text"
            name="name"
            value={formData}
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

export default WhatsAppLink;
