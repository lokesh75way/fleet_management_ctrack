import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  branchOptions,
  companyOptions,
  businessGroupOptions,
} from "../VehicleTabs/Options";
import CustomInput from "../../Input/CustomInput";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Profile = ({
  setValue,
  register,
  handleSubmit,
  onSubmit,
  getValues,
  errors,
}) => {
  const { control } = useForm();
  const [tempValue, setTempValue] = useState();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };

  const { id } = useParams();
  const role = localStorage.getItem("role");
  const userData = JSON.parse(localStorage.getItem("userJsonData"));

  const loggedInUser = localStorage.getItem("loginDetails-name");
  const newData = userData.filter((data) => data.id == parseInt(id, 10));
  const [filteredUserData, setFilteredUserData] = useState(newData);

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Business Group <span className="text-danger">*</span>
          </label>
          <Controller
            name="business"
            control={control}
            rules={{ required: true }}
            disabled={true}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  console.log(newValue);
                  setTempValue(newValue?.value);
                  setValue("business", newValue?.value);
                }}
                isDisabled={role === "company" || role === "businessgroup"}
                options={businessGroupOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={{
                  label:
                    filteredUserData[0]?.parentBusinessGroup ||
                    (loggedInUser !== "Admin" ? loggedInUser : ""),
                }}
              />
            )}
          />
          {!getValues("branch") && <Error errorName={errors.branch} />}
        </div>
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
                onChange={(newValue) => {
                  setTempValue(newValue?.value);
                  setValue("company", newValue?.value);
                }}
                isDisabled={role === "company"}
                options={companyOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={{
                  label:
                    filteredUserData[0]?.parentCompany ||
                    (role === "company" ? loggedInUser : ""),
                }}
              />
            )}
          />
          {!getValues("branch") && <Error errorName={errors.branch} />}
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
                onChange={(newValue) => {
                  console.log(newValue);
                  setTempValue(newValue?.value);
                  setValue("branch", newValue?.value);
                }}
                options={branchOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={{
                  label:
                    filteredUserData[0]?.parentBranch ||
                    " "
                }}
              />
            )}
          />
          {!getValues("branch") && <Error errorName={errors.branch} />}
        </div>
        {/* <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Employee Designation <span className="text-danger">*</span>
          </label>
          <Controller
            name="employeeDesignation"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {setTempValue(newValue.value); setValue("employeeDesignation", newValue.value)}}
                options={employeeDesignationOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={employeeDesignationOptions[0]}
              />
            )}
          />
          { !getValues('employeeDesignation') && <Error errorName={errors.employeeDesignation} />}
        </div> */}
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            First Name <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="First Name"
            name="firstName"
            placeholder="first name"
            defaultValue={filteredUserData[0]?.firstName || ""}
          />
          <Error errorName={errors.firstName} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Last Name <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Last Name"
            name="lastName"
            placeholder="last name"
            defaultValue={filteredUserData[0]?.lastName || ""}
          />
          <Error errorName={errors.lastName} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Employee Number <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Employee Number"
            name="employeeNumber"
            placeholder=""
            defaultValue={filteredUserData[0]?.employeeNumber || ""}
          />
          <Error errorName={errors.employeeNumber} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Country <span className="text-danger">*</span>
          </label>
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setValue("country", e.id);
              setIsStateDisabled(false)
            }}
            containerClassName="bg-white"
            inputClassName="border border-white"
            placeHolder="Select Country"
          />
          {!getValues("country") && <Error errorName={errors.country} />}
        </div>
        <div className={`${isStateDisabled ? 'col-xl-6 mb-3 pe-none':'col-xl-6 mb-3'}`}>
          <label className="form-label">
            State <span className="text-danger">*</span>
          </label>
          <div>
            <StateSelect
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
                setValue("state", e.id);
              }}
              containerClassName="bg-white"
              inputClassName="border border-white"
              placeHolder="Select State"
            />
            {!getValues("state") && <Error errorName={errors.state} />}
          </div>
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            City <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="City"
            name="city"
            placeholder=""
            defaultValue={filteredUserData[0]?.city || ""}
          />
          <Error errorName={errors.city} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Zip Code <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="zipCode"
            name="zipCode"
            placeholder=""
            defaultValue={filteredUserData[0]?.zipCode}
          />
          <Error errorName={errors.zipCode} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Street1 <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street1"
            name="street1"
            placeholder=""
            defaultValue={filteredUserData[0]?.street1 || " "}
          />
          <Error errorName={errors.street1} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Street2
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street2"
            name="street2"
            placeholder=""
            defaultValue={filteredUserData[0]?.street2 || " "}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Contact Number1 <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Contact Number1"
            name="contactNumber1"
            placeholder=""
            defaultValue={filteredUserData[0]?.contactNumber1 || " "}
          />
          <Error errorName={errors.contactNumber1} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Contact Number2 <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Contact Number2"
            name="contactNumber2"
            placeholder=""
            defaultValue={filteredUserData[0]?.contactNumber2 || " "}
          />
          <Error errorName={errors.contactNumber2} />
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

export default Profile;
