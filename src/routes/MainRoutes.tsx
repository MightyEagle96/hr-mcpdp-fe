import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import HomePage from "../pages/public/HomePage";
import MainLayout from "../components/MainLayout";
import RegisterPage from "../pages/public/Register/RegisterPage";
import LoginPage from "../pages/public/Login/LoginPage";
import NotFoundPage from "../pages/NotFound";
import UnauthorizedPage from "../pages/UnauthorisedPage";

function MainRoutes() {
  const publicRoutes = [
    { path: "/", element: <HomePage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/login", element: <LoginPage /> },
  ];
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
