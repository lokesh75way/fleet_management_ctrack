import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

import "@/assets/css/style.css";
import BasicLayout from "./jsx/layouts/BasicLayout";
import AdminRoutes from "./jsx/AdminRoutes";
import CompanyRoutes from "./jsx/CompanyRoutes";
import BusinessGroupRoutes from "./jsx/BusinessGroupRoutes";
import UserRoutes from "./jsx/UserRoutes";
import AuthPages from "@/features/auth/pages";

function App(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  if (isAuthenticated) {
    switch (role) {
      case "SUPER_ADMIN":
        return <AdminRoutes />;
      case "BUSINESS_GROUP":
        return <BusinessGroupRoutes />;
      case "COMPANY":
        return <CompanyRoutes />;
      case "USER":
        return <UserRoutes />;
    }
  }

  return (
    <>
      <div className="vh-100">
        <Suspense fallback={<h4>Loading...</h4>}>
          <Routes>
            <Route element={<BasicLayout />}>
              <Route path="/*" element={<AuthPages />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
