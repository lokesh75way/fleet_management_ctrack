import React, { useContext, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";
// import users from '../../users.json'
import { useForm } from "react-hook-form";
import logo from "@/assets/images/logo/logo-full.png";
import LogoWhite from "@/assets/images/logo/logofull-white.png";
import bg6 from "@/assets/images/background/bg6.jpg";
import { loginValidation } from "../../utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifyError } from "../../utils/toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import login_logo from "@/assets/images/login_logo.png";
import { ThemeContext } from "../../context/ThemeContext";
import "@/assets/scss/pages/_login.scss";
import { clsx } from "clsx";
import { t } from "i18next";
import Button from "../components/Button";

function Login(props) {
  const showLoading = useSelector((store) => store.auth.showLoading);
  const [heartActive, setHeartActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { isRtl } = useContext(ThemeContext);

  const imageLogin = clsx({
    "img-login-rtl": isRtl,
    "img-login": !isRtl,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "noreply.75way@gmail.com",
      password: "Admin@123",
    },
    resolver: yupResolver(loginValidation),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onLogin({ email, password }) {
    dispatch(loadingToggleAction(true));
    dispatch(loginAction(email, password, navigate));
  }

  return (
    <div className="page-wraper">
      <div className="browse-job login-style3">
        <div
          className="bg-img-fix"
          style={{
            background: "#fff url(" + bg6 + ")",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "750px",
          }}
        >
          <section class="p-md-4 p-xl-5">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-12 col-xxl-11">
                  <div
                    class="card border-light-subtle shadow-sm"
                    style={{ height: "auto", marginBottom: 0, border: 0 }}
                  >
                    <div class="row g-0">
                      <div class="col-12 col-md-6">
                        <img
                          src={login_logo}
                          style={{
                            height: "100%",
                          }}
                          className={`img-fluid w-100 object-fit-cover overflow-hidden ${imageLogin}`}
                          alt="Login Logo"
                        ></img>
                      </div>
                      <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
                        <div class="col-12 col-lg-11 col-xl-10">
                          <div class="card-body p-3 p-md-4 p-xl-5">
                            <div className="row gx-0">
                              <div className="card-body">
                                <div className="logo-header">
                                  <Link to={"#"} className="logo">
                                    <img
                                      src={logo}
                                      alt=""
                                      className="width-230 light-logo"
                                    />
                                  </Link>
                                  <Link to={"#"} className="logo">
                                    <img
                                      src={LogoWhite}
                                      alt=""
                                      className="width-230 dark-logo"
                                    />
                                  </Link>
                                </div>
                                <div className="nav nav-tabs border-bottom-0">
                                  <div
                                    className="tab-content w-100"
                                    id="nav-tabContent"
                                  >
                                    <div
                                      className="tab-pane fade active show"
                                      id="nav-personal"
                                    >
                                      {props.errorMessage && (
                                        <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                                          {props.errorMessage}
                                        </div>
                                      )}
                                      {props.successMessage && (
                                        <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                                          {props.successMessage}
                                        </div>
                                      )}
                                      <form
                                        className=" dz-form pb-3"
                                        onSubmit={handleSubmit(onLogin)}
                                      >
                                        <h3 className="form-title m-t0">
                                          {t("personalInformation")}
                                        </h3>
                                        <div className="dz-separator-outer m-b5">
                                          <div className="dz-separator bg-primary style-liner"></div>
                                        </div>
                                        <p>{t("enterEmailAndPassword")} </p>
                                        <div className="form-group mb-3">
                                          <input
                                            type="email"
                                            className="form-control"
                                            {...register("email")}
                                          />
                                          {errors.email && (
                                            <div className="text-danger fs-12">
                                              {errors.email.message}
                                            </div>
                                          )}
                                        </div>
                                        <div className="form-group mb-3">
                                          <div className="position-relative">
                                            <input
                                              type={
                                                showPassword
                                                  ? "text"
                                                  : "password"
                                              }
                                              className="form-control"
                                              {...register("password")}
                                            />
                                            {/* Eye icon to toggle password visibility */}
                                            {showPassword ? (
                                              <LuEyeOff
                                                className="eye-icon"
                                                style={{
                                                  position: "absolute",
                                                  left: isRtl ? "4%" : "91%",
                                                  bottom: isRtl ? "32%" : "32%",
                                                }}
                                                onClick={() =>
                                                  setShowPassword(false)
                                                }
                                              />
                                            ) : (
                                              <LuEye
                                                className="eye-icon"
                                                style={{
                                                  position: "absolute",
                                                  left: isRtl ? "4%" : "91%",
                                                  bottom: isRtl ? "32%" : "32%",
                                                }}
                                                onClick={() =>
                                                  setShowPassword(true)
                                                }
                                              />
                                            )}
                                          </div>
                                          {errors?.password && (
                                            <div className="text-danger fs-12">
                                              {errors.password.message}
                                            </div>
                                          )}
                                        </div>
                                        <div className="form-group text-left mb-5">
                                          <span className="form-check d-inline-block ms-2">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id="check1"
                                              name="example1"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="check1"
                                              style={{
                                                paddingLeft: isRtl ? "5px" : 0,
                                              }}
                                            >
                                              {t("rememberMe")}
                                            </label>
                                          </span>
                                          <Button text="login" isLoading={showLoading} />
                                        </div>
                                        <div className="dz-social">
                                          <h5 className="form-title fs-20">
                                            {t("signInWith")}
                                          </h5>
                                          <ul className="dz-social-icon dz-border dz-social-icon-lg text-white">
                                            <li>
                                              <Link
                                                target="_blank"
                                                to={"https://www.facebook.com"}
                                                className="fab fa-facebook-f btn-facebook"
                                              ></Link>
                                            </li>
                                            <li>
                                              <Link
                                                target="_blank"
                                                to={"mailtos@gmail.com"}
                                                className="fab fa-google-plus-g btn-google-plus"
                                              ></Link>
                                            </li>
                                            <li>
                                              <Link
                                                target="_blank"
                                                to={
                                                  "https://www.linkedin.com/in"
                                                }
                                                className="fab fa-linkedin-in btn-linkedin"
                                              ></Link>
                                            </li>
                                            <li>
                                              <Link
                                                target="_blank"
                                                to={"https://twitter.coms"}
                                                className="fab fa-twitter btn-twitter"
                                              ></Link>
                                            </li>
                                          </ul>
                                        </div>
                                      </form>
                                      <div className="text-center bottom">
                                        {/* <NavLink
                                          to="/register"
                                          className="btn btn-primary button-md btn-block"
                                        >
                                          {t("createAccount")}
                                        </NavLink> */}
                                        <NavLink
                                          to="/register"
                                          className="btn btn-outline-primary btn-block"
                                        >
                                          {t("createAccount")}
                                        </NavLink>
                                        <div className="mt-2">
                                          <Link
                                            to="/forgotpassword"
                                            style={{ fontSize: "small" }}
                                          >
                                            {" "}
                                            {t("forgotPassword")}
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer">
                                <div className=" bottom-footer clearfix m-t10 m-b20 row text-center">
                                  <div className="col-lg-12 text-center">
                                    <span>
                                      {" "}
                                      © {t("copyrightBy")}{" "}
                                      <span
                                        className={`heart ${heartActive ? "" : "heart-blast"
                                          }`}
                                        onClick={() =>
                                          setHeartActive(!heartActive)
                                        }
                                      ></span>
                                      <a
                                        href="#"
                                        rel="noreferrer"
                                        target="_blank"
                                      >
                                        {" "}
                                        {t("75way")}{" "}
                                      </a>{" "}
                                      {t("allRightReserved")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
