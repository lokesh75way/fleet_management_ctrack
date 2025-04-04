import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuEye, LuEyeOff } from "react-icons/lu";

import Error from "@/components/Error/Error";
import CustomInput from "@/components/Input/CustomInput";
import GroupDropdown from "@/features/businessGroup/components/DropDownList";
import CompanyDropdown from "@/features/company/components/DropDownList";
import BranchDropdown from "@/features/branch/components/DropDownList";
import VehicleDropdown from "@/features/vehicle/components/DropdownList";
import useUserLocation from "@/hooks/useUserLocation";

import { unitOfDistanceOptions } from "../../../constants/options";
import LocationSelector from "../../../components/Input/LocationSelector";
import TemplateDropdownList from "@/features/featureTemplate/components/DropdownList";

const customStyles = {
  control: (base) => ({
    ...base,
    padding: "0.25rem 0 ", // Adjust the height as needed
  }),
};

const UserForm = ({
  register,
  setValue,
  onSubmit,
  handleSubmit,
  getValues,
  errors,
  control,
  watch,
  isFormSubmitting,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const { t } = useTranslation();
  const { id } = useParams();
  const { location: locationData, error: locationError } = useUserLocation();
  const [template, setTemplate] = useState();

  const [company, setCompany] = useState();
  const [branch, setBranch] = useState();
  const [vehicles, setVehicles] = useState();

  return (
    <div className="p-4">
      <div className="row" style={{ width: "85%", margin: "auto" }}>
        <div>{locationError && <p>{locationError}</p>}</div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t("businessGroup")}</label>
          <Controller
            name="businessGroupId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <GroupDropdown
                onChange={async (newValue) => {
                  if (newValue.value != getValues("businessGroupId")) {
                    setValue("businessGroupId", newValue.value);
                    setCompany(null);
                    setValue("companyId", "");
                    setBranch(null);
                    setValue("branchIds", "");
                    setValue("vehicleIds", "");
                    setVehicles([]);
                  }
                }}
                defaultValue={value}
                customStyles={customStyles}
                ref={ref}
                name={name}
              />
            )}
          />
          <Error errorName={errors.businessGroupId} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t("company")}</label>
          <Controller
            name="companyId"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, name, ref } }) => (
              <CompanyDropdown
                onChange={async (newValue) => {
                  if (newValue.value != getValues("companyId")) {
                    setValue("companyId", newValue.value);
                    setCompany(newValue);
                    setBranch([]);
                    setValue("branchIds", "");
                    setValue("vehicleIds", "");
                    setVehicles([]);
                  }
                }}
                groupId={watch("businessGroupId")}
                defaultValue={value}
                value={company}
                customStyles={customStyles}
                name={name}
                ref={ref}
              />
            )}
          />
          <Error errorName={errors.companyId} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t("branch")}</label>
          <Controller
            name="branchIds"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <BranchDropdown
                companyId={watch("companyId")}
                groupId={watch("businessGroupId")}
                onChange={(newValue) => {
                  setValue(
                    "branchIds",
                    newValue?.map((el) => el.value)
                  );
                  setValue("vehicleIds", "");
                  setBranch(newValue);
                  setVehicles([]);
                }}
                defaultValue={getValues("branchIds")}
                value={branch}
                isMulti
                customStyles={customStyles}
                ref={ref}
                name={name}
              />
            )}
          />
          <Error errorName={errors.branchId} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t("vehicle")}</label>
          <Controller
            name="vehicleIds"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <VehicleDropdown
                onChange={(newValue) => {
                  const newArray = newValue?.map((temp) => temp.value);
                  setValue("vehicleIds", newArray);
                  setVehicles(newValue);
                }}
                defaultValue={getValues("vehicleIds")}
                value={vehicles}
                branchIds={watch("branchIds")}
                companyId={watch("companyId")}
                groupId={watch("businessGroupId")}
                customStyles={customStyles}
                ref={ref}
                isMulti
                name={name}
              />
            )}
          />
          {!getValues("Branch") && <Error errorName={errors.parent} />}
        </div>
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("email")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            label="Email"
            className="form-control"
            name="email"
            placeholder=""
          />
          <Error errorName={errors.email} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("username")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="User Name"
            name="userName"
            placeholder=""
          />
          <Error errorName={errors.userName} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("mobileNumber")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Mobile Number"
            name="mobileNumber"
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            placeholder=""
          />
          <Error errorName={errors.mobileNumber} />
        </div>

        <LocationSelector
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
          dValues={{
            state: getValues("state"),
            country: getValues("country"),
          }}
          locationData={locationData}
          id={id}
          showCity={false}
        />
        {!id && (
          <>
            <div className="col-xl-3 mb-3 ">
              <label className="form-label">
                {t("password")} <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <CustomInput
                  type={showPassword ? "text" : "password"}
                  register={register}
                  label="Password"
                  name="password"
                  placeholder=""
                />
                <span
                  className="showPasswordIcon"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <LuEyeOff /> : <LuEye />}
                </span>
              </div>
              <Error errorName={errors.password} />
            </div>
            <div className="col-xl-3 mb-3 ">
              <label className="form-label">
                {t("confirmPassword")} <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <CustomInput
                  type={showConfirmPassword ? "text" : "password"}
                  register={register}
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder=""
                />
                <span
                  className="showPasswordIcon"
                  onClick={() => {
                    setConfirmShowPassword(!showConfirmPassword);
                  }}
                >
                  {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                </span>
              </div>
              <Error errorName={errors.confirmPassword} />
            </div>{" "}
          </>
        )}
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("featureTemplate")} <span className="text-danger">*</span>
          </label>
          <Controller
            name="featureTemplateId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <TemplateDropdownList
                onChange={(e) => {
                  setValue("featureTemplateId", e.value);
                  setTemplate(e);
                }}
                ref={ref}
                name={name}
                defaultValue={getValues("featureTemplateId")}
                value={template}
                styles={customStyles}
              />
            )}
          />
          {!getValues("featureTemplateId") && (
            <Error errorName={errors.featureTemplateId} />
          )}
        </div>
        <div className="col-xl-3 mb-3">
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
          {t("submit")}
        </Button>
      </div>
    </div>
  );
};

export default UserForm;
