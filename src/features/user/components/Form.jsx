import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useSelector } from "react-redux";

import Error from "@/components/Error/Error";
import CustomInput from "@/components/Input/CustomInput";
import "@/assets/scss/pages/_driver-tracking.scss";
import { getTemplates } from "../../../services/api/TemplateServices";
import { notifyError } from "@/utils/toast";
import { getAllGroups } from "@/features/businessGroup/api";
import { getCompany } from "../../../services/api/CompanyServices";
import { getAllBranch } from "../../../services/api/BranchServices";
import BranchDropdown from "../../../jsx/components/BranchDropdown";
import CompanyDropdown from "@/features/company/components/DropDownList";
import GroupDropdown from "@/features/businessGroup/components/DropDownList";
import VehicleDropdown from "../../../jsx/components/VehicleDropdown";
import { unitOfDistanceOptions } from "../../../constants/options";
import LocationSelector from "../../../components/Input/LocationSelector";
import useUserLocation from "@/hooks/useUserLocation";

const customStyles = {
  control: (base) => ({
    ...base,
    padding: "0.25rem 0 ", // Adjust the height as needed
  }),
};

const UserForm = ({
  register,
  setValue,
  onSubmit,
  handleSubmit,
  getValues,
  errors,
  control,
  watch,
  isFormSubmitting,
}) => {
  const [allGroups, setAllGroups] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [allBranches, setAllBranches] = useState([]);
  const [TemplateOptions, setTemplateOptions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [branchId, setBranchId] = useState([]);
  const userDetails = useSelector((state) => state.auth.user);
  const { t } = useTranslation();

  async function onGroupChange(groupId) {
    const companies = allCompanies
      .filter((item) => item?.companyId?.businessGroupId?._id == groupId)
      .map((item) => ({
        value: item?.companyId?._id,
        label: item?.companyId?.companyName,
      }));
    setCompanyOptions(companies);
    setValue("parentCompany", "");
    setBranchOptions([]);
  }
  async function onCompanyChange(companyId) {
    const branches = allBranches
      .filter((item) => item?.companyId?._id == companyId)
      .map((item) => ({ value: item?._id, label: item?.branchName }));
    setBranchOptions(branches);
  }

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await getAllGroups();
      const companyResponse = await getCompany();
      const branchResponse = await getAllBranch();
      if (response.error) {
        notifyError(response.error);
      } else {
        const groups = response.data;
        setAllGroups(groups);
        const groupOptions = groups.map((item) => ({
          label: item?.businessGroupId?.groupName,
          value: item?.businessGroupId?._id,
        }));
        setBusinessUserOptions(groupOptions);
      }
      if (companyResponse.error) {
        notifyError(companyResponse.error);
      } else {
        const companies = companyResponse.data.data.data;
        const companyOptions = companies.map((item) => ({
          label: item.companyId?.companyName,
          value: item.companyId?._id,
        }));
        setAllCompanies(companies);
        // setCompanyOptions(companyOptions);
      }
      if (branchResponse.error) {
        notifyError(branchResponse.error);
      } else {
        const branches = branchResponse.data.data;
        const branchOptions = branches.map((item) => ({
          label: item.branchName,
          value: item._id,
        }));
        setAllBranches(branches);
        setParentOptions(branchOptions);
        // setBranchOptions(branchOptions);
      }
      setIsLoading(false);
    };
    setIsLoading(true);
    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await getTemplates();
      if (response.error) {
        notifyError(response.error);
      } else {
        const templates = response.data.data;
        const tempOptions = templates.map((item) => ({
          label: item.name,
          value: item._id,
        }));
        setTemplateOptions(tempOptions);
      }
    };
    fetchOptions();
  }, []);

  const { id } = useParams();
  // const User = JSON.parse(localStorage.getItem("userJsonData"));
  const loggedinemail = localStorage.getItem("loginDetails-name");

  const [filteredUserData, setFilteredUserData] = useState([]);
  const [businessUserOptions, setBusinessUserOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [parentOptions, setParentOptions] = useState([]);
  const { location: locationData, error: locationError } = useUserLocation();

  const [company, setCompany] = useState();
  const [branch, setBranch] = useState();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="row" style={{ width: "85%", margin: "auto" }}>
        <div>{locationError && <p>{locationError}</p>}</div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t("businessGroup")}</label>
          <Controller
            name="businessGroupId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <GroupDropdown
                onChange={async (newValue) => {
                  if (newValue.value != getValues("businessGroupId")) {
                    setValue("businessGroupId", newValue.value);
                    setCompany(null);
                    setValue("companyId", "");
                    setBranch(null);
                    setValue("branchIds", "");
                  }
                }}
                defaultValue={value}
                customStyles={customStyles}
                ref={ref}
                name={name}
              />
            )}
          />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t("company")}</label>
          <Controller
            name="companyId"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, name, ref } }) => (
              <CompanyDropdown
                onChange={async (newValue) => {
                  if (newValue.value != getValues("companyId")) {
                    setValue("companyId", newValue.value);
                    setCompany(newValue);
                    setBranch(null);
                    setValue("branchIds", "");
                  }
                }}
                groupId={watch("businessGroupId")}
                defaultValue={value}
                value={company}
                customStyles={customStyles}
                name={name}
                ref={ref}
              />
            )}
          />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t("branch")}</label>
          <Controller
            name="branchIds"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <BranchDropdown
                onChange={(newValue) => {
                  const newArray = newValue.map((temp) => temp.value);
                  setValue("branchIds", newArray);
                  setBranchId(newArray);
                }}
                defaultValue={value}
                customStyles={customStyles}
                ref={ref}
                companyId={watch("companyId")}
                name={name}
                isDisabled={!company?.value}
              />
            )}
          />
          {!getValues("Branch") && <Error errorName={errors.parent} />}
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t("vehicle")}</label>
          <Controller
            name="vehicleIds"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <VehicleDropdown
                onChange={(newValue) => {
                  const newArray = newValue.map((temp) => temp.value);
                  setValue("vehicleIds", newArray);
                }}
                value={value}
                branchids={branchId}
                customStyles={customStyles}
                ref={ref}
                name={name}
              />
            )}
          />
          {!getValues("Branch") && <Error errorName={errors.parent} />}
        </div>

        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("email")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            label="Email"
            className="form-control"
            name="email"
            defaultValue={filteredUserData[0] ? filteredUserData[0].email : ""}
            placeholder=""
          />
          <Error errorName={errors.email} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("username")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="User Name"
            name="userName"
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].userName : ""
            }
          />
          <Error errorName={errors.userName} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("mobileNumber")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Mobile Number"
            name="mobileNumber"
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].mobileNumber : ""
            }
          />
          <Error errorName={errors.mobileNumber} />
        </div>

        <LocationSelector
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
          locationData={locationData}
          id={id}
          showCity={false}
        />
        {!id && (
          <>
            <div className="col-xl-3 mb-3 ">
              <label className="form-label">
                {t("password")} <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <CustomInput
                  type={showPassword ? "text" : "password"}
                  register={register}
                  label="Password"
                  name="password"
                  placeholder=""
                  defaultValue={
                    filteredUserData[0] ? filteredUserData[0].password : ""
                  }
                />
                <span
                  className="showPasswordIcon"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <LuEyeOff /> : <LuEye />}
                </span>
              </div>
              <Error errorName={errors.password} />
            </div>
            <div className="col-xl-3 mb-3 ">
              <label className="form-label">
                {t("confirmPassword")} <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <CustomInput
                  type={showConfirmPassword ? "text" : "password"}
                  register={register}
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder=""
                  defaultValue={
                    filteredUserData[0]
                      ? filteredUserData[0].confirmPassword
                      : ""
                  }
                />
                <span
                  className="showPasswordIcon"
                  onClick={() => {
                    setConfirmShowPassword(!showConfirmPassword);
                  }}
                >
                  {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                </span>
              </div>
              <Error errorName={errors.confirmPassword} />
            </div>{" "}
          </>
        )}
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("featureTemplate")} <span className="text-danger">*</span>
          </label>
          <Controller
            name="featureTemplateId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                onChange={(e) => {
                  setValue("featureTemplateId", e.value);
                }}
                options={TemplateOptions}
                ref={field.ref}
                name={field.name}
                styles={customStyles}
                value={TemplateOptions.find(
                  (option) => option.value === field.value
                )}
              />
            )}
          />
          {!getValues("featureTemplateId") && (
            <Error errorName={errors.featureTemplateId} />
          )}
        </div>
        <div className="col-xl-3 mb-3">
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
          disabled={isFormSubmitting}
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

export default UserForm;
