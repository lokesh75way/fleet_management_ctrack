import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";
import "../../../../scss/pages/_driver-tracking.scss";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { storageCapacityOptions } from "../VehicleTabs/Options";
import FileUploader from "../../../../components/FileUploader";

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
  const [dValues, setDvalues] = useState({});
  const { id } = useParams();

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
      setValue("street2", dValues.businessGroupId?.street2);
      setValue("capacity", dValues.businessGroupId?.capacity);
      setValue("contactPerson", dValues.businessGroupId?.contactPerson);
      setValue("faxNumber", dValues?.businessGroupId?.faxNumber);
      setValue("zipCode", dValues.businessGroupId?.zipCode);
      setValue("city", dValues.businessGroupId?.city);
      setDefaultCountry({ name: dValues.country });
      setValue("country", dValues.country);
      setSelectStateName({ name: dValues.state || "" });
      setValue("state", dValues.state || "");
    } else {
      setValue("capacity", storageCapacityOptions[1].value);
    }
  }, [dValues, id]);

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
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
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("username")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="userName"
            name="userName"
            placeholder=""
            defaultValue={getValues("userName")}
          />
          <Error errorName={errors.userName2} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("email")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            name="email"
            label="email"
            placeholder=""
            defaultValue={getValues("email")}
          />
          <Error errorName={errors.email} />
        </div>
        {!id && (
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">
              {t("password")}
              <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="password"
              register={register}
              name="password"
              label="password"
              placeholder=""
              defaultValue={getValues("password")}
            />
            <Error errorName={errors.password} />
          </div>
        )}
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("helpDeskEmail")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            name="helpDeskEmail"
            label="Help Desk Email"
            placeholder=""
            defaultValue={getValues("helpDeskEmail")}
          />
          <Error errorName={errors.helpDeskEmail} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("helpDeskTelephoneNumber")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            className="form-control"
            label="Help Desk Telephone Number"
            name="helpDeskTelephoneNumber"
            placeholder=""
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            defaultValue={getValues("helpDeskTelephoneNumber")}
          />
          <Error errorName={errors.helpDeskTelephoneNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("mobileNumber")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            name="mobileNumber"
            label="Mobile Number"
            placeholder=""
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            defaultValue={getValues("mobileNumber")}
          />
          <Error errorName={errors.mobileNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("whatsappContactNumber")}</label>
          <CustomInput
            type="number"
            register={register}
            className="form-control"
            label="Whatsapp Contact Number"
            name="whatsappContactNumber"
            placeholder=""
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            defaultValue={getValues("whatsappContactNumber")}
          />
        </div>
        <div className="col-xl-6 mb-3">
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
            isStateDisabled ? "col-xl-6 mb-3 pe-none" : "col-xl-6 mb-3"
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
        <div className="col-xl-6 mb-3">
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
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            {t("zipCode")}
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Zip Code"
            name="zipCode"
            placeholder=""
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            defaultValue={getValues("zipCode")}
          />
          <Error errorName={errors.zipCode} />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("storageCapacity")}</label>
          <Controller
            name="capacity"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("capacity", newValue.value)}
                options={storageCapacityOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{ label: value, value }}
                // def={storageCapacityOptions[0]}
              />
            )}
          />

          <p style={{ fontStyle: "italic" }}>
            {t("forMoreThan120DaysPlease")}
            <a href="#" class="link-primary">
              {t("contact")}
            </a>{" "}
            {t("yourAccountManager")}
          </p>
        </div>

        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("street1")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street1"
            name="street1"
            placeholder=""
            defaultValue={getValues("street1")}
          />
          <Error errorName={errors.street1} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("street2")}
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street2"
            name="street2"
            placeholder=""
            defaultValue={getValues("street2")}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("contactPerson")}</label>
          <CustomInput
            type="text"
            register={register}
            label="Contact Person"
            name="contactPerson"
            placeholder=""
            defaultValue={getValues("contactPerson")}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            {t("faxNumber")}
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Fax Number"
            name="faxNumber"
            placeholder=""
            defaultValue={getValues("faxNumber")}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t("uploadLogo")}</label>
          <FileUploader
            setValue={setValue}
            register={register}
            label="Business Group Logo"
            name="logo"
            getValue={getValues}
            setLoading={setLoading}
            loading={loading}
          />
          {loading && <small>Uploading...</small>}

          <Error errorName={errors.logo} />
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
          {/* {t('Next')} */}
          Next
        </Button>
      </div>
    </div>
  );
};

export default MyAccount;
