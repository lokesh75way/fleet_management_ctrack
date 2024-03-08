import React, { Suspense } from "react";
/// React router dom
import { Routes, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

import ScrollToTop from "./layouts/ScrollToTop";
import Home from "./components/Dashboard/Home";
import Loader from "./components/Loader";
import AdminProfile from "./components/AppsMenu/AppProfile/AdminProfile";
import ChangePassword from "./pages/ChangePassword";
import UserGroups from "./pages/businessUser/BusinessUser";
import BusinessUser from "./pages/businessUser/BusinessUser";
import BranchForm from "./pages/admin/settings/CreateForms/BranchForm";

const UpdateDriverForm = React.lazy(() =>
  import("./pages/admin/settings/EditForm/UpdateDriverForm")
);
const UpdateVehicleForm = React.lazy(() =>
  import("./pages/admin/settings/EditForm/UpdateVehicleForm")
);
const UpdateCompanyForm = React.lazy(() =>
  import("./pages/admin/settings/EditForm/UpdateCompanyForm")
);

const Performance = React.lazy(() =>
  import("./components/Dashboard/Performance")
);
const Projects = React.lazy(() => import("./components/Dashboard/Projects"));
const TaskSummary = React.lazy(() =>
  import("./components/Dashboard/TaskSummary")
);
const ManageClient = React.lazy(() =>
  import("./components/Dashboard/ManageClient")
);
const Report = React.lazy(() => import("./components/Dashboard/Report"));
const Driver = React.lazy(() => import("./pages/Driver"));
const Technician = React.lazy(() => import("./pages/Technician"));
const DriverTracking = React.lazy(() => import("./pages/DriverTracking"));
const CompanyTracking = React.lazy(() =>
  import("./pages/admin/tracking/CompanyTracking")
);
const VehicleForm = React.lazy(() =>
  import("./pages/admin/settings/CreateForms/VehicleForm")
);
const DriverForm = React.lazy(() =>
  import("./pages/admin/settings/CreateForms/DriverForm")
);

const TechnicianForm = React.lazy(() =>
  import("./pages/admin/settings/CreateForms/TechnicianForm")
);
const CompanyForm = React.lazy(() =>
  import("./pages/admin/settings/CreateForms/CompanyForm")
);
const BusinessForm = React.lazy(() =>
  import("./pages/admin/settings/CreateForms/BusinessForm")
);
const SubUserForm = React.lazy(() => import("./pages/CreateForms/SubUserForm"));
const SubUser = React.lazy(() => import("./pages/SubUser"));
const Alert = React.lazy(() => import("./pages/Alert"));
const Expense = React.lazy(() => import("./pages/Expense"));
const Geofence = React.lazy(() => import("./pages/Geofence"));
const ClassifyTrips = React.lazy(() => import("./pages/ClassifyTrips"));
const Permission = React.lazy(() => import("./pages/Permission"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const TechnicianTask = React.lazy(() => import("./pages/TechnicianTask"));
const Vehicle = React.lazy(() => import("./pages/Vehicle"));
const MyProfile = React.lazy(() => import("./pages/admin/profile/MyProfile"));

const Error404 = React.lazy(() => import("./pages/Error404"));

const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));
const Company = React.lazy(() => import("./pages/admin/Compnay"));
const Business = React.lazy(() => import("./pages/businessUser/BusinessUser"));
const General = React.lazy(() => import("./pages/admin/settings/General"));
const Master = React.lazy(() => import("./pages/admin/settings/Master"));
const Branch = React.lazy(() => import("./pages/company/Branch"));
const GeofenceMap = React.lazy(() => import("./pages/GeofenceMap"));
//groups
const CreateGroups = React.lazy(() => import("./pages/CreateGroups"));
// import Permission from "./pages/Permission";

const AdminRoutes = () => {
  const allroutes = [
    // Dashboard
    { url: "", component: <Home /> },
    { url: "dashboard", component: <Home /> },
    { url: "performance", component: <Performance /> },
    { url: "project", component: <Projects /> },
    { url: "task-summary", component: <TaskSummary /> },
    { url: "manage-client", component: <ManageClient /> },
    { url: "reports", component: <Report /> },
    { url: "geofencemap", component: <GeofenceMap /> },
    { url: "driver", component: <Driver /> },
    { url: "company", component: <Company /> },

    { url: "company/:id", component: <Company /> },
    { url: "business", component: <Business /> },
    { url: "general", component: <General /> },
    { url: "master", component: <Master /> },
    { url: "technician", component: <Technician /> },
    { url: "driver-tracking", component: <DriverTracking /> },
    { url: "company-tracking", component: <CompanyTracking /> },
    { url: "vehicle/create", component: <VehicleForm /> },
    { url: "vehicle/edit/:id", component: <UpdateVehicleForm /> },
    { url: "driver/create", component: <DriverForm /> },
    { url: "driver/edit/:id", component: <UpdateDriverForm /> },
    { url: "technician/create", component: <TechnicianForm /> },
    { url: "subUser/create", component: <SubUserForm /> },
    { url: "subUser", component: <SubUser /> },
    { url: "subUser/edit/:id", component: <SubUserForm /> },
    { url: "alert", component: <Alert /> },
    { url: "classifyTrips", component: <ClassifyTrips /> },
    { url: "expense", component: <Expense /> },
    { url: "geofence", component: <Geofence /> },
    { url: "contactUs", component: <ContactUs /> },
    { url: "TechnicianTask", component: <TechnicianTask /> },
    { url: "Vehicle", component: <Vehicle /> },
    { url: "company/create", component: <CompanyForm /> },
    { url: "company/edit/:id", component: <UpdateCompanyForm /> },
 
    { url: "business/create", component: <BusinessForm /> },
    { url: "business/edit/:id", component: <BusinessForm  /> },
    { url: "branch/create", component: <BranchForm /> },
    { url: "branch", component: <Branch /> },
    { url: "branch/edit/:id", component: <BranchForm  /> },
    { url: "business-group", component: <BusinessUser /> },
    { url: "business-group/:id", component: <BusinessUser /> },
    { url: "branch", component: <Branch /> },
    { url: "branch/:id", component: <Branch /> },
    { url: "/admin/my-profile/edit", component: <MyProfile /> },
    // Manage Profile
    { url: "app-profile", component: <AdminProfile /> },
    { url: "changepassword", component: <ChangePassword /> },

    // groups
    { url: "groups", component: <CreateGroups /> },
    { url: "permission", component: <Permission /> },
  ];

  function NotFound() {
    const url = allroutes.map((route) => route.url);
    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    if (url.indexOf(path) <= 0) {
      return <Error404 />;
    }
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<AdminLayout />}>
          {allroutes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={data.component}
            />
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </Suspense>
  );
};

export default AdminRoutes;
