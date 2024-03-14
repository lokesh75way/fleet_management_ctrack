import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {  Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import { useParams } from "react-router-dom";
import {
  featureTemplateOptions,
} from "../VehicleTabs/Options";
import CustomInput from "../../Input/CustomInput";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import useStorage from "../../../../hooks/useStorage";
import '../../../../scss/pages/_driver-tracking.scss'

const Account = ({ handleNext, register, setValue, onSubmit, handleSubmit, getValues, errors, control}) => {
  
  const {checkUser} = useStorage()
  const [tempValue, setTempValue] = useState();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [isStateDisabled, setIsStateDisabled] = useState(true);

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: "0.25rem 0 ", // Adjust the height as needed
    }),
  };


  const { id } = useParams();


  const userData = JSON.parse(localStorage.getItem('userJsonData'))

  const newData = userData.filter(data => data.id === parseInt(id,10));

  const [filteredUserData,setFilteredUserData] = useState(newData);

  

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
      <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
           Email  <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            label="Email"
            className="form-control"
            name="email"
            defaultValue={filteredUserData[0] ? filteredUserData[0].email : ''}
            placeholder=""
          />
           <Error errorName={errors.email} />
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
            defaultValue={filteredUserData[0] ? filteredUserData[0].userName : ''}
          />
          <Error errorName={errors.userName} />
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
            defaultValue={filteredUserData[0] ? filteredUserData[0].contact : ''}
          />
          <Error errorName={errors.mobileNumber} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Country<span className="text-danger">*</span></label>
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setValue("country", e.name);
              setIsStateDisabled(false)
            }}
            containerClassName="bg-white"
            inputClassName="border border-white customSelectHeight"
            placeHolder="Select Country"
          />
         { !getValues('country') && <Error errorName={errors.country} />}
        </div>
        <div className={`${isStateDisabled ? 'col-xl-6 mb-3 pe-none':'col-xl-6 mb-3'}`}>
          <label className="form-label">State<span className="text-danger">*</span></label>
          <div style={{ background: "white" }}>
            <StateSelect
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
                setValue("state", e.name);
              }}
              containerClassName="bg-white"
              inputClassName="border border-white customSelectHeight"
              placeHolder="Select State"
            />
          </div>
          {!getValues('state') && <Error errorName={errors.state} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Password <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="password"
            register={register}
            label="Password"
            name="password"
            placeholder=""
            defaultValue={filteredUserData[0] ? filteredUserData[0].password : ''}
          />
          <Error errorName={errors.password} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Confirm Password <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="password"
            register={register}
            label="Confirm Password"
            name="confirmPassword"
            placeholder=""
            defaultValue={filteredUserData[0] ? filteredUserData[0].confirmPassword : ''}
          />
          <Error errorName={errors.confirmPassword} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Feature Template <span className="text-danger">*</span>
          </label>
          <Controller
            name="featureTemplate"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {setTempValue(newValue.label); setValue("featureTemplate", newValue.label)}}
                options={featureTemplateOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={featureTemplateOptions[0]} 
              />
            )}
          />
          {!getValues('featureTemplate') && <Error errorName={errors.featureTemplate} />}
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
