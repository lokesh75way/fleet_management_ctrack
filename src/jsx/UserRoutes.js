import React, { Suspense } from "react";

/// React router dom
import { Routes, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

import ScrollToTop from "./layouts/ScrollToTop";


/// Dashboard
import Home from "./components/Dashboard/Home";
import Loader from "./components/Loader";
import VehicleForm from "./pages/admin/settings/CreateForms/VehicleForm";
import TechnicianForm from "./pages/admin/settings/CreateForms/TechnicianForm";
import DriverForm from "./pages/admin/settings/CreateForms/DriverForm";
import UpdateVehicleForm from "./pages/admin/settings/EditForm/UpdateVehicleForm";
import BusinessForm from "./pages/admin/settings/CreateForms/BusinessForm";
import BusinessUser from "./pages/businessUser/BusinessUser";
import Business from "./pages/businessUser/BusinessUser"
import CompanyForm from "./pages/admin/settings/CreateForms/CompanyForm";
import Company from "./pages/admin/Compnay";
import CompanyTracking from "./pages/admin/tracking/CompanyTracking";


const Performance = React.lazy(() => import("./components/Dashboard/Performance"));
const Projects = React.lazy(() => import("./components/Dashboard/Projects"));
const TaskSummary = React.lazy(() => import("./components/Dashboard/TaskSummary"));
const HomeBlog = React.lazy(() => import("./components/Dashboard/Blog"));
const ManageClient = React.lazy(() => import("./components/Dashboard/ManageClient"));
const Report = React.lazy(() => import("./components/Dashboard/Report"));
const Driver = React.lazy(() => import("./pages/Driver"));
const Technician = React.lazy(() => import("./pages/Technician"));
const DriverTracking = React.lazy(() => import("./pages/DriverTracking"));
const BranchTracking = React.lazy(() => import("./pages/company/tracking/BranchTracking"));
const SubUserForm = React.lazy(() => import("./pages/CreateForms/SubUserForm"));
const SubUser = React.lazy(() => import("./pages/SubUser"));
const Alert = React.lazy(() => import("./pages/Alert"));
const Expense = React.lazy(() => import("./pages/Expense"));
const Geofence = React.lazy(() => import("./pages/Geofence"));
const ClassifyTrips = React.lazy(() => import("./pages/ClassifyTrips"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const TechnicianTask = React.lazy(() => import("./pages/TechnicianTask"));
const Vehicle = React.lazy(() => import("./pages/Vehicle"));
const MyProfile = React.lazy(() => import("./pages/company/profile/MyProfile"));


//Update Pages
const SvgIcons = React.lazy(() => import("./components/Dashboard/SvgIcons"));

//Apps
const Contacts = React.lazy(() => import('./components/AppsMenu/Contacts'));
const User = React.lazy(() => import('./components/AppsMenu/AppProfile/User'));
const UserRoles = React.lazy(() => import('./components/AppsMenu/AppProfile/UserRoles'));
const AddRole = React.lazy(() => import('./components/AppsMenu/AppProfile/AddRole'));
const AppProfile = React.lazy(() => import("./components/AppsMenu/AppProfile/AppProfile"));
const AppProfile2 = React.lazy(() => import("./components/AppsMenu/AppProfile/AppProfile2"));
const EditProfile = React.lazy(() => import("./components/AppsMenu/AppProfile/EditProfile"));
const PostDetails = React.lazy(() => import("./components/AppsMenu/AppProfile/PostDetails"));
const CustomerProfile = React.lazy(() => import("./components/AppsMenu/AppProfile/CustomerProfile"));
const AppCustomer = React.lazy(() => import("./components/AppsMenu/AppProfile/AppCustomer"));
const Compose = React.lazy(() => import("./components/AppsMenu/Email/Compose/Compose"));
const Inbox = React.lazy(() => import("./components/AppsMenu/Email/Inbox/Inbox"));
const Read = React.lazy(() => import("./components/AppsMenu/Email/Read/Read"));
const Calendar = React.lazy(() => import("./components/AppsMenu/Calendar/Calendar"));
const ChangePassword = React.lazy(() => import("./pages/ChangePassword"));



//CMS
const Content = React.lazy(() => import('./components/Cms/Content'));
const Menu = React.lazy(() => import('./components/Cms/Menu'));
const EmailTemplate = React.lazy(() => import('./components/Cms/EmailTemplate'));
const CmsBlog = React.lazy(() => import('./components/Cms/Blog'));
const ContentAdd = React.lazy(() => import('./components/Cms/ContentAdd'));
const AddMail = React.lazy(() => import('./components/Cms/AddMail'));
const AddBlog = React.lazy(() => import('./components/Cms/AddBlog'));
const BlogCategory = React.lazy(() => import('./components/Cms/BlogCategory'));

//Aikit pages
const AutoWriter = React.lazy(() => import('./components/Aikit/AutoWriter'));
const Scheduler = React.lazy(() => import('./components/Aikit/Scheduler'));
const Repurpose = React.lazy(() => import('./components/Aikit/Repurpose'));
const RSS = React.lazy(() => import('./components/Aikit/Rss'));
const Chatbot = React.lazy(() => import('./components/Aikit/Chatbot'));
const FineTuneModels = React.lazy(() => import('./components/Aikit/FineTuneModels'));
const AIMenu = React.lazy(() => import('./components/Aikit/AIMenu'));
const Settings = React.lazy(() => import('./components/Aikit/Settings'));
const ImportExport = React.lazy(() => import('./components/Aikit/ImportExport'));


/// Product List
const ProductGrid = React.lazy(() => import("./components/AppsMenu/Shop/ProductGrid/ProductGrid"));
const ProductList = React.lazy(() => import("./components/AppsMenu/Shop/ProductList/ProductList"));
const ProductDetail = React.lazy(() => import("./components/AppsMenu/Shop/ProductGrid/ProductDetail"));
const ProductOrder = React.lazy(() => import("./components/AppsMenu/Shop/ProductOrder"));
const Checkout = React.lazy(() => import("./components/AppsMenu/Shop/Checkout/Checkout"));
const Invoice = React.lazy(() => import("./components/AppsMenu/Shop/Invoice/Invoice"));
const Customers = React.lazy(() => import("./components/AppsMenu/Shop/Customers/Customers"));

/// Charts
const SparklineChart = React.lazy(() => import("./components/charts/Sparkline"));
const ChartJs = React.lazy(() => import("./components/charts/Chartjs"));
const RechartJs = React.lazy(() => import("./components/charts/rechart"));
const ApexChart = React.lazy(() => import("./components/charts/apexcharts"));

/// Bootstrap
const UiAccordion = React.lazy(() => import("./components/bootstrap/Accordion"));
const UiAlert = React.lazy(() => import("./components/bootstrap/Alert"));
const UiBadge = React.lazy(() => import("./components/bootstrap/Badge"));
const UiButton = React.lazy(() => import("./components/bootstrap/Button"));
const UiModal = React.lazy(() => import("./components/bootstrap/Modal"));
const UiButtonGroup = React.lazy(() => import("./components/bootstrap/ButtonGroup"));
const UiListGroup = React.lazy(() => import("./components/bootstrap/ListGroup"));
const UiCards = React.lazy(() => import("./components/bootstrap/Cards"));
const UiCarousel = React.lazy(() => import("./components/bootstrap/Carousel"));
const UiDropDown = React.lazy(() => import("./components/bootstrap/DropDown"));
const UiPopOver = React.lazy(() => import("./components/bootstrap/PopOver"));
const UiProgressBar = React.lazy(() => import("./components/bootstrap/ProgressBar"));
const UiTab = React.lazy(() => import("./components/bootstrap/Tab"));
const UiPagination = React.lazy(() => import("./components/bootstrap/Pagination"));
const UiGrid = React.lazy(() => import("./components/bootstrap/Grid"));
const UiTypography = React.lazy(() => import("./components/bootstrap/Typography"));

/// Plugins
const Select2 = React.lazy(() => import("./components/PluginsMenu/Select2/Select2"));
const MainSweetAlert = React.lazy(() => import("./components/PluginsMenu/SweetAlert/SweetAlert"));
const Toastr = React.lazy(() => import("./components/PluginsMenu/Toastr/Toastr"));
const JqvMap = React.lazy(() => import("./components/PluginsMenu/JqvMap/JqvMap"));
const Lightgallery = React.lazy(() => import("./components/PluginsMenu/Lightgallery/Lightgallery"));
// Widget
const Widget = React.lazy(() => import("./pages/Widget"));
/// Table
const SortingTable = React.lazy(() => import("./components/table/SortingTable/SortingTable"));
const FilteringTable = React.lazy(() => import("./components/table/FilteringTable/FilteringTable"));
const BootstrapTable = React.lazy(() => import("./components/table/BootstrapTable"));
/// Form
const Element = React.lazy(() => import("./components/Forms/Element/Element"));
const Wizard = React.lazy(() => import("./components/Forms/Wizard/Wizard"));
const CkEditor = React.lazy(() => import("./components/Forms/CkEditor/CkEditor"));
const Pickers = React.lazy(() => import("./components/Forms/Pickers/Pickers"));
const FormValidation = React.lazy(() => import("./components/Forms/FormValidation/FormValidation"));
const Error404 = React.lazy(() => import("./pages/Error404"));
const CompanyLayout = React.lazy(() => import("./layouts/CompanyLayout"));
const Branch = React.lazy(() => import("./pages/company/Branch"));
const BranchForm = React.lazy(() => import("./pages/admin/settings/CreateForms/BranchForm"));

//Reports
const TripClassification = React.lazy(() => import("./pages/company/reports/TripClassification"));
const Elock = React.lazy(() => import("./pages/company/reports/Elock"));
const HardwareMaintenance = React.lazy(() => import("./pages/company/reports/HardwareMaintenance"));
const Logs = React.lazy(() => import("./pages/company/reports/Logs"));
const Customized = React.lazy(() => import("./pages/company/reports/Customized"));
const OBD = React.lazy(() => import("./pages/company/reports/OBD"));
const Billing = React.lazy(() => import("./pages/company/reports/Billing"));
const RPM = React.lazy(() => import("./pages/company/reports/RPM"));
const Temperature = React.lazy(() => import("./pages/company/reports/Temperature"));
const DriverBehaviour = React.lazy(() => import("./pages/company/reports/DriverBehaviour"));
const ActivityReport = React.lazy(() => import("./pages/company/reports/Activity"));
const GeofenceAddress = React.lazy(() => import("./pages/company/reports/GeofenceAddress"));
const Sensor = React.lazy(() => import("./pages/company/reports/Sensor"));
const AlertReport = React.lazy(() => import("./pages/company/reports/Alert"));
const Reminder = React.lazy(() => import("./pages/company/reports/Reminder"));
const ExpenseReport = React.lazy(() => import("./pages/company/reports/Expense"));
const FuelReport = React.lazy(() => import("./pages/company/reports/Fuel"));

//Charts
const ActivityChart = React.lazy(() => import("./pages/company/charts/Activity"));
const AlertChart = React.lazy(() => import("./pages/company/charts/Alert"));
const FuelChart = React.lazy(() => import("./pages/company/charts/Fuel"));
const ExpenseChart = React.lazy(() => import("./pages/company/charts/Expense"));
const TemperatureChart = React.lazy(() => import("./pages/company/charts/TemperatureChart"));

//groups
const CreateGroups = React.lazy(() => import("./pages/CreateGroups"));
const Permission = React.lazy(() => import("./pages/Permission"));
const GeofenceMap = React.lazy(() => import("./pages/GeofenceMap"));
const UserRoutes = () => {

  const allroutes = [
    { url: "dashboard", component: <Home /> },
    { url: "", component: <Home /> },
    { url: "performance", component: <Performance /> },
    { url: "project", component: <Projects /> },
    { url: "task-summary", component: <TaskSummary /> },
    { url: "blog-1", component: <HomeBlog /> },
    // { url: "manage-client", component: <ManageClient /> },
    { url: "reports/generated", component: <Report /> },
    { url: "technician/details", component: <Technician /> },
    { url: "branch/:id", component: <Branch /> },
    { url: "driver", component: <Driver /> },
    { url: "subuser/create", component: <SubUserForm /> },
    { url: "subuser", component: <SubUser /> },
    { url: "/settings/alert", component: <Alert /> },
    { url: "/settings/classifyTrips", component: <ClassifyTrips /> },
    { url: "/settings/expense", component: <Expense /> },
    { url: "/settings/geofence", component: <Geofence /> },
    { url: "/settings/geofence/map", component: <GeofenceMap /> },

    { url: "contactUs", component: <ContactUs /> },
    { url: "technician/tasks", component: <TechnicianTask /> },
    { url: "Vehicle", component: <Vehicle /> },
    { url: "vehicle/create", component: <VehicleForm /> },
    { url: "driver/create", component: <DriverForm /> },
    { url: "technician/details/create", component: <TechnicianForm /> },
    { url: "branch/create", component: <BranchForm /> },
    { url: "/company/my-profile/edit", component: <MyProfile /> },

    //Reports
    { url: "/reports/activity", component: <ActivityReport /> },
    { url: "/reports/geofence-address", component: <GeofenceAddress /> },
    { url: "/reports/sensor", component: <Sensor /> },
    { url: "/reports/alert", component: <AlertReport /> },
    { url: "/reports/reminder", component: <Reminder /> },
    { url: "/reports/expense", component: <ExpenseReport /> },
    { url: "/reports/fuel", component: <FuelReport /> },
    { url: "/reports/rpm", component: <RPM /> },
    { url: "/reports/temperature", component: <Temperature /> },
    { url: "/reports/driver-behaviour", component: <DriverBehaviour /> },
    { url: "/reports/obd", component: <OBD /> },
    { url: "/reports/billing", component: <Billing /> },
    { url: "/reports/customized", component: <Customized /> },
    { url: "/reports/logs", component: <Logs /> },
    { url: "/reports/hardware-maintenance", component: <HardwareMaintenance /> },
    { url: "/reports/elock", component: <Elock /> },
    { url: "/reports/trip-classification", component: <TripClassification /> },

    //Charts
    { url: "/charts/activity", component: <ActivityChart /> },
    { url: "/charts/alert", component: <AlertChart /> },
    { url: "/charts/fuel", component: <FuelChart /> },
    { url: "/charts/expense", component: <ExpenseChart /> },
    { url: "/charts/temperature-chart", component: <TemperatureChart /> },
    { url: "technician", component: <Technician /> },
    { url: "branch", component: <Branch /> },
    { url: "driver", component: <Driver /> },
    { url: "vehicle-tracking", component: <DriverTracking /> },
    { url: "branch-tracking", component: <BranchTracking /> },

    //Update Pages
    { url: "svg-icon", component: <SvgIcons /> },

    ///Cms
    { url: 'content', component: <Content /> },
    { url: 'menu', component: <Menu /> },
    { url: 'email-template', component: <EmailTemplate /> },
    { url: 'blog', component: <CmsBlog /> },
    { url: 'add-content', component: <ContentAdd /> },
    { url: 'add-email', component: <AddMail /> },
    { url: 'add-blog', component: <AddBlog /> },
    { url: 'blog-category', component: <BlogCategory /> },
    { url: "vehicle-tracking/:id", component: <DriverTracking /> },
    ///AiKit    
    { url: 'auto-write', component: <AutoWriter /> },
    { url: 'scheduled', component: <Scheduler /> },
    { url: 'repurpose', component: <Repurpose /> },
    { url: 'rss', component: <RSS /> },
    { url: 'chatbot', component: <Chatbot /> },
    { url: 'fine-tune-models', component: <FineTuneModels /> },
    { url: 'prompt', component: <AIMenu /> },
    { url: 'setting', component: <Settings /> },
    { url: 'import', component: <ImportExport /> },

    //Apps
    { url: "contacts", component: <Contacts /> },
    { url: "user", component: <User /> },
    { url: "user-roles", component: <UserRoles /> },
    { url: "add-role", component: <AddRole /> },
    { url: "app-profile", component: <AppProfile /> },
    { url: "app-profile-2", component: <AppProfile2 /> },
    { url: "edit-profile", component: <EditProfile /> },
    { url: "post-details", component: <PostDetails /> },
    { url: "customer", component: <AppCustomer /> },
    { url: "customer-profile", component: <CustomerProfile /> },
    { url: "changepassword", component: <ChangePassword /> },

    // Apps  
    { url: "email-compose", component: <Compose /> },
    { url: "email-inbox", component: <Inbox /> },
    { url: "email-read", component: <Read /> },
    { url: "app-calender", component: <Calendar /> },

    // Shop
    { url: "ecom-product-grid", component: <ProductGrid /> },
    { url: "ecom-product-list", component: <ProductList /> },
    { url: "ecom-product-detail", component: <ProductDetail /> },
    { url: "ecom-product-order", component: <ProductOrder /> },
    { url: "ecom-checkout", component: <Checkout /> },
    { url: "ecom-invoice", component: <Invoice /> },
    { url: "ecom-customers", component: <Customers /> },
    // Chart
    { url: "chart-sparkline", component: <SparklineChart /> },
    { url: "chart-chartjs", component: <ChartJs /> },
    { url: "chart-apexchart", component: <ApexChart /> },
    { url: "chart-rechart", component: <RechartJs /> },
    // Bootstrap
    { url: "ui-accordion", component: <UiAccordion /> },
    { url: "ui-alert", component: <UiAlert /> },
    { url: "ui-badge", component: <UiBadge /> },
    { url: "ui-button", component: <UiButton /> },
    { url: "ui-modal", component: <UiModal /> },
    { url: "ui-button-group", component: <UiButtonGroup /> },
    { url: "ui-list-group", component: <UiListGroup /> },
    { url: "ui-card", component: <UiCards /> },
    { url: "ui-carousel", component: <UiCarousel /> },
    { url: "ui-dropdown", component: <UiDropDown /> },
    { url: "ui-popover", component: <UiPopOver /> },
    { url: "ui-progressbar", component: <UiProgressBar /> },
    { url: "ui-tab", component: <UiTab /> },
    { url: "ui-pagination", component: <UiPagination /> },
    { url: "ui-typography", component: <UiTypography /> },
    { url: "ui-grid", component: <UiGrid /> },
    // Plugin
    { url: "uc-select2", component: <Select2 /> },
    { url: "uc-sweetalert", component: <MainSweetAlert /> },
    { url: "uc-toastr", component: <Toastr /> },
    { url: "map-jqvmap", component: <JqvMap /> },
    { url: "uc-lightgallery", component: <Lightgallery /> },
    // Widget
    { url: "widget-basic", component: <Widget /> },
    // Form
    { url: "form-element", component: <Element /> },
    { url: "form-wizard", component: <Wizard /> },
    { url: "form-ckeditor", component: <CkEditor /> },
    { url: "form-pickers", component: <Pickers /> },
    { url: "form-validation", component: <FormValidation /> },

    // table
    { url: 'table-filtering', component: <FilteringTable /> },
    { url: 'table-sorting', component: <SortingTable /> },
    { url: "table-bootstrap-basic", component: <BootstrapTable /> },

    // groups
    { url: "groups", component: <CreateGroups /> },
    { url: "groups/permission", component: <Permission /> },

    // drivers
    { url: "driver/edit/:id", component: <DriverForm /> },
    { url: "vehicle/edit/:id", component: <UpdateVehicleForm /> },

    // buisness
    { module: 'business',operation:'add', url: "business/create", component: <BusinessForm /> },
    { module: 'business',operation:'modify', url: "business/edit/:id", component: <BusinessForm /> },
    { module: 'business', url: "business-group", component: <BusinessUser /> },
    { module: 'business', url: "business-group/:id", component: <BusinessUser /> },
    { module: 'business', url: "business", component: <Business /> },

    //company
    { module: 'company',operation:'add', url: "company/create", component: <CompanyForm /> },
  { module: 'company',operation:'modify', url: "company/edit/:id", component: <CompanyForm /> },
  { module: 'company', url: "company/:id", component: <Company /> },
  { module: 'company', url: "company", component: <Company /> },
  { module: 'company', url: "company-tracking", component: <CompanyTracking /> },
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
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<CompanyLayout />} >
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
    </Suspense>
  );
};


export default UserRoutes;
