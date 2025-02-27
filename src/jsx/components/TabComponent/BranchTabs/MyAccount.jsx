import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import Error from "../../../../components/Error/Error";
import CustomInput from "../../../../components/Input/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAllGroups } from "@/features/businessGroup/api";
import { getCompany } from "../../../../services/api/CompanyServices";
import GroupDropdown from "../../../../features/businessGroup/components/DropDownList";
import CompanyDropdown from "../../../../features/company/components/DropDownList";
import FormField from "../../../../components/Input/UserDetailsForm";
import { dateFormatOptions, timeFormatOptions } from "@/constants/options";
import LocationSelector from "../../../../components/Input/LocationSelector";
import useUserLocation from "@/hooks/useUserLocation";
import { getBranchById } from "@/features/branch/api";
import { useQuery } from "@tanstack/react-query";
import { notifyError } from "@/utils/toast";
import Spinner from "../../Spinner";

const customStyles = {
  control: (base) => ({
    ...base,
    padding: ".25rem 0 ",
  }),
};

const MyAccount = ({
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
  const [groupId, setGroupId] = useState(null);
  const [businessDisabled, setBusinessDisabled] = useState(false);
  const [companyDisabled, setCompanyDisabled] = useState(true);
  const { t } = useTranslation();
  const { id } = useParams();
  const { location: locationData, error: locationError } = useUserLocation();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const { data, isError } = useQuery({
    queryKey: ["branch", id],
    queryFn: () => getBranchById(id),
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
      setFormData(data);
    }
  }, [data]);

  useEffect(() => {
    if (formData && id) {
      setValue("businessGroupId", formData.businessGroupId?._id);
      setGroupId(formData?.businessGroupId?._id);
      // setBusinessDisabled(true);
      setValue("companyId", formData?.companyId?._id);
      setValue("branchName", formData?.branchName);
      setValue("email", formData?.email);
      setValue("officeNumber", formData?.officeNumber);
      setValue("companyId", formData.companyId?._id);
      setValue("tradeLicenseNumber", formData?.tradeLicenseNumber);
      setValue("country", formData.country);
      setValue("zipCode", formData.zipCode);
      setValue("street1", formData.street1);
      setValue("street2", formData.street2);
      setValue("country", formData.country);
      setValue("state", formData.state);
      setValue("userInfo", formData.userInfo);
      setValue("dateFormat", formData.dateFormat);
      setValue("timeFormat", formData.timeFormat);
    } else {
      setValue("dateFormat", dateFormatOptions[0]?.value);
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
      <div className="row" style={{ width: "85%", margin: "auto" }}>
        <div>{locationError && <p>{locationError}</p>}</div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t("businessGroup")}</label>
          <span className="text-danger">*</span>
          {id ? (
            <Controller
              name="businessGroupId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <GroupDropdown
                  onChange={async (newValue) => {
                    await setValue("businessGroupId", newValue.value);
                    setGroupId(newValue.value);
                    setValue("companyName", "");
                    setValue("companyId", "");
                  }}
                  value={value}
                  customStyles={customStyles}
                  ref={ref}
                  isDisabled={businessDisabled}
                  name={name}
                />
              )}
            />
          ) : (
            <Controller
              name="businessGroupId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <GroupDropdown
                  onChange={async (newValue) => {
                    await setValue("businessGroupId", newValue.value);
                    setGroupId(newValue.value);
                    setValue("companyName", "");
                    setValue("companyId", "");
                  }}
                  value={value}
                  customStyles={customStyles}
                  ref={ref}
                  isDisabled={businessDisabled}
                  name={name}
                />
              )}
            />
          )}
          {!getValues("businessGroupId") && (
            <Error errorName={errors.businessGroupId} />
          )}
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("company")}
            <span className="text-danger">*</span>
          </label>
          {id ? (
            <Controller
              name="companyId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <CompanyDropdown
                  key={groupId}
                  groupId={groupId}
                  onChange={async (newValue) => {
                    onChange(newValue);
                    setValue("companyName", newValue.label);
                  }}
                  value={value}
                  customStyles={customStyles}
                  ref={ref}
                  isDisabled={groupId ? false : true}
                  name={name}
                />
              )}
            />
          ) : (
            <Controller
              name="companyId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <CompanyDropdown
                  key={groupId}
                  groupId={groupId}
                  onChange={async (newValue) => {
                    await setValue("companyId", newValue.value);
                    setValue("companyName", newValue.label);
                  }}
                  value={value}
                  customStyles={customStyles}
                  ref={ref}
                  isDisabled={groupId ? false : true}
                  name={name}
                />
              )}
            />
          )}

          {!getValues("companyId") && <Error errorName={errors.companyId} />}
        </div>
        {/* <div className="col-xl-3 mb-3">
          <label className="form-label">{t("parentBranch")}</label>
          <Controller
            name="parent"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <ParentBranchDropdown
                key={companyId}
                companyId={companyId}
                onChange={async (newValue) => {
                  setValue("parentBranchId", newValue.value);
                  setValue("parentBranch", newValue.value);
                  setValue("parent", newValue.value);
                }
                }
                value={value}
                customStyles={customStyles}
                ref={ref}
                isDisabled={false}
                name={name}
              />
            )}
          />
          {!getValues("parentBranch") && (
            <Error errorName={errors.parentBranch} />
          )}
        </div> */}
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
          errors={errors}
          getValues={getValues}
          locationData={locationData}
          dValues={formData}
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
          disabled={isFormSubmitting}
          onClick={handleSubmit(onSubmit)}
          style={{ width: "10%" }}
        >
          {isFormSubmitting ? <Spinner/> : t("submit")}
        </Button>
      </div>
    </div>
  );
};

export default MyAccount;
