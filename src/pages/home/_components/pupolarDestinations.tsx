import { FaStar, FaInfoCircle } from "react-icons/fa";
import IMAGES from "../../../assets/images";

const destinations = [
  {
    name: "Thailand",
    image: IMAGES.thailand,
    rating: 4.3,
    info: "The next flight is on 26th Dec",
  },
  {
    name: "Hong Kong",
    image: IMAGES.hong_kong,
    rating: 4.6,
    info: "Daily 1 flight",
  },
  {
    name: "Maldives",
    image: IMAGES.maldives,
    rating: 4.3,
    info: "2 flights every week",
  },
  {
    name: "Switzerland",
    image: IMAGES.switzerland,
    rating: 4.3,
    info: "Filling fast, next available flight on 2nd Oct",
  },
];

const PopularDestinations = () => {
  return (
    <section className="pt-20 text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-8">
        Popular Destinations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:px-6">
        {destinations.map((destination, index) => (
          <div key={index} className="relative">
            <div className="w-full h-96 rounded-xl overflow-hidden">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 "
              />
            </div>
            <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
              <FaInfoCircle className="text-gray-600" />
            </button>
            <div className="p-4 text-left">
              <h3 className="text-lg font-bold">{destination.name}</h3>
              <div className="flex items-center text-yellow-500 mt-1">
                <span className="font-semibold text-black">
                  {destination.rating}
                </span>
                <FaStar className="ml-1" />
              </div>
              <p className="text-gray-500 text-sm mt-2">{destination.info}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;
