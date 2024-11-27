import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";
import { LuEye, LuEyeOff } from "react-icons/lu";
import "../../../../scss/pages/_driver-tracking.scss";

const ManagePassword = ({
  getValues,
  register,
  onSubmit,
  handleSubmit,
  errors,
  isFormSubmitting,
}) => {
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <>
          <div className="col-xl-6 mb-3 position-relative">
            <label className="form-label">
              Old Password<span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <CustomInput
                type={showOldPassword ? "text" : "password"}
                register={register}
                name="oldPassword"
                label="Old Password"
                placeholder=""
                defaultValue={getValues("oldPassword")}
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
            <Error errorName={errors.oldPassword} />
          </div>
          <div className="col-xl-6 mb-3">
            <label className="form-label">
              New Password<span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <CustomInput
                type={showNewPassword ? "text" : "password"}
                register={register}
                label="New Password"
                name="newPassword"
                placeholder=""
                defaultValue={getValues("newPassword")}
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
            <Error errorName={errors.newPassword} />
          </div>
          <div className="col-xl-6 mb-3 position-relative">
            <label className="form-label">
              Retype Password<span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <CustomInput
                type={showConfirmPassword ? "text" : "password"}
                register={register}
                label="Retype Password"
                name="confirmPassword"
                placeholder=""
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
            <Error errorName={errors.confirmPassword} />
          </div>
        </>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "2rem 0",
        }}
      >
        <Button
          type="submit"
          disabled={isFormSubmitting}
          onClick={handleSubmit(onSubmit)}
          style={{ width: "10%" }}
        >
          {" "}
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ManagePassword;
