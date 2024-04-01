import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
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

const MyAccount = ({
  setValue,
  getValues,
  register,
  onSubmit,
  handleSubmit,
  errors,
  control,
}) => {
  const [selectStateName, setSelectStateName] = useState({
    name: "Select State",
  });
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [tempValue, setTempValue] = useState();

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  const { t } = useTranslation();
  const location = useLocation();
  const [businessUserOptions, setBusinessUserOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [parentOptions, setParentOptions] = useState([]);
  const [businessUserValue, setBusinessUserValue] = useState([]);
  const [companyValue, setCompanyValue] = useState([]);
  const [parentValue, setParentValue] = useState();
  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const defaultValues = getSelectValues();

  const [tempbusinessUserOptions, SetTempbusinessUserOptions] = useState([]);
  const [tempcompanyOptions, SetTempcompanyOptions] = useState([]);
  const [dValues, setDvalues] = useState([]);
  const [defaultCountry,setDefaultCountry] = useState();
  

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
      console.log("RES:-> ", response);
      return response; 
    } catch (error) {
      console.error("Error fetching company options:", error);
      return []; // Return empty array in case of an error
    }
  };
  // console.log("data from load options", businessGroupOptions() ,allCompanyOptions() )

  // useEffect(() => {
  //   const tempparentOptions = DummyData.filter((item) => item.role === "branch")
  //     .filter((br) => br.parentCompany === companyValue)
  //     .map((item) => ({
  //       label: item.userName,
  //       value: item.id,
  //     }));

  //   tempparentOptions.push({ label: "None", value: 0 });

  //   setBusinessUserOptions(tempbusinessUserOptions);
  //   setCompanyOptions(tempcompanyOptions);
  //   setParentOptions(tempparentOptions);
  // }, [businessUserValue, companyValue, parentValue]);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const data = location.state[0];
      console.log("====================================");
      console.log("data of Id clicked", data);
      console.log("====================================");
      setDvalues(data);
    }
  }, [id]);
  useEffect(() => {
    console.log(dValues);
    if (dValues && id) {
      setValue("businessGroupName", dValues.businessGroupId?.groupName);
      setValue("businessGroupId", dValues.businessGroupId?._id);
      setValue("companyName", dValues.companyId?.companyName);
      setValue("companyId", dValues.companyId?._id);
      setValue("parentBranch", dValues.parentBranchId?.branchName);
      setValue("parentBranchId", dValues.parentBranchId?._id);
      setValue("branchName", dValues.branchName);
      setValue("city", dValues.city);
      setValue("country", dValues.country);
      setValue("zipCode", dValues.zipCode);
      setValue("street1", dValues.street1);
      setValue("street2", dValues.street2);
      setDefaultCountry({ name:dValues.country })
      setValue("country",dValues.country)
      setSelectStateName({name : dValues.state})
      setValue("state",dValues.state)
    }
  }, [dValues, id]);

  const [filteredCompanyData, setFilteredCompanyData] = useState([]);

  // useEffect(() => {
  //   setValue(
  //     "parentBusinessGroup",
  //     filteredCompanyData[0] ? filteredCompanyData[0].parentBusinessGroup : ""
  //   );
  //   setValue(
  //     "parentCompany",
  //     filteredCompanyData[0] ? filteredCompanyData[0].parentCompany : ""
  //   );
  //   setValue(
  //     "parentBranch",
  //     filteredCompanyData[0] ? filteredCompanyData[0].parentBranch : ""
  //   );
  //   setValue(
  //     "country",
  //     filteredCompanyData[0] ? filteredCompanyData[0].country : ""
  //   );
  //   setValue(
  //     "state",
  //     filteredCompanyData[0] ? filteredCompanyData[0].state : ""
  //   );
  // }, []);
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("loginDetails-name");
  //   const role = localStorage.getItem("role");
  //   if (role === "businessgroup") {
  //     setTempValue(loggedInUser);
  //     setValue("parentBusinessGroup", loggedInUser);
  //   }
  //   if (role === "company") {
  //     setValue("parentCompany", loggedInUser);
  //     const filterparent = DummyData.filter(
  //       (item) => item.userName === loggedInUser
  //     )[0].parent;
  //     setValue("parentBusinessGroup", filterparent);
  //     setTempValue(loggedInUser);
  //   }
  // }, []);

  // console.log(defaultValues)

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
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
                <AsyncSelect
                cacheOptions 
                defaultOptions
                  onChange={(newValue) => {
                    setBusinessUserValue(newValue.label);
                    setValue("businessGroupId", newValue.value);
                    setValue("businessGroupName", newValue.label);
                  }}
                  loadOptions={businessGroupOptions}
                  ref={ref}
                  name={name}
                  styles={customStyles}
                  value={{
                    label: getValues('businessGroupName'),
                    value: getValues('businessGroupId'),
                  }}
                />
              )}
            />
          ) : (
            <Controller
              name="businessGroupId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <AsyncSelect
                  onChange={(newValue) => {
                    setBusinessUserValue(newValue.label);
                    setValue("businessGroupId", newValue.value);
                    setValue("businessGroupName", newValue.label);
                  }}
                  loadOptions={businessGroupOptions}
                  ref={ref}
                  isDisabled={defaultValues?.business?.disabled}
                  name={name}
                  styles={customStyles}
                  defaultOptions
                  value={{
                    label: getValues('businessGroupName'),
                    value: getValues('businessGroupId'),
                  }}
                />
              )}
            />
          )}
          {!getValues("businessGroupId") && (
            <Error errorName={errors.businessGroupId} />
          )}
        </div>
        <div className="col-xl-6 mb-3">
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
                <AsyncSelect
                  onChange={(newValue) => {
                    setCompanyValue(newValue.label);
                    setValue("companyId", newValue.value);
                    setValue("companyName", newValue.label);
                  }}
                  loadOptions={allCompanyOptions}
                  ref={ref}
                  name={name}
                  styles={customStyles}
                  defaultOptions
                  value={{
                    label: getValues('companyName'),
                    value: getValues('companyId'),
                  }}
                />
              )}
            />
          ) : (
            <Controller
              name="companyId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <AsyncSelect
                  onChange={(newValue) => {
                    setCompanyValue(newValue.label);
                    setValue("companyId", newValue.value);
                    setValue("companyName", newValue.label);
                  }}
                  isDisabled={defaultValues?.company?.disabled}
                  options={companyOptions}
                  ref={ref}
                  name={name}
                  styles={customStyles}
                  defaultOptions
                  value={{
                    label: getValues('companyName'),
                    value: getValues('companyId'),
                  }}
                />
              )}
            />
          )}

          {!getValues("companyId") && <Error errorName={errors.companyId} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t("parentBranch")}</label>
          <Controller
            name="parent"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <AsyncSelect
                onChange={(newValue) => {
                  setParentValue(newValue.value);
                  setValue("parentBranch", newValue.value);
                }}
                options={parentOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{
                  label: getValues('parentBranch'),
                  value: getValues('parentBranchId')
                }}
              />
            )}
          />
          {!getValues("parentBranch") && (
            <Error errorName={errors.parentBranch} />
          )}
        </div>
        <div className="col-xl-6 mb-3 ">
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
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            {t("country")}
            <span className="text-danger">*</span>
          </label>
          <CountrySelect
            onChange={(e) => {
              setSelectStateName({ name: "Select State" });
              setCountryid(e.id);
              setValue("country", e.id);
              setIsStateDisabled(false);
            }}
            containerClassName="bg-white"
            inputClassName="border border-white"
            placeHolder="Select Country"
            defaultValue={defaultCountry}
            // defaultValue={{ id: 1, name: filteredCompanyData[0] ? filteredCompanyD0ata[0].country : "" }}
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
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
                setValue("state", e.id);
              }}
              containerClassName="bg-white"
              inputClassName="border border-white"
              placeHolder="Select State"
              defaultValue={selectStateName}
            />
          </div>
          {!getValues("state") && <Error errorName={errors.state} />}
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
            defaultValue={
              getValues('zipCode')
            }
          />
          <Error errorName={errors.zipCode} />
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
            defaultValue={
              getValues('street1')
            }
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
            defaultValue={getValues('street2')}
          />
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
          {t("submit")}
        </Button>
      </div>
    </div>
  );
};

export default MyAccount;
