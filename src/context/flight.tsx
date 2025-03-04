import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  getFlights,
  addFlight,
  getFlightById,
  updateFlight,
  deleteFlight,
} from "../services/flight";
import { IAirport } from "./airport";

interface IFormData {
  type: string;
  class: string;
  travelers: number;
  from: string;
  to: string;
  date: string;
}

export interface IFlight {
  _id?: string;
  flightNumber: string;
  origin: IAirport;
  destination: IAirport;
  departureTime: string;
  arrivalTime: string;
  price: number;
  createdAt: string;
  duration: number;
  availableSeats: number;
  status: "scheduled" | "delayed" | "cancelled" | "departed" | "arrived";
}

export interface IFlightData {
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}

interface IFlightContextType {
  flights: IFlight[];
  formData: IFormData;
  loading: boolean;
  updateFormData: (value: Partial<IFormData>) => void;
  fetchFlights: (filters: Record<string, string>) => Promise<void>;
  createFlight: (flightData: IFlightData) => Promise<void>;
  getFlight: (id: string) => Promise<IFlight>;
  modifyFlight: (id: string, flightData: Partial<IFlight>) => Promise<void>;
  removeFlight: (id: string) => Promise<void>;
}

const FlightContext = createContext<IFlightContextType | undefined>(undefined);

export const FlightProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [flights, setFlights] = useState<IFlight[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "One Way",
    class: "",
    travelers: 1,
    from: "",
    to: "",
    date: "",
  });

  const updateFormData = (value: Partial<IFormData>) => {
    setFormData((prev) => ({ ...prev, ...value }));
  };

  const fetchFlights = async (filters: Record<string, string>) => {
    try {
      setLoading(true);
      const data = await getFlights(filters);
      setFlights(data);
    } catch (error) {
      console.error("Error fetching flights:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createFlight = async (flightData: IFlightData) => {
    try {
      const newFlight = await addFlight(flightData);
      setFlights((prev) => [...prev, newFlight]);
    } catch (error) {
      console.error("Error adding flight:", error);
      throw error;
    }
  };

  const getFlight = async (id: string): Promise<IFlight> => {
    try {
      return await getFlightById(id);
    } catch (error) {
      console.error("Error fetching flight by ID:", error);
      throw error;
    }
  };

  const modifyFlight = async (id: string, flightData: Partial<IFlight>) => {
    try {
      const updatedFlight = await updateFlight(id, flightData);
      setFlights((prev) =>
        prev.map((flight) => (flight._id === id ? updatedFlight : flight))
      );
    } catch (error) {
      console.error("Error updating flight:", error);
      throw error;
    }
  };

  const removeFlight = async (id: string) => {
    try {
      await deleteFlight(id);
      setFlights((prev) => prev.filter((flight) => flight._id !== id));
    } catch (error) {
      console.error("Error deleting flight:", error);
      throw error;
    }
  };

  return (
    <FlightContext.Provider
      value={{
        flights,
        formData,
        loading,
        updateFormData,
        fetchFlights,
        createFlight,
        getFlight,
        modifyFlight,
        removeFlight,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = (): IFlightContextType => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error("useFlightContext must be used within a FlightProvider");
  }
  return context;
};
