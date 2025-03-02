import { ReactNode, createContext, useContext, useState } from "react";
interface IFormData {
  type: string;
  class: string;
  travelers: string;
  from: string;
  to: string;
  date: string;
}

interface IFlight {}

interface FlightContextProps {
  loading: boolean;
  formData: IFormData;
  updateFormData: (value: Partial<IFormData>) => void;
  flights: IFlight[];
  searchFlights: () => Promise<void>;
  fetchFlight: (id: string) => Promise<void>;
}

const FlightContext = createContext<FlightContextProps | undefined>(undefined);
export const FlightProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState({
    type: "One Way",
    class: "",
    travelers: "",
    from: "",
    to: "",
    date: "",
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateFormData = (value: Partial<IFormData>) => {
    setFormData((prev) => ({ ...prev, ...value }));
  };

  const searchFlights = async () => {
    setLoading(true);
    setFlights([]);
    setLoading(false);
  };

  const fetchFlight = async (id: string) => {
    console.log(id);
    //
  };

  return (
    <FlightContext.Provider
      value={{
        loading,
        formData,
        updateFormData,
        flights,
        searchFlights,
        fetchFlight,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error("useFlight must be used within a CampaignProvider");
  }
  return context;
};
