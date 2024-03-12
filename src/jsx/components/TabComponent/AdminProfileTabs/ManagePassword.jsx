import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";

const ManagePassword = ({
  data,
  setValue,
  getValues,
  register,
  onSubmit,
  handleSubmit,
  errors,
  control,
}) => {


  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>

          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Old Password<span className="text-danger">*</span>
              </label>
              <CustomInput
                type="password"
                register={register}
                name="oldPassword"
                label="Old Password"
                placeholder=""
                defaultValue={getValues("oldPassword")}
              />
              <Error errorName={errors.oldPassword} />
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                New Password<span className="text-danger">*</span>
              </label>
              <CustomInput
                type="password"
                register={register}
                label="New Password"
                name="newPassword"
                placeholder=""
                defaultValue={getValues("newPassword")}
              />
              <Error errorName={errors.newPassword} />
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Retype Password<span className="text-danger">*</span>
              </label>
              <CustomInput
                type="password"
                register={register}
                label="Retype Passwor"
                name="retypePassword"
                placeholder=""
              />
              <Error errorName={errors.retypePassword} />
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
