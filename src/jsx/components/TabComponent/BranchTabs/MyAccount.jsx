import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";
import DummyData from "../../../../users.json";
import { useParams } from "react-router-dom";
import { getSelectValues } from "../../../../utils/helper";
import { useTranslation } from "react-i18next";
import { getGroups } from "../../../../services/api/BusinessGroup";
import { getCompany } from "../../../../services/api/CompanyServices";
import { editBranch } from "../../../../services/api/BranchServices";
import { useLocation } from "react-router-dom";
import GroupDropdown from "../../GroupDropdown";
import CompanyDropdown from "../../CompanyDropdown";
import ParentBranchDropdown from "../../ParentBranch";
import useStorage from "../../../../hooks/useStorage";
import { getUser } from "../../../../services/api/UserServices";
import { use } from "i18next";
import FormField from "../../FormField";
import { dateFormatOptions, timeFormatOptions } from "../VehicleTabs/Options";
import UserLocation from "../../UserLocation";
import LocationSelector from "../../LocationSelector";

const MyAccount = ({
  setValue,
  getValues,
  register,
  onSubmit,
  handleSubmit,
  errors,
  control,
}) => {
  // const defaultValues = getSelectValues();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "userInfo",
  });

  const [selectStateName, setSelectStateName] = useState({
    name: "",
  });
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [tempValue, setTempValue] = useState();


  const [groupId, setGroupId] = useState(null);
  const [companyId, setCompanyId] = useState(null);


  const [businessDisabled, setBusinessDisabled] = useState(false);
  const [companyDisabled, setCompanyDisabled] = useState(false);


  
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  const { t } = useTranslation();
  const location = useLocation();

  const [isStateDisabled, setIsStateDisabled] = useState(true);

  // const [tempbusinessUserOptions, SetTempbusinessUserOptions] = useState([]);
  // const [tempcompanyOptions, SetTempcompanyOptions] = useState([]);
  const [dValues, setDvalues] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState();
  const [locationData, setLocationData] = useState(null);


  useEffect(() => {
    if(userDetails.user.role === 'COMPANY'){
      let bus
      setValue("businessGroupId", userDetails?.user.businessGroupId[0]?._id);
      setGroupId(userDetails?.user.businessGroupId[0]?._id);
      setBusinessDisabled(true);
      
      setValue("companyId", userDetails?.user.companyId[0]?._id)
      setCompanyId(userDetails?.user.companyId[0]?._id);
      setCompanyDisabled(true);
    }
    if(userDetails.user.role === 'BUSINESS_GROUP'){
      setValue("businessGroupId", userDetails?.user?.businessGroupId[0]?._id);
      setGroupId(userDetails?.user.businessGroupId[0]?._id);
      setBusinessDisabled(true);
    }
},[])

  const businessGroupOptions = async (inputValue) => {
    try {
      const businessGroupResponse = await getGroups();
      const businessGroupData = businessGroupResponse.data;
      const response = businessGroupData.map((item) => ({
        label: item.businessGroupId.groupName,
        value: item.businessGroupId._id,
      }))
      return response;  
    } catch (error) {
      console.error("Error fetching business group options:", error);
      return []; // Return empty array in case of an error
    }
  };

  const allCompanyOptions = async (inputValue) => {
    try {
      const companyResponse = await getCompany();
      const companyData = companyResponse.data.data.data;
      const response = companyData.map((item) => ({
        label: item.companyId?.companyName,
        value: item.companyId?._id,
      }));
      return response;
    } catch (error) {
      console.error("Error fetching company options:", error);
      return []; // Return empty array in case of an error
    }
  };

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const data = location.state[0];
      setDvalues(data);
    }
  }, [id]);

  console.log(dValues, "data");

  useEffect(() => {
    if (dValues && id) {
      setValue("businessGroupName", dValues.businessGroupId?.groupName);
      setValue("businessGroupId", dValues.businessGroupId?._id);
      setValue("companyName", dValues.companyId?.companyName);
      setValue("companyId", dValues.companyId?._id);
      setValue("tradeLicenseNumber", dValues?.tradeLicenseNumber);
      setValue("officeNumber", dValues?.officeNumber);
      setValue("parentBranch", dValues.parentBranchId?.branchName);
      setValue("parentBranchId", dValues.parentBranchId?._id);
      setValue("parent", dValues.parentBranchId?._id);
      setValue("branchName", dValues.branchName);
      setValue("country", dValues.country);
      setValue("zipCode", dValues.zipCode);
      setValue("street1", dValues.street1);
      setValue("street2", dValues.street2);
      setDefaultCountry({ name: dValues.country })
      setValue("country", dValues.country)
      setSelectStateName({ name: dValues.state || '' })
      setValue("state", dValues.state)
      setValue("userInfo", dValues.userInfo)
      setValue("dateFormat", dValues?.dateFormat);
      setValue("timeFormat", dValues?.timeFormat);
      setValue("email",dValues?.email)
     
    }else{
      setValue('dateFormat',dateFormatOptions[0]?.value);
      setValue('timeFormat',timeFormatOptions[1]?.value)
    }
  }, [dValues, id]);

  const [filteredCompanyData, setFilteredCompanyData] = useState([]);

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
      <div className="row" style={{ width: "85%", margin: "auto" }}>
      <UserLocation onLocationData={handleLocationData} />
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t("businessGroup")}</label>
          <span className="text-danger">*</span>
          {/* {
             checkRole() === "admin" ? 
          } */}
          {id ? (
            <Controller
              name="businessGroupId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <GroupDropdown
                  onChange={async (newValue) => {
                    await setValue("businessGroupId", newValue.value);
                    await setValue("businessGroupName", newValue.value);
                    setGroupId(newValue.value);
                    setCompanyId(null);
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
                    await setValue("businessGroupName", newValue.value);
                    setGroupId(newValue.value);
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
                  onChange={(newValue) => {
                    setValue("companyId", newValue.value);
                    setValue("companyName", newValue.value);
                  }}
                  value={value}
                  customStyles={customStyles}
                  ref={ref}
                  isDisabled={companyDisabled}
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
                  onChange={(newValue) => {
                    setValue("companyId", newValue.value);
                    setValue("companyName", newValue.value);
                    setCompanyId(newValue.value);
                  }}
                  value={value}
                  customStyles={customStyles}
                  ref={ref}
                  isDisabled={companyDisabled}
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
          <label className="form-label">
            {t("tradeLicenseNumber")} 
          </label>
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
          <label className="form-label">
            {t("officeNo")} 
          </label>
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
            defaultValue={
              getValues('email')
            }
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
          Comptype={''}
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
