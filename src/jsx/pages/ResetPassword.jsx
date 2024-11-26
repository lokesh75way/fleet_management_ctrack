import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// image
import logo from "../../images/logo/logo-full.png";
import LogoWhite from "../../images/logo/logofull-white.png";
import { ThemeContext } from "../../context/ThemeContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetpasswordSchema, resetPassword } from "../../yup";
import { useForm } from "react-hook-form";
import CustomInput from "../components/Input/CustomInput";
import PasswordServices from "../../services/api/PasswordServices";
import { notifySuccess } from "../../utils/toast";
const ResetPassword = () => {
  const { background } = useContext(ThemeContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(resetPassword),
  });

  const nav = useNavigate();
  const onSubmit = async ({ newPassword }) => {
    const token = window.location.pathname.split("/")[2];
    const data = {
      password: newPassword,
      token: token,
    };
    console.log(data);
    const response = await PasswordServices.resetPassword(data);
    if (response?.data?.success) {
      notifySuccess("Password Reset Successfully");
      nav("/login");
    } else {
      notifySuccess("Password Reset Failed");
    }
    // nav("/login");
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
                      <h4 className="text-center mb-4">Reset Password</h4>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                          <label>
                            <strong>New Password</strong>
                          </label>
                          <CustomInput
                            type="password"
                            className="form-control"
                            register={register}
                            name="newPassword"
                            label="New Password"
                          />
                          {errors.newPassword && (
                            <div className="text-danger fs-12">
                              {errors.newPassword.message}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label>
                            <strong>Confirm Password</strong>
                          </label>
                          <CustomInput
                            type="password"
                            className="form-control"
                            defaultValue="Password"
                            register={register}
                            name="confirmPassword"
                            label="Confirm Password"
                          />
                          {errors.confirmPassword && (
                            <div className="text-danger fs-12">
                              {errors.confirmPassword.message}
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Reset
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

export default ResetPassword;
