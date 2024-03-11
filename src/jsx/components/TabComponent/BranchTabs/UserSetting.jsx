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
  preferredCurrencyUnitOptions,
  unitOfFuelOptions,
  fuelEconomyScalingOptions,
} from "../VehicleTabs/Options";

const UserSetting = ({ setValue, handleSubmit, onSubmit, errors, control }) => {
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
          <label className="form-label">Preferred Currency Unit</label>
          <Controller
            name="preferredCurrencyUnit"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>
                  setValue("preferredCurrencyUnit", newValue.value)
                }
                options={preferredCurrencyUnitOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={preferredCurrencyUnitOptions[0]}
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
          <label className="form-label">Fuel Economy Scaling</label>
          <Controller
            name="fuelEconomyScaling"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>
                  setValue("fuelEconomyScaling", newValue.value)
                }
                options={fuelEconomyScalingOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={fuelEconomyScalingOptions[0]}
              />
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Upload Logo : </label>
          <Controller
            name="uploadLogo"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="uploadLogo"
                    onChange={() => setValue("uploadLogo")}
                  />
                </div>
              </div>
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
