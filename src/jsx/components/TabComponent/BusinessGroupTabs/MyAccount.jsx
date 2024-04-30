import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";
import "../../../../scss/pages/_driver-tracking.scss";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  dateFormatOptions,
  storageCapacityOptions,
  timeFormatOptions,
} from "../VehicleTabs/Options";
import FileUploader from "../../../../components/FileUploader";
import { LuEye, LuEyeOff } from "react-icons/lu";
import TimezoneSelect from "react-timezone-select";
import { IMAGES, SVGICON } from "../../../constant/theme";
import CredentialsInput from "../../CredentialsInput";
import { get } from "react-scroll/modules/mixins/scroller";
import FormField from "../../FormField";

const MyAccount = ({
  data,
  setValue,
  getValues,
  register,
  onSubmit,
  handleSubmit,
  errors,
  control,
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
  const location = useLocation();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const [logo, setLogo] = useState(null);
  const [dValues, setDvalues] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState(
    dValues?.businessGroupId?.timezone ||
      Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const { id } = useParams();
  // const [formData, setFormData] = useState([{}]); // State to store form data

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };
  useEffect(() => {
    if (id) {
      const data = location.state[0];
      setDvalues(data);
     
    }
  }, [id]);
console.log(dValues,"item")
  useEffect(() => {
    if (dValues && id) {
      setValue("groupName", dValues.businessGroupId?.groupName);
      setValue("userName", dValues.userName);
      setValue("email", dValues.email);
      setValue("mobileNumber", dValues.mobileNumber);
      setValue(
        "whatsappContactNumber",
        dValues.businessGroupId?.whatsappContactNumber
      );
      setValue("helpDeskEmail", dValues.businessGroupId?.helpDeskEmail);
      setValue(
        "helpDeskTelephoneNumber",
        dValues.businessGroupId?.helpDeskTelephoneNumber
      );
      setValue("street1", dValues.businessGroupId?.street1);
      setValue("tradeLicenseNumber", dValues.businessGroupId?.tradeLicenseNumber);
      setValue("officeNo", dValues.businessGroupId?.tradeLicenseNumber);
      setValue("logo", dValues?.businessGroupId?.logo);
      setLogo(dValues?.businessGroupId?.logo);
      setValue("street2", dValues.businessGroupId?.street2);
      setValue("capacity", dValues.businessGroupId?.capacity);
      setValue("contactPerson", dValues.businessGroupId?.contactPerson);
      setValue("faxNumber", dValues?.businessGroupId?.faxNumber);
      setValue("zipCode", dValues.businessGroupId?.zipCode);
      setValue("city", dValues.city);
      setDefaultCountry({ name: dValues.country });
      setValue("country", dValues.country);
      setSelectStateName({ name: dValues.state || "" });
      setValue("state", dValues.state || "");
      setValue("dateFormat", dValues.businessGroupId?.dateFormat);
      setValue("timeFormat", dValues.businessGroupId?.timeFormat);
      setValue("timezone",dValues?.businessGroupId?.timezone)
      setValue('userInfo', dValues?.userInfo)
    } else {
      setValue("capacity", storageCapacityOptions[1].value);
    }
  }, [dValues, id]);

  const handleAddForm = () => {
    append({
      name: "",
      designation: "",
      mobileNumber: null,
      email: "",
    });
  };

  console.log(errors, "erros:-", getValues());

  return (
    <div className="p-4">
      <div className="row" style={{ width: "85%", margin: "auto" }}>
      
        <div className="col-xl-4 mb-3 ">
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
          <Error errorName={errors.userName} />
        </div>
        <div className="col-xl-4 mb-3 ">
          <label className="form-label">
            {t("tradeLicenseNumber")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="tradeLicenseNumber"
            name="tradeLicenseNumber"
            placeholder=""
            defaultValue={getValues("tradeLicenseNumber")}
          />
          <Error errorName={errors.userName} />
        </div>
        <div className="col-xl-4 mb-3">
          <label className="form-label">{t("uploadLogo")}</label>
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
          {loading && <small>Uploading...</small>}

          <Error errorName={errors.logo} />
        </div>
        <div className="col-xl-4 mb-3 ">
          <label className="form-label">
            {t("officeNo")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="officeNo"
            name="officeNo"
            placeholder=""
            defaultValue={getValues("officeNo")}
          />
          <Error errorName={errors.officeNo} />
        </div>
        <div className="col-xl-4 mb-3 ">
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
            defaultValue={
              getValues('email')
            }
            disabled={id ? true : false}
          />
          <Error errorName={errors.email} />
        </div>
        <div className="col-xl-4 mb-3">
          <label className="form-label">
            {t("country")}
            <span className="text-danger">*</span>
          </label>
          <CountrySelect
            onChange={(e) => {
              setSelectStateName({ name: "" });
              setCountryid(e.id);
              setValue("country", e.name);
              setIsStateDisabled(false);
            }}
            containerClassName="bg-white"
            inputClassName="border border-white customSelectHeight"
            placeHolder="Select Country"
            defaultValue={defaultCountry}
          />
          {!getValues("country") && <Error errorName={errors.country} />}
        </div>
        <div
          className={`${
            isStateDisabled ? "col-xl-4 mb-3 pe-none" : "col-xl-4 mb-3"
          }`}
        >
          <label className="form-label">{t("state")}</label>
          <div style={{ background: "white" }}>
            <StateSelect
              countryid={isStateDisabled ? 0 : countryid}
              onChange={(e) => {
                setstateid(e.id);
                setValue("state", e.name);
              }}
              containerClassName="bg-white"
              inputClassName="border border-white customSelectHeight"
              placeHolder="Select State"
              defaultValue={selectStateName}
            />
          </div>
        </div>
        <div className="col-xl-4 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("city")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="City"
            name="city"
            placeholder=""
            defaultValue={getValues("city")}
          />
          <Error errorName={errors.city} />
        </div>
        <div className="col-xl-4 mb-3 ">
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

        <div className="col-xl-4 mb-3 ">
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
                defaultValue={timeFormatOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-4 mb-3 ">
          <label className="form-label">{t("timeZone")} </label>
          <Controller
            name="timezone"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <TimezoneSelect
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
       {/* <div className="col-xl-4 mb-3 ">
                <img key={logo} height={100} width={100} src={logo ? logo : IMAGES.Tab1} alt="logo"/>
        </div> */}

        <CredentialsInput
          heading="Business Admin Login"
          register={register}
          errors={errors}
          id={id}
          getValues={getValues}
        />

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            margin: "2rem 0",
          }}
        >
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
          type="submit"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
          style={{ width: "10%" }}
        >
          {" "}
          {/* {t('Next')} */}
          submit
        </Button>
      </div>
    </div>
  );
};

export default MyAccount;
