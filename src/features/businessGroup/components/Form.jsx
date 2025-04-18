import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Error from "@/components/Error/Error";
import CustomInput from "@/components/Input/CustomInput";
import "@/assets/scss/pages/_driver-tracking.scss";
import { dateFormatOptions, timeFormatOptions } from "@/constants/options";
import FileUploader from "@/components/FileUploader";
import CredentialsInput from "@/components/Input/CredentialsInput";
import UserDetailsForm from "@/components/Input/UserDetailsForm";
import LocationSelector from "@/components/Input/LocationSelector";
import useUserLocation from "@/hooks/useUserLocation";

const BusinessForm = ({
  setValue,
  getValues,
  register,
  onSubmit,
  handleSubmit,
  errors,
  control,
  isFormSubmitting,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "userInfo",
  });
  const [loading, setLoading] = useState(false);
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
      <div className="row" style={{ width: "85%" }}>
        <div>{locationError && <p>{locationError}</p>}</div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("businessGroupName")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="groupName"
            name="groupName"
            placeholder=""
            defaultValue={getValues("groupName")}
          />
          <Error errorName={errors.groupName} />
        </div>
        <div className="col-xl-3 mb-3 z-1">
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
        <div className="col-xl-3 mb-3 z-1">
          <label className="form-label">{t("officeNo")}</label>
          <CustomInput
            type="text"
            register={register}
            label="officeNumber"
            name="officeNumber"
            defaultValue={getValues("officeNumber")}
          />
          <Error errorName={errors.officeNumber} />
        </div>
        <span
          className="absolute"
          style={{
            position: "absolute",
            top: "23%",
            right: "-42%",
            overflow: "hidden",
          }}
        >
          <FileUploader
            setValue={setValue}
            register={register}
            label="Business Group Logo"
            name="logo"
            getValue={getValues}
            setLoading={setLoading}
            loading={loading}
            link={getValues("logo")}
          />
          <Error errorName={errors.logo} />
        </span>
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
          errors={errors}
          dValues={{
            country: getValues("country"),
            state: getValues("state"),
            city: getValues("city"),
          }}
          getValues={getValues}
          locationData={locationData}
          id={id}
          showCity={true}
          Comptype={"businessGroupId"}
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
                styles={{
                  control: (base) => ({
                    ...base,
                    padding: ".25rem 0 ",
                  }),
                }}
                value={dateFormatOptions.find(option => option.value === value) || dateFormatOptions[0]}
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
                styles={{
                  control: (base) => ({
                    ...base,
                    padding: ".25rem 0 ",
                  }),
                }}
                value={timeFormatOptions.find(option => option.value === value) || timeFormatOptions[1]}
                defaultValue={timeFormatOptions[1]}
              />
            )}
          />
        </div>
        <CredentialsInput
          heading={t("businessLoginDetails")}
          register={register}
          errors={errors}
          id={id}
          getValues={getValues}
        />
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
            {" "}
            ADD
          </Button>
        </div>
        {fields.map((field, index) => (
          <UserDetailsForm
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
          disabled={loading || isFormSubmitting}
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

export default BusinessForm;
