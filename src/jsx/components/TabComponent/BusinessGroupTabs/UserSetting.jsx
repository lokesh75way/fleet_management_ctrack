import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CustomInput from "../../Input/CustomInput";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import TimezoneSelect from "react-timezone-select";
import { currencyOptions, distanceCounterOptions } from "../VehicleTabs/Options";
import { dayOptions } from "../VehicleTabs/Options";
import { statusOptions } from "../VehicleTabs/Options";
import { languageOptions } from "../VehicleTabs/Options";
import { useTranslation } from "react-i18next";

import Error from "../../Error/Error";
import {
  timeFormatOptions,
  dateFormatOptions,
  weekStartDayOptions,
  unitOfDistanceOptions,
  preferredCurrencyUnitOptions,
  unitOfFuelOptions,
  fuelEconomyScalingOptions,
} from "../VehicleTabs/Options";
import { useLocation, useParams } from "react-router-dom";
import FileUploader from "../../../../components/FileUploader";

const UserSetting = ({
  setValue,
  handleSubmit,
  onSubmit,
  errors,
  control,
  register,
}) => {
  const [loading , setLoading] = useState(false);
  const { t } = useTranslation();
  const [dValues, setDvalues] = useState({});
  const [selectedTimezone, setSelectedTimezone] = useState(
     dValues?.businessGroupId?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const location = useLocation();
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const data = location.state[0];
      setDvalues(data);
    }
  }, [id]);
  useEffect(() => {
    if (dValues && id) {
      setValue("dateFormat", dValues.businessGroupId?.dateFormat);
      setValue("timeFormat", dValues.businessGroupId?.timeFormat);
      setValue("unitOfDistance", dValues.businessGroupId?.unitOfDistance)
      setValue("workStartDay", dValues.businessGroupId?.workStartDay);
      setValue("language", dValues.businessGroupId?.language);
      setValue("status", dValues.businessGroupId?.status);
      setValue("currency", dValues.businessGroupId?.currency);
      setValue("timezone",dValues.businessGroupId?.timezone)
      setValue("unitOfFuel",dValues.businessGroupId?.unitOfFuel)
    }
    else{
      setValue('unitOfDistance',unitOfDistanceOptions[0]?.value)
      setValue('unitOfFuel',unitOfFuelOptions[0]?.value)
      setValue('language', languageOptions[0]?.value );
      setValue('dateFormat',dateFormatOptions[0]?.value);
      setValue('timeFormat',timeFormatOptions[0]?.value)
      setValue('status',statusOptions[0]?.value);
      setValue('currency',currencyOptions[0]?.value)
      setValue('workStartDay', weekStartDayOptions[0]?.value)
    }
  }, [dValues, id]);

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
                onChange={(newValue) => setValue("dateFormat", newValue?.value)}
                options={dateFormatOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{ value, label: value }}
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
                value={{value , label : value}}
                defaultValue={timeFormatOptions[0]}
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
                value={{value, label : value}}
             
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
                value={{value , label :value}}
                defaultValue={unitOfFuelOptions[0]}
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
                value={{ value, label: value }}
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
                value={{ value, label: value }}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{("Work Start Day")}</label>
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
                value={{ label: value, value }}
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
                value={{value, label : value}}
                defaultValue={currencyOptions[0]}
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
                onChange={setSelectedTimezone}
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
          />
          {loading && <small>Uploading...</small>}
          <Error errorName={errors.file} />
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
          disabled={loading}
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
