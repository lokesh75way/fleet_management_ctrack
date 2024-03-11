import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";

const General = ({ register, setValue, control, errors,getValues, handleSubmit, onSubmit}) => {
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [tempValue, setTempValue] = useState();
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

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            First Name <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="First Name"
            name="firstName"
            placeholder=""
          />
          <Error errorName={errors.firstName} />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Middle Name 
          </label>
          <CustomInput
            type="text"
            register={register}
            label="middleName"
            name="middleName"
            placeholder=""
          />
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
            placeholder=""
          />
          <Error errorName={errors.lastName} />
        </div>

        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Technician Number <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Technician Number"
            name="technicianNumber"
            placeholder=""
          />
          <Error errorName={errors.technicianNumber} />
        </div>

        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Email<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            label="Email"
            name="email"
            placeholder=""
          />
          <Error errorName={errors.email} />
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
          {!getValues('gender') && <Error errorName={errors.gender} />}
        </div>

        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Mobile Number <span className="text-danger">*</span>
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
            Emergency Contact <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Emergency Contact"
            name="emergencyContact"
            placeholder=""
          />
          <Error errorName={errors.emergencyContact} />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">Date of Join<span className="text-danger">*</span></label>
          <Controller
            name="dateOfJoin"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("dateOfJoin") || new Date()}
                className="form-control"
                onChange={(newValue) => {setTempValue(newValue); setValue("dateOfJoin", newValue)}}
              />
            )}
          />
          {!getValues('dateOfJoin') && <Error errorName={errors.dateOfJoin} />}
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label"> Date of Birth<span className="text-danger">*</span></label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("dateOfBirth") || new Date()}
                className="form-control"
                onChange={(newValue) => {setTempValue(newValue); setValue("dateOfBirth", newValue)}}
              />
            )}
          />
          {!getValues('dateOfBirth') && <Error errorName={errors.dateOfBirth} />}
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

export default General;
