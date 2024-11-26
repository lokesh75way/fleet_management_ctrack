import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo/logo-full.png";
import { useForm } from "react-hook-form";
import { forgetpasswordSchema } from "../../yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../components/Input/CustomInput";
import PasswordServices from "../../services/api/PasswordServices";
import { notifyError, notifySuccess } from "../../utils/toast";

const ForgotPassword = ({ history }) => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "noreply.75way@gmail.com",
    },
    resolver: yupResolver(forgetpasswordSchema),
  });

  const onSubmit = ({ email }) => {
    PasswordServices.forgotPassword({ email: email }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        notifySuccess("Email Sent successfully !!");
        navigate("/login");
      } else {
        notifyError("Email not sent !!");
      }
    });
    // navigate("/page-resetpassword");
  };

  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        {" "}
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/dashboard">
                        <img src={logo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Forgot Password</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                        <label className="">
                          <strong>Email</strong>
                        </label>
                        <CustomInput
                          type="email"
                          className="form-control"
                          register={register}
                          name="email"
                          label="Email"
                        />
                        {errors.email && (
                          <div className="text-danger fs-12">
                            {errors.email.message}
                          </div>
                        )}
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mt-3"
                        >
                          SUBMIT
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
  );
};

export default ForgotPassword;
