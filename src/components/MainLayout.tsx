import { Outlet } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Footer from "./footer/Footer";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import Navbar from "../../components/navbar/Navbar";
// import AdminNavbar from "../../components/navbar/AdminNavbar";
// import Footer from "../../components/footer/Footer";
// import { useAppUser } from "../../contexts/AppUserContext";

interface MainLayoutProps {
  transparentNavbar?: boolean;
}

const MainLayout = ({ transparentNavbar = false }: MainLayoutProps) => {
  //const { user } = useAppUser();
  return (
    <>
      {/* {(!user || user.role == "candidate") && (
        <>
          <Navbar transparent={transparentNavbar} />
          <main className={transparentNavbar ? "" : "pt-28"}>
            <Outlet />
          </main>
        </>
      )}

      {user && user.role == "admin" && (
        <>
          <AdminNavbar />
          <main className={transparentNavbar ? "" : "pt-0"}>
            <Outlet />
          </main>
        </>
      )} */}
      {/* <Navbar /> */}
      <Navbar />
      <main className={transparentNavbar ? "" : "pt-28"}>
        <Outlet />
      </main>
      <Footer />
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
