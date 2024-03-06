import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {  Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  branchOptions,
} from "../VehicleTabs/Options";
import CustomInput from "../../Input/CustomInput";

const Account = ({ handleNext, register, setValue, onSubmit, handleSubmit, getValues, errors, control}) => {
  
  const [tempValue, setTempValue] = useState();
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Branch <span className="text-danger">*</span>
          </label>
          <Controller
            name="branch"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>{setTempValue(newValue.value); setValue("branch", newValue.value)}}
                options={branchOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={branchOptions[0]}
              />
            )}
          />
          { !getValues('branch') && <Error errorName={errors.branch} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            User Name <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="User Name"
            name="userName"
            placeholder=""
          />
          <Error errorName={errors.userName} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Confirm User Name <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Confirm User Name"
            name="confirmUserName"
            placeholder=""
          />
          <Error errorName={errors.confirmUserName} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
             Password <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="password"
            register={register}
            label="Password"
            name="password"
            placeholder=""
          />
           <Error errorName={errors.password} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          Retype password  <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="password"
            register={register}
            label="Retype password"
            className="form-control"
            name="retypePassword"
            placeholder=""
          />
           <Error errorName={errors.retypePassword} />
        </div>
        
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Mobile Number  <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Mobile Number"
            name="mobileNumber"
            placeholder=""
          />
          <Error errorName={errors.mobileNumber} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          Password Recovery Email  <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="password"
            register={register}
            label="Password Recovery Email"
            className="form-control"
            name="passwordRecoveryEmail"
            placeholder=""
          />
           <Error errorName={errors.passwordRecoveryEmail} />
        </div>
        </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "2rem 0",
        }}
      >
        <Button type="submit" onClick={handleSubmit(onSubmit)} style={{ width: "10%" }}> Submit</Button>
      </div>
    </div>
  );
};

export default Account;
