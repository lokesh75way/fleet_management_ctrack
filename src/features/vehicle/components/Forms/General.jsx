import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useTranslation } from "react-i18next";

import Error from "@/components/Error/Error";
import {
  deviceTypeOptions,
  copyFromOptions,
  distanceCounterOptions,
  speedDetectionOptions,
} from "@/constants/options";
import CustomInput from "@/components/Input/CustomInput";
import CompanyDropdown from "@/features/company/components/DropDownList";
import GroupDropdown from "@/features/businessGroup/components/DropDownList";
import BranchDropdownList from "@/features/branch/components/DropDownList";

const customStyles = {
  control: (base) => ({
    ...base,
    padding: ".25rem 0 ",
  }),
};

const General = ({
  register,
  setValue,
  getValues,
  errors,
  control,
  handleSubmit,
  onSubmit,
  watch,
  isFormSubmitting,
}) => {
  const [company, setCompany] = useState();
  const [branch, setBranch] = useState();
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <div className="row" style={{ width: "85%" }}>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("businessGroup")} <span className="text-danger">*</span>
          </label>
          <Controller
            name="businessGroupId"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <GroupDropdown
                onChange={(newValue) => {
                  if (getValues("businessGroupId") != newValue.value) {
                    setValue("businessGroupId", newValue.value);
                    setValue("businessGroupName", newValue.label);
                    setValue("companyId", "");
                    setValue("branchId", "");
                    setCompany(null);
                    setBranch(null);
                  }
                }}
                defaultValue={value}
                customStyles={customStyles}
                name={name}
              />
            )}
          />

          <Error errorName={errors.businessGroupId} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("company")} <span className="text-danger">*</span>
          </label>
          <Controller
            name="companyId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <CompanyDropdown
                groupId={watch("businessGroupId")}
                onChange={(newValue) => {
                  if (getValues("companyId") != newValue.value) {
                    setValue("companyId", newValue.value);
                    setValue("branchId", "");
                    setCompany(newValue);
                    setBranch(null);
                  }
                }}
                defaultValue={value}
                value={company}
                customStyles={customStyles}
                name={name}
              />
            )}
          />
          <Error errorName={errors.companyId} />
        </div>

        <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t("branch")}</label>
          <Controller
            name="branchId"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <BranchDropdownList
                companyId={watch("companyId")}
                groupId={watch("businessGroupId")}
                onChange={(newValue) => {
                  setValue("branchId", newValue?.value);
                  setBranch(newValue);
                }}
                defaultValue={value}
                value={branch}
                customStyles={customStyles}
                isDisabled={false}
                name={name}
              />
            )}
          />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("vehicleName")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            required
            register={register}
            label="Vehicle Name"
            name="vehicleName"
            placeholder=""
            defaultValue={getValues("vehicleName")}
          />
          <Error errorName={errors.vehicleName} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("deviceType")} <span className="text-danger">*</span>
          </label>
          <Controller
            name="deviceType"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setValue("deviceType", newValue.value);
                }}
                options={deviceTypeOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{
                  label: getValues("deviceType"),
                  value: getValues("deviceType"),
                }}
              />
            )}
          />
          <Error errorName={errors.deviceType} />
        </div>
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("IMEINumber")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="imeiNumber"
            label="IMEI Number"
            placeholder=""
            defaultValue={getValues("imeiNumber")}
          />
          <Error errorName={errors.imeiNumber} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t("copyFrom")} </label>
          <Controller
            name="copyFrom"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("copyFrom", newValue.value)}
                options={copyFromOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={copyFromOptions[0]}
              />
            )}
          />
          <Error errorName={errors.copyFrom} />
        </div>
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("serverAddress")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            name="serverAddress"
            placeholder=""
            defaultValue={getValues("serverAddress")}
          />
          <Error errorName={errors.serverAddress} />
        </div>
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            {t("simNumber")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="simNumber"
            placeholder=""
          />
          <Error errorName={errors.simNumber} />
        </div>
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            {t("secondarySimNumber")}
          </label>
          <CustomInput
            type="number"
            register={register}
            name="secondrySimNumber"
            placeholder=""
          />
          <Error errorName={errors.secondrySimNumber} />
        </div>
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            {t("distanceCounter")}
            <span className="text-danger">*</span>
          </label>
          <Controller
            name="distanceCounter"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setValue("distanceCounter", newValue.value);
                }}
                options={distanceCounterOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                // defaultValue={distanceCounterOptions[0]}
                value={{
                  label: getValues("distanceCounter"),
                  value: getValues("distanceCounter"),
                }}
              />
            )}
          />

          <Error errorName={errors.distanceCounter} />
        </div>
        {/* <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            {t("unitOfDistance")}
            <span className="text-danger">*</span>
          </label>
          <Controller
            name="unitOfDistance"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setValue("unitOfDistance", newValue.value);
                  setTempValue(newValue.value);
                }}
                options={unitOfDistanceOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{
                  label: getValues("unitOfDistance"),
                  value: getValues("unitOfDistance"),
                }}
              />
            )}
          />
          {!getValues("unitOfDistance") && (
            <Error errorName={errors.unitOfDistance} />
          )}
        </div> */}
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            {t("speedDetection")}
          </label>
          <Controller
            name="speedDetection"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>
                  setValue("speedDetection", newValue.value)
                }
                options={speedDetectionOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={speedDetectionOptions[0]}
                value={{
                  label: getValues("speedDetection"),
                  value: getValues("speedDetection"),
                }}
              />
            )}
          />
          <Error errorName={errors.speedDetection} />
        </div>
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            {t("deviceAccuracyTolerance")}{" "}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            name="deviceAccuracyTolerance"
            placeholder=""
            defaultValue={getValues("deviceAccuracyTolerance")}
          />
          <Error errorName={errors.deviceAccuracyTolerance} />
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
          disabled={isFormSubmitting}
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

export default General;
