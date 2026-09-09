// import { AppUserProvider } from "./contexts/AppUserContext";
import { AppUserProvider } from "./context/AppUserContext";
import MainRoutes from "./routes/MainRoutes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <AppUserProvider>
        <Toaster richColors position="top-right" expand closeButton />
        <MainRoutes />
      </AppUserProvider>
    </>
  );
}
