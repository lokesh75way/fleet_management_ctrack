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
  tollCategoryOptions,
  tarrifTypeOptions,
  skillSetOptions,
  profileOwningOptions,
  costCenterOptions,
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
import FileUploader from "../../../../components/FileUploader";

const Information = ({
  register,
  setValue,
  getValues,
  errors,
  control,
  handleSubmit,
  onSubmit,
  formData,
}) => {
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const { checkRole, checkUserName } = useStorage();

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  const role = checkRole();

  const { t } = useTranslation();

  return (
    <div className="p-4 relative">
      <div className="d-flex justify-content-between" style={{ width: "100%" }}>
        <div className="row" style={{ width: "78%" }}>
          <div className="d-flex flex-column">
            <div className="col-xl-6 mb-3">
              <label htmlFor="exampleFormControlInput3" className="form-label">
                {t("Number")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="number"
                required
                register={register}
                name="number"
                label="Number"
                placeholder=""
                defaultValue={getValues("number")}
              />
              <Error errorName={errors.number} />
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                {t("unit Id")} <span className="text-danger">*</span>
              </label>
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
                  />
                  <Error errorName={errors.registrationNumber} />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    {t("fleetnumber")} <span className="text-danger">*</span>
                  </label>
                  <CustomInput
                    type="number"
                    required
                    register={register}
                    name="fleetnumber"
                    label="Fleet Number"
                    placeholder=""
                    defaultValue={getValues("fleetnumber")}
                  />
                  <Error errorName={errors.fleetnumber} />
                </div>
              </div>
              <div className="col-md-2 d-flex flex-column align-items-center justify-content-center border rounded border-[#6e6e6e] my-3">
                <div className="basic-form">
                  <div className="form-check custom-checkbox">
                    <input
                      type="radio"
                      className="form-check-input"
                      onChange={() => {
                        setValue("vehicleCategory", "IMMOVABLE");
                      }}
                      name="optradioCustom1"
                    />
                    <label
                      className="form-check-label"
                      style={{ marginBottom: "0" }}
                    >
                      {t("Use in")}
                    </label>
                  </div>
                  <div className="form-check custom-checkbox">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="optradioCustom1"
                      onChange={() => {
                        setValue("vehicleCategory", "MOVABLE");
                      }}
                      checked={getValues("vehicleCategory") === "MOVABLE"}
                    />
                    <label
                      className="form-check-label"
                      style={{ marginBottom: "5px" }}
                    >
                      {t("reports")}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12 mb-3 ">
              <label className="form-label">
                {t("description")} <span className="text-danger">*</span>
              </label>
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
              <label className="form-label">
                {t("make")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="text"
                required
                register={register}
                label="Make"
                name="make"
                placeholder=""
                defaultValue={getValues("make")}
              />
              <Error errorName={errors.make} />
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                {t("year")} <span className="text-danger">*</span>
              </label>
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
              <label className="form-label">
                {t("model")} <span className="text-danger">*</span>
              </label>
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
              <label className="form-label">
                {t("color")} <span className="text-danger">*</span>
              </label>
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
              <label className="form-label">
                {t("vinNumber")} <span className="text-danger">*</span>
              </label>
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
              <label className="form-label">
                {t("engineNumber")} <span className="text-danger">*</span>
              </label>
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
              <label className="form-label">
                {t("group")} <span className="text-danger">*</span>
              </label>
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
              {!getValues("group") && <Error errorName={errors.group} />}
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                {t("description")} <span className="text-danger">*</span>
              </label>
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
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                {t("tollCategory")} <span className="text-danger">*</span>
              </label>
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
              {!getValues("tollCategory") && (
                <Error errorName={errors.tollCategory} />
              )}
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                {t("tarrifType")} <span className="text-danger">*</span>
              </label>
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
              {!getValues("tarrifType") && (
                <Error errorName={errors.tarrifType} />
              )}
            </div>
            <div className="col-xl-6 mb-3">
              <label htmlFor="exampleFormControlInput3" className="form-label">
                {t("licenseNumber")} <span className="text-danger">*</span>
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
              <label htmlFor="exampleFormControlInput3" className="form-label">
                {t("licenseExpire")} <span className="text-danger">*</span>
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
              <label htmlFor="exampleFormControlInput3" className="form-label">
                {t("roadWorthy")} <span className="text-danger">*</span>
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
              <label htmlFor="exampleFormControlInput3" className="form-label">
                {t("roadWorthyExpire")} <span className="text-danger">*</span>
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
              <label htmlFor="exampleFormControlInput4" className="form-label">
                {t("odo")} <span className="text-danger">*</span>
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
              <label htmlFor="exampleFormControlInput4" className="form-label">
                {t("nextService")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="number"
                register={register}
                name="nextService"
                placeholder=""
                defaultValue={getValues("nextService")}
              />
              <Error errorName={errors.nextService} />
            </div>
            <div className="col-xl-6 mb-3">
              <label className="form-label">
                {t("hours")} <span className="text-danger">*</span>
              </label>
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
              <label className="form-label">
                {t("nextService")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="number"
                register={register}
                name="nextService"
                placeholder=""
                defaultValue={getValues("nextService")}
              />
              <Error errorName={errors.nextService} />
            </div>
            <div className="col-xl-6 mb-3">
              <label className="form-label">
                {t("currentStatus")} <span className="text-danger">*</span>
              </label>
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
              <label className="form-label">
                {t("speed")} <span className="text-danger">*</span>
              </label>
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
              <label className="form-label">
                {t("currentDriver")} <span className="text-danger">*</span>
              </label>
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
              <label className="form-label">
                {t("heading")} <span className="text-danger">*</span>
              </label>
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
              <label className="form-label">
                {t("currentLocation")} <span className="text-danger">*</span>
              </label>
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
            <label className="form-label">
              {t("skillSet")} <span className="text-danger">*</span>
            </label>
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
            {!getValues("skillSet") && <Error errorName={errors.skillSet} />}
          </div>

          <div className="col-xl-6 mb-3">
            <label className="form-label">
              {t("profileOwning")} <span className="text-danger">*</span>
            </label>
            <Controller
              name="profileOwning"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  onChange={(newValue) => {
                    setValue("profileOwning", newValue.value);
                  }}
                  options={profileOwningOptions}
                  ref={ref}
                  name={name}
                  styles={customStyles}
                  value={{
                    label: getValues("profileOwning"),
                    value: getValues("profileOwning"),
                  }}
                />
              )}
            />
            {!getValues("profileOwning") && (
              <Error errorName={errors.profileOwning} />
            )}
          </div>

          <div className="col-xl-6 mb-3">
            <label className="form-label">
              {t("owningCostCenter")} <span className="text-danger">*</span>
            </label>
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
            {!getValues("costCenter") && (
              <Error errorName={errors.costCenter} />
            )}
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
              setLoading={setLoading}
              loading={loading}
              link={logo}
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

export default Information;
