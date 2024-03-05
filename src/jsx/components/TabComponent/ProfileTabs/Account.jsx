import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  branchOptions,
} from "../VehicleTabs/Options";

const Account = ({ handleNext, register, setValue}) => {
  const{control, getValues,formState: errors} = useForm()
  
  const [selectedOption, setSelectedOption] = useState(null);
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
            Branch
          </label>
          <Controller
            name="branch"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("branch", newValue.value)}
                options={branchOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={branchOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            User Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("userName", {
              required: "User Name is required",
            })}
            className="form-control"
            name="userName"
            placeholder=""
          />
          <Error errorName={errors.userName} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Confirm User Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("confirmUserName", {
              required: "Confirm User Name is required",
            })}
            className="form-control"
            name="confirmUserName"
            placeholder=""
          />
          <Error errorName={errors.confirmUserName} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
             Password <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            {...register("password",{
              required: "Password is required",
            })}
            className="form-control"
            name="password"
            placeholder=""
          />
           <Error errorName={errors.confirmUserName} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          Retype password  <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            {...register("retypePassword", {
              required: "Retype Password is required",
            })}
            className="form-control"
            name="retypePassword"
            placeholder=""
          />
           <Error errorName={errors.confirmUserName} />
        </div>
        
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Mobile Number  <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("mobileNumber", {
              required: "Mobile Number is required",
            })}
            className="form-control"
            name="mobileNumber"
            placeholder=""
          />
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
        <Button onClick={handleNext} style={{ width: "10%" }}> Next</Button>
      </div>
    </div>
  );
};

export default Account;
