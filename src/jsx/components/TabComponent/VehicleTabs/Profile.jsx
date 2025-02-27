import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-bootstrap";
import Error from "../../../../components/Error/Error";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import "@/assets/scss/pages/_driver-tracking.scss";
import {
  options,
  permitOptions,
  fuelTypeOptions,
  distanceQuantitySelectOptions,
  durationSelectOptions,
  durationCostSelectOptions,
} from "../../../../constants/options";
import CustomInput from "../../../../components/Input/CustomInput";
import { useTranslation } from "react-i18next";
import Spinner from "../../Spinner";

const Profile = ({
  register,
  setValue,
  errors,
  handleSubmit,
  onSubmit,
  control,
  getValues,
  formData,
  isLoading,
}) => {
  const id = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCheckedDBFC, setIsCheckedDBFC] = useState(false);
  const [isCheckedDBFC2, setIsCheckedDBFC2] = useState(false);
  const [isCheckedCBO, setIsCheckedCBO] = useState(false);
  const [isCheckedCBO2, setIsCheckedCBO2] = useState(false);
  const [isCheckedWC, setIsCheckedWC] = useState(false);
  const [isCheckedGS, setIsCheckedGS] = useState(false);
  const [tempValue, setTempValue] = useState();

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setValue("fuelSensor", e.target.value);
  };

  const { t } = useTranslation();

  useEffect(() => {
    if (formData && id) {
      // setValue("businessGroupId",formData?.[0].companyId?.businessGroupId?._id)
      // setValue("companyName",formData.companyId?.companyName)
      // setValue("userName", formData.userName)
      // setValue("email",formData.email)
      // setValue("mobileNumber",formData.mobileNumber)
      // setValue("helpDeskEmail",formData.companyId?.helpDeskEmail)
      // setValue("whatsappContactNumber",formData.companyId?.whatsappContactNumber)
      // setValue("helpDeskTelephoneNumber",formData.companyId?.helpDeskTelephoneNumber)
      // setValue("street1",formData.companyId?.street1)
      // setValue("street2",formData.companyId?.street2)
      // setValue("contactPerson",formData.companyId?.contactPerson)
      // setValue("faxNumber",formData.companyId?.faxNumber)
      // setValue("zipCode",formData.companyId?.zipCode)
      // setValue("city",formData.companyId?.city)
      // setValue("storageCapacity",formData.companyId?.capacity )
      // setValue("country",formData.country)
      // setValue("state",formData.state || '' )
      // setDefaultCountry({ name:formData.country })
      // setSelectStateName({name : formData.state || ''})
      // setBussinessGpLable(formData?.[0].companyId?.businessGroupId?.groupName)

      setValue("plateNumber", formData.plateNumber || "");
      setValue("vehicleCategory", formData.vehicleCategory || "");
      setValue("dvirTemplate", formData.dvirTemplate || "");
      setValue("purchaseAmount", formData.purchaseAmount || "");
      setValue("manufacturerDate", formData.manufacturerDate || "");
      setValue("purchaseDate", formData.purchaseDate || "");
      setValue("weightCapacity", formData.weightCapacity || "");
      setValue("gpsInstallationDate", formData.gpsInstallationDate || "");
      setValue("gpsWarranty", formData.gpsWarranty || "");
      setValue("companyAverage", formData.companyAverage || "");
      setValue("permit", formData.permit || "");
      setValue("installationDate", formData.installationDate || "");
      setValue("registrationNumber", formData.registrationNumber || "");
      setValue("fuelType", formData.fuelType || "");
      const distanceBaseFuelConsumption =
        formData?.[0]?.distanceBaseFuelConsumption;
      setValue(
        "distanceBasedDistanceQuantity",
        formData.distanceBasedDistanceQuantity || ""
      );
      if (distanceBaseFuelConsumption) {
        setValue(
          "distanceBaseFuelConsumption",
          formData.distanceBaseFuelConsumption || ""
        );
        setValue(
          "distanceBaseFuelConsumptionUnit",
          formData.distanceBaseFuelConsumptionUnit || ""
        );
        setIsCheckedDBFC(true);
      }
      setValue(
        "durationBaseFuelConsumptionDurationQuanitty",
        formData.durationBaseFuelConsumptionDurationQuanitty || ""
      );
      setValue(
        "durationBaseFuelConsumptionDurationUnit",
        formData.durationBaseFuelConsumptionDurationUnit || ""
      );
      const durationBaseDistanceQuantity =
        formData?.[0]?.durationBaseDistanceQuantity;
      if (durationBaseDistanceQuantity) {
        setValue(
          "durationBaseDistanceQuantity",
          formData.durationBaseDistanceQuantity || ""
        );
        setValue(
          "durationBaseFuelConsumptionUnit",
          formData.durationBaseFuelConsumptionUnit || ""
        );
        setIsCheckedDBFC2(true);
      }
      setValue("fuelIdlingConsumption", formData.fuelIdlingConsumption || "");
      setValue(
        "fuelIdlingConsumptionUnit",
        formData.fuelIdlingConsumptionUnit || ""
      );
      setValue(
        "consumptionTolerancePercent",
        formData.consumptionTolerancePercent || ""
      );
      setValue("vinNumber", formData.vinNumber || "");
      setValue("engineNumber", formData.engineNumber || "");
      setValue("odometer", formData.odometer || "");
      setValue("LBSDetectionRadius", formData.LBSDetectionRadius || "");
      setValue("engineHour", formData.engineHour || "");
      setValue("passengerSeat", formData.passengerSeat || "");
      const distanceCostQuantity = formData?.[0]?.distanceCostQuantity;
      if (distanceCostQuantity) {
        setValue("distanceCostQuantity", distanceCostQuantity);
        setIsCheckedCBO(true);
      }
      const durationCostQuantity = formData?.[0]?.durationCostQuantity;
      if (durationCostQuantity) {
        setValue("durationCostQuantity", durationCostQuantity);
        setValue("durationUnit", formData.durationUnit || "");
        setIsCheckedCBO2(true);
      }
      setValue("rfidTimeoutDuration", formData.rfidTimeoutDuration || "");
      setValue("sleepModeDuration", formData.sleepModeDuration || "");
      setValue("minimumWorkingHour", formData.minimumWorkingHour || "");
      const weightSensor = formData?.[0]?.weightSensor;
      if (weightSensor) {
        setValue("weightSensor", weightSensor);
        setIsCheckedWC(weightSensor);
      }
      setValue("fuelSensor", formData.fuelSensor || "");
      setValue("noOfTanks", formData.noOfTanks || "");
      const gSensor = formData?.[0]?.gSensor;
      if (gSensor) {
        setIsCheckedGS(gSensor);
      }
      setValue("axisX", formData.axisX || "");
      setValue("axisY", formData.axisY || "");
      setValue("axisZ", formData.axisZ || "");
      setValue("duration", formData.duration || "");
      setValue("underweightTolerance", formData.underweightTolerance || "");
      setValue("overweightTolerance", formData.overweightTolerance || "");
      setValue(
        "loadingUnloadingTolerance",
        formData.loadingUnloadingTolerance || ""
      );

      // setValue("plateNumber",FormData.plateNumber || '' )
      // setValue("vehicleCategory",FormData.vehicleCategory || '' )
      // setValue("purchaseAmount",FormData.purchaseAmount || '' )
      // setValue("DVIRTemplate",FormData.DVIRTemplate || '' )
      // setValue("weightCapacity",FormData.weightCapacity || '' )
      // setValue("companyAverage",FormData.companyAverage || '' )
      // setValue("permit",FormData.permit || '' )
      // setValue("registrationNumber",FormData.registrationNumber || '' )
      // setValue("fuelType",FormData.fuelType || '' )
      // setValue("fuelIdlingConsumption",FormData.fuelIdlingConsumption || '' )
      // setValue("vinNumber",FormData.vinNumber || '' )
      // setValue("engineNumber",FormData.engineNumber || '' )
      // setValue("duration",FormData.duration || '' )
      // setValue("sleepModeDuration",FormData.sleepModeDuration || '' )
      // setValue("underweightTolerance",FormData.underweightTolerance || '' )
      // setValue("overweightTolerance",FormData.overweightTolerance || '' )
      // setValue("loadingUnloadingTolerance",FormData.loadingUnloadingTolerance || '' )
    }
  }, [formData, id]);

  return (
    <div className="p-4">
      <div className="row" style={{ width: "80%" }}>
        {/* <div className="col-xl-3 mb-3">
          <label className="form-label">{t('plateNumber')}</label>
          <CustomInput
            type="text"
            register={register}
            label="Plate Number"
            name="plateNumber"
            placeholder=""
          />
          <Error errorName={errors.plateNumber} />
        </div> */}
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
                  setTempValue("vechicleCategory");
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
                  setTempValue("vehicleCategory");
                }}
                name="optradioCustom1"
                checked={getValues("vehicleCategory") === "IMMOVABLE"}
              />
              <label className="form-check-label" style={{ marginBottom: "0" }}>
                {t("immovable")}
              </label>
            </div>
          </div>
          {!getValues("vehicleCategory") && (
            <Error errorName={errors.vehicleCategory} />
          )}
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
                  setTempValue(newValue.value);
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
          {!getValues("permit") && <Error errorName={errors.permit} />}
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
                  setTempValue(newValue.value);
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
          {!getValues("fuelType") && <Error errorName={errors.fuelType} />}
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
          <Error errorName={errors.distanceBaseFuelConsumption} />
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
            register={register}
            label="VIN Number"
            name="vinNumber"
            placeholder=""
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
          disabled={isLoading}
        >
          {isLoading ? <Spinner/> : t("Submit")}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
