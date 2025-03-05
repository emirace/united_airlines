import { ReactNode } from "react";
import { FlightProvider } from "./flight";
import { ToastNotificationProvider } from "./toastNotification";
import { UserProvider } from "./user";
import { AirportProvider } from "./airport";
import { BookingProvider } from "./booking";
import { PaymentProvider } from "./payment";
import { SettingProvider } from "./setting";

function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastNotificationProvider>
      <UserProvider>
        <AirportProvider>
          <BookingProvider>
            <PaymentProvider>
              <SettingProvider>
                <FlightProvider>{children}</FlightProvider>
              </SettingProvider>
            </PaymentProvider>
          </BookingProvider>
        </AirportProvider>
      </UserProvider>
    </ToastNotificationProvider>
  );
}

export default Providers;
