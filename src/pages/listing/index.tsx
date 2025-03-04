import { useEffect } from "react";
import { useFlight } from "../../context/flight";
import Footer from "../home/_components/footer";
import Navbar from "../home/_components/navbar";
import FlightCard from "./_component/flightCard";
import UpdateForm from "./_component/updateForm";
import Loading from "../_components/loading";
import moment from "moment";

function Listing() {
  const { flights, loading, formData, fetchFlights } = useFlight();

  useEffect(() => {
    fetchFlights({
      origin: formData.from,
      destination: formData.to,
      departureTime: formData.date,
    });
  }, [formData]);

  return (
    <div className="max-w-[75rem] mx-auto w-full px-4">
      <Navbar />
      <div className="mt-8">
        <UpdateForm />
      </div>
      <div className="py-16">
        <div className="font-bold text-3xl">
          {flights.length} Flight Available
        </div>
        <div className="font-bold mb-6 ">
          {moment(formData.date).format("MMM D")}
        </div>
        {loading ? (
          <Loading />
        ) : flights.length <= 0 ? (
          <div className="">No flight available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {flights.map((flight) => (
              <FlightCard flight={flight} key={flight._id} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Listing;
