import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CustomInput from '../../Input/CustomInput'
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import TimezoneSelect from 'react-timezone-select'
import { currencyOptions } from "../VehicleTabs/Options";
import { dayOptions } from "../VehicleTabs/Options";
import { statusOptions } from "../VehicleTabs/Options";
import { languageOptions } from "../VehicleTabs/Options";
import {useTranslation} from 'react-i18next'
import {useLocation,useParams} from 'react-router-dom'

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
import { getValue } from "@testing-library/user-event/dist/utils";

const UserSetting = ({ setValue,getValues ,handleSubmit, onSubmit,errors, control, register }) => {
const {t} = useTranslation();
  const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [dValues, setDvalues] = useState([]);
  const location = useLocation();
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const { id } = useParams();
  useEffect(()=>{
    if (id) {
      const data = location.state[0];
      setDvalues(data);
    }
  },[id])
  useEffect(()=>{
    setValue('dateFormat',dValues?.dateFormat ? dValues?.dateFormat : dateFormatOptions[0].value)
    setValue('unitOfDistance',dValues?.unitOfDistance || unitOfDistanceOptions[0].value)
    setValue('timeFormat',dValues?.timeFormat || timeFormatOptions[0].value)
    setValue('unitOfFuel',dValues?.unitOfFuel || unitOfFuelOptions[0].value)
    setValue('language',dValues?.language || languageOptions[0].value)
    setValue('status',dValues?.status || statusOptions[0].value)
    setValue('workStartDay',dValues?.workStartDay || dayOptions[0].value)
    setValue('currency',dValues?.currency || currencyOptions[0].value)
  },[])


  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('dateFormat')}</label>
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
                value={{label:getValues("dateFormat"), value :getValues("dateFormat")}}
              />
            )}
          />
          <Error errorName={errors.dateFormat} />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('timeFormat')}</label>
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
                value={{label:getValues("timeFormat"), value :getValues("timeFormat")}}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('unitOfDistance')}</label>
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
                value={{label:getValues("unitOfDistance"), value :getValues("unitOfDistance")}}
              />
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('unitOfFuel')}</label>
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
                value={{label:getValues("unitOfFuel"), value :getValues("unitOfFuel")}}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('language')}</label>
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
                value={{label:getValues("language"), value :getValues("language")}}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('status')}</label>
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
                value={{label:getValues("status"), value :getValues("status")}}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('worksStartDay')}</label>
          <Controller
            name="worksstartday"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("worksstartday", newValue.value)}
                options={dayOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{label:getValues("workStartDay"), value :getValues("workStartDay")}}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('currency')}</label>
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
                value={{label:getValues("currency"), value :getValues("currency")}}
              />
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
        <label className="form-label">{t('timeZone')} </label>
          <Controller
            name="timezone"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <TimezoneSelect
                // onChange={(newValue) => setValue("unitOfFuel", newValue.value)}
                onChange={setSelectedTimezone}
                ref={ref}
                name={name}
                styles={customStyles}
                value={selectedTimezone}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3" >
          <label className="form-label">{t('uploadFile')}</label>
          <CustomInput
            type="file"
            register={register}
            label="Business Group Logo"
            name="businessGroupLogo"
            className="form-control"
          />
          <Error errorName={errors.businessGroupLogo} />
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
          {t('submit')}
        </Button>
      </div>
    </div>
  );
};

export default UserSetting;
