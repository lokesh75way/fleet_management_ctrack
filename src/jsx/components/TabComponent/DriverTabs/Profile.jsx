import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import { branchOptions, employeeDesignationOptions,tagViaOptions, defaultObjectNumberOptions } from "../VehicleTabs/Options";

const Profile = ({ setValue, register, handleNext}) => {
  const { formState:errors, control } = useForm();
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
            Company <span className="text-danger">*</span>
          </label>
          <Controller
            name="company"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("company", newValue.value)}
                options={branchOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={branchOptions[0]}
              />
            )}
          />
          <Error errorName={errors.branch} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Branch <span className="text-danger">*</span>
          </label>
          <Controller
            name="branch"
            control={control}
            rules={{ required: true }}
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
            Employee Designation
          </label>
          <Controller
            name="employeeDesignation"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("employeeDesignation", newValue.value)}
                options={employeeDesignationOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={employeeDesignationOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            First Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("firstName", {
              required: "First Number is required",
            })}
            className="form-control"
            name="firstName"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Last Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("lastName", {
              required: "Last Number is required",
            })}
            className="form-control"
            name="lastName"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Employee Number 
          </label>
          <input
            type="number"
            {...register("employeeNumber")}
            className="form-control"
            name="employeeNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Tag via 
          </label>
          <Controller
            name="tagVia"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("tagVia", newValue.value)}
                options={tagViaOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={tagViaOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Shift Group 
          </label>
          <input
            type="text"
            {...register("shiftGroup")}
            className="form-control"
            name="shiftGroup"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Shift 
          </label>
          <input
            type="text"
            {...register("shift")}
            className="form-control"
            name="shift"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Country 
          </label>
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setValue('country',e.id)
            }}
            containerClassName="bg-white"
            inputClassName="border border-white"
            placeHolder="Select Country"
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            State 
          </label>
          <div style={{ background: "white" }}>
            <StateSelect
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
                setValue('state',e.id)
              }}
              containerClassName="bg-white"
              inputClassName="border border-white"
              placeHolder="Select State"
            />
          </div>
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            City 
          </label>
          <input
            type="text"
            {...register("city")}
            className="form-control"
            name="city"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Zip Code 
          </label>
          <input
            type="number"
            {...register("zipCode")}
            className="form-control"
            name="zipCode"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Street1 
          </label>
          <input
            type="text"
            {...register("street1")}
            className="form-control"
            name="street1"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Street2 
          </label>
          <input
            type="text"
            {...register("street2")}
            className="form-control"
            name="street2"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Contact Number1 <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("contactNumber1")}
            className="form-control"
            name="contactNumber1"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Contact Number2 
          </label>
          <input
            type="number"
            {...register("contactNumber2")}
            className="form-control"
            name="contactNumber2"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Default Object Number 
          </label>
          <Controller
            name="defaultObjectNumber"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("defaultObjectNumber", newValue.value)}
                options={defaultObjectNumberOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={defaultObjectNumberOptions[0]}
              />
            )}
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

export default Profile;
