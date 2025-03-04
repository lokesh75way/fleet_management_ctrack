import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../../../components/Error/Error";
import {
  deviceTypeOptions,
  copyFromOptions,
  distanceCounterOptions,
  unitOfDistanceOptions,
  speedDetectionOptions,
} from "../../../../constants/options";
import AsyncSelect from "react-select/async";
import CustomInput from "../../../../components/Input/CustomInput";
import DummyData from "../../../../users.json";
import useStorage from "../../../../hooks/useStorage";
import { useParams } from "react-router-dom";
import { getCompany } from "../../../../services/api/CompanyServices";
import { getGroups } from "../../../../features/businessGroup/api";
import { allCompanyOptions, businessGroupOptions } from "../../ReusableApi/Api";
import { useTranslation } from "react-i18next";

import CompanyDropdown from "../../../../features/company/components/DropDownList";
import BranchDropdown from "../../BranchDropdown";
import GroupDropdown from "../../../../features/businessGroup/components/DropDownList";
import ParentBranchDropdown from "../../ParentBranch";

const General = ({
  register,
  setValue,
  getValues,
  errors,
  control,
  handleSubmit,
  onSubmit,
  formData,
}) => {
  const [groupId, setGroupId] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  const [businessDisabled, setBusinessDisabled] = useState(false);
  const [companyDisabled, setCompanyDisabled] = useState(false);

  const { checkRole, checkUserName } = useStorage();

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const { id } = useParams();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  // const newData = userData?.filter((data) => data.id == parseInt(id, 10));
  const [filteredUserData, setFilteredUserData] = useState([]);
  const [isBuisnessGroupDisabled, setIsBuisnessGroupDisabled] = useState(false);

  const role = checkRole();

  const { t } = useTranslation();
  useEffect(() => {
    if (formData && id) {
      setValue("businessGroupId", formData?.businessGroupId);
      setGroupId(formData?.businessGroupId);
      setValue("companyId", formData.companyId);
      setCompanyId(formData.companyId);
      setValue("imeiNumber", formData?.imeiNumber);

      setValue("vehicleName", formData?.vehicleName);
      setValue("plateNumber", formData?.plateNumber);
      setValue("branchId", formData[0]?.branchId?._id);
      // setValue(
      //   "branch",
      //   formData??.branchId.map((branch) => branch._id)
      // );
      setValue("simNumber", formData?.simNumber);
      setValue("secondrySimNumber", formData?.secondrySimNumber);
      setValue("IMEINumber", formData?.IMEINumber);
      setValue("registrationNumber", formData?.registrationNumber);
      setValue("weightCapacity", formData?.weightCapacity);
      setValue("deviceType", formData?.deviceType);
      setValue("serverAddress", formData?.serverAddress);
      setValue("distanceCounter", formData?.distanceCounter);
      setValue("unitOfDistance", formData?.unitOfDistance);
      setValue("speedDetection", formData?.speedDetection);

      setValue("deviceAccuracyTolerance", formData?.deviceAccuracyTolerance);
    }
  }, [formData, id]);

  useEffect(() => {
    if (checkRole() !== "SUPER_ADMIN") {
      setIsBuisnessGroupDisabled(true);
    }
    if (userDetails?.user?.role === "BUSINESS_GROUP") {
      const bGroup = userDetails?.user?.businessGroupId?.[0];
      setValue("businessGroupId", bGroup._id);
      setValue("businessGroupName", bGroup.groupName);
      setGroupId(bGroup._id);
    }
    if(userDetails?.user?.role === "USER") {
      const bGroup = userDetails?.user?.businessGroupId?.[0];
      const company = userDetails?.user?.companyId?.[0];
      const branchIds = userDetails?.user?.branchIds;
      if(bGroup) {
        setValue("businessGroupId", bGroup._id);
        setValue("businessId", bGroup._id);
        setValue("businessGroupName", bGroup.groupName);
        setGroupId(bGroup._id);
      }
      if(company) {
        setValue("companyId", company._id);
        setValue("companyName", company.companyName);
        setCompanyId(company._id);
      }
      if(branchIds) {
        
      }
    }
  }, []);

  return (
    <div className="p-4">
      <div className="row" style={{ width: "85%" }}>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("businessGroup")} <span className="text-danger">*</span>
          </label>
          <Controller
            name="businessGroupId"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <GroupDropdown
                onChange={(newValue) => {
                  setValue("businessGroupId", newValue.value);
                  setValue("businessId", newValue.value);
                  setValue("businessGroupName", newValue.label);
                  setGroupId(newValue.value);
                  setCompanyId(null);
                  setValue("companyId", "");
                  setValue("branchId", "");
                }}
                value={value}
                customStyles={customStyles}
                ref={ref}
                isDisabled={isBuisnessGroupDisabled}
                name={name}
              />
            )}
          />
          {!getValues("businessGroupId") && (
            <Error errorName={errors.businessGroupId} />
          )}
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("company")} <span className="text-danger">*</span>
          </label>
          <Controller
            name="companyId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <CompanyDropdown
                key={groupId}
                groupId={groupId}
                onChange={(newValue) => {
                  setValue("companyId", newValue.value);
                  setCompanyId(newValue.value);
                  setValue("branchId", "");
                }}
                value={value}
                customStyles={customStyles}
                ref={ref}
                isDisabled={!groupId}
                name={name}
              />
            )}
          />
          {!getValues("company") && <Error errorName={errors.companyId} />}
        </div>

        <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t("branch")}</label>
          <Controller
            name="branchId"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <ParentBranchDropdown
                key={companyId}
                companyId={companyId}
                onChange={async (newValue) => {
                  // setValue("parentBranchId", newValue.value);
                  setValue("branch", newValue.value);
                  setValue("branchId", newValue.value);
                }}
                value={value}
                customStyles={customStyles}
                ref={ref}
                isDisabled={!companyId}
                name={name}
              />
              // <BranchDropdown
              //   key={companyId}
              //   companyId={companyId}
              //   onChange={async (newValue) => {
              //     // setValue("parentBranchId", newValue.value);
              //     setValue("branch", newValue.label);
              //     setValue("branchID", newValue.value);
              //   }}
              //   value={value}
              //   customStyles={customStyles}
              //   ref={ref}
              //   isDisabled={false}
              //   name={name}
              // />
            )}
          />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("vehicleName")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            required
            register={register}
            label="Vehicle Name"
            name="vehicleName"
            placeholder=""
            defaultValue={getValues("vehicleName")}
          />
          <Error errorName={errors.vehicleName} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("deviceType")} <span className="text-danger">*</span>
          </label>
          <Controller
            name="deviceType"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setValue("deviceType", newValue.value);
                }}
                options={deviceTypeOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{
                  label: getValues("deviceType"),
                  value: getValues("deviceType"),
                }}
              />
            )}
          />
          {!getValues("deviceType") && <Error errorName={errors.deviceType} />}
        </div>
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("IMEINumber")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="imeiNumber"
            label="IMEI Number"
            placeholder=""
            defaultValue={getValues("imeiNumber")}
          />
          <Error errorName={errors.imeiNumber} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t("copyFrom")} </label>
          <Controller
            name="copyFrom"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("copyFrom", newValue.value)}
                options={copyFromOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={copyFromOptions[0]}
              />
            )}
          />
          <Error errorName={errors.copyFrom} />
        </div>
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("serverAddress")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            name="serverAddress"
            placeholder=""
            defaultValue={getValues("serverAddress")}
          />
          <Error errorName={errors.serverAddress} />
        </div>
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            {t("simNumber")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="simNumber"
            placeholder=""
          />
          <Error errorName={errors.simNumber} />
        </div>
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            {t("secondarySimNumber")}
          </label>
          <CustomInput
            type="number"
            register={register}
            name="secondrySimNumber"
            placeholder=""
          />
          <Error errorName={errors.secondrySimNumber} />
        </div>
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            {t("distanceCounter")}
            <span className="text-danger">*</span>
          </label>
          <Controller
            name="distanceCounter"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setValue("distanceCounter", newValue.value);
                }}
                options={distanceCounterOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                // defaultValue={distanceCounterOptions[0]}
                value={{
                  label: getValues("distanceCounter"),
                  value: getValues("distanceCounter"),
                }}
              />
            )}
          />
          {!getValues("distanceCounter") && (
            <Error errorName={errors.distanceCounter} />
          )}
        </div>
        {/* <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            {t("unitOfDistance")}
            <span className="text-danger">*</span>
          </label>
          <Controller
            name="unitOfDistance"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setValue("unitOfDistance", newValue.value);
                  setTempValue(newValue.value);
                }}
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
          {!getValues("unitOfDistance") && (
            <Error errorName={errors.unitOfDistance} />
          )}
        </div> */}
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            {t("speedDetection")}
          </label>
          <Controller
            name="speedDetection"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>
                  setValue("speedDetection", newValue.value)
                }
                options={speedDetectionOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={speedDetectionOptions[0]}
                value={{
                  label: getValues("speedDetection"),
                  value: getValues("speedDetection"),
                }}
              />
            )}
          />
          <Error errorName={errors.speedDetection} />
        </div>
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            {t("deviceAccuracyTolerance")}{" "}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            name="deviceAccuracyTolerance"
            placeholder=""
            defaultValue={getValues("deviceAccuracyTolerance")}
          />
          <Error errorName={errors.deviceAccuracyTolerance} />
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
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default General;
