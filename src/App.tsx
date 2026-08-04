// import { AppUserProvider } from "./contexts/AppUserContext";
import MainRoutes from "./routes/MainRoutes";
import { Toaster } from "sonner";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App() {
  return (
    <>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppUserProvider>
          <Toaster richColors position="top-right" expand closeButton />
          <MainRoutes />
        </AppUserProvider>
      </LocalizationProvider> */}
      <Toaster richColors position="top-right" expand closeButton />
      <MainRoutes />
    </>
  );
}
