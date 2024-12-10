import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import Error from "@/components/Error/Error";
import CustomInput from "@/components/Input/CustomInput";
import {
  dateFormatOptions,
  storageCapacityOptions,
  timeFormatOptions,
} from "@/constants/options";
import FileUploader from "@/components/FileUploader";
import GroupDropdownList from "@/features/businessGroup/components/DropDownList";
import CredentialsInput from "@/components/Input/CredentialsInput";
import FormField from "@/components/Input/UserDetailsForm";
import LocationSelector from "@/components/Input/LocationSelector";
import useUserLocation from "@/hooks/useUserLocation";
import { getCompanyById } from "../api";
import { notifyError } from "@/utils/toast";

const customStyles = {
  control: (base) => ({
    ...base,
    padding: ".25rem 0 ", // Adjust the height as needed
  }),
};

const CompanyForm = ({
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
  const { location: locationData, error: locationError } = useUserLocation();
  const [logo, setLogo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState();

  // TODO: show loading state in UI
  const { data, isError } = useQuery({
    queryKey: ["company", id],
    queryFn: () => getCompanyById(id),
    enabled: !!id,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError && !!id) {
      notifyError("Not able to fetch company data");
      navigate("/not-found");
    }
  }, [isError && id]);

  useEffect(() => {
    if (id && data) {
      // TODO: set directly to form instead of state
      setFormData(data);
    }
  }, [data]);

  useEffect(() => {
    if (formData && id) {
      setValue("businessGroupId", formData?.companyId?.businessGroupId?._id);
      setValue("companyName", formData.companyId?.companyName);
      setValue("userName", formData.userName);
      setValue("email", formData.email);
      setValue("tradeLicenseNumber", formData.companyId?.tradeLicenseNumber);
      setValue("officeNumber", formData.companyId?.officeNumber);
      setValue("mobileNumber", formData.mobileNumber);
      setValue("helpDeskEmail", formData.companyId?.helpDeskEmail);
      setValue(
        "whatsappContactNumber",
        formData.companyId?.whatsappContactNumber
      );
      setValue(
        "helpDeskTelephoneNumber",
        formData.companyId?.helpDeskTelephoneNumber
      );
      setValue("street1", formData.companyId?.street1);
      setValue("street2", formData.companyId?.street2);
      setValue("contactPerson", formData.companyId?.contactPerson);
      setValue("faxNumber", formData.companyId?.faxNumber);
      setValue("zipCode", formData.companyId?.zipCode);
      setValue("storageCapacity", formData.companyId.storageCapacity);
      setValue("country", formData.country);
      setValue("state", formData.state || "");
      setLogo(formData?.companyId?.logo);
      setValue(
        "dateFormat",
        formData?.companyId?.dateFormat || dateFormatOptions.value
      );
      setValue(
        "timeFormat",
        formData?.companyId?.timeFormat || timeFormatOptions.value
      );

      setValue("userInfo", formData?.userInfo);
    } else {
      setValue("storageCapacity", storageCapacityOptions[1].value);
      setValue("dateFormat", dateFormatOptions?.value);
      setValue("timeFormat", timeFormatOptions[1]?.value);
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

  return (
    <div className="p-4">
      <div className="row" style={{ width: "85%" }}>
        <div>{locationError && <p>{locationError}</p>}</div>
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
              <GroupDropdownList
                onChange={async (newValue) => {
                  await setValue("businessGroupId", newValue.value);
                }}
                value={value}
                ref={ref}
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
          errors={errors}
          getValues={getValues}
          locationData={locationData}
          dValues={formData}
          id={id}
          showCity={true}
          Comptype={"companyId"}
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
        <CredentialsInput
          heading={t("companyLoginDetails")}
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
          disabled={loading || isFormSubmitting}
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

export default CompanyForm;
