import React, { lazy, useContext } from "react";
/// React router dom
import { Routes, Route, Outlet } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";


/// Dashboard
// const Home = lazy(() => import("./components/Dashboard/Home"));
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";
import Performance from "./components/Dashboard/Performance";
import Projects from "./components/Dashboard/Projects";
import TaskSummary from "./components/Dashboard/TaskSummary";
import HomeBlog from "./components/Dashboard/Blog";
import ManageClient from "./components/Dashboard/ManageClient";
import Report from "./components/Dashboard/Report";
import Finance from "./components/Dashboard/Finance";
// const Driver = lazy(() => import("./pages/Driver"));
import Driver from "./pages/Driver";
import Technician from "./pages/Technician"
import DriverTracking from "./pages/DriverTracking";
import CompanyTracking from "./pages/admin/tracking/CompanyTracking"
import VehicleForm from "./pages/admin/settings/CreateForms/VehicleForm"
import DriverForm from "./pages/admin/settings/CreateForms/DriverForm";
import TechnicianForm from "./pages/admin/settings/CreateForms/TechnicianForm";
import SubUserForm from "./pages/CreateForms/SubUserForm";
import SubUser from "./pages/SubUser";
import Alert from "./pages/Alert";
import Expense from "./pages/Expense";
import Geofence from "./pages/Geofence";
import ClassifyTrips from "./pages/ClassifyTrips";
import Permission from "./pages/Permission";
import ContactUs from "./pages/ContactUs";
import TechnicianTask from "./pages/TechnicianTask";

//Update Pages
import SvgIcons from "./components/Dashboard/SvgIcons";

//Apps
import Contacts from './components/AppsMenu/Contacts';
import User from './components/AppsMenu/AppProfile/User';
import UserRoles from './components/AppsMenu/AppProfile/UserRoles';
import AddRole from './components/AppsMenu/AppProfile/AddRole';
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import AppProfile2 from "./components/AppsMenu/AppProfile/AppProfile2";
import EditProfile from "./components/AppsMenu/AppProfile/EditProfile";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";
import CustomerProfile from "./components/AppsMenu/AppProfile/CustomerProfile";
import AppCustomer from "./components/AppsMenu/AppProfile/AppCustomer";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";

//CMS
import Content from './components/Cms/Content';
import Menu from './components/Cms/Menu';
import EmailTemplate from './components/Cms/EmailTemplate';
import CmsBlog from './components/Cms/Blog';
import ContentAdd from './components/Cms/ContentAdd';
import AddMail from './components/Cms/AddMail';
import AddBlog from './components/Cms/AddBlog';
import BlogCategory from './components/Cms/BlogCategory';

//Aikit pages
import AutoWriter from './components/Aikit/AutoWriter';
import Scheduler from './components/Aikit/Scheduler';
import Repurpose from './components/Aikit/Repurpose';
import RSS from './components/Aikit/Rss';
import Chatbot from './components/Aikit/Chatbot';
import FineTuneModels from './components/Aikit/FineTuneModels';
import AIMenu from './components/Aikit/AIMenu';
import Settings from './components/Aikit/Settings';
import ImportExport from './components/Aikit/ImportExport';


/// Product List
import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Charts
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Bootstrap
import UiAccordion from "./components/bootstrap/Accordion";
import UiAlert from "./components/bootstrap/Alert";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";
import MainSweetAlert from "./components/PluginsMenu/SweetAlert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
import JqvMap from "./components/PluginsMenu/JqvMap/JqvMap";
import Lightgallery from "./components/PluginsMenu/Lightgallery/Lightgallery";
// Widget
import Widget from "./pages/Widget";
/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import BootstrapTable from "./components/table/BootstrapTable";
/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import CkEditor from "./components/Forms/CkEditor/CkEditor";
import Pickers from "./components/Forms/Pickers/Pickers";
import FormValidation from "./components/Forms/FormValidation/FormValidation";
/// Pages
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";

import { ThemeContext } from "../context/ThemeContext";
import AdminLayout from "./layouts/AdminLayout";
import Company from "./pages/admin/Compnay";
import General from "./pages/admin/settings/General";
import Master from "./pages/admin/settings/Master";



const AdminRoutes = () => {

  const allroutes = [
    // Dashboard
    { url: "", component: <Home/> },
    { url: "dashboard", component: <Home/>  },
    { url: "performance", component: <Performance /> },
    { url: "project", component: <Projects /> },
    { url: "task-summary", component: <TaskSummary /> },
    { url: "manage-client", component: <ManageClient /> },
    { url: "reports", component: <Report /> },
    { url: "driver", component: <Driver /> },
    { url: "company", component: <Company /> },
    { url: "general", component: <General /> },
    { url: "master", component: <Master /> },
    { url: "technician", component: <Technician /> },
    { url: "driver-tracking", component: <DriverTracking /> },
    { url: "company-tracking", component: <CompanyTracking /> },
    { url: "permission", component: <Permission /> },
    { url: "vehicle/create", component: <VehicleForm /> },
    { url: "driver/create", component: <DriverForm /> },
    { url: "technician/create", component: <TechnicianForm /> },
    { url: "subUser/create", component: <SubUserForm /> },
    { url: "subUser", component: <SubUser /> },
    { url: "alert", component: <Alert /> },
    { url: "classifyTrips", component: <ClassifyTrips /> },
    { url: "expense", component: <Expense /> },
    { url: "geofence", component: <Geofence /> },
    { url: "contactUs", component: <ContactUs /> },
    { url: "TechnicianTask", component: <TechnicianTask /> },
  ];


  function NotFound() {
    const url = allroutes.map((route) => route.url);
    let path = window.location.pathname
    path = path.split('/')
    path = path[path.length - 1]

    if (url.indexOf(path) <= 0) {
      return <Error404 />
    }
  }

  return (
    <>
      <Routes>
        <Route element={<AdminLayout />} >
          {allroutes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={data.component}
            />
          ))}
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </>
  );
};


export default AdminRoutes;
