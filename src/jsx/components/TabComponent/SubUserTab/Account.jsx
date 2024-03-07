import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {  Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  branchOptions,
} from "../VehicleTabs/Options";
import CustomInput from "../../Input/CustomInput";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";

const Account = ({ handleNext, register, setValue, onSubmit, handleSubmit, getValues, errors, control}) => {
  
  const [tempValue, setTempValue] = useState();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

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


        <div className="col-xl-6 mb-3">
          <label className="form-label">Country<span className="text-danger">*</span></label>
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setValue("country", e.name);
            }}
            containerClassName="bg-white"
            inputClassName="border border-white"
            placeHolder="Select Country"
          />
         { !getValues('country') && <Error errorName={errors.country} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">State<span className="text-danger">*</span></label>
          <div style={{ background: "white" }}>
            <StateSelect
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
                setValue("state", e.name);
              }}
              containerClassName="bg-white"
              inputClassName="border border-white"
              placeHolder="Select State"
            />
          </div>
          {!getValues('state') && <Error errorName={errors.state} />}
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

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Age <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Age"
            name="age"
            placeholder=""
          />
          <Error errorName={errors.age} />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Mobile Number <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Mobile Number"
            name="mobileNumber"
            placeholder=""
          />
          <Error errorName={errors.mobileNumber} />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Experience <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Experience"
            name="experience"
            placeholder=""
          />
          <Error errorName={errors.experience} />
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
