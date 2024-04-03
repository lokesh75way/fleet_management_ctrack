import { Suspense, lazy, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { connect, useDispatch, useSelector } from "react-redux";
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
import BasicLayout from './jsx/layouts/BasicLayout';
import AdminRoutes from './jsx/AdminRoutes';
import CompanyRoutes from './jsx/CompanyRoutes';
import BusinessGroupRoutes from './jsx/BusinessGroupRoutes';
import SubCompanyRoutes from './jsx/SubCompanyRoutes';
import ForgotPassword from './jsx/pages/ForgotPassword';
import ResetPassword from './jsx/pages/ResetPassword';
import { CompanyData, DriverData, VehicleData, SubCompanyData } from "./jsx/components/Tables/Tables";
import { BusinessData, TechnicianData, UserData } from './jsx/components/Tables/Tables';
import UserJsonData from './users.json'
import GeofenceData from './geofenceData.json'
import { GiLabCoat } from "react-icons/gi";
import useStorage from "./hooks/useStorage";
import { usePermissions } from "./context/PermissionContext";
import UserRoutes from "./jsx/UserRoutes";

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
  const { checkRole, checkType } = useStorage()
  let role = checkRole()
  let type = checkType()
  const { setUserPermission } = usePermissions()
  const userPermission = useSelector(state => state.auth.permission);
  //useLocation
  const location = useLocation();

  useEffect(() => {
    const companyData = localStorage.getItem('companyData');
    const vehicleData = localStorage.getItem('vehicleData');
    const driver = localStorage.getItem("driverData");
    const dataBranch = localStorage.getItem('branchData');

    const userData = localStorage.getItem('userData');
    const technicianData = localStorage.getItem('technicianData');
     const userJsonData = localStorage.getItem('userJsonData');

    const geoData = localStorage.getItem('geofenceData')

    if (!companyData) localStorage.setItem('companyData', JSON.stringify(CompanyData))
    if (!vehicleData) localStorage.setItem('vehicleData', JSON.stringify(VehicleData))
    if (!driver) localStorage.setItem("driverData", JSON.stringify(DriverData));
    if (!dataBranch) localStorage.setItem('branchData', JSON.stringify(SubCompanyData))

    if (!userData) localStorage.setItem('userData', JSON.stringify(UserData))
    if (!technicianData) localStorage.setItem('technicianData', JSON.stringify(TechnicianData))
    if (!userJsonData) localStorage.setItem('userJsonData', JSON.stringify(UserJsonData))
    if (!geoData) localStorage.setItem('geofenceData', JSON.stringify(GeofenceData))


  }, [role])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!location.pathname.includes('resetpassword')){
      checkAutoLogin(dispatch, navigate);
    }
    console.log(location.pathname, "pathname")
  }, []);

  if (props.isAuthenticated) {
    switch (role) {
      case "SUPER_ADMIN":
        return <AdminRoutes />;
      case "BUSINESS_GROUP":
        return <BusinessGroupRoutes />;
      case "COMPANY":
        return <CompanyRoutes />;
      case "USER":
        return <UserRoutes/>
    }
  }

  return (<>
    <div className="vh-100">
      <Suspense fallback={<h4>Loading...</h4>} >
        <Routes>
          <Route element={<BasicLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  </>);
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(App));
