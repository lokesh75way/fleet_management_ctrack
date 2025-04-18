import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import Error from "@/components/Error/Error";
import {
  tollCategoryOptions,
  tarrifTypeOptions,
  skillSetOptions,
  profileOwningOptions,
  costCenterOptions,
} from "@/constants/options";
import CustomInput from "@/components/Input/CustomInput";
import FileUploader from "@/components/FileUploader";

const customStyles = {
  control: (base) => ({
    ...base,
    padding: ".25rem 0 ",
  }),
};

const Information = ({
  register,
  setValue,
  getValues,
  errors,
  control,
  handleSubmit,
  onSubmit,
  isFormSubmitting,
}) => {
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("registrationNumber");
  const { t } = useTranslation();

  const location = useLocation();

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const vehicle_noFromQuery = params.get("vehicle_no");
  
      if (vehicle_noFromQuery) {
        setValue("registrationNumber", vehicle_noFromQuery); 
      }
    }, [location.search, setValue]);

  return (
    <div className="p-4 relative">
      <div className="row" style={{ width: "100%" }}>
        <div className="border-container position-relative p-4 row">
          <div className="heading-container d-flex align-items-center position-absolute">
            <h4>{t("unitInformation")}</h4>
          </div>
          <div
            className="d-flex justify-content-between"
            style={{ width: "100%" }}
          >
            <div className="row" style={{ width: "78%" }}>
              <div className="d-flex flex-column">
                <div className="col-xl-6 mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    {t("vehicleNumber")}
                  </label>
                  <CustomInput
                    type="number"
                    required
                    register={register}
                    name="vehicleNumber"
                    label="Vehicle Number"
                    placeholder=""
                    defaultValue={getValues("vehicleNumber")}
                  />
                  <Error errorName={errors.vehicleNumber} />
                </div>
                <div className="col-xl-6 mb-3 ">
                  <label className="form-label">{t("unitId")}</label>
                  <CustomInput
                    type="text"
                    required
                    register={register}
                    label="Unit Id"
                    name="unitId"
                    placeholder=""
                    defaultValue={getValues("unitId")}
                  />
                  <Error errorName={errors.unitId} />
                </div>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="mb-3">
                      <label className="form-label">
                        {t("registrationNumber")}{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <CustomInput
                        type="text"
                        required
                        register={register}
                        label="Registration Number"
                        name="registrationNumber"
                        placeholder=""
                        defaultValue={getValues("registrationNumber")}
                        disabled={selectedOption !== "registrationNumber"}
                      />
                      <Error errorName={errors.registrationNumber} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        {t("fleetnumber")}{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <CustomInput
                        type="number"
                        required
                        register={register}
                        name="fleetnumber"
                        label="Fleet Number"
                        placeholder=""
                        defaultValue={getValues("fleetnumber")}
                        disabled={selectedOption !== "fleetNumber"}
                      />
                      <Error errorName={errors.fleetnumber} />
                    </div>
                  </div>
                  <div className="col-md-2 d-flex flex-column border rounded border-[#6e6e6e] custom-margin-checkbox gap-4">
                    <div className="basic-form mt-2">
                      <div className="form-check custom-checkbox">
                        <Controller
                          name="selectedInput"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="radio"
                              className="form-check-input"
                              value="registrationNumber"
                              checked={field.value === "registrationNumber"}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                setSelectedOption(e.target.value);
                              }}
                            />
                          )}
                        />
                      </div>
                      <h5 className="my-4" style={{ marginLeft: "20px" }}>
                        {t("Use In Reports")}
                      </h5>
                      <div className="form-check custom-checkbox">
                        <Controller
                          name="selectedInput"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="radio"
                              className="form-check-input"
                              value="fleetNumber"
                              checked={field.value === "fleetNumber"}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                setSelectedOption(e.target.value);
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <Error errorName={errors.selectedInput} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-12 mb-3 ">
                  <label className="form-label">{t("description")}</label>
                  <CustomInput
                    type="textarea"
                    required
                    register={register}
                    label="Description"
                    name="description"
                    placeholder=""
                    defaultValue={getValues("description")}
                  />
                  <Error errorName={errors.description} />
                </div>
                <div className="col-xl-6 mb-3">
                  <label className="form-label">{t("manufacture")}</label>
                  <CustomInput
                    type="text"
                    required
                    register={register}
                    label="Manu facture"
                    name="manufacture"
                    placeholder=""
                    defaultValue={getValues("manufacture")}
                  />
                  <Error errorName={errors.manufacture} />
                </div>
                <div className="col-xl-6 mb-3 ">
                  <label className="form-label">{t("year")}</label>
                  <CustomInput
                    type="text"
                    required
                    register={register}
                    label="Year"
                    name="year"
                    placeholder=""
                    defaultValue={getValues("year")}
                  />
                  <Error errorName={errors.year} />
                </div>
                <div className="col-xl-6 mb-3">
                  <label className="form-label">{t("model")}</label>
                  <CustomInput
                    type="text"
                    required
                    register={register}
                    label="Model"
                    name="model"
                    placeholder=""
                    defaultValue={getValues("model")}
                  />
                  <Error errorName={errors.model} />
                </div>
                <div className="col-xl-6 mb-3 ">
                  <label className="form-label">{t("color")}</label>
                  <CustomInput
                    type="text"
                    required
                    register={register}
                    label="Color"
                    name="color"
                    placeholder=""
                    defaultValue={getValues("color")}
                  />
                  <Error errorName={errors.color} />
                </div>
                <div className="col-xl-6 mb-3 ">
                  <label className="form-label">{t("vinNumber")}</label>
                  <CustomInput
                    type="text"
                    required
                    register={register}
                    label="VINNumber"
                    name="vinNumber"
                    placeholder=""
                    defaultValue={getValues("vinNumber")}
                  />
                  <Error errorName={errors.vinNumber} />
                </div>
                <div className="col-xl-6 mb-3 ">
                  <label className="form-label">{t("engineNumber")}</label>
                  <CustomInput
                    type="text"
                    required
                    register={register}
                    label="Engine Number"
                    name="engineNumber"
                    placeholder=""
                    defaultValue={getValues("engineNumber")}
                  />
                  <Error errorName={errors.engineNumber} />
                </div>
                <div className="col-xl-6 mb-3 ">
                  <label className="form-label">{t("group")}</label>
                  <Controller
                    name="group"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <Select
                        onChange={(newValue) => {
                          setValue("group", newValue.value);
                        }}
                        options={tarrifTypeOptions}
                        ref={ref}
                        name={name}
                        styles={customStyles}
                        value={{
                          label: getValues("group"),
                          value: getValues("group"),
                        }}
                      />
                    )}
                  />
                  <Error errorName={errors.group} />
                </div>
                <div className="col-xl-6 mb-3 ">
                  <label className="form-label">{t("description")}</label>
                  <CustomInput
                    type="textarea"
                    required
                    register={register}
                    label="Description"
                    name="groupDescription"
                    placeholder=""
                    defaultValue={getValues("groupDescription")}
                  />
                  <Error errorName={errors.description} />
                </div>
                <div className="col-xl-6 mb-3 ">
                  <label className="form-label">{t("tollCategory")}</label>
                  <Controller
                    name="tollCategory"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <Select
                        onChange={(newValue) => {
                          setValue("tollCategory", newValue.value);
                        }}
                        options={tollCategoryOptions}
                        ref={ref}
                        name={name}
                        styles={customStyles}
                        value={{
                          label: getValues("tollCategory"),
                          value: getValues("tollCategory"),
                        }}
                      />
                    )}
                  />

                  <Error errorName={errors.tollCategory} />
                </div>
                <div className="col-xl-6 mb-3 ">
                  <label className="form-label">{t("tarrifType")}</label>
                  <Controller
                    name="tarrifType"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <Select
                        onChange={(newValue) => {
                          setValue("tarrifType", newValue.value);
                        }}
                        options={tarrifTypeOptions}
                        ref={ref}
                        name={name}
                        styles={customStyles}
                        value={{
                          label: getValues("tarrifType"),
                          value: getValues("tarrifType"),
                        }}
                      />
                    )}
                  />

                  <Error errorName={errors.tarrifType} />
                </div>
                <div className="col-xl-6 mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    {t("licenseNumber")}
                  </label>
                  <CustomInput
                    type="number"
                    required
                    register={register}
                    name="licenseNumber"
                    label="License Number"
                    placeholder=""
                    defaultValue={getValues("licenseNumber")}
                  />
                  <Error errorName={errors.licenseNumber} />
                </div>
                <div className="col-xl-6 mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    {t("licenseExpire")}
                  </label>
                  <CustomInput
                    type="number"
                    required
                    register={register}
                    name="licenseExpire"
                    label="License Expire"
                    placeholder=""
                    defaultValue={getValues("licenseExpire")}
                  />
                  <Error errorName={errors.licenseExpire} />
                </div>
                <div className="col-xl-6 mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    {t("roadWorthy")}
                  </label>
                  <CustomInput
                    type="number"
                    required
                    register={register}
                    name="roadWorthy"
                    label="Road Worthy"
                    placeholder=""
                    defaultValue={getValues("roadWorthy")}
                  />
                  <Error errorName={errors.roadWorthy} />
                </div>
                <div className="col-xl-6 mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    {t("roadWorthyExpire")}{" "}
                  </label>
                  <CustomInput
                    type="number"
                    required
                    register={register}
                    name="roadWorthyExpire"
                    label="Road Worthy Expire"
                    placeholder=""
                    defaultValue={getValues("roadWorthyExpire")}
                  />
                  <Error errorName={errors.roadWorthyExpire} />
                </div>
                <div className="col-xl-6 mb-3">
                  <label
                    htmlFor="exampleFormControlInput4"
                    className="form-label"
                  >
                    {t("odo")}
                  </label>
                  <CustomInput
                    type="number"
                    required
                    register={register}
                    name="odo"
                    placeholder=""
                  />
                  <Error errorName={errors.odo} />
                </div>

                <div className="col-xl-6 mb-3">
                  <label
                    htmlFor="exampleFormControlInput4"
                    className="form-label"
                  >
                    {t("nextService")}
                  </label>
                  <CustomInput
                    type="number"
                    register={register}
                    name="odoNextService"
                    placeholder=""
                    defaultValue={getValues("odoNextService")}
                  />
                  <Error errorName={errors.nextService} />
                </div>
                <div className="col-xl-6 mb-3">
                  <label className="form-label">{t("hours")}</label>
                  <CustomInput
                    type="number"
                    register={register}
                    name="hours"
                    placeholder=""
                    defaultValue={getValues("hours")}
                  />
                  <Error errorName={errors.hours} />
                </div>
                <div className="col-xl-6 mb-3">
                  <label className="form-label">{t("nextService")}</label>
                  <CustomInput
                    type="number"
                    register={register}
                    name="hoursNextService"
                    placeholder=""
                    defaultValue={getValues("hoursNextService")}
                  />
                  <Error errorName={errors.nextService} />
                </div>
                <div className="col-xl-6 mb-3">
                  <label className="form-label">{t("currentStatus")}</label>
                  <CustomInput
                    type="text"
                    register={register}
                    name="currentStatus"
                    placeholder=""
                    defaultValue={getValues("currentStatus")}
                  />
                  <Error errorName={errors.currentStatus} />
                </div>
                <div className="col-xl-6 mb-3">
                  <label className="form-label">{t("speed")}</label>
                  <CustomInput
                    type="number"
                    register={register}
                    name="speed"
                    placeholder=""
                    defaultValue={getValues("speed")}
                  />
                  <Error errorName={errors.speed} />
                </div>

                <div className="col-xl-6 mb-3">
                  <label className="form-label">{t("currentDriver")}</label>
                  <CustomInput
                    type="text"
                    register={register}
                    name="currentDriver"
                    placeholder=""
                    defaultValue={getValues("currentDriver")}
                  />
                  <Error errorName={errors.currentDriver} />
                </div>
                <div className="col-xl-6 mb-3">
                  <label className="form-label">{t("heading")}</label>
                  <CustomInput
                    type="text"
                    register={register}
                    name="heading"
                    placeholder=""
                    defaultValue={getValues("heading")}
                  />
                  <Error errorName={errors.heading} />
                </div>

                <div className="col-md-12 mb-3">
                  <label className="form-label">{t("currentLocation")} </label>
                  <CustomInput
                    type="text"
                    register={register}
                    name="currentLocation"
                    placeholder=""
                    defaultValue={getValues("currentLocation")}
                  />
                  <Error errorName={errors.currentLocation} />
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="col-xl-6 mb-3">
                  <label className="form-label">{t("skillSet")}</label>
                  <Controller
                    name="skillSet"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <Select
                        onChange={(newValue) => {
                          setValue("skillSet", newValue.value);
                        }}
                        options={skillSetOptions}
                        ref={ref}
                        name={name}
                        styles={customStyles}
                        value={{
                          label: getValues("skillSet"),
                          value: getValues("skillSet"),
                        }}
                      />
                    )}
                  />

                  <Error errorName={errors.skillSet} />
                </div>

                <div className="col-xl-6 mb-3">
                  <label className="form-label">{t("profile")}</label>
                  <Controller
                    name="profile"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <Select
                        onChange={(newValue) => {
                          setValue("profile", newValue.value);
                        }}
                        options={profileOwningOptions}
                        ref={ref}
                        name={name}
                        styles={customStyles}
                        value={{
                          label: getValues("profile"),
                          value: getValues("profile"),
                        }}
                      />
                    )}
                  />

                  <Error errorName={errors.profileOwning} />
                </div>

                <div className="col-xl-6 mb-3">
                  <label className="form-label">{t("owningCostCenter")} </label>
                  <Controller
                    name="owningCostCenter"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <Select
                        onChange={(newValue) => {
                          setValue("owningCostCenter", newValue.value);
                        }}
                        options={costCenterOptions}
                        ref={ref}
                        name={name}
                        styles={customStyles}
                        value={{
                          label: getValues("owningCostCenter"),
                          value: getValues("owningCostCenter"),
                        }}
                      />
                    )}
                  />

                  <Error errorName={errors.costCenter} />
                </div>
              </div>
            </div>

            <div
              className="d-flex align-items-start flex-column"
              style={{ width: "20%", marginLeft: "auto" }}
            >
              <div className="d-flex flex-column align-items-center border border-[#6e6e6e] rounded p-4">
                <FileUploader
                  setValue={setValue}
                  register={register}
                  label="Business Group Logo"
                  name="logo"
                  getValue={getValues}
                  setLoading={setFileUploadLoading}
                  loading={fileUploadLoading}
                />
                <Error errorName={errors.logo} />
                <div className="d-flex align-items-center justify-content-center p-2 m-0">
                  <input
                    type="checkbox"
                    //   onChange={() => setIsCheckedCBO2(!isCheckedCBO2)}
                    className="form-check-input"
                    id="customCheckBox1"
                  />
                  <label className="form-check-label" htmlFor="customCheckBox1">
                    {t("syncOnce")}
                  </label>
                </div>
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

export default Information;
