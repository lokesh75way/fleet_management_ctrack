import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import Select from 'react-select'

const AdditionalInfo = () => {
  const { register } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMultiple, setIsMultiple] = useState(false);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const customStyles = {
    control: base => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Date of Birth <span className="text-danger">*</span>
          </label>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Age <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("age", {
              required: "Age is required",
            })}
            className="form-control"
            name="age"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Date of Joining <span className="text-danger">*</span>
          </label>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Date of Leaving <span className="text-danger">*</span>
          </label>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          Driving Experience Since <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("drivingExperienceSince", {
              required: "Driving Experience Since is required",
            })}
            className="form-control"
            name="drivingExperienceSince"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            License Available<span className="text-danger">*</span>
          </label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="customRadioBox987"
                name="optradioCustom1"
                onClick={() => setIsMultiple(!isMultiple)}
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
        {isMultiple && (
          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                License Number <span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("licenseNumber", {
                    required: "License Number is required",
                  })}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="licenseNumber"
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          License to Drive <span className="text-danger">*</span>
          </label>
          <Select
            defaultValue={selectedOption}
            styles={customStyles}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
              License Issued Date <span className="text-danger">*</span>
              </label>
              <DatePicker
                className="form-control"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />  
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
              License Expiry Date <span className="text-danger">*</span>
              </label>
              <DatePicker
                className="form-control"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </>
        )}
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Life Insurance Number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("lifeInsuranceNumber", {
              required: "Life Insurance Number is required",
            })}
            className="form-control"
            name="lifeInsuranceNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Life Insurance Expiry Date <span className="text-danger">*</span>
          </label>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Mediclaim Number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("mediclaimNumber", {
              required: "mediclaim Number Number is required",
            })}
            className="form-control"
            name="mediclaimNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Mediclaim Expiry Date <span className="text-danger">*</span>
          </label>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Active <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input"
              id="customCheckBox1"
              required
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
        <Button style={{ width: "10%" }}> Next</Button>
      </div>
    </div>
  );
};

export default AdditionalInfo;
