import { useState, useEffect } from "react";
import Loading from "../../_components/loading";

const CardPayment: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate 2 seconds loading
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="p-16 w-full flex justify-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="text-red-500 w-full text-center text-xl">
          Card Payment is currently not available. Try other payment method
        </div>
      )}
    </div>
  );
};

export default CardPayment;
