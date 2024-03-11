import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { licenseToDriveOptions } from "../VehicleTabs/Options";
import CustomInput from "../../Input/CustomInput";
import Error from "../../Error/Error";
import { useParams } from "react-router-dom";

const AdditionalInfo = ({ setValue, register, handleSubmit, onSubmit, getValues, control,errors }) => {

  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("userJsonData"));
  const newData = userData.filter((data) => data.id === parseInt(id, 10));
  const [filteredUserData, setFilteredUserData] = useState(newData);

  const [selectedOption, setSelectedOption] = useState(null);
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setValue("licenseAvailable", e.target.value);
  };
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">Date of Birth</label>
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
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Age<span className="text-danger">*</span></label>
          <CustomInput
            type="text"
            register={register}
            label="Age"
            name="age"
            placeholder=""
            defaultValue={filteredUserData[0].age}
          />
          <Error errorName={errors.age} />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">Date of Joining</label>
          <Controller
            name="dateOfJoining"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("dateOfJoining") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("dateOfJoining", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">Date of Leaving</label>
          <Controller
            name="dateOfLeaving"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("dateOfLeaving") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("dateOfLeaving", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Driving Experience Since<span className="text-danger">*</span></label>
          <CustomInput
            type="text"
            register={register}
            label="Driving Experience Since"
            name="drivingExperienceSince"
            placeholder=""
            defaultValue={filteredUserData[0].drivingExperienceSince}
          />
          <Error errorName={errors.drivingExperienceSince} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">License Available</label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="customRadioBox987"
                name="optradioCustom1"
                value="yes"
                checked={selectedOption === "yes"}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="customRadioBox987"
                style={{ marginBottom: "0" }}
              >
                Yes
              </label>
            </div>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="customRadioBox988"
                value="no"
                checked={selectedOption === "no"}
                onChange={handleChange}
                name="optradioCustom1"
              />
              <label
                className="form-check-label"
                htmlFor="customRadioBox988"
                style={{ marginBottom: "0" }}
              >
                No
              </label>
            </div>
          </div>
        </div>
        {selectedOption === "yes" && (
          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">License Number</label>
              <div className="d-flex align-items-center">
                <CustomInput
                  type="number"
                  register={register}
                  label="License Number"
                  style={{ marginRight: ".5rem" }}
                  name="licenseNumber"
                  placeholder=""
                />
                <Error errorName={errors.licenseNumber} />
              </div>
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">License to Drive</label>
              <Controller
                name="licenseToDrive"
                control={control}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Select
                    onChange={(newValue) =>
                      setValue("licenseToDrive", newValue.value)
                    }
                    options={licenseToDriveOptions}
                    ref={ref}
                    name={name}
                    styles={customStyles}
                    defaultValue={licenseToDriveOptions[0]}
                  />
                  
                )}
                />
                { !getValues('licenseToDrive') && <Error errorName={errors.licenseToDrive} />}
            </div>
            <div className="col-xl-6 mb-3 d-flex flex-column">
              <label className="form-label">License Issued Date</label>
              <Controller
                name="licenseIssueDate"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                    selected={getValues("licenseIssueDate") || new Date()}
                    className="form-control"
                    onChange={(newValue) =>
                      setValue("licenseIssueDate", newValue)
                    }
                  />
                )}
              />
            </div>
            <div className="col-xl-6 mb-3 d-flex flex-column">
              <label className="form-label">License Expiry Date</label>
              <Controller
                name="licenseExpiryDate"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                    selected={getValues("licenseExpiryDate") || new Date()}
                    className="form-control"
                    onChange={(newValue) =>
                      setValue("licenseExpiryDate", newValue)
                    }
                  />
                )}
              />
            </div>
          </>
        )}
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Life Insurance Number</label>
          <CustomInput
            type="text"
            register={register}
            label="Life Insurance Number"
            name="lifeInsuranceNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">Life Insurance Expiry Date</label>
          <Controller
                name="lifeInsuranceExpiryDtae"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                    selected={getValues("lifeInsuranceExpiryDtae") || new Date()}
                    className="form-control"
                    onChange={(newValue) =>
                      setValue("lifeInsuranceExpiryDtae", newValue)
                    }
                  />
                )}
              />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Mediclaim Number</label>
          <CustomInput
            type="text"
            register={register}
            label="Mediclaim Number"
            name="mediclaimNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">Mediclaim Expiry Date</label>
          <Controller
                name="mediclaimExpiryDate"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                    selected={getValues("mediclaimExpiryDate") || new Date()}
                    className="form-control"
                    onChange={(newValue) =>
                      setValue("mediclaimExpiryDate", newValue)
                    }
                  />
                )}
            />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Active</label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input"
              id="customCheckBox1"
            />
          </div>
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
        <Button type="submit" onClick={handleSubmit(onSubmit)} style={{ width: "10%" }}>
          {" "}
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AdditionalInfo;
