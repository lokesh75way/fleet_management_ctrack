import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { licenseToDriveOptions } from "../VehicleTabs/Options";

const AdditionalInfo = ({ setValue, register, handleNext }) => {
  const { formState: errors, control, getValues } = useForm();
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
        <div className="col-xl-6 mb-3 ">
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
          <label className="form-label">Age</label>
          <input
            type="text"
            {...register("age")}
            className="form-control"
            name="age"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
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
        <div className="col-xl-6 mb-3 ">
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
          <label className="form-label">Driving Experience Since</label>
          <input
            type="text"
            {...register("drivingExperienceSince")}
            className="form-control"
            name="drivingExperienceSince"
            placeholder=""
          />
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
                <input
                  type="number"
                  {...register("licenseNumber")}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="licenseNumber"
                  placeholder=""
                />
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
            </div>
            <div className="col-xl-6 mb-3 ">
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
            <div className="col-xl-6 mb-3 ">
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
          <input
            type="text"
            {...register("lifeInsuranceNumber")}
            className="form-control"
            name="lifeInsuranceNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
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
          <input
            type="text"
            {...register("mediclaimNumber")}
            className="form-control"
            name="mediclaimNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
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
        <Button onClick={handleNext} style={{ width: "10%" }}>
          {" "}
          Next
        </Button>
      </div>
    </div>
  );
};

export default AdditionalInfo;