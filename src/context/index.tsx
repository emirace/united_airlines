import { ReactNode } from "react";
import { FlightProvider } from "./flight";
import { ToastNotificationProvider } from "./toastNotification";
import { UserProvider } from "./user";

function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastNotificationProvider>
      <UserProvider>
        <FlightProvider>{children}</FlightProvider>
      </UserProvider>
    </ToastNotificationProvider>
  );
}

export default Providers;
