import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import Select from "react-select";
import Error from "../../Error/Error";
import { leaveTimeOptions } from "../VehicleTabs/Options";
import CustomInput from "../../Input/CustomInput";

const Leave = ({ handleNext, register, setValue, handleSubmit, onSubmit, control,errors,getValues }) => {

  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const[tempValue,setTempValue] = useState()
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
            Leave Time 
          </label>
          <Controller
            name="leaveTime"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {setTempValue(newValue.value);setValue("leaveTime", newValue.value)}}
                options={leaveTimeOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={leaveTimeOptions[0]}
              />
            )}
          />
          {!getValues('leaveTime') &&<Error errorName={errors.leaveTime} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            No of Days
          </label>
          <CustomInput
            type="text"
            register={register}
            label="No Of Days"
            name="noOfDays"
            placeholder=""
          />
          <Error errorName={errors.noOfDays} />
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

export default Leave;
