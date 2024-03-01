import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  adminOptions,
  resellerOptions,
} from "../VehicleTabs/Options";

const General = ({ handleNext, register, setValue}) => {
  const{control, getValues,formState: errors} = useForm()
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const handleChange = (e)=>{
    setSelectedOption(e.target.value)
    setValue('fuelSensor', e.target.value)
  }
  const handleChange2 = (e)=>{
    setSelectedOption2(e.target.value)
    setValue('verificationVia', e.target.value)
  }

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Admin 
          </label>
          <Controller
            name="admin"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("admin", newValue.value)}
                options={adminOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={adminOptions[0]}
              />
            )}
          />
          <Error errorName={errors.admin} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Reseller 
          </label>
          <Controller
            name="reseller"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("reseller", newValue.value)}
                options={resellerOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={resellerOptions[0]}
              />
            )}
          />
          <Error errorName={errors.reseller} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            First Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("firstName", {
              required: "First Name is required",
            })}
            className="form-control"
            name="firstName"
            placeholder=""
          />
          <Error errorName={errors.firstName} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Middle Name 
          </label>
          <input
            type="text"
            {...register("middleName")}
            className="form-control"
            name="middleName"
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
              required: "Last Name is required",
            })}
            className="form-control"
            name="lastName"
            placeholder=""
          />
          <Error errorName={errors.lastName} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Technician Number 
          </label>
          <input
            type="number"
            {...register("technicianNumber")}
            className="form-control"
            name="technicianNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Gender</label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                value='male'
                checked={selectedOption === 'male'}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                style={{ marginBottom: "0" }}
              >
                Male
              </label>
            </div>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                value='female'
                checked={selectedOption === 'female'}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                style={{ marginBottom: "0" }}
              >
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Verification Via</label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                value='otp'
                checked={selectedOption2 === 'otp'}
                onChange={handleChange2}
              />
              <label
                className="form-check-label"
                style={{ marginBottom: "0" }}
              >
                OTP
              </label>
            </div>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                value='password'
                checked={selectedOption2 === 'password'}
                onChange={handleChange2}
              />
              <label
                className="form-check-label"
                style={{ marginBottom: "0" }}
              >
                Password
              </label>
            </div>
          </div>
        </div>

        {
          selectedOption2 === 'password' && <>
            <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
             Password 
          </label>
          <input
            type="password"
            {...register("password")}
            className="form-control"
            name="password"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          Retype password  
          </label>
          <input
            type="password"
            {...register("retypePassword")}
            className="form-control"
            name="retypePassword"
            placeholder=""
          />
        </div>
          </>
        }
        {
          selectedOption2 === 'otp' && <>
            <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
             Password 
          </label>
          <input
            type="password"
            {...register("password")}
            className="form-control"
            name="password"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          Retype password  
          </label>
          <input
            type="password"
            {...register("retypePassword")}
            className="form-control"
            name="retypePassword"
            placeholder=""
          />
        </div>
          </>
        }

        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Mobile Number <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("mobileNumber",{
                required: "Mobile Number is required",
              })}
            className="form-control"
            name="mobileNumber"
            placeholder=""
          />
           <Error errorName={errors.firstName} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Emergency Contact 
          </label>
          <input
            type="number"
            {...register("emergencyContact")}
            className="form-control"
            name="emergencyContact"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Date of Join</label>
          <Controller
            name="dateOfJoin"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("dateOfJoin") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("dateOfJoin", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label"> Date of Birth</label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("dateOfBirth") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("dateOfBirth", newValue)}
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

export default General;
