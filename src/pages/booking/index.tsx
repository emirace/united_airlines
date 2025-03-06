import Navbar from "../home/_components/navbar";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoAirplane } from "react-icons/io5";
import FlightDetails from "./_component/flightDetails";
import ImportantInfo from "./_component/importantInfo";
import TravelerDetails from "./_component/travelDetails";
import FareSummary from "./_component/fareSummary";
import Footer from "../home/_components/footer";
import { IFlight, useFlight } from "../../context/flight";
import { useEffect, useState } from "react";
import Loading from "../_components/loading";
import moment from "moment";
import { formatDuration } from "../../utils";
import { useNavigate } from "react-router";

function Booking() {
  const { getFlight, formData } = useFlight();
  const [flight, setFlight] = useState<IFlight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadFlight = async () => {
      if (formData.flightId) {
        try {
          setLoading(true);
          setError("");
          const res = await getFlight(formData.flightId);
          setFlight(res as any);
        } catch (error: any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate(-1);
      }
    };
    loadFlight();
  }, [formData.flightId]);

  console.log(formData);

  return (
    <div className="max-w-[75rem] mx-auto w-full px-4">
      <Navbar />
      {loading ? (
        <div className="m-16">
          <Loading />
        </div>
      ) : error ? (
        <div className="text-red-500 text-2xl p-16">{error}</div>
      ) : (
        flight && (
          <div className="flex flex-col md:flex-row gap-5 my-16 ">
            <div className="md:flex-[4] ">
              <div className="flex items-center gap-4">
                <IoAirplane className="text-6xl md:text-8xl" />
                <div className="">
                  <h1 className="flex md:items-center gap-0 md:gap-5 text-2xl md:text-4xl font-bold flex-wrap  mb-2">
                    <span className="">
                      {flight.origin.city} ({flight.origin.code})
                    </span>
                    <IoIosArrowRoundForward size={40} />
                    <span className="">
                      {flight.destination.city} ({flight.origin.code})
                    </span>
                  </h1>
                  <p className="text-gray-500 font-bold text-lg">
                    {moment(flight.departureTime).format("MMM D")} • 1 Stop •{" "}
                    {formatDuration(flight.duration)}
                  </p>
                </div>
              </div>
              <FlightDetails flight={flight} />
              <ImportantInfo />
              <TravelerDetails flight={flight} />
            </div>
            <div className="md:flex-1">
              <FareSummary amount={flight.price} />
            </div>
          </div>
        )
      )}
      <Footer />
    </div>
  );
}

export default Booking;
