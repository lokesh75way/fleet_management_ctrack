import { Suspense, lazy, useEffect } from "react";

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
import BasicLayout from "./jsx/layouts/BasicLayout";
import AdminRoutes from "./jsx/AdminRoutes";
import CompanyRoutes from "./jsx/CompanyRoutes";
import BusinessGroupRoutes from "./jsx/BusinessGroupRoutes";
import SubCompanyRoutes from "./jsx/SubCompanyRoutes";
import ForgotPassword from "./jsx/pages/ForgotPassword";
import ResetPassword from "./jsx/pages/ResetPassword";
import { CompanyData, DriverData } from "./jsx/components/Tables/Tables";

console.log(DriverData);
const SignUp = lazy(() => import("./jsx/pages/Registration"));
const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./jsx/pages/Login")), 500);
  });
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    useEffect(() => {
      const data = localStorage.getItem("companyData");
      if (!data) {
        localStorage.setItem("companyData", JSON.stringify(CompanyData));
      }

      const driver = localStorage.getItem("driverData");
      if (!driver) {
        localStorage.setItem("driverData", JSON.stringify(DriverData));
      }
      // return() => {
      //   localStorage.removeItem("driverData");
      // };
    }, []);
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

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

  return (
    <div className="vh-100">
      <Routes>
        <Route element={<BasicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/page-register" element={<SignUp />} />
          <Route path="/page-forgotpassword" element={<ForgotPassword />} />
          <Route path="/page-resetpassword" element={<ResetPassword />} />
        </Route>
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(App));
