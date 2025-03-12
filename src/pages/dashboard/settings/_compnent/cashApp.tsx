import { useEffect, useState } from "react";
import { useToastNotification } from "../../../../context/toastNotification";
import Loading from "../../../_components/loading";
import { useSetting } from "../../../../context/setting";

const CashApp = () => {
  const { addNotification } = useToastNotification();
  const { settings, fetchSettings, updateSettinngs } = useSetting();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    tag: "",
  });

  useEffect(() => {
    setFormData(settings.cashApp);
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
    if (!formData.tag || !formData.name) {
      addNotification({
        message: "All fields are required.",
        error: true,
      });
      return;
    }

    try {
      setLoading(true);
      await updateSettinngs({ ...settings, cashApp: formData });
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
        <h2 className="text-2xl md:text-4xl font-bold  ">
          Cash App Information
        </h2>
        <span className="block text-gray-600">
          Update your cash app information
        </span>
      </div>
      <div className="p-6">
        <div>
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-600">Tag</label>
          <input
            type="text"
            name="tag"
            value={formData?.tag}
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

export default CashApp;
