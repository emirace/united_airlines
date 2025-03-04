import { ReactNode } from "react";
import { FlightProvider } from "./flight";
import { ToastNotificationProvider } from "./toastNotification";
import { UserProvider } from "./user";
import { AirportProvider } from "./airport";

function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastNotificationProvider>
      <UserProvider>
        <AirportProvider>
          <FlightProvider>{children}</FlightProvider>
        </AirportProvider>
      </UserProvider>
    </ToastNotificationProvider>
  );
}

export default Providers;
