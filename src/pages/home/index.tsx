import { useEffect } from "react";
import BookingProcess from "./_components/bookingProcess";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";
import PopularDestinations from "./_components/pupolarDestinations";
import { ping } from "../../services/image";

function Home() {
  useEffect(() => {
    ping();
  }, []);

  return (
    <div className="max-w-[75rem] mx-auto w-full px-4">
      <Navbar />
      <Hero />
      <PopularDestinations />
      <BookingProcess />
      <Footer />
    </div>
  );
}

export default Home;
