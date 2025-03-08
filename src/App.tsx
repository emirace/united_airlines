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
import ToastNotification from "./pages/_components/toastNotification";
import Airports from "./pages/dashboard/airports";
import Flights from "./pages/dashboard/flights";
import ProtectedRoute from "./pages/_components/protectedRoute";
import Payments from "./pages/dashboard/payments";
import AllPayments from "./pages/dashboard/payments/all";
import AllBookings from "./pages/dashboard/bookings/all";
import Settings from "./pages/dashboard/settings";
import Tracking from "./pages/tracking";
import Message from "./pages/dashboard/message";

function App() {
  return (
    <div className="font-dmsans">
      <ToastNotification />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/payment" element={<Payment />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="airports" element={<Airports />} />
            <Route path="flights" element={<Flights />} />
            <Route path="payments" element={<Payments />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Message />} />
            <Route path="all-payments" element={<AllPayments />} />
            <Route path="all-bookings" element={<AllBookings />} />
          </Route>
          <Route path="/confirm" element={<BookingConfirmation />} />
        </Route>
        <Route path="/listing" element={<Listing />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </div>
  );
}

export default App;
