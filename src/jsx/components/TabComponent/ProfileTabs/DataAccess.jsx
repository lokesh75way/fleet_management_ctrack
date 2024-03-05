import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  branchOptions,
} from "../VehicleTabs/Options";
import { LanguageSelect } from "react-country-state-city";

const DataAccess = ({ handleNext, register, setValue}) => {
  const{control, getValues,formState: errors} = useForm()
  
  const [selectedOption, setSelectedOption] = useState(null);
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
            Language
          </label>
          <LanguageSelect
          onChange={(e) => {
          console.log(e);
        }}
        containerClassName='bg-white'
        inputClassName='border border-white'
        placeHolder="Select Language"
      />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            No of Channels
          </label>
          <input
            type="text"
            {...register("noOfChannel")}
            className="form-control"
            name="noOfChannel"
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
        <Button onClick={handleNext} style={{ width: "10%" }}> Next</Button>
      </div>
    </div>
  );
};

export default DataAccess;
