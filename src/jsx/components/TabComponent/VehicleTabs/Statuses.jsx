import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  deviceTypeOptions,
  copyFromOptions,
  distanceCounterOptions,
  unitOfDistanceOptions,
  speedDetectionOptions,
} from "./Options";
import AsyncSelect from "react-select/async";
import CustomInput from "../../Input/CustomInput";
import DummyData from "../../../../users.json";
import useStorage from "../../../../hooks/useStorage";
import { useParams } from "react-router-dom";
import { getCompany } from "../../../../services/api/CompanyServices";
import { getGroups } from "../../../../services/api/BusinessGroup";
import { allCompanyOptions, businessGroupOptions } from "../../ReusableApi/Api";
import { useTranslation } from "react-i18next";

import CompanyDropdown from "../../CompanyDropdown";
import BranchDropdown from "../../BranchDropdown";
import GroupDropdown from "../../GroupDropdown";
import ParentBranchDropdown from "../../ParentBranch";
import CustomCheckbox from "./CustomCheckbox";

const General = ({
  register,
  setValue,
  getValues,
  errors,
  control,
  handleSubmit,
  onSubmit,
  formData,
  watch,
}) => {
  const [speedAlertUnit, setSpeedAlertUnit] = useState("km/h"); // Default unit is km/h
  const [selectedSensorOption, setSelectedSensorOption] = useState("");

  const isIllegalMovementChecked = watch("illegalMovement");
  const isExcessiveChecked = watch("excessiveIdling");
  const isCriticalSpeedAlertEnabled = watch("criticalSpeedAlert");

  const handleSensorOptionChange = (event) => {
    setSelectedSensorOption(event.target.value);
  };

  const handleSpeedAlertUnitChange = (event) => {
    setSpeedAlertUnit(event.target.value);
  };

  const { id } = useParams();

  const { t } = useTranslation();

  return (
    <div className="p-4 relative">
      <div className="d-flex justify-content-between" style={{ width: "100%" }}>
        <div className="row" style={{ width: "50%" }}>
          {/* Alarms Section */}
          <div className="col-xl-12 mb-3">
            <div className="border-container position-relative p-4 row">
              <div className="heading-container d-flex align-items-center position-absolute">
                <h5>{t("Alarms")}</h5>
              </div>
              <CustomCheckbox
                register={register}
                name="boxTamper"
                label={t("Box Tamper")}
              />
              <CustomCheckbox
                register={register}
                name="batteryTamper"
                label={t("Battery Tamper")}
              />
              <CustomCheckbox
                register={register}
                name="internalBatteryLow"
                label={t("Internal Battery Low")}
              />
              <CustomCheckbox
                register={register}
                name="detectGSMJamming"
                label={t("Detect GSM Jamming")}
              />

              <CustomCheckbox
                register={register}
                name="panic"
                label={t("Panic")}
              />
              <div className="border-container position-relative p-3 mt-5 row">
                <div className="heading-container d-flex align-items-center position-absolute">
                  <CustomCheckbox
                    register={register}
                    name="illegalMovement"
                    label={t("Illegal Movement")}
                  />
                </div>
                <div className="mt-3">
                  <div className="form-check">
                    <input
                      type="radio"
                      name="sensorOption"
                      id="useAccelerometer"
                      value="Accelerometer"
                      className="form-check-input"
                      disabled={!isIllegalMovementChecked}
                      checked={selectedSensorOption === "Accelerometer"}
                      onChange={handleSensorOptionChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="useAccelerometer"
                    >
                      Use Accelerometer
                    </label>
                  </div>
                </div>
                <div className="border-container position-relative p-4 mt-4 row">
                  <div className="heading-container d-flex align-items-center position-absolute">
                    <input
                      type="radio"
                      name="sensorOption"
                      id="autoOption"
                      value="autoGeofence"
                      className="form-check-input"
                      disabled={!isIllegalMovementChecked}
                      checked={selectedSensorOption === "autoGeofence"}
                      onChange={handleSensorOptionChange}
                    />
                    <label className="form-check-label" htmlFor="autoOption">
                      Use auto Geofence
                    </label>
                  </div>

                  {/* Input for Activate after (seconds) */}
                  <div className="mb-3 w-25">
                    <label className="form-label">
                      {t("Activate after (seconds)")}
                    </label>
                    <CustomInput
                      type="number"
                      register={register}
                      name="useGeofenceActiveAfter"
                      defaultValue={getValues("useGeofenceActiveAfter")}
                      disabled={
                        !isIllegalMovementChecked ||
                        selectedSensorOption !== "autoGeofence"
                      }
                    />
                    <Error errorName={errors.useGeofenceActiveAfter} />
                  </div>

                  {/* New input for Radius (meters) */}
                  <div className="mb-3 w-25">
                    <label className="form-label">{t("Radius (meters)")}</label>
                    <CustomInput
                      type="number"
                      register={register}
                      name="geofenceRadius"
                      defaultValue={getValues("geofenceRadius")}
                      disabled={
                        !isIllegalMovementChecked ||
                        selectedSensorOption !== "autoGeofence"
                      }
                    />
                    <Error errorName={errors.geofenceRadius} />
                  </div>

                  {/* Heading for Deactivate with */}
                  <div className="mb-3">
                    <h5>{t("Deactivate with")}</h5>

                    {/* Radio button for Power Voltage */}
                    <div className="form-check">
                      <input
                        type="radio"
                        name="deactivateOption"
                        id="powerVoltageOption"
                        value="Power Voltage"
                        className="form-check-input"
                        disabled={
                          !isIllegalMovementChecked ||
                          selectedSensorOption !== "autoGeofence"
                        }
                        // checked={selectedDeactivateOption === 'Power Voltage'}
                        // onChange={() => handleDeactivateOptionChange('Power Voltage')}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="powerVoltageOption"
                      >
                        Power Voltage
                      </label>
                    </div>

                    {/* Radio button for Engine RPM */}
                    <div className="form-check">
                      <input
                        type="radio"
                        name="deactivateOption"
                        id="engineRpmOption"
                        value="Engine RPM"
                        className="form-check-input"
                        disabled={
                          !isIllegalMovementChecked ||
                          selectedSensorOption !== "autoGeofence"
                        }
                        // checked={selectedDeactivateOption === 'Engine RPM'}
                        // onChange={() => handleDeactivateOptionChange('Engine RPM')}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="engineRpmOption"
                      >
                        Engine RPM
                      </label>
                    </div>

                    {/* Radio button for Digital Input */}
                    <div className="form-check">
                      <input
                        type="radio"
                        name="deactivateOption"
                        id="digitalInputOption"
                        value="Digital Input"
                        className="form-check-input"
                        disabled={
                          !isIllegalMovementChecked ||
                          selectedSensorOption !== "autoGeofence"
                        }
                        // checked={selectedDeactivateOption === 'Digital Input'}
                        // onChange={() => handleDeactivateOptionChange('Digital Input')}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="digitalInputOption"
                      >
                        Digital Input
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-container position-relative p-4 mt-5 row">
                <div className="heading-container d-flex align-items-center position-absolute">
                  <CustomCheckbox
                    register={register}
                    name="excessiveIdling"
                    label={t("Excessive Idling")}
                  />
                </div>
                {/* Input for Activate after (seconds) */}
                <div className="mb-3">
                  <label className="form-label">
                    {t("Activate after (seconds)")}
                  </label>
                  <CustomInput
                    type="number"
                    register={register}
                    name="excessiveIdlingActivateAfter"
                    defaultValue={getValues("excessiveIdlingActivateAfter")}
                    disabled={!isExcessiveChecked}
                  />
                  <Error errorName={errors.excessiveIdlingActivateAfter} />
                </div>
              </div>
            </div>
          </div>
          {/* Geo Zones Section */}
          <div className="col-xl-12 mb-3">
            <div className="border-container position-relative p-4 row">
              <div className="heading-container d-flex align-items-center position-absolute">
                <h5>{t("Geo Zones")}</h5>
              </div>
              <CustomCheckbox
                register={register}
                name="enableSuppressedGeoZones"
                label={t("Enable Suppressed Geo Zones")}
              />
            </div>
          </div>
        </div>

        <div className="row" style={{ width: "50%" }}>
          {/* Speed Violations Section */}
          <div className="col-xl-12 mb-3">
            <div className="border-container position-relative p-4 row">
              <div className="heading-container d-flex align-items-center position-absolute">
                <h5>{t("Speed Violations")}</h5>
              </div>
              <CustomCheckbox
                register={register}
                name="speedViolations"
                label={t("Speed Violations")}
              />
              <div className="mb-3">
                <label className="form-label">{t("Limit (km/h)")}</label>
                <CustomInput
                  type="number"
                  register={register}
                  name="speedViolationsLimit"
                  defaultValue={getValues("speedViolationsLimit")}
                />
                <Error errorName={errors.speedViolationsLimit} />
              </div>
              <CustomCheckbox
                register={register}
                name="criticalSpeedAlert"
                label={t("Critical Speed Alert")}
              />
              <div className="mb-3">
                <div className="d-flex gap-5">
                  <div className="form-check">
                    <input
                      type="radio"
                      name="speedAlertUnit"
                      id="speedAlertKmH"
                      value="km/h"
                      className="form-check-input"
                      checked={speedAlertUnit === "km/h"}
                      onChange={handleSpeedAlertUnitChange}
                    />
                    <label className="form-check-label" htmlFor="speedAlertKmH">
                      km/h
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="speedAlertUnit"
                      id="speedAlertPercent"
                      value="%"
                      className="form-check-input"
                      checked={speedAlertUnit === "%"}
                      onChange={handleSpeedAlertUnitChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="speedAlertPercent"
                    >
                      %
                    </label>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="form-label">
                    {t(`Critical Speed Limit (${speedAlertUnit})`)}
                  </label>
                  <CustomInput
                    type="number"
                    register={register}
                    name="criticalSpeedLimit"
                    defaultValue={getValues("criticalSpeedLimit")}
                    disabled={!isCriticalSpeedAlertEnabled}
                  />
                  <Error errorName={errors.criticalSpeedLimit} />
                </div>
              </div>
              <CustomCheckbox
                register={register}
                name="generateRoadTypeSpeedViolations"
                label={t("Generate Road Type Speed Violations")}
              />
            </div>
          </div>
          {/* Accident Detection Section */}
          <div className="col-xl-12 mb-3">
            <div className="border-container position-relative p-4 row">
              <div className="heading-container d-flex align-items-center position-absolute">
                <h5>{t("Accident Detection")}</h5>
              </div>
              <CustomCheckbox
                register={register}
                name="rollOver"
                label={t("Roll Over")}
              />
              <CustomCheckbox
                register={register}
                name="incident"
                label={t("Incident (milli-g)")}
              />

              <div className="mb-3">
                <CustomInput
                  type="number"
                  register={register}
                  name="incidentThreshold"
                  defaultValue={getValues("incidentThreshold")}
                />
                <Error errorName={errors.incidentThreshold} />
              </div>

              <CustomCheckbox
                register={register}
                name="highGForce"
                label={t("High G-force (milli-g)")}
              />

              <div className="mb-3">
                <CustomInput
                  type="number"
                  register={register}
                  name="highGForceThreshold"
                  defaultValue={getValues("highGForceThreshold")}
                />
                <Error errorName={errors.highGForceThreshold} />
              </div>

              <CustomCheckbox
                register={register}
                name="severeGForce"
                label={t("Severe G-force (milli-g)")}
              />

              <div className="mb-3">
                <CustomInput
                  type="number"
                  register={register}
                  name="severeGForceThreshold"
                  defaultValue={getValues("severeGForceThreshold")}
                />
                <Error errorName={errors.severeGForceThreshold} />
              </div>
            </div>
          </div>

          {/* Harsh Driving Section */}
          <div className="col-xl-12 mb-3">
            <div className="border-container position-relative p-4 row">
              <div className="heading-container d-flex align-items-center position-absolute">
                <h5>{t("Harsh Driving")}</h5>
              </div>
              <CustomCheckbox
                register={register}
                name="harshAcceleration"
                label={t("Harsh Acceleration (m/s²)")}
              />
              <div className="mb-3">
                <CustomInput
                  type="number"
                  register={register}
                  name="harshAcceleration"
                  defaultValue={getValues("harshAcceleration")}
                />
                <Error errorName={errors.harshAcceleration} />
              </div>
              <CustomCheckbox
                register={register}
                name="harshBraking"
                label={t("Harsh Braking (m/s²)")}
              />
              <div className="mb-3">
                <CustomInput
                  type="number"
                  register={register}
                  name="harshBraking"
                  defaultValue={getValues("harshBraking")}
                />
                <Error errorName={errors.harshBraking} />
              </div>
              <CustomCheckbox
                register={register}
                name="harshCornering"
                label={t("Harsh Cornering (m/s²)")}
              />
              <div className="mb-3">
                <CustomInput
                  type="number"
                  register={register}
                  name="harshCornering"
                  defaultValue={getValues("harshCornering")}
                />
                <Error errorName={errors.harshCornering} />
              </div>
            </div>
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
        <Button type="submit" style={{ width: "10%" }}>
          {t("Submit")}
        </Button>
      </div>
    </div>
  );
};

export default General;
