import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import TimezoneSelect from 'react-timezone-select'
import { currencyOptions } from "../VehicleTabs/Options";
import { dayOptions } from "../VehicleTabs/Options";
import { statusOptions } from "../VehicleTabs/Options";
import { languageOptions } from "../VehicleTabs/Options";

import Error from "../../Error/Error";
import {
  timeFormatOptions,
  dateFormatOptions,
  weekStartDayOptions,
  unitOfDistanceOptions,
  preferredCurrencyUnitOptions,
  unitOfFuelOptions,
  fuelEconomyScalingOptions,
} from "../VehicleTabs/Options";

const UserSetting = ({ setValue, handleSubmit, onSubmit,errors, control }) => {

  const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

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
          <label className="form-label">Date Format</label>
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
          <Error errorName={errors.dateFormat} />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Time Format</label>
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
          <label className="form-label">Unit of Distance</label>
          <Controller
            name="fuelEconomyScaling"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>
                  setValue("unitOfDistance", newValue.value)
                }
                options={unitOfDistanceOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={fuelEconomyScalingOptions[0]}
              />
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Unit of Fuel</label>
          <Controller
            name="unitOfFuel"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("unitOfFuel", newValue.value)}
                options={unitOfFuelOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={unitOfFuelOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Language</label>
          <Controller
            name="language"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("language", newValue.value)}
                options={languageOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={languageOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Status</label>
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("status", newValue.value)}
                options={statusOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={statusOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Work Start Day</label>
          <Controller
            name="worksstartday"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("worksstartday", newValue.value)}
                options={dayOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={dayOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Currency</label>
          <Controller
            name="currency"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("currency", newValue.value)}
                options={currencyOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={currencyOptions[0]}
              />
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
        <label className="form-label">Time Zone </label>
          <Controller
            name="timezone"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <TimezoneSelect
                // onChange={(newValue) => setValue("unitOfFuel", newValue.value)}
                onChange={setSelectedTimezone}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={unitOfFuelOptions[0]}
                value={selectedTimezone}
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

export default UserSetting;
