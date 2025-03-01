import Footer from "../home/_components/footer";
import Navbar from "../home/_components/navbar";
import FlightCard from "./_component/flightCard";
import UpdateForm from "./_component/updateForm";

function Listing() {
  return (
    <div className="max-w-[75rem] mx-auto w-full px-4">
      <Navbar />
      <div className="mt-8">
        <UpdateForm />
      </div>
      <div className="py-16">
        <div className="font-bold text-3xl">9 Flight Available</div>
        <div className="font-bold mb-6 ">25 Jan</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FlightCard />
          <FlightCard />
          <FlightCard />
          <FlightCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Listing;
