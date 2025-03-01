import { Routes, Route } from "react-router";
import Home from "./pages/home";
import Listing from "./pages/listing";
import Booking from "./pages/booking";
import Payment from "./pages/payment";
import Dashboard from "./pages/dashboard";
import Bookings from "./pages/dashboard/bookings";
import Profile from "./pages/dashboard/profile";
import BookingConfirmation from "./pages/comfirmBooking";
import Contact from "./pages/contect";
import Login from "./pages/login";
import SignUp from "./pages/signup";

function App() {
  return (
    <div className="font-dmsans">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirm" element={<BookingConfirmation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
