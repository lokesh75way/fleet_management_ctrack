import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  timeFormatOptions,
  dateFormatOptions,
  weekStartDayOptions,
  unitOfDistanceOptions,
} from "../VehicleTabs/Options";

const UserSetting = ({ setValue, register, handleNext }) => {
  const { formState: errors, control } = useForm();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [isCheckCP, setIsCheckCP] = useState(false);
  const [isCheckESP, setIsCheckEsP] = useState(false);

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
            Date Format
          </label>
          <Controller
            name="dateFormat"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("dateFormat", newValue.value)}
                options={dateFormatOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={dateFormatOptions[0]}
              />
            )}
          />
        </div>
      <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Time Format
          </label>
          <Controller
            name="timeFormat"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("timeFormat", newValue.value)}
                options={timeFormatOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={timeFormatOptions[0]}
              />
            )}
          />
        </div>
      <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          Week Start Day
          </label>
          <Controller
            name="timeFormat"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("weekStartDay", newValue.value)}
                options={weekStartDayOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={weekStartDayOptions[0]}
              />
            )}
          />
        </div>
      <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          Unit of Distance
          </label>
          <Controller
            name="unitOfDistance"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("unitOfDistance", newValue.value)}
                options={unitOfDistanceOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={unitOfDistanceOptions[0]}
              />
            )}
          />
        </div>
        
        {/* <div className="col-xl-6 mb-3">
          <label className="form-label">Change Password</label>
          <div className="form-check custom-checkbox mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="customCheckBox1"
              onClick={() => setIsCheckCP(!isCheckCP)}
            />
          </div>
        </div>
        {isCheckCP && (
          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Old Password<span className="text-danger">*</span>
              </label>
              <input
                type="password"
                {...register("oldPassword")}
                className="form-control"
                name="oldPassword"
                placeholder=""
              />
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                New Password<span className="text-danger">*</span>
              </label>
              <input
                type="password"
                {...register("newPassword")}
                className="form-control"
                name="newPassword"
                placeholder=""
              />
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Retype Password<span className="text-danger">*</span>
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
        )} */}
        
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

export default UserSetting;