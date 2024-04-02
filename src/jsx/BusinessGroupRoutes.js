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
import UpdateVehicleForm from "./pages/admin/settings/EditForm/UpdateVehicleForm";
import PermissionDenied from "./pages/PermissionDenied";
import { usePermissions } from "../context/PermissionContext";

const TripClassification = React.lazy(() =>
  import("./pages/company/reports/TripClassification")
);
const Elock = React.lazy(() => import("./pages/company/reports/Elock"));
const HardwareMaintenance = React.lazy(() =>
  import("./pages/company/reports/HardwareMaintenance")
);
const Logs = React.lazy(() => import("./pages/company/reports/Logs"));
const Customized = React.lazy(() =>
  import("./pages/company/reports/Customized")
);
const OBD = React.lazy(() => import("./pages/company/reports/OBD"));
const Billing = React.lazy(() => import("./pages/company/reports/Billing"));
const RPM = React.lazy(() => import("./pages/company/reports/RPM"));
const Temperature = React.lazy(() =>
  import("./pages/company/reports/Temperature")
);
const DriverBehaviour = React.lazy(() =>
  import("./pages/company/reports/DriverBehaviour")
);
const ActivityReport = React.lazy(() =>
  import("./pages/company/reports/Activity")
);
const GeofenceAddress = React.lazy(() =>
  import("./pages/company/reports/GeofenceAddress")
);
const Sensor = React.lazy(() => import("./pages/company/reports/Sensor"));
const AlertReport = React.lazy(() => import("./pages/company/reports/Alert"));
const Reminder = React.lazy(() => import("./pages/company/reports/Reminder"));
const ExpenseReport = React.lazy(() =>
  import("./pages/company/reports/Expense")
);
const FuelReport = React.lazy(() => import("./pages/company/reports/Fuel"));

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
const MyProfile = React.lazy(() =>
  import("./pages/businessUser/profile/MyProfile")
);
const BusinessUserProfile = React.lazy(() =>
  import("./components/AppsMenu/AppProfile/BusinessUserProfile")
);
const GeofenceMap = React.lazy(() => import("./pages/GeofenceMap"));

const Error404 = React.lazy(() => import("./pages/Error404"));

const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));
const Company = React.lazy(() => import("./pages/admin/Compnay"));
const Business = React.lazy(() => import("./pages/businessUser/BusinessUser"));
const General = React.lazy(() => import("./pages/admin/settings/General"));
const Master = React.lazy(() => import("./pages/admin/settings/Master"));
const Branch = React.lazy(() => import("./pages/company/Branch"));
//groups
const CreateGroups = React.lazy(() => import("./pages/CreateGroups"));
// import Permission from "./pages/Permission";

const BusinessGroupRoutes = () => {
  const allroutes = [
    // Dashboard
    { module: "*", url: "", component: <Home /> },
    { module: "*", url: "dashboard", component: <Home /> },
    { module: "*", url: "performance", component: <Performance /> },
    { module: "*", url: "project", component: <Projects /> },
    { module: "*", url: "task-summary", component: <TaskSummary /> },
    {
      module: "*",
      url: "/businessUser/my-profile/edit",
      component: <MyProfile />,
    },
    { module: "*", url: "/app-profile", component: <BusinessUserProfile /> },
    { module: "*", url: "app-profile", component: <AdminProfile /> },
    { module: "*", url: "changepassword", component: <ChangePassword /> },
    { module: "*", url: "manage-client", component: <ManageClient /> },
    { module: "*", url: "contactUs", component: <ContactUs /> },
    { module: "*", url: "reports/generated", component: <Report /> },
    { module: "*", url: "general", component: <General /> },
    { module: "*", url: "master", component: <Master /> },

    {
      module: "technician",
      url: "technician/details",
      component: <Technician />,
    },
    {
      module: "technician",
      operation: "add",
      url: "technician/details/create",
      component: <TechnicianForm />,
    },
    {
      module: "technician",
      url: "technician/tasks",
      component: <TechnicianTask />,
    },
    {
      module: "technician",
      operation: "modify",
      url: "technician/edit/:id",
      component: <TechnicianForm />,
    },

    {
      module: "vehicle",
      url: "vehicle-tracking",
      component: <DriverTracking />,
    },
    {
      module: "vehicle",
      operation: "add",
      url: "vehicle/create",
      component: <VehicleForm />,
    },
    { module: "vehicle", url: "Vehicle", component: <Vehicle /> },
    {
      module: "vehicle",
      operation: "modify",
      url: "vehicle/edit/:id",
      component: <UpdateVehicleForm />,
    },
    {
      module: "vehicle",
      url: "vehicle-tracking/:id",
      component: <DriverTracking />,
    },

    { module: "comapny", url: "company", component: <Company /> },
    { module: "comapny", url: "company/:id", component: <Company /> },
    {
      module: "company",
      operation: "add",
      url: "company/create",
      component: <CompanyForm />,
    },
    {
      module: "company",
      operation: "modify",
      url: "company/edit/:id",
      component: <CompanyForm />,
    },
    {
      module: "company",
      url: "company-tracking",
      component: <CompanyTracking />,
    },

    { module: "driver", url: "driver", component: <Driver /> },
    {
      module: "driver",
      operation: "add",
      url: "driver/create",
      component: <DriverForm />,
    },
    {
      module: "driver",
      operation: "modify",
      url: "driver/edit/:id",
      component: <DriverForm />,
    },

    {
      module: "subUser",
      operation: "add",
      url: "subUser/create",
      component: <SubUserForm />,
    },
    { module: "subUser", url: "subUser", component: <SubUser /> },

    { module: "business", url: "business-group", component: <BusinessUser /> },
    {
      module: "business",
      operation: "add",
      url: "business/create",
      component: <BusinessForm />,
    },
    {
      module: "business",
      url: "business-group/:id",
      component: <BusinessUser />,
    },
    { module: "business", url: "business", component: <Business /> },

    { module: "settings", url: "/settings/alert", component: <Alert /> },
    {
      module: "settings",
      url: "/settings/classifyTrips",
      component: <ClassifyTrips />,
    },
    { module: "settings", url: "/settings/expense", component: <Expense /> },
    { module: "settings", url: "/settings/geofence", component: <Geofence /> },
    {
      module: "settings",
      url: "/settings/geofence/map",
      component: <GeofenceMap />,
    },

    {
      module: "branch",
      operation: "add",
      url: "branch/create",
      component: <BranchForm />,
    },
    {
      module: "branch",
      operation: "modify",
      url: "branch/edit/:id",
      component: <BranchForm />,
    },
    { module: "branch", url: "branch", component: <Branch /> },
    { module: "branch", url: "branch", component: <Branch /> },
    { module: "branch", url: "branch/:id", component: <Branch /> },

    // groups
    { module: "groups", url: "groups", component: <CreateGroups /> },
    { module: "groups", url: "groups/permission", component: <Permission /> },

    //Reports
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
    {
      module: "reports",
      url: "/reports/expense",
      component: <ExpenseReport />,
    },
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
    {
      module: "reports",
      url: "/reports/customized",
      component: <Customized />,
    },
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

  function NotFound() {
    const url = allroutes.map((route) => route.url);
    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    if (url.indexOf(path) <= 0) {
      return <Error404 />;
    }
  }
  const { can } = usePermissions();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<AdminLayout />}>
          {allroutes.map((data, i) => {
            if (!can(data.module, data.operation || "view")) {
              // console.log(data.module, data.url, 'create')
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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </Suspense>
  );
};

export default BusinessGroupRoutes;
