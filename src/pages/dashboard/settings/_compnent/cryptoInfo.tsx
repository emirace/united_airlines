import { useEffect, useState } from "react";
import { useToastNotification } from "../../../../context/toastNotification";
import Loading from "../../../_components/loading";
import { useSetting } from "../../../../context/setting";

const CryptoInfo = () => {
  const { addNotification } = useToastNotification();
  const { settings, fetchSettings, updateSettinngs } = useSetting();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState([
    {
      name: "",
      network: "",
      address: "",
      rate: 0,
    },
  ]);

  useEffect(() => {
    setFormData(settings.cryptoInfo);
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

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? {
              ...item,
              [name]: name === "rate" ? parseFloat(value) || 0 : value,
            }
          : item
      )
    );
  };

  const handleUpdate = async () => {
    if (
      !formData.length ||
      formData.some(
        (crypto) =>
          !crypto.name || !crypto.network || !crypto.address || !crypto.rate
      )
    ) {
      addNotification({
        message: "All fields in cryptoInfo are required.",
        error: true,
      });
      return;
    }

    try {
      setLoading(true);
      await updateSettinngs({ ...settings, cryptoInfo: formData });
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

  const addNewCurrency = () => {
    setFormData((prevData) => [
      ...prevData,
      { name: "", network: "", address: "", rate: 0 },
    ]);
  };

  return (
    <div className="border  rounded-lg  w-full ">
      <div className="p-6 border-b">
        <h2 className="text-2xl md:text-4xl font-bold  ">Crypto Information</h2>
        <span className="block text-gray-600">
          Update your crypto information
        </span>
      </div>
      <div className="p-6 ">
        {formData.map((data, index) => (
          <div key={index} className="py-6 border-b border-primary">
            <div>
              <label className="block text-gray-600">
                Enter your currency name
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-600">Enter your network</label>
              <input
                type="text"
                name="network"
                value={data.network}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-600">
                Enter wallet address
              </label>
              <input
                type="text"
                name="address"
                value={data.address}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-600">Rate per dollar($)</label>
              <input
                type="number"
                name="rate"
                value={data.rate}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addNewCurrency}
          className="mt-4 px-4 py-2 border-primary text-primary rounded-lg"
        >
          Add Currency
        </button>

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

export default CryptoInfo;
