import { lazy } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

const Login = lazy(() => import("./Login"));
const SignUp = lazy(() => import("./Registration"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const ResetPassword = lazy(() => import("./ResetPassword"));

const AuthPages = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword/:token" element={<ResetPassword />} />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
};

export default AuthPages;
