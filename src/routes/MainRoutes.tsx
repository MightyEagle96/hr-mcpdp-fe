import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import HomePage from "../pages/public/HomePage";
import MainLayout from "../components/MainLayout";
import RegisterPage from "../pages/public/Register/RegisterPage";
import LoginPage from "../pages/public/Login/LoginPage";
import NotFoundPage from "../pages/NotFound";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CandidateDashboard from "../pages/private/CandidateDashboard";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";
import CreateModule from "../pages/admin/CreateModule";
import ModulesPage from "../pages/admin/ModulesPage";
import ViewModule from "../pages/admin/ViewModule";
//import UnauthorizedPage from "../pages/UnauthorisedPage";

function MainRoutes() {
  const { user, loading } = useAuth();
  const publicRoutes = [
    { path: "/", element: <HomePage /> },
    { path: "/admin", element: <AdminLoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/login", element: <LoginPage /> },
  ];

  const adminPrivateRoutes = [
    { path: "/", element: <AdminDashboard /> },
    { path: "/modules", element: <ModulesPage /> },
    { path: "/modules/create", element: <CreateModule /> },
    { path: "/modules/view/:identifier", element: <ViewModule /> },
  ];

  const candidatePrivateRoutes = [
    { path: "/", element: <CandidateDashboard /> },
  ];

  const privateRouteToShow =
    user && (user.role == "admin" || user.role == "super admin")
      ? adminPrivateRoutes
      : candidatePrivateRoutes;

  const routesToshow = user ? privateRouteToShow : publicRoutes;

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          {routesToshow.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
