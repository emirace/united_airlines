import React, { useEffect, useState } from "react";
import { getSeats } from "../../../services/flight";
import { useFlight } from "../../../context/flight";
import Loading from "../../_components/loading";

interface Seat {
  id: string;
  isAvailable: boolean;
}
export interface ISeat {
  flightId: string;
  seatNumber: string;
  class: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FlightSeatSelectionProps {
  totalRows?: number;
  seatsPerRow?: number;
  onSubmit: (selectedSeats: string[]) => void;
}

const FlightSeatSelection: React.FC<FlightSeatSelectionProps> = ({
  totalRows = 6,
  seatsPerRow = 4,
  onSubmit,
}) => {
  const { formData } = useFlight();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookedSeats, setBookedSeats] = useState<ISeat[]>([]);

  // Generate seats dynamically
  const seats: Seat[] = [];
  for (let row = 1; row <= totalRows; row++) {
    for (let col = 1; col <= seatsPerRow; col++) {
      const id = `${String.fromCharCode(65 + row - 1)}${col}`; // Example: A1, B2, C3...
      seats.push({
        id,
        isAvailable: !bookedSeats.map((seat) => seat.seatNumber).includes(id),
      });
    }
  }

  // Handle seat selection
  const handleSelect = (seatId: string) => {
    if (bookedSeats.map((seat) => seat.seatNumber).includes(seatId)) return; // Prevent selecting booked seats

    setSelectedSeats((prev) => {
      const updatedSelection = prev.includes(seatId)
        ? prev.filter((s) => s !== seatId) // Deselect if already selected
        : [...prev, seatId]; // Select new seat

      return updatedSelection;
    });
  };

  useEffect(() => {
    const loadSeats = async () => {
      try {
        setLoading(true);
        const res = await getSeats(formData.flightId);
        setBookedSeats(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadSeats();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="p-6 w-full">
      <h2 className="text-xl font-bold mb-4 text-center">Select Your Seat</h2>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${seatsPerRow}, 1fr)` }}
      >
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleSelect(seat.id)}
            className={`w-12 h-12 flex items-center justify-center rounded-lg font-medium border
              ${
                bookedSeats.map((seat) => seat.seatNumber).includes(seat.id)
                  ? "bg-gray-300 cursor-not-allowed" // Booked seat
                  : selectedSeats.includes(seat.id)
                  ? "bg-primary text-white" // Selected seat
                  : "bg-primary/10 hover:bg-primary/20" // Available seat
              }
            `}
            disabled={bookedSeats
              .map((seat) => seat.seatNumber)
              .includes(seat.id)}
          >
            {seat.id}
          </button>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Selected:{" "}
          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
        </p>
      </div>
      <button
        onClick={() => onSubmit(selectedSeats)}
        className="w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-opacity-70 transition"
      >
        Proceed To Payment
      </button>
    </div>
  );
};

export default FlightSeatSelection;
