import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
import CredentialsInput from "../../CredentialsInput";
import FormField from "../../FormField";
import UserLocation from "../../UserLocation";
import LocationSelector from "../../LocationSelector";

const MyAccount = ({
  data,
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
  const location = useLocation();
  const [logo, setLogo] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [dValues, setDvalues] = useState({});
  const { id } = useParams();

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
      setValue(
        "tradeLicenseNumber",
        dValues.businessGroupId?.tradeLicenseNumber
      );
      setValue("officeNumber", dValues.businessGroupId?.officeNumber);
      setValue("logo", dValues?.businessGroupId?.logo);
      setLogo(dValues?.businessGroupId?.logo);
      setValue("street2", dValues.businessGroupId?.street2);
      setValue("capacity", dValues.businessGroupId?.capacity);
      setValue("contactPerson", dValues.businessGroupId?.contactPerson);
      setValue("faxNumber", dValues?.businessGroupId?.faxNumber);
      setValue("zipCode", dValues.businessGroupId?.zipCode);
      setValue("dateFormat", dValues.businessGroupId?.dateFormat);
      setValue("timeFormat", dValues.businessGroupId?.timeFormat);
      setValue("timezone", dValues?.businessGroupId?.timezone);
      setValue("userInfo", dValues?.userInfo);
    } else {
      setValue("capacity", storageCapacityOptions[1].value);
      setValue("dateFormat", dateFormatOptions[0]?.value);
      setValue("timeFormat", timeFormatOptions[1]?.value);
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

  const handleLocationData = useCallback((data) => {
    setLocationData(data);
  }, []);

  return (
    <div className="p-4">
      <div className="row" style={{ width: "85%" }}>
        <UserLocation onLocationData={handleLocationData} />
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
            link={logo}
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
          getValues={getValues}
          locationData={locationData}
          dValues={dValues}
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
                styles={{
                  control: (base) => ({
                    ...base,
                    padding: ".25rem 0 ",
                  }),
                }}
                value={{ value, label: value }}
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

export default MyAccount;
