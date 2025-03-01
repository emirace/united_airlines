import IMAGES from "../../../assets/images";
import Arrow from "../../../assets/svg/Arrow";
import Arrow2 from "../../../assets/svg/Arrow2";
import { GiCommercialAirplane } from "react-icons/gi";

const BookingProcess = () => {
  return (
    <section className="flex flex-col items-center space-y-10  py-12 pb-20">
      {/* Steps Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 w-full ">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center max-w-sm">
          <img src={IMAGES.step1} alt="Search Choice" className="w-32 h-32" />
          <h3 className="text-xl font-semibold mt-4">Search Choice</h3>
          <p className="text-gray-500">
            Total 630+ destinations that we work with
          </p>
        </div>
        <div className="hidden md:block mt-24">
          <Arrow />
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center max-w-sm md:mt-20 ">
          <img
            src={IMAGES.step2}
            alt="Select Destination"
            className="w-32 h-32"
          />
          <h3 className="text-xl font-semibold mt-4">Select Destination</h3>
          <p className="text-gray-500">
            Insipidity the sufficient discretion imprudence
          </p>
        </div>

        <div className="hidden md:block mt-24">
          <Arrow2 />
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center max-w-sm">
          <img src={IMAGES.step3} alt="Easy to Book" className="w-32 h-32" />
          <h3 className="text-xl font-semibold mt-4">Easy to Book</h3>
          <p className="text-gray-500">
            With an easy and fast ticket purchase process
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 rounded-2xl px-4 md:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between w-full ">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-bold flex items-center gap-4">
            It's time to discover <GiCommercialAirplane />
          </h2>
          <p className="text-gray-500 mt-1">
            He moonlights difficult engrossed it, sportsmen. Interested has all
            Devonshire difficulty gay assistance joy.
          </p>
        </div>
        <button className="mt-4 md:mt-0 bg-black text-white px-6 py-3 font-bold rounded-lg hover:bg-gray-800">
          Book a Flight
        </button>
      </div>
    </section>
  );
};

export default BookingProcess;
