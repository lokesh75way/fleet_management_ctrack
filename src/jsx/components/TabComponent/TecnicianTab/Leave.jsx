import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import Select from "react-select";
import Error from "../../Error/Error";
import { leaveTimeOptions } from "../VehicleTabs/Options";

const Leave = ({ handleNext, register, setValue }) => {
  const { control, getValues, formState: errors } = useForm();

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setValue("fuelSensor", e.target.value);
  };
  const handleChange2 = (e) => {
    setSelectedOption2(e.target.value);
    setValue("verificationVia", e.target.value);
  };
  const handleChange3 = (e) => {
    setSelectedOption3(e.target.value);
    setValue("verificationVia", e.target.value);
  };
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
      <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Leave Time 
          </label>
          <Controller
            name="leaveTime"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("leaveTime", newValue.value)}
                options={leaveTimeOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={leaveTimeOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            No of Days
          </label>
          <input
            type="text"
            {...register("noOfDays")}
            className="form-control"
            name="noOfDays"
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
        <Button onClick={handleNext} style={{ width: "10%" }}>
          {" "}
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Leave;
