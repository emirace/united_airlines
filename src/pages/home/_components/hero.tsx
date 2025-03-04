import IMAGES from "../../../assets/images";
import BookingForm from "./bookingForm";

const Hero = () => {
  return (
    <section className="relative text-center bg-blue-50 p-4 pb-10 md:p-10 pt-10 md:pt-40 rounded-3xl ">
      <img
        src={IMAGES.hero}
        alt="hero"
        className="absolute inset-0 h-full w-full object-cover rounded-3xl "
      />
      <h1 className="relative text-5xl md:text-8xl font-extrabold mb-4 md:mb-12">
        Ready to take off?
      </h1>
      <BookingForm />
    </section>
  );
};

export default Hero;
