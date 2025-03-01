import { Outlet } from "react-router";
import Navbar from "../home/_components/navbar";
import Sidebar from "./_components/sidebar";
import Footer from "../home/_components/footer";

function Dashboard() {
  return (
    <div className="max-w-[75rem] mx-auto w-full px-4">
      <Navbar />
      <div className="flex gap-6 mb-10 mt-16">
        <div className="flex-1 hidden md:block">
          <Sidebar />
        </div>
        <div className="md:flex-[3]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
