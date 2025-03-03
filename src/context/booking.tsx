import { ReactNode, createContext, useContext, useState } from "react";

interface IBooking {}

interface BookingContextProps {
  Bookings: IBooking[];
  fetchBooking: (id: string) => Promise<void>;
}

const BookingContext = createContext<BookingContextProps | undefined>(
  undefined
);
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [Bookings, setBookings] = useState([]);

  const fetchBooking = async (id: string) => {
    console.log(id);
    setBookings([]);
    //
  };

  return (
    <BookingContext.Provider
      value={{
        Bookings,
        fetchBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a CampaignProvider");
  }
  return context;
};
