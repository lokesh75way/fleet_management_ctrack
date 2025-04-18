import React, { Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";
import "./chart.css";
import "./step.css";
import ScrollToTop from "./layouts/ScrollToTop";
import AdminHome from "./components/Dashboard/AdminHome";
import Loader from "@/components/Loader";
import AdminProfile from "./components/AppsMenu/AppProfile/AdminProfile";
import ChangePassword from "./pages/ChangePassword";

import BusinessGroupRoutes from "@/features/businessGroup/pages";
import CompanyRoutes from "@/features/company/pages";
import BranchRoutes from "@/features/branch/pages";
import VehicleRoutes from "@/features/vehicle/pages";
import usePermissions from "@/hooks/usePermissions";
import DriverRoutes from "@/features/driver/pages";
import UserRoutes from "@/features/user/pages";
import TemplateRotues from "@/features/featureTemplate/pages";
import TechnicianRotues from "@/features/technician/pages";

const TripClassification = React.lazy(
  () => import("./pages/company/reports/TripClassification")
);
const Elock = React.lazy(() => import("./pages/company/reports/Elock"));
const HardwareMaintenance = React.lazy(
  () => import("./pages/company/reports/HardwareMaintenance")
);
const Logs = React.lazy(() => import("./pages/company/reports/Logs"));
const Customized = React.lazy(
  () => import("./pages/company/reports/Customized")
);
const OBD = React.lazy(() => import("./pages/company/reports/OBD"));
const Billing = React.lazy(() => import("./pages/company/reports/Billing"));
const RPM = React.lazy(() => import("./pages/company/reports/RPM"));
const Temperature = React.lazy(
  () => import("./pages/company/reports/Temperature")
);
const DriverBehaviour = React.lazy(
  () => import("./pages/company/reports/DriverBehaviour")
);
const ActivityReport = React.lazy(
  () => import("./pages/company/reports/Activity")
);
const GeofenceAddress = React.lazy(
  () => import("./pages/company/reports/GeofenceAddress")
);
const Sensor = React.lazy(() => import("./pages/company/reports/Sensor"));
const AlertReport = React.lazy(() => import("./pages/company/reports/Alert"));
const Reminder = React.lazy(() => import("./pages/company/reports/Reminder"));
const ExpenseReport = React.lazy(
  () => import("./pages/company/reports/Expense")
);
const FuelReport = React.lazy(() => import("./pages/company/reports/Fuel"));
const Performance = React.lazy(
  () => import("./components/Dashboard/Performance")
);
const Projects = React.lazy(() => import("./components/Dashboard/Projects"));
const TaskSummary = React.lazy(
  () => import("./components/Dashboard/TaskSummary")
);
const ManageClient = React.lazy(
  () => import("./components/Dashboard/ManageClient")
);
const Report = React.lazy(() => import("./components/Dashboard/Report"));
const CompanyTracking = React.lazy(
  () => import("./pages/admin/tracking/CompanyTracking")
);
const Alert = React.lazy(() => import("./pages/Alert"));
const Expense = React.lazy(() => import("./pages/Expense/Expense"));
const ExpenseForm = React.lazy(() => import("./pages/Expense/ExpenseForm"));
const Geofence = React.lazy(() => import("./pages/Geofence"));
const ClassifyTrips = React.lazy(() => import("./pages/ClassifyTrips"));
const ClassifyTripForm = React.lazy(
  () => import("./pages/ClassifyTrip/ClassifyTripForm")
);
const Permission = React.lazy(() => import("./pages/Permission"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const MyProfile = React.lazy(() => import("./pages/admin/profile/MyProfile"));
const Error404 = React.lazy(() => import("../components/Error/Error404"));
const PermissionDenied = React.lazy(() => import("./pages/PermissionDenied"));
const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));
const General = React.lazy(() => import("./pages/admin/settings/General"));
const Master = React.lazy(() => import("./pages/admin/settings/Master"));
const GeofenceMap = React.lazy(() => import("./pages/GeofenceMap"));
// import Permission from "./pages/Permission";
const allroutes = [
  // Dashboard
  { module: "*", url: "", component: <AdminHome /> },
  { module: "*", url: "dashboard", component: <AdminHome /> },
  { module: "*", url: "performance", component: <Performance /> },
  { module: "*", url: "project", component: <Projects /> },
  { module: "*", url: "task-summary", component: <TaskSummary /> },
  { module: "*", url: "manage-client", component: <ManageClient /> },
  { module: "*", url: "general", component: <General /> },
  { module: "*", url: "master", component: <Master /> },
  { module: "*", url: "my-profile/edit", component: <MyProfile /> },
  { module: "*", url: "app-profile", component: <AdminProfile /> },
  { module: "*", url: "changepassword", component: <ChangePassword /> },
  { module: "*", url: "contactUs", component: <ContactUs /> },

  { module: "settings", url: "/settings/alert", component: <Alert /> },
  {
    module: "settings",
    url: "/settings/classifyTrips",
    component: <ClassifyTrips />,
  },
  {
    module: "settings",
    url: "/settings/classifyTrips/create",
    component: <ClassifyTripForm />,
  },
  {
    module: "settings",
    url: "/settings/classifyTrips/edit/:id",
    component: <ClassifyTripForm />,
  },
  { module: "settings", url: "/settings/expense", component: <Expense /> },
  {
    module: "settings",
    url: "/settings/expense/create",
    component: <ExpenseForm />,
  },
  {
    module: "settings",
    url: "/settings/expense/edit/:id",
    component: <ExpenseForm />,
  },
  { module: "settings", url: "/settings/geofence", component: <Geofence /> },
  {
    module: "settings",
    url: "/settings/geofence/map",
    component: <GeofenceMap />,
  },
  {
    module: "settings",
    url: "/settings/geofence/map/edit/:id",
    component: <GeofenceMap />,
  },

  {
    module: "company",
    url: "company-tracking",
    component: <CompanyTracking />,
  },

  // groups
  { module: "groups", url: "groups/permission/:id", component: <Permission /> },

  // reports
  { module: "reports", url: "/reports/generated", component: <Report /> },
  {
    module: "reports",
    url: "/reports/activity",
    component: <ActivityReport />,
  },
  {
    module: "reports",
    url: "/reports/geofence-address",
    component: <GeofenceAddress />,
  },
  { module: "reports", url: "/reports/sensor", component: <Sensor /> },
  { module: "reports", url: "/reports/alert", component: <AlertReport /> },
  { module: "reports", url: "/reports/reminder", component: <Reminder /> },
  { module: "reports", url: "/reports/expense", component: <ExpenseReport /> },
  { module: "reports", url: "/reports/fuel", component: <FuelReport /> },
  { module: "reports", url: "/reports/rpm", component: <RPM /> },
  {
    module: "reports",
    url: "/reports/temperature",
    component: <Temperature />,
  },
  {
    module: "reports",
    url: "/reports/driver-behaviour",
    component: <DriverBehaviour />,
  },
  { module: "reports", url: "/reports/obd", component: <OBD /> },
  { module: "reports", url: "/reports/billing", component: <Billing /> },
  { module: "reports", url: "/reports/customized", component: <Customized /> },
  { module: "reports", url: "/reports/logs", component: <Logs /> },
  {
    module: "reports",
    url: "/reports/hardware-maintenance",
    component: <HardwareMaintenance />,
  },
  { module: "reports", url: "/reports/elock", component: <Elock /> },
  {
    module: "reports",
    url: "/reports/trip-classification",
    component: <TripClassification />,
  },
];
const AdminRoutes = () => {
  const { can } = usePermissions();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<AdminLayout />}>
          {allroutes.map((data, i) => {
            if (!can(data.module, data.operation || "view")) {
              return (
                <Route
                  key={i}
                  exact
                  path={`${data.url}`}
                  element={<PermissionDenied />}
                />
              );
            }
            return (
              <Route
                key={i}
                exact
                path={`${data.url}`}
                element={data.component}
              />
            );
          })}
          <Route path="/business/*" element={<BusinessGroupRoutes />} />
          <Route path="/company/*" element={<CompanyRoutes />} />
          <Route path="/branch/*" element={<BranchRoutes />} />
          <Route path="/vehicle/*" element={<VehicleRoutes />} />
          <Route path="/driver/*" element={<DriverRoutes />} />
          <Route path="/user/*" element={<UserRoutes />} />
          {/* TODO: change path to template */}
          <Route path="/groups/*" element={<TemplateRotues />} />
          <Route path="/technician/*" element={<TechnicianRotues />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
      <ScrollToTop />
    </Suspense>
  );
};
export default AdminRoutes;
