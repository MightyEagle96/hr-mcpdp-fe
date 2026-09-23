import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import HomePage from "../pages/public/HomePage";
import MainLayout from "../components/MainLayout";
import RegisterPage from "../pages/public/Register/RegisterPage";
import LoginPage from "../pages/public/Login/LoginPage";
import NotFoundPage from "../pages/NotFound";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CandidateDashboard from "../pages/candidate/CandidateDashboard";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";
import CreateModule from "../pages/admin/CreateModule";
import ModulesPage from "../pages/admin/ModulesPage";
import ViewModule from "../pages/admin/ViewModule";
import ViewUnit from "../pages/admin/ViewUnit";
import TopicAuthorPage from "../pages/admin/TopicAuthorPage";
import UnitAssessment from "../pages/admin/UnitAssessment";
import ModulePreTest from "../pages/admin/ModulePreTest";
import ModulePostTest from "../pages/admin/ModulePostTest";
import ModulesDisplay from "../pages/candidate/ModulesDisplay";
import ModulePurchase from "../pages/candidate/ModulePurchase";
import MyModules from "../pages/candidate/MyModules";
import ModulePretest from "../pages/candidate/ModulePrettest";
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

    //modules
    { path: "/modules", element: <ModulesPage /> },
    {
      path: "/modules/:moduleId/:unitId/:topicId/author",
      element: <TopicAuthorPage />,
    },
    { path: "/modules/create", element: <CreateModule /> },
    { path: "/modules/view/:identifier", element: <ViewModule /> },
    { path: "/modules/view/unit/:identifier", element: <ViewUnit /> },
    {
      path: "/modules/:moduleId/units/:unitId/assessment",
      element: <UnitAssessment />,
    },
    { path: "/modules/pretest/:moduleId", element: <ModulePreTest /> },
    { path: "/modules/posttest/:moduleId", element: <ModulePostTest /> },
  ];

  const candidatePrivateRoutes = [
    { path: "/", element: <CandidateDashboard /> },
    { path: "/modules", element: <ModulesDisplay /> },
    { path: "/mymodules", element: <MyModules /> },
    { path: "/modules/purchase/:id", element: <ModulePurchase /> },

    //the module proper
    { path: "/module/pretest/:id", element: <ModulePretest /> },
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
