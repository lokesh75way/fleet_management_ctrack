import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";
import DummyData from "../../../../users.json";
import useStorage from "../../../../hooks/useStorage";
import AsyncSelect from "react-select/async";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  currencyOptions,
  dateFormatOptions,
  storageCapacityOptions,
  timeFormatOptions,
  weekStartDayOptions,
} from "../VehicleTabs/Options";
import { getGroups } from "../../../../services/api/BusinessGroup";
import { businessGroupOptions } from "../../ReusableApi/Api";
import FileUploader from "../../../../components/FileUploader";
import GroupDropdown from "../../GroupDropdown";
import { LuEye, LuEyeOff } from "react-icons/lu";
import CredentialsInput from "../../CredentialsInput";
import FormField from "../../FormField";
import LocationSelector from "../../LocationSelector";
import UserLocation from "../../UserLocation";
const MyAccount = ({
  setValue,
  getValues,
  register,
  onSubmit,
  handleSubmit,
  errors,
  control,
  formData,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "userInfo",
  });
  const [loading, setLoading] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState();
  const [selectStateName, setSelectStateName] = useState({
    name: "",
  });
  const { t } = useTranslation();
  const { checkRole, checkUserName } = useStorage();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [tempValue, setTempValue] = useState();
  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const [bussinessGpLable, setBussinessGpLable] = useState(null);
  const [isBuisnessGroupDisabled, setIsBuisnessGroupDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [logo, setLogo] = useState(null);
  const role = localStorage.getItem("role");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  useEffect(() => {
    // getBusinessGroup()
    businessGroupOptions();
  }, []);

  const companyOptions = DummyData.filter(
    (item) => item.role === "company"
  ).map((item) => ({
    label: item.country,
    value: item.country,
  }));

  useEffect(() => {
    if (checkRole() !== "SUPER_ADMIN") {
      setIsBuisnessGroupDisabled(true);
    }
    if (userDetails?.user?.role === "BUSINESS_GROUP") {
      setValue("businessGroupId", userDetails?.user?.businessGroupId[0]?._id);
    }
  }, []);

  const { id } = useParams();

  useEffect(() => {
    if (formData && id) {
      setValue(
        "businessGroupId",
        formData?.[0].companyId?.businessGroupId?._id
      );
      setValue("companyName", formData[0].companyId?.companyName);
      setValue("userName", formData[0].userName);
      setValue("email", formData[0].email);
      setValue("tradeLicenseNumber", formData[0].companyId?.tradeLicenseNumber);
      setValue("officeNumber", formData[0].companyId?.officeNumber);
      setValue("mobileNumber", formData[0].mobileNumber);
      setValue("helpDeskEmail", formData[0].companyId?.helpDeskEmail);
      setValue(
        "whatsappContactNumber",
        formData[0].companyId?.whatsappContactNumber
      );
      setValue(
        "helpDeskTelephoneNumber",
        formData[0].companyId?.helpDeskTelephoneNumber
      );
      setValue("street1", formData[0].companyId?.street1);
      setValue("street2", formData[0].companyId?.street2);
      setValue("contactPerson", formData[0].companyId?.contactPerson);
      setValue("faxNumber", formData[0].companyId?.faxNumber);
      setValue("zipCode", formData[0].companyId?.zipCode);
      setValue("storageCapacity", formData[0].companyId.storageCapacity);
      setValue("country", formData[0].country);
      setValue("state", formData[0].state || "");
      setDefaultCountry({ name: formData[0].country });
      setSelectStateName({ name: formData[0].state || "" });
      setBussinessGpLable(formData?.[0].companyId?.businessGroupId?.groupName);
      setLogo(formData?.[0].companyId?.logo);
      setValue(
        "dateFormat",
        formData?.[0].companyId?.dateFormat || dateFormatOptions[0].value
      );
      setValue(
        "timeFormat",
        formData?.[0].companyId?.timeFormat || timeFormatOptions[0].value
      );

      setValue("userInfo", formData?.[0]?.userInfo);
      setValue("workStartDay", formData?.companyId?.workStartDay);
      setValue("currency", formData?.companyId?.currency);
    } else {
      setValue("storageCapacity", storageCapacityOptions[1].value);
      setValue("dateFormat", dateFormatOptions[0]?.value);
      setValue("timeFormat", timeFormatOptions[1]?.value);
      setValue("workStartDay", weekStartDayOptions[1]?.value);
      setValue("currency", currencyOptions[1]?.value);
    }
  }, [formData, id]);
  const handleAddForm = () => {
    append({
      name: "",
      designation: "",
      mobileNumber: null,
      email: "",
    });
  };
  const handleLocationData = useCallback((data) => {
    setLocationData(data);
  }, []);
  return (
    <div className="p-4">
      <div className="row" style={{ width: "85%" }}>
      <UserLocation onLocationData={handleLocationData} />
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("businessGroup")}
            <span className="text-danger">*</span>
          </label>
          <Controller
            name="businessGroupId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <GroupDropdown
                onChange={(newValue) => {
                  setBussinessGpLable(newValue.value);
                  setValue("businessGroupId", newValue.value);
                }}
                value={value}
                ref={ref}
                isDisabled={isBuisnessGroupDisabled}
                name={name}
                customStyles={customStyles}
              />
            )}
          />
          {!getValues("businessGroupId") && (
            <Error errorName={errors.businessGroupId} />
          )}
        </div>
        <div className="col-xl-3 mb-3 z-1">
          <label className="form-label">
            {t("companyName")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            required
            label="Company Name"
            name="companyName"
            defaultValue={getValues("companyName")}
            placeholder=""
          />
          <Error errorName={errors.companyName} />
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
        <span
          className="absolute"
          style={{     position: 'absolute',
            top: '23%',
            right: '-42%',
            overflow: 'hidden'}}
        >
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
        </span>
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
          <Error errorName={errors.officeNo} />
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
          errors={errors}
          getValues={getValues}
          locationData={locationData}
          dValues={formData?.[0]}
          id={id}
          showCity={true}
          Comptype={'companyId'}
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
                value={{ value, label: value }}
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
                value={{ value, label: value }}
                defaultValue={timeFormatOptions[1]}
              />
            )}
          />
        </div>

        <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t("workStartDay")}</label>
          <Controller
            name="workStartDay"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("workStartDay", newValue.value)}
                options={weekStartDayOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{ value, label: value }}
                defaultValue={weekStartDayOptions[1]}
              />
            )}
          />
        </div>

        <div className="col-xl-3 mb-3 ">
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
                value={{ value, label: value }}
                defaultValue={currencyOptions[1]}
              />
            )}
          />
        </div>
        
        <CredentialsInput
          heading="Company Login Details"
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
          <h3>Contact Details</h3>
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
        disabled={loading}
          type="submit"
          onClick={handleSubmit(onSubmit)}
          style={{ width: "10%" }}
        >
         {t("submit")}
        </Button>
      </div>
    </div>
  );
};

export default MyAccount;
