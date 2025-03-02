import { Outlet } from "react-router";
import Navbar from "../home/_components/navbar";
import Sidebar from "./_components/sidebar";
import Footer from "../home/_components/footer";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="max-w-[75rem] mx-auto w-full px-4">
      <Navbar />

      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 px-6 py-2 my-6 bg-primary text-white rounded-lg w-full md:w-auto md:hidden"
      >
        Menu
      </button>
      <div className="flex gap-6 mb-10 ">
        {isOpen && (
          <div className="fixed bg-black/30 top-0 left-0 h-full w-full z-20 md:hidden" />
        )}
        <div
          className={`flex-1 fixed right-0 top-0 bottom-0 md:relative bg-white  p-4 md:p-0 z-20 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
          }`}
        >
          <IoClose
            className="ml-auto md:hidden text-3xl mb-4 "
            onClick={() => setIsOpen(false)}
          />
          <Sidebar close={() => setIsOpen(false)} />
        </div>
        <div className="md:flex-[3] w-full md:w-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
