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
import CustomInput from "../../Input/CustomInput";

const UserSetting = ({ setValue, register, handleNext }) => {
  const { formState: errors, control } = useForm();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [isCheckCP, setIsCheckCP] = useState(false);
  const [isCheckESP, setIsCheckEsP] = useState(false);
  const [isImmobilizationChecked, setIsImmobilizationChecked] = useState(false);
  const [webAccessOption, setWebAccessOption] = useState("all");
  const [selectedBasedOn, setSelectedBasedOn] = useState(null);
  const [mobileAccessOptions, setMobileAccessOptions] = useState("all");
  const [driverConsideration, setdriverConsideration] = useState(false);

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
          <label className="form-label">Week Start Day</label>
          <Controller
            name="timeFormat"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>
                  setValue("weekStartDay", newValue.value)
                }
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

        {/* userStatus */}
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">User Status:</label>
          <Controller
            name="userStatus"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="userStatus"
                    onChange={() => setValue("User Status", "active")}
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    Active
                  </label>
                </div>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    onChange={() => setValue("User Status", "inactive")}
                    name="userStatus"
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    Inactive
                  </label>
                </div>
              </div>
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Show Default Filter Option :</label>
          <Controller
            name="showDefaultFilterOption"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="showDefaultFilterOption"
                    onChange={() => setValue("showDefaultFilterOption", "On")}
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    On
                  </label>
                </div>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    onChange={() => setValue("showDefaultFilterOption", "Off")}
                    name="showDefaultFilterOption"
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    Off
                  </label>
                </div>
              </div>
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Smooth Live Tracking :</label>
          <Controller
            name="smoothLiveTracking"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="smoothLiveTracking"
                    onChange={() => setValue("smoothLiveTracking")}
                  />
                </div>
              </div>
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Show Object Name On Report : </label>
          <Controller
            name="showObjectNameOnReport"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="showObjectNameOnReport"
                    onChange={() => setValue("showObjectNameOnReport")}
                  />
                </div>
              </div>
            )}
          />
        </div>
        {/* Api Access code */}
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">API Access Code :</label>
          <Controller
            name="apiAccessCode"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="row align-items-center">
                <div className="col-8">
                  <CustomInput
                    type="text"
                    required
                    register={register}
                    label="API Access Code"
                    name="apiAccessCode"
                    placeholder=""
                  />
                </div>
                <div className="col-4">
                  <button className="btn-primary" type="button">
                    Generate Access Code
                  </button>
                </div>
              </div>
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Immobilization : </label>
          <Controller
            name="immobilization"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="immobilization"
                    onChange={() => {
                      setValue("Immobilization");
                      setIsImmobilizationChecked(!isImmobilizationChecked);
                    }}
                  />
                </div>
              </div>
            )}
          />
        </div>

        {isImmobilizationChecked && (
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">
              Immobilization via parking mode :{" "}
            </label>
            <Controller
              name="immobilizationViaParkingMode"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <div className="basic-form" style={{ marginTop: ".5rem" }}>
                  <div className="form-check custom-checkbox form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="immobilizationViaParkingMode"
                      onChange={() => setValue("Immobilizationviaparkingmode")}
                    />
                  </div>
                </div>
              )}
            />
          </div>
        )}

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Door : </label>
          <Controller
            name="door"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="door"
                    onChange={() => setValue("door")}
                  />
                </div>
              </div>
            )}
          />
        </div>
        {/* Notification */}
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Notification :</label>
          <Controller
            name="notification"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="notification"
                    onChange={() => setValue("notification", "Web")}
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    Web
                  </label>
                </div>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={() => setValue("notification", "Mobile")}
                    name="notification"
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    Mobile
                  </label>
                </div>
              </div>
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Web Access:</label>
          <Controller
            name="webAccess"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="webAccess"
                    onChange={() => {
                      setValue("Web Access", "all");
                      setWebAccessOption("all");
                    }}
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    All
                  </label>
                </div>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    onChange={() => {
                      setValue("Web Access", "none");
                      setWebAccessOption("none");
                    }}
                    name="webAccess"
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    None
                  </label>
                </div>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    onChange={() => {
                      setValue("Web Access", "specific");
                      setWebAccessOption("specific");
                    }}
                    name="webAccess"
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    Specific
                  </label>
                </div>
              </div>
            )}
          />
        </div>

        {webAccessOption === "specific" && (
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">Web IP Address :</label>
            <Controller
              name="webIpAddress"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <div className="row align-items-center">
                  <textarea
                    className="form-control"
                    name="webIpAddress"
                    onChange={() => setValue("Web Ip Address")}
                    value={value}
                    placeholder="Use Comma(,) for multiple IP Address"
                    rows="2" // Set the number of rows as needed
                  />
                </div>
              )}
            />
          </div>
        )}

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Mobile Access:</label>
          <Controller
            name="mobileAccess"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="mobileAccess"
                    onChange={() => {
                      setValue("Mobile Access", "all");
                      setMobileAccessOptions("all");
                    }}
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    All
                  </label>
                </div>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    onChange={() => {
                      setValue("Mobile Access", "none");
                      setMobileAccessOptions("none");
                    }}
                    name="mobileAccess"
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    None
                  </label>
                </div>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    onChange={() => {
                      setValue("Mobile Access", "specific");
                      setMobileAccessOptions("specific");
                    }}
                    name="mobileAccess"
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    Specific
                  </label>
                </div>
              </div>
            )}
          />
        </div>

        {mobileAccessOptions === "specific" && (
          <React.Fragment>
            {/* Based On */}
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">Based On :</label>
              <Controller
                name="basedOn"
                control={control}
                render={({ field: { onChange, value, name, ref } }) => (
                  <div className="basic-form" style={{ marginTop: ".5rem" }}>
                    <div className="form-check custom-checkbox form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="basedOn"
                        onChange={() => {
                          setValue("Unique Id");
                          setSelectedBasedOn("Unique Id");
                        }}
                      />
                      <label
                        className="form-check-label"
                        style={{ marginBottom: "0" }}
                      >
                        Unique Id
                      </label>
                    </div>
                    <div className="form-check custom-checkbox form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        onChange={() => {
                          setValue("IP Address");
                          setSelectedBasedOn("IP Address");
                        }}
                        name="basedOn"
                      />
                      <label
                        className="form-check-label"
                        style={{ marginBottom: "0" }}
                      >
                        IP Address
                      </label>
                    </div>
                  </div>
                )}
              />
            </div>

            {selectedBasedOn === "Unique Id" && (
              <div className="col-xl-6 mb-3">
                <label className="form-label">
                  Mobile Unique Identification No :
                </label>
                <Controller
                  name="mobileUniqeIdentificationNumber"
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <div className="row align-items-center">
                      <textarea
                        className="form-control"
                        name="mobileUniqeIdentificationNumber"
                        onChange={() =>
                          setValue("mobileUniqeIdentificationNumber")
                        }
                        value={value}
                        placeholder="Use Comma(,) for multiple Mobile Unique ID Number"
                        rows="2"
                      />
                    </div>
                  )}
                />
              </div>
            )}

            {selectedBasedOn === "IP Address" && (
              <div className="col-xl-6 mb-3">
                <label className="form-label">Mobile IP Address :</label>
                <Controller
                  name="mobileIpAddress"
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <div className="row align-items-center">
                      <textarea
                        className="form-control"
                        name="mobileIpAddress"
                        onChange={() => setValue("mobileIpAddress")}
                        value={value}
                        placeholder="Use Comma(,) for multiple IP Address"
                        rows="2"
                      />
                    </div>
                  )}
                />
              </div>
            )}
          </React.Fragment>
        )}

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Driver Consideration Based On : </label>
          <Controller
            name="driverConsiderationBasedOn"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="driverConsiderationBasedOn"
                    onChange={() => {
                      setValue("Driver Consideration Based On", "RFID/Beacon");
                      setdriverConsideration(false);
                    }}
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    RFID / Beacon
                  </label>
                </div>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    onChange={() => {
                      setValue(
                        "Driver Consideration Based On",
                        "StepInwithRFID/Beacon-StepoutwithIgnition"
                      );

                      setdriverConsideration(true);
                    }}
                    name="driverConsiderationBasedOn"
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    Step In with RFID / Beacon - Step out with Ignition
                  </label>
                </div>
              </div>
            )}
          />
        </div>

        {driverConsideration && (
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Driver Stepout Tolerance :</label>
          <Controller
            name="driverStepOutTolerance"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="row align-items-center">
                <div className="col-8">
                  <CustomInput
                    type="number"
                    required
                    register={register}
                    label="API Access Code"
                    name="driverStepOutTolerance"
                    placeholder=""
                  />
                </div>
                <div className="col-4">(minutes)</div>
              </div>
            )}
          />
        </div>
        )}

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Mobile report view :</label>
          <Controller
            name="mobileReportView"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="mobileReportView"
                    onChange={() => setValue("Mobile report view", "Tabular")}
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    Tabular
                  </label>
                </div>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={() => setValue("Mobile report view", "Card")}
                    name="mobileReportView"
                  />
                  <label
                    className="form-check-label"
                    style={{ marginBottom: "0" }}
                  >
                    Card
                  </label>
                </div>
              </div>
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

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Object List Settings : </label>
          <Controller
            name="objectListSettings"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="objectListSettings"
                    onChange={() => setValue("objectListSettings")}
                  />
                </div>
              </div>
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Object Tooltip Settings : </label>
          <Controller
            name="objectTooltipSettings"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="objectTooltipSettings"
                    onChange={() => setValue("objectTooltipSettings")}
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
        <Button type="submit" onClick={handleSubmit(onSubmit)} style={{ width: "10%" }}>
          {" "}
          Next
        </Button>
      </div>
    </div>
  );
};

export default UserSetting;
