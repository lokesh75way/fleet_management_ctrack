import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Error from "@/components/Error/Error";
import CustomInput from "@/components/Input/CustomInput";
import GroupDropdown from "@/features/businessGroup/components/DropDownList";
import CompanyDropdown from "@/features/company/components/DropDownList";
import FormField from "@/components/Input/UserDetailsForm";
import { dateFormatOptions, timeFormatOptions } from "@/constants/options";
import LocationSelector from "@/components/Input/LocationSelector";
import useUserLocation from "@/hooks/useUserLocation";

const customStyles = {
  control: (base) => ({
    ...base,
    padding: ".25rem 0 ",
  }),
};

const BranchForm = ({
  setValue,
  getValues,
  register,
  onSubmit,
  handleSubmit,
  errors,
  control,
  isFormSubmitting,
  watch,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "userInfo",
  });
  const [company, setCompany] = useState();
  const { t } = useTranslation();
  const { id } = useParams();
  const { location: locationData, error: locationError } = useUserLocation();

  const handleAddForm = () => {
    append({
      name: "",
      designation: "",
      mobileNumber: null,
      email: "",
    });
  };

  return (
    <div className="p-4">
      <div className="row" style={{ width: "85%", margin: "auto" }}>
        <div>{locationError && <p>{locationError}</p>}</div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t("businessGroup")}</label>
          <span className="text-danger">*</span>

          <Controller
            name="businessGroupId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <GroupDropdown
                onChange={(newValue) => {
                  if (getValues("businessGroupId") != newValue.value) {
                    setValue("businessGroupId", newValue.value);
                    setValue("companyName", "");
                    setValue("companyId", "");
                    setCompany(null);
                  }
                }}
                defaultValue={value}
                customStyles={customStyles}
                ref={ref}
                name={name}
              />
            )}
          />

          {!getValues("businessGroupId") && (
            <Error errorName={errors.businessGroupId} />
          )}
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("company")}
            <span className="text-danger">*</span>
          </label>

          <Controller
            name="companyId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <CompanyDropdown
                groupId={watch("businessGroupId")}
                onChange={(newValue) => {
                  setValue("companyId", newValue.value);
                  setValue("companyName", newValue.label);
                  setCompany(newValue);
                }}
                defaultValue={value}
                value={company}
                customStyles={customStyles}
                ref={ref}
                name={name}
              />
            )}
          />

          {!getValues("companyId") && <Error errorName={errors.companyId} />}
        </div>

        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("branchName")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            required
            label="Branch Name"
            name="branchName"
            placeholder=""
            defaultValue={getValues("branchName")}
          />
          <Error errorName={errors.branchName} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t("tradeLicenseNumber")}</label>
          <CustomInput
            type="text"
            register={register}
            label="tradeLicenseNumber"
            name="tradeLicenseNumber"
            placeholder=""
            defaultValue={getValues("tradeLicenseNumber")}
          />
          <Error errorName={errors.tradeLicenseNumber} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t("officeNo")}</label>
          <CustomInput
            type="text"
            register={register}
            label="officeNumber"
            name="officeNumber"
            placeholder=""
            defaultValue={getValues("officeNumber")}
          />
          <Error errorName={errors.officeNumber} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("email")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            label="Email"
            name="email"
            placeholder=""
            defaultValue={getValues("email")}
            disabled={id ? true : false}
          />
          <Error errorName={errors.email} />
        </div>
        <LocationSelector
          register={register}
          setValue={setValue}
          dValues={{
            country: getValues("country"),
            state: getValues("state"),
            city: getValues("city"),
          }}
          errors={errors}
          getValues={getValues}
          locationData={locationData}
          id={id}
          showCity={true}
          Comptype={""}
        />
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t("dateFormat")}</label>
          <Controller
            name="dateFormat"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("dateFormat", newValue?.value)}
                options={dateFormatOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={
                  dateFormatOptions.find((option) => option.value === value) ||
                  dateFormatOptions[0]
                }
                defaultValue={dateFormatOptions[0]}
              />
            )}
          />
          <Error errorName={errors.dateFormat} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t("timeFormat")}</label>
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
                value={
                  timeFormatOptions.find((option) => option.value === value) ||
                  timeFormatOptions[1]
                }
                defaultValue={timeFormatOptions[1]}
              />
            )}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            margin: "2rem 0",
          }}
        >
          <h3>{t("contactDetails")}</h3>
          <Button
            type="button"
            onClick={handleAddForm}
            style={{ width: "10%" }}
          >
            {t("add")}
          </Button>
        </div>
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            field={field}
            index={index}
            register={register}
            getValues={getValues}
            errors={errors}
            fields={fields}
            remove={remove}
            id={id}
          />
        ))}
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

export default BranchForm;
