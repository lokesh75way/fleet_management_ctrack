import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  signupAction,
} from "../../store/actions/AuthActions";
// image

import logo from "../../images/logo/logo-full.png";
import LogoWhite from "../../images/logo/logofull-white.png";
import bg6 from "../../images/background/bg6.jpg";
import login_logo from "../../images/login_logo.png";
import { ThemeContext } from "../../context/ThemeContext";
import "../../scss/pages/_login.scss";
import { clsx } from "clsx";
import { IoMdArrowRoundBack } from "react-icons/io";
import SvgIcons from "../components/Dashboard/SvgIcons";
import { SVGICON } from "../constant/theme";

function Register(props) {
  const [heartActive, setHeartActive] = useState(true);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  let errorsObj = { email: "", password: "", mobile: "", name };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const { isRtl } = useContext(ThemeContext);

  const imageLogin = clsx({
    "img-login-rtl": isRtl,
    "img-login": !isRtl,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    if (name === "") {
      errorObj.name = "Name is Required";
      error = true;
    }
    if (mobile === "") {
      errorObj.mobile = "Mobile is Required";
      error = true;
    }
    if (username === "") {
      errorObj.username = "Username is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) return;
    dispatch(loadingToggleAction(true));
    dispatch(
      signupAction({ email, password, name, mobile, username }, navigate)
    );
  }

  return (
    <div className="page-wraper">
      <div className="browse-job login-style3">
        <div
          className="bg-img-fix-signup"
          style={{
            background: "#fff url(" + bg6 + ")",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "800px",
          }}
        >
          <section class="p-md-4">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-12 col-xxl-11">
                  <div
                    class="card border-light-subtle shadow-sm"
                    style={{ height: "auto", marginBottom: 0, border: 0 }}
                  >
                    <div class="row g-0">
                      <div class="col-12 col-md-6 position-relative">
                        <img
                          src={login_logo}
                          style={{
                            height: "100%",
                          }}
                          className={`img-fluid w-100 object-fit-cover overflow-hidden ${imageLogin}`}
                          alt="Login Logo"
                        ></img>
                        <div
                          style={{
                            position: "absolute",
                            top: "5%",
                            left: "5%",
                            padding: "10px",
                            backgroundColor: "grey",
                            borderRadius: "50%",
                          }}
                        >
                          <NavLink to="/login">{SVGICON.ArrowLeft}</NavLink>
                        </div>
                      </div>
                      <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
                        <div class="col-12 col-lg-11 col-xl-10">
                          <div class="card-body p-3 p-md-4 p-xl-5">
                            <div className="row gx-0">
                              <div className="card-body">
                                <div className="logo-header">
                                  <Link to={"/login"} className="logo">
                                    <img
                                      src={logo}
                                      alt="log1"
                                      className="width-230 light-logo"
                                    />
                                  </Link>
                                  <Link to={"/login"} className="logo">
                                    <img
                                      src={LogoWhite}
                                      alt="log2"
                                      className="width-230 dark-logo"
                                    />
                                  </Link>
                                </div>
                                <nav className="nav nav-tabs border-bottom-0">
                                  <div
                                    className="tab-content w-100"
                                    id="nav-tabContent"
                                  >
                                    <div className="tab-pane active show fade">
                                      {props.errorMessage && (
                                        <div className="">
                                          {props.errorMessage}
                                        </div>
                                      )}
                                      {props.successMessage && (
                                        <div className="">
                                          {props.successMessage}
                                        </div>
                                      )}
                                      <form
                                        className="dz-form py-2"
                                        onSubmit={onSignUp}
                                      >
                                        <h3 className="form-title">Sign Up</h3>
                                        <div className="dz-separator-outer m-b5">
                                          <div className="dz-separator bg-primary style-liner"></div>
                                        </div>
                                        <p>
                                          Enter your personal details below:{" "}
                                        </p>
                                        <div className="form-group mt-3">
                                          <input
                                            name="dzName"
                                            required=""
                                            value={name}
                                            onChange={(e) =>
                                              setName(e.target.value)
                                            }
                                            className="form-control"
                                            placeholder="Full Name"
                                            type="text"
                                          />
                                          {errors.name && (
                                            <div className="text-danger fs-12">
                                              {errors.name}
                                            </div>
                                          )}
                                        </div>
                                        <div className="form-group mt-3">
                                          <input
                                            value={email}
                                            onChange={(e) =>
                                              setEmail(e.target.value)
                                            }
                                            className="form-control"
                                            placeholder="hello@example.com"
                                          />
                                          {errors.email && (
                                            <div className="text-danger fs-12">
                                              {errors.email}
                                            </div>
                                          )}
                                        </div>

                                        <div className="form-group mt-3">
                                          <input
                                            value={password}
                                            onChange={(e) =>
                                              setPassword(e.target.value)
                                            }
                                            className="form-control"
                                            placeholder="password"
                                          />
                                          {errors.password && (
                                            <div className="text-danger fs-12">
                                              {errors.password}
                                            </div>
                                          )}
                                        </div>
                                        <div className="form-group mt-3">
                                          <input
                                            value={mobile}
                                            onChange={(e) =>
                                              setMobile(e.target.value)
                                            }
                                            className="form-control"
                                            placeholder="mobile"
                                          />
                                          {errors.mobile && (
                                            <div className="text-danger fs-12">
                                              {errors.mobile}
                                            </div>
                                          )}
                                        </div>
                                        <div className="form-group mt-3">
                                          <input
                                            value={username}
                                            onChange={(e) =>
                                              setUserName(e.target.value)
                                            }
                                            className="form-control"
                                            placeholder="username"
                                          />
                                          {errors.username && (
                                            <div className="text-danger fs-12">
                                              {errors.username}
                                            </div>
                                          )}
                                        </div>

                                        <div className="mb-3 mt-3">
                                          <span className="form-check float-start me-2 mb-3">
                                            <input
                                              type="checkbox"
                                              className="form-check-input mt-0"
                                              id="check2"
                                              name="example1"
                                            />
                                            <label
                                              className="form-check-label d-unset"
                                              htmlFor="check2"
                                              style={{ marginLeft: "2px" }}
                                            >
                                              I agree to the{" "}
                                              <Link to={"#"}>
                                                Terms of Service{" "}
                                              </Link>
                                              &amp;{" "}
                                              <Link to={"#"}>
                                                Privacy Policy
                                              </Link>
                                            </label>
                                          </span>
                                        </div>
                                        <div className="form-group clearfix text-left">
                                          {/* <NavLink
                                            to="/login"
                                            className="btn btn-primary outline gray"
                                            type="button"
                                          >
                                            Back
                                          </NavLink> */}
                                          <button
                                            type="submit"
                                            className="btn btn-primary float-end w-100"
                                          >
                                            Submit
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </nav>
                              </div>
                              <div className="card-footer">
                                <div className=" bottom-footer clearfix m-t10 m-b20 row text-center">
                                  <div className="col-lg-12 text-center">
                                    <span>
                                      {" "}
                                      © Copyright by
                                      <span
                                        className={`heart ${
                                          heartActive ? "" : "heart-blast"
                                        }`}
                                        onClick={() =>
                                          setHeartActive(!heartActive)
                                        }
                                      ></span>
                                      <a
                                        href="https://www.dexignzone.com/"
                                        rel="noreferrer"
                                        target="_blank"
                                      >
                                        {" "}
                                        75way{" "}
                                      </a>{" "}
                                      All rights reserved.
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

export default connect(mapStateToProps)(Register);
