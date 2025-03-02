import Navbar from "../home/_components/navbar";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoAirplane } from "react-icons/io5";
import FlightDetails from "./_component/flightDetails";
import ImportantInfo from "./_component/importantInfo";
import TravelerDetails from "./_component/travelDetails";
import FareSummary from "./_component/fareSummary";
import Footer from "../home/_components/footer";
import { useFlight } from "../../context/flight";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

function Booking() {
  const { fetchFlight } = useFlight();
  const [flight, setFlight] = useState(null);
  const [searchParams, _] = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFlight = async () => {
      if (id) {
        try {
          setLoading(true);
          const res = fetchFlight(id);
          setFlight(res as any);
        } catch (error: any) {
          setError(error);
        }
      }
    };
    loadFlight();
  }, []);

  return (
    <div className="max-w-[75rem] mx-auto w-full px-4">
      <Navbar />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red">{error}</div>
      ) : null}
      {flight && (
        <div className="flex flex-col md:flex-row gap-5 my-16 ">
          <div className="md:flex-[4] ">
            <div className="flex items-center gap-4">
              <IoAirplane className="text-6xl md:text-8xl" />
              <div className="">
                <h1 className="flex md:items-center gap-0 md:gap-5 text-2xl md:text-4xl font-bold flex-wrap  mb-2">
                  <span className="">Mumbai (BOM)</span>
                  <IoIosArrowRoundForward size={40} />
                  <span className="">New York (JFK)</span>
                </h1>
                <p className="text-gray-500 font-bold text-lg">
                  25 Jan • 1 Stop • 05h 25m
                </p>
              </div>
            </div>
            <FlightDetails />
            <ImportantInfo />
            <TravelerDetails />
          </div>
          <div className="md:flex-1">
            <FareSummary />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Booking;
