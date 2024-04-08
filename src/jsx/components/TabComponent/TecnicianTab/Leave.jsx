import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import Select from "react-select";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";
import {useParams} from 'react-router-dom'

const Leave = ({ handleNext, register, setValue, handleSubmit, onSubmit, control,errors,getValues }) => {

  const[tempValue,setTempValue] = useState()
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  const { id } = useParams();

  const userData = JSON.parse(localStorage.getItem("userJsonData"));

  const newData = userData.filter((data) => data.id === parseInt(id, 10));

  const [filteredUserData, setFilteredUserData] = useState(newData);

  const hanldeLeaveInput = (type, val) => {
    const prvs = getValues("leave");
    const newVal = prvs?.filter((v) => v.leaveType !== type) ?? [];
    newVal.push({
      leaveType: type,
      days: val,
    });
    setValue("leave", newVal);
  };

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Casual Leave
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Casual Leave"
            name="casualLeave"
            placeholder=""
            defaultValue="Casual Leave"
            disabled
          />
          <Error errorName={errors.casualLeave} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            No of Days
          </label>
          <CustomInput
            type="text"
            register={register}
            onInput={(e) => {
              hanldeLeaveInput("CASUAL", e.target.value);
            }}
            label="No Of Days"
            name="noOfDaysCL"
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].noOfDaysCL : ""
            }
          />
          <Error errorName={errors.noOfDaysCL} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Sick Leave
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Sick Leave"
            name="sickLeave"
            placeholder=""
            defaultValue="Sick Leave"
            disabled
          />
          <Error errorName={errors.sickLeave} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            No of Days
          </label>
          <CustomInput
            type="text"
            register={register}
            onInput={(e) => {
              hanldeLeaveInput("SICK", e.target.value);
            }}
            label="No Of DaysSL"
            name="noOfDays"
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].noOfDaysSL : ""
            }
          />
          <Error errorName={errors.noOfDaysSL} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Privilege Leave
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Privilege Leave"
            name="privilegeLeave"
            placeholder=""
            defaultValue="Privilege Leave"
            disabled
          />
          <Error errorName={errors.privilegeLeave} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            No of Days
          </label>
          <CustomInput
            type="text"
            register={register}
            onInput={(e) => {
              hanldeLeaveInput("PRIVILEGE", e.target.value);
            }}
            label="No Of Days"
            name="noOfDaysPL"
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].noOfDaysPL : ""
            }
          />
          <Error errorName={errors.noOfDaysPL} />
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

export default Leave;
