import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import IMAGES from "../../../assets/images";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4 md:p-8 rounded-t-lg">
      <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
        {/* Navigation Links */}
        <nav className="flex space-x-6 ">
          <a href="#" className="hover:text-primary">
            About
          </a>
          <a href="#" className="hover:text-primary">
            Policy
          </a>
          <a href="#" className="hover:text-primary">
            Terms & Condition
          </a>
        </nav>

        {/* Logo and Branding */}
        <div className="flex flex-col items-center">
          <div className="flex gap-3 items-center">
            <img
              src={IMAGES.logo}
              alt="United Airlines Logo"
              className="w-10"
            />
            <h2 className="text-lg font-semibold">United Airlines</h2>
          </div>
          <p className=" text-sm mt-1">Copyrights ©2025 United Airlines.</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" className=" hover:text-primary">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className=" hover:text-primary">
            <FaTwitter size={20} />
          </a>
          <a href="#" className=" hover:text-primary">
            <FaInstagram size={20} />
          </a>
          <a href="#" className=" hover:text-primary">
            <FaLinkedinIn size={20} />
          </a>
          <a href="#" className=" hover:text-primary">
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
