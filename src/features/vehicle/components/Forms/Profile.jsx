import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import Error from "@/components/Error/Error";
import "@/assets/scss/pages/_driver-tracking.scss";
import {
  permitOptions,
  fuelTypeOptions,
  distanceQuantitySelectOptions,
  durationSelectOptions,
} from "@/constants/options";
import CustomInput from "@/components/Input/CustomInput";

const Profile = ({
  register,
  setValue,
  errors,
  handleSubmit,
  onSubmit,
  control,
  getValues,
}) => {
  const [isCheckedDBFC, setIsCheckedDBFC] = useState(false);
  const [isCheckedDBFC2, setIsCheckedDBFC2] = useState(false);

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };

  const { t } = useTranslation();

  return (
    <div className="p-4">
      <div className="row" style={{ width: "80%" }}>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("vehicleCategory")}
            <span className="text-danger">*</span>
          </label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="optradioCustom1"
                onChange={() => {
                  setValue("vehicleCategory", "MOVABLE");
                }}
                checked={getValues("vehicleCategory") === "MOVABLE"}
              />
              <label className="form-check-label" style={{ marginBottom: "0" }}>
                {t("movable")}
              </label>
            </div>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                onChange={() => {
                  setValue("vehicleCategory", "IMMOVABLE");
                }}
                name="optradioCustom1"
                checked={getValues("vehicleCategory") === "IMMOVABLE"}
              />
              <label className="form-check-label" style={{ marginBottom: "0" }}>
                {t("immovable")}
              </label>
            </div>
          </div>

          <Error errorName={errors.vehicleCategory} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("DVIRTemplate")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="DVIR Plate"
            name="dvirTemplate"
            placeholder=""
          />
          <Error errorName={errors.dvirTemplate} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("purchaseAmount")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Purchase Amount"
            name="purchaseAmount"
            placeholder=""
          />
          <Error errorName={errors.purchaseAmount} />
        </div>
        <div className="col-xl-3 mb-3 d-flex flex-column">
          <label className="form-label">{t("manufactureDate")}</label>
          <Controller
            name="manufacturerDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={
                  getValues("manufacturerDate")
                    ? new Date(getValues("manufacturerDate"))
                    : new Date()
                }
                className="form-control customDateHeight"
                onChange={(newValue) => setValue("manufacturerDate", newValue)}
              />
            )}
          />
        </div>
        {/* <div className="col-xl-3 mb-3 d-flex flex-column">
          <label className="form-label">{t('purchaseDate')}</label>
          <Controller
            name="purchaseDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("purchaseDate")? new Date(getValues("purchaseDate")) : new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) => setValue("purchaseDate", newValue)}
              />
            )}
          />
        </div> */}
        {/* <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t('weightCapacity')}</label>
          <CustomInput
            type="text"
            register={register}
            label="Weight Capacity"
            name="weightCapacity"
            placeholder=""
          />
          <Error errorName={errors.weightCapacity} />
        </div> */}
        {/* <div className="col-xl-3 mb-3 d-flex flex-column">
          <label className="form-label">{t('GPSInstallationDate')}</label>
          <Controller
            name="gpsInstallationDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("gpsInstallationDate") ? new Date(getValues("gpsInstallationDate")) : new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) =>
                  setValue("gpsInstallationDate", newValue)
                }
              />
            )}
          />
        </div> */}
        {/* <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('GPSWarranty')}
          </label>
          <CustomInput
            type="number"
            register={register}
            label="GPS Warranty"
            name="gpsWarranty"
            placeholder=""
          />
          <Error errorName={errors.gpsWarranty} />
        </div> */}
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("companyAverage")}
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Company Average"
            name="companyAverage"
            placeholder=""
          />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("permit")}
            <span className="text-danger">*</span>
          </label>
          <Controller
            name="permit"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, rules, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setValue("permit", newValue.value);
                }}
                options={permitOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={permitOptions[0]}
                value={{
                  label: getValues("permit"),
                  value: getValues("permit"),
                }}
              />
            )}
          />
          <Error errorName={errors.permit} />
        </div>
        <div className="col-xl-3 mb-3 d-flex flex-column">
          <label className="form-label">{t("installationDate")}</label>
          <Controller
            name="installationDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={
                  getValues("installationDate")
                    ? new Date(getValues("installationDate"))
                    : new Date()
                }
                className="form-control customDateHeight"
                onChange={(newValue) => setValue("installationDate", newValue)}
              />
            )}
          />
        </div>

        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("fuelType")}
            <span className="text-danger">*</span>
          </label>
          <Controller
            name="fuelType"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setValue("fuelType", newValue.value);
                }}
                options={fuelTypeOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={fuelTypeOptions[0]}
                value={{
                  label: getValues("fuelType"),
                  value: getValues("fuelType"),
                }}
              />
            )}
          />
          <Error errorName={errors.fuelType} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("distanceBasedFuelConsumption")}
            <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsCheckedDBFC(!isCheckedDBFC)}
              className="form-check-input border border-2"
              checked={isCheckedDBFC}
            />
            <CustomInput
              type="number"
              register={register}
              label="Distance"
              style={{ width: "5rem", margin: " 0 .4rem" }}
              name="distanceBasedDistanceQuantity"
              placeholder=""
            />
            <span>{t("kilometer")}</span>
            {isCheckedDBFC && (
              <>
                <span style={{ paddingLeft: ".6rem" }}>/</span>
                <CustomInput
                  type="number"
                  register={register}
                  label="Distance Quantity"
                  style={{ width: "6rem", margin: " 0 1rem" }}
                  name="distanceBaseFuelConsumption"
                  placeholder=""
                />
                <Controller
                  name="distanceBaseFuelConsumptionUnit"
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      onChange={(newValue) =>
                        setValue(
                          "distanceBaseFuelConsumptionUnit",
                          newValue.value
                        )
                      }
                      options={distanceQuantitySelectOptions}
                      ref={ref}
                      name={name}
                      styles={customStyles}
                      defaultValue={distanceQuantitySelectOptions[0]}
                    />
                  )}
                />
              </>
            )}
          </div>
          <Error errorName={errors.distanceBasedDistanceQuantity} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("durationBasedFuelConsumption")}
            <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsCheckedDBFC2(!isCheckedDBFC2)}
              className="form-check-input border border-2"
              id="customCheckBox1"
              checked={isCheckedDBFC2}
            />
            <CustomInput
              type="number"
              register={register}
              label="Duration"
              style={{ width: "5rem", margin: " 0 1rem" }}
              name="durationBaseFuelConsumptionDurationQuanitty"
              placeholder=""
            />
            <Controller
              name="durationBaseFuelConsumptionDurationUnit"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  onChange={(newValue) =>
                    setValue(
                      "durationBaseFuelConsumptionDurationUnit",
                      newValue.value
                    )
                  }
                  options={durationSelectOptions}
                  ref={ref}
                  name={name}
                  styles={customStyles}
                  defaultValue={durationSelectOptions[0]}
                  value={{
                    label: getValues("durationBaseFuelConsumptionDurationUnit"),
                    value: getValues("durationBaseFuelConsumptionDurationUnit"),
                  }}
                />
              )}
            />
            {isCheckedDBFC2 && (
              <>
                <span style={{ paddingLeft: ".4rem", paddingRight: ".4rem" }}>
                  /
                </span>
                <CustomInput
                  type="number"
                  register={register}
                  label="Duration Quantity"
                  style={{ width: "6rem", margin: " 0 1rem" }}
                  name="durationBaseDistanceQuantity"
                  placeholder=""
                />
                <Controller
                  name="durationBaseFuelConsumptionUnit"
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      onChange={(newValue) =>
                        setValue(
                          "durationBaseFuelConsumptionUnit",
                          newValue.value
                        )
                      }
                      options={distanceQuantitySelectOptions}
                      ref={ref}
                      name={name}
                      styles={customStyles}
                      defaultValue={distanceQuantitySelectOptions[0]}
                      value={{
                        label: getValues("durationBaseFuelConsumptionUnit"),
                        value: getValues("durationBaseFuelConsumptionUnit"),
                      }}
                    />
                  )}
                />
              </>
            )}
          </div>
          <Error
            errorName={errors.durationBaseFuelConsumptionDurationQuanitty}
          />
        </div>

        <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t("consumptionTolerance")}</label>
          <div className="d-flex align-items-center">
            <CustomInput
              type="number"
              register={register}
              style={{ marginRight: ".5rem" }}
              name="consumptionTolerancePercent"
              placeholder=""
            />
            <span style={{ padding: " 1rem" }}>%</span>
          </div>
        </div>

        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("vinNumber")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            label="VIN Number"
            register={register}
            name="vinNumber_dupe"
            disabled
            placeholder=""
            value={getValues("vinNumber")}
          />
          <Error errorName={errors.vinNumber} />
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
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
