import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import logo from "../../images/logo/logo-full.png";
import LogoWhite from "../../images/logo/logofull-white.png";
import { ThemeContext } from "../../context/ThemeContext";

const ChangePassword = () => {
  const { background } = useContext(ThemeContext);
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const nav = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    nav("/dashboard");
  };
  return (
    <>
      <div className="authincation">
        <div className="container">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <div className="text-center mb-3">
                        <Link to="/dashboard">
                          {background.value === "light" ? (
                            <img src={logo} alt="" />
                          ) : (
                            <img src={LogoWhite} alt="" />
                          )}
                        </Link>
                      </div>
                      <h4 className="text-center mb-4">Change Password</h4>
                      <form onSubmit={(e) => submitHandler(e)}>
                        <div className="mb-3">
                          <label>
                            <strong>Password</strong>
                          </label>
                          <div className="position-relative">
                          <input
                            type={showOldPassword ? "text" : "password"}
                            className="form-control"
                            defaultValue=""
                          />
                          <span
                            className="showPasswordIcon"
                            onClick={() => {
                              setOldShowPassword(!showOldPassword);
                            }}
                          >
                            {showOldPassword ? <LuEyeOff /> : <LuEye />}
                          </span>
                          </div>
                        </div>
                        <div className="mb-3 position-relative">
                          <label>
                            <strong>New Password</strong>
                          </label>
                          <div className="position-relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            className="form-control"
                            defaultValue=""
                          />
                          <span
                            className="showPasswordIcon"
                            onClick={() => {
                              setNewShowPassword(!showNewPassword);
                            }}
                          >
                            {showNewPassword ? <LuEyeOff /> : <LuEye />}
                          </span>
                          </div>
                        </div>
                        <div className="mb-3 position-relative">
                          <label>
                            <strong>Confirm Password</strong>
                          </label>
                          <div className="position-relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control"
                            defaultValue=""
                          />
                          <span
                            className="showPasswordIcon"
                            onClick={() => {
                              setConfirmShowPassword(!showConfirmPassword);
                            }}
                          >
                            {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                          </span>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
