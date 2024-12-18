import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CustomInput from "../../../../components/Input/CustomInput";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import TimezoneSelect from "react-timezone-select";
import { currencyOptions } from "@/constants/options";
import { dayOptions } from "@/constants/options";
import { statusOptions } from "@/constants/options";
import { languageOptions } from "@/constants/options";
import { useTranslation } from "react-i18next";

import Error from "../../../../components/Error/Error";
import {
  timeFormatOptions,
  dateFormatOptions,
  weekStartDayOptions,
  unitOfDistanceOptions,
  preferredCurrencyUnitOptions,
  unitOfFuelOptions,
  fuelEconomyScalingOptions,
} from "@/constants/options";
import { useParams } from "react-router-dom";
import FileUploader from "../../../../components/FileUploader";

const UserSetting = ({
  setValue,
  handleSubmit,
  onSubmit,
  errors,
  control,
  register,
  formData,
  getValues,
}) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(null);

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  useEffect(() => {
    setValue(
      "dateFormat",
      formData?.[0].companyId?.dateFormat || dateFormatOptions[0].value
    );
    setValue(
      "unitOfDistance",
      formData?.[0].companyId?.unitOfDistance || unitOfDistanceOptions[0].value
    );
    setValue(
      "timeFormat",
      formData?.[0].companyId?.timeFormat || timeFormatOptions[0].value
    );
    setValue(
      "unitOfFuel",
      formData?.[0].companyId?.unitOfFuel || unitOfFuelOptions[0].value
    );
    setSelectedTimezone(
      formData?.[0].companyId?.timezone ||
        Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    setValue(
      "language",
      formData?.[0].companyId?.language || languageOptions[0].value
    );
    setValue(
      "status",
      formData?.[0].companyId?.status || statusOptions[0].value
    );
    setValue(
      "workStartDay",
      formData?.[0].companyId?.workStartDay || dayOptions[0].value
    );
    setValue(
      "currency",
      formData?.[0].companyId?.currency || currencyOptions[0].value
    );
    setLogo(formData?.[0].companyId?.file);
  }, []);

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("dateFormat")}</label>
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
                value={{
                  label: getValues("dateFormat"),
                  value: getValues("dateFormat"),
                }}
              />
            )}
          />
          <Error errorName={errors.dateFormat} />
        </div>

        <div className="col-xl-6 mb-3 ">
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
                value={{
                  label: getValues("timeFormat"),
                  value: getValues("timeFormat"),
                }}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("unitOfDistance")}</label>
          <Controller
            name="unitOfDistance"
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
                value={{
                  label: getValues("unitOfDistance"),
                  value: getValues("unitOfDistance"),
                }}
              />
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("unitOfFuel")}</label>
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
                value={{
                  label: getValues("unitOfFuel"),
                  value: getValues("unitOfFuel"),
                }}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("language")}</label>
          <Controller
            name="language"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("language", newValue.value)}
                options={languageOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{
                  label: getValues("language"),
                  value: getValues("language"),
                }}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("status")}</label>
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("status", newValue.value)}
                options={statusOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{
                  label: getValues("status"),
                  value: getValues("status"),
                }}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("worksStartDay")}</label>
          <Controller
            name="workStartDay"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>
                  setValue("workStartDay", newValue.value)
                }
                options={dayOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{
                  label: getValues("workStartDay"),
                  value: getValues("workStartDay"),
                }}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("currency")}</label>
          <Controller
            name="currency"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("currency", newValue.value)}
                options={currencyOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{
                  label: getValues("currency"),
                  value: getValues("currency"),
                }}
              />
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("timeZone")} </label>
          <Controller
            name="timezone"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <TimezoneSelect
                // onChange={(newValue) => setValue("unitOfFuel", newValue.value)}
                onChange={(timeZone) => {
                  setSelectedTimezone(timeZone);
                  setValue("timezone", timeZone.value);
                }}
                ref={ref}
                name={name}
                styles={customStyles}
                value={selectedTimezone}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t("uploadFile")}</label>
          <FileUploader
            register={register}
            label="Business Group File"
            name="file"
            className="form-control"
            setValue={setValue}
            setLoading={setLoading}
            loading={loading}
            link={logo}
          />
          {loading && <small>Uploading...</small>}
          <Error errorName={errors.companyLogo} />
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
          {t("submit")}
        </Button>
      </div>
    </div>
  );
};

export default UserSetting;
