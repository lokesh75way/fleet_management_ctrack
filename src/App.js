import { Suspense, lazy, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { connect, useDispatch } from "react-redux";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
// action
import { checkAutoLogin } from "./services/AuthService";

import { isAuthenticated } from "./store/selectors/AuthSelectors";

import "./css/style.css";
// const AdminRoutes = lazy(() => import('./jsx/AdminRoutes'));
// const CompanyRoutes = lazy(() => import('./jsx/CompanyRoutes'));
// const BasicLayout = lazy(() => import('./jsx/layouts/BasicLayout'));
// const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));
// const ResetPassword = lazy(() => import('./jsx/pages/ResetPassword'));
import BasicLayout from './jsx/layouts/BasicLayout';
import AdminRoutes from './jsx/AdminRoutes';
import CompanyRoutes from './jsx/CompanyRoutes';
import BusinessGroupRoutes from './jsx/BusinessGroupRoutes';
import SubCompanyRoutes from './jsx/SubCompanyRoutes';
import ForgotPassword from './jsx/pages/ForgotPassword';
import ResetPassword from './jsx/pages/ResetPassword';
import { CompanyData, DriverData,VehicleData,SubCompanyData } from "./jsx/components/Tables/Tables";
import { BusinessData, TechnicianData, UserData } from './jsx/components/Tables/Tables';
import UserJsonData from './users.json'


const SignUp = lazy(() => import("./jsx/pages/Registration"));
const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./jsx/pages/Login")), 500);
  });
});

function withRouter(Component) {

  function ComponentWithRouterProp(props) {
  

    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function App(props) {
  const role = localStorage.getItem("role");
  useEffect(()=>{
    const companyData = localStorage.getItem('companyData');
    const vehicleData = localStorage.getItem('vehicleData');
    const driver = localStorage.getItem("driverData");
    const dataBranch = localStorage.getItem('branchData');
  
    const userData = localStorage.getItem('userData');
    const technicianData = localStorage.getItem('technicianData');
    const userJsonData = localStorage.getItem('userJsonData')

    if(!companyData) localStorage.setItem('companyData', JSON.stringify(CompanyData))
    if(!vehicleData) localStorage.setItem('vehicleData', JSON.stringify(VehicleData))
    if (!driver) localStorage.setItem("driverData", JSON.stringify(DriverData));   
    if(!dataBranch) localStorage.setItem('branchData',JSON.stringify(SubCompanyData))
   
    if(!userData) localStorage.setItem('userData', JSON.stringify(UserData))
    if(!technicianData) localStorage.setItem('technicianData', JSON.stringify(TechnicianData))
    if(!userJsonData) localStorage.setItem('userJsonData', JSON.stringify(UserJsonData))
    

  },[role])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    checkAutoLogin(dispatch, navigate);
  }, []);

  if (props.isAuthenticated) {
    console.log("from app.js", role);

    // return role === 'admin' ? <AdminRoutes /> : <CompanyRoutes />;
    switch (role) {
      case "admin":
        return <AdminRoutes />;
      case "businessgroup":
        return <BusinessGroupRoutes />;
      case "branch":
        return <SubCompanyRoutes />;
      default:
        return <CompanyRoutes />;
    }
  }

  return (<>
    <div className="vh-100">
      {/* <Suspense fallback={<Loading/>} > */}
      <Routes>
        <Route element={<BasicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/page-register" element={<SignUp />} />
          <Route path="/page-forgotpassword" element={<ForgotPassword />} />
          <Route path="/page-resetpassword" element={<ResetPassword />} />
        </Route>
      </Routes>
      {/* </Suspense> */}
    </div>
    </>);
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(App));
