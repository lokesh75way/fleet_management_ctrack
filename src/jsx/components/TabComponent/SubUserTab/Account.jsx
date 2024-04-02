import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import { useParams } from "react-router-dom";
import CustomInput from "../../Input/CustomInput";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import useStorage from "../../../../hooks/useStorage";
import "../../../../scss/pages/_driver-tracking.scss";
import DummyData from "../../../../users.json";
import { getSelectValues } from "../../../../utils/helper";
import { getTemplates } from "../../../../services/api/TemplateServices";
import { useTranslation } from "react-i18next";
import { notifyError } from "../../../../utils/toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { getGroups } from "../../../../services/api/BusinessGroup";
import { getCompany } from "../../../../services/api/CompanyServices";
import { getAllBranch } from "../../../../services/api/BranchServices";
import BranchDropdown from "../../BranchDropdown";
import CompanyDropdown from "../../CompanyDropdown";
import GroupDropdown from "../../GroupDropdown";

const Account = ({
  handleNext,
  register,
  setValue,
  onSubmit,
  handleSubmit,
  getValues,
  errors,
  control,
}) => {
  const [selectStateName, setSelectStateName] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [allGroups, setAllGroups] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [allBranches, setAllBranches] = useState([]);
  const { checkRole, checkUser } = useStorage()
  const [tempValue, setTempValue] = useState();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const [TemplateOptions, setTemplateOptions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [groupId, setGroupId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const { t } = useTranslation();
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: "0.25rem 0 ", // Adjust the height as needed
    }),


  };
  async function onGroupChange(groupId) {
    console.log("groupId", groupId)
    console.log("allCompanies", allCompanies)
    const companies = allCompanies
      .filter(item => item?.companyId?.businessGroupId?._id == groupId)
      .map(item => ({ value: item?.companyId?._id, label: item?.companyId?.companyName }));
    setCompanyOptions(companies);
    setValue("parentCompany", "");
    setBranchOptions([]);
  }

  async function onCompanyChange(companyId) {
    const branches = allBranches
      .filter(item => item?.companyId?._id == companyId)
      .map(item => ({ value: item?._id, label: item?.branchName }));
    setBranchOptions(branches);

  }

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await getGroups();
      const companyResponse = await getCompany();
      const branchResponse = await getAllBranch();
      if (response.error) {
        notifyError(response.error)
      }
      else {
        const groups = response.data;
        setAllGroups(groups);
        const groupOptions = groups.map((item) => ({
          label: item?.businessGroupId?.groupName,
          value: item?.businessGroupId?._id,
        }));
        setBusinessUserOptions(groupOptions);
      }
      if (companyResponse.error) {
        notifyError(companyResponse.error)
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
        notifyError(branchResponse.error)
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
    }
    setIsLoading(true);
    fetchOptions()
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await getTemplates();
      if (response.error) {
        notifyError(response.error)
      } else {
        const templates = response.data.data;
        const tempOptions = templates.map((item) => ({
          label: item.name,
          value: item._id,
        }));
        setTemplateOptions(tempOptions);
      }
    }
    fetchOptions()
  }, []);


  const role = checkRole()
  const { id } = useParams();
  const User = JSON.parse(localStorage.getItem("userJsonData"));

  const loggedinemail = localStorage.getItem("loginDetails-name");
  let defaultCompanyOptions;

  if (role === "SUPER_ADMIN") {

    defaultCompanyOptions = DummyData.filter(
      (item) => item.role === "company"
    ).map((item) => ({
      label: item.userName,
      value: item._id,
    }));

  } else {

    defaultCompanyOptions = DummyData.filter(
      (item) => item.role === "company" && item.parent === loggedinemail
    ).map((item) => ({
      label: item.userName,
      value: item._id,
    }));
  }

  let parentbgname;
  if (role === 'COMPANY') {
    const parentbgnamefilter = User.filter(user => user.parentCompany === loggedinemail);
    parentbgname = parentbgnamefilter[0]?.parentBusinessGroup;
  }

  const branchData = User.filter(
    (item) => item.role === "branch" && item._id == id
  );

  const userData = JSON.parse(localStorage.getItem("userJsonData"));

  const newData = userData.filter((data) => data._id == id);

  // const defaultValues = getSelectValues();

  const [filteredUserData, setFilteredUserData] = useState(newData);
  const [businessUserOptions, setBusinessUserOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [parentOptions, setParentOptions] = useState([]);
  const [vehiclesOptions, setVehiclesOptions] = useState([]);
  const [businessUserValue, setBusinessUserValue] = useState();
  const [companyValue, setCompanyValue] = useState([]);
  const [parentValue, setParentValue] = useState();
  const [businessDisabled, setBusinessDisabled] = useState(false);
  const [companyDisabled, setCompanyDisabled] = useState(false);


  useEffect(() => {
    let tempcompanyOptions;
    if (role === "BUSINESS_GROUP") {

      tempcompanyOptions = DummyData.filter(
        (item) => item.role === "company"
      )
        .filter((cp) => cp.parent === checkUser())
        .map((item) => ({
          label: item.userName,
          value: item._id,
        }));

    } else {

      tempcompanyOptions = DummyData.filter(
        (item) => item.role === "company"
      )
        .filter((cp) => cp.parent === businessUserValue)
        .map((item) => ({
          label: item.userName,
          value: item._id,
        }));

    }


    let tempparentOptions;

    if (role === 'COMPANY') {
      tempparentOptions = DummyData.filter((item) => item.role === "branch")
        .filter((br) => br.parentCompany === checkUser())
        .map((item) => ({
          label: item.userName,
          value: item._id,
        }));
    } else {
      tempparentOptions = DummyData.filter((item) => item.role === "branch")
        .filter((br) => br.parentCompany === companyValue)
        .map((item) => ({
          label: item.userName,
          value: item._id,
        }));
    }

    let tempvehicleOptions;
    if (role === 'COMPANY') {
      tempvehicleOptions = DummyData.filter(item => item.vehicleName && item.company === checkUser()).map((item) => ({
        label: item.vehicleName,
        value: item._id,
      }));

    } else {
      tempvehicleOptions = DummyData.filter(item => item.vehicleName && item.company === companyValue).map((item) => ({
        label: item.vehicleName,
        value: item._id,
      }));


    }



    tempcompanyOptions.push({ label: "None", value: 0 });

    // setBusinessUserOptions(tempbusinessUserOptions);
    if (businessUserValue) {
      // setCompanyOptions(tempcompanyOptions);
    }
    else {

      // setCompanyOptions([...defaultCompanyOptions, { label: "None", value: 0 }]);
    }
    setVehiclesOptions(tempvehicleOptions);


    setParentOptions(tempparentOptions);
  }, [businessUserValue, companyValue, parentValue]);

  const [filteredCompanyData, setFilteredCompanyData] = useState(branchData);
  useEffect(() => {
    if(userDetails.user.role === 'COMPANY'){
      setValue("businessGroupId", userDetails?.user.businessGroupId);
      setValue("businessUser", userDetails?.user.businessGroupId);
      setGroupId(userDetails?.user.businessGroupId);
      setBusinessDisabled(true);
      
      setValue("parentCompany", userDetails?.user.companyId)
      setCompanyId(userDetails?.user.companyId);
      setCompanyDisabled(true);
      console.log("parentCompany", userDetails?.user.businessGroupId)
    }
    if(userDetails.user.role === 'BUSINESS_GROUP'){
      
      // setValue("businessGroupId", userDetails?.user.businessGroupId);
      setGroupId(userDetails?.user.businessGroupId);
      setValue("businessUser", userDetails?.user.businessGroupId);
      console.log(userDetails?.user.businessGroupId, "dsggsgs")
      setBusinessDisabled(true);
    }
},[])
  useEffect(() => {
    const id = filteredUserData[0]?._id;
    id ? setIsEdit(true) : setIsEdit(false);
    if(id){
      const selectedTemplateId = filteredUserData[0]?.featureTemplateId;
      const selectedGroupId = filteredUserData[0]?.businessGroupId;
      const selectedCompanyId = filteredUserData[0]?.companyId;
      const selectedBranchId = filteredUserData[0]?.branchIds;
      setValue("featureTemplateId", selectedTemplateId);
      setValue("businessUser", selectedGroupId);
      console.log("selectedGroupId", selectedGroupId)
      loadDatainDropdowns();
      setValue("parentCompany", selectedCompanyId);
      setValue("Branch", selectedBranchId);
      setValue("branchIds", selectedBranchId);

      setValue(
        "parentBusinessGroup",
        filteredCompanyData[0] ? filteredCompanyData[0].parentBusinessGroup : ""
      );
      setValue(
        "parentBranch",
        filteredCompanyData[0] ? filteredCompanyData[0].parentBranch : ""
      );
      if (id) {

        setValue(
          "country",
          filteredUserData[0] ? filteredUserData[0]?.country : ""
        );

        setDefaultValue({ name: filteredUserData[0]?.country })
        setValue(
          "state",
          filteredUserData[0] ? filteredUserData[0]?.state : ""
        );
        setSelectStateName({ name: filteredUserData[0]?.state })
      }

      setValue(
        "_id",
        filteredUserData[0] ? filteredUserData[0]?._id : id
      );
      async function loadDatainDropdowns() {
        await onGroupChange(selectedGroupId);
        await onCompanyChange(selectedCompanyId);
      }
    }
    setValue("isEdit", isEdit);
    

  }, [TemplateOptions, allBranches, allCompanies, allGroups,]);



  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t('businessGroup')}</label>

          <Controller
            name="businessUser"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              // <Select
              //   onChange={async (newValue) => {
              //     await onGroupChange(newValue.value);
              //     setBusinessUserValue(newValue.label);
              //     setValue("parentBusinessGroup", newValue.value);
              //     setValue("businessUser", newValue.value);
              //   }}
              //   options={businessUserOptions}
              //   ref={ref}
              //   isDisabled={defaultValues?.business?.disabled}
              //   name={name}
              //   value={businessUserOptions.find(option => option.value === value)}
              //   styles={customStyles}
              // />
              <GroupDropdown
              key={groupId}
                onChange={async (newValue) => {
                  setValue("businessUser", newValue.value);
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
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            {t('company')}
          </label>

          <Controller
            name="parentCompany"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              // <Select
              //   onChange={async (newValue) => {
              //     await onCompanyChange(newValue.value);
              //     setCompanyValue(newValue.label);
              //     setValue("parentCompany", newValue.value);
              //   }}
              //   isDisabled={defaultValues?.company?.disabled}
              //   options={companyOptions}
              //   ref={ref}
              //   name={name}
              //   styles={customStyles}
              //   value={companyOptions.find(option => option.value === value)}

              // />
              <CompanyDropdown
              onChange={async (newValue) => {
                setValue("parentCompany", newValue.value);
                setCompanyId(newValue.value);
              }}
              key={groupId}
              groupId={groupId}
              value={value}
              customStyles={customStyles}
              name={name}
              ref={ref}
              isDisabled={companyDisabled}
            />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t('branch')}</label>
          <Controller
            name="Branch"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              // <Select
              //   onChange={async (newValue) => {

              //     const selectedValues = newValue.map(option => option.value);
              //     setValue("Branch", selectedValues);
              //     setValue("branchIds", selectedValues);
              //   }}
              //   options={branchOptions}
              //   ref={ref}
              //   name={name}
              //   styles={customStyles}
              //   isMulti={true}
              //   value={Array.isArray(value) ? value.map(val => branchOptions.find(option => option.value === val)) : []}
              // />
              <BranchDropdown
                onChange={(newValue) => {
                console.log("newValue", newValue)
                const valuesArray = newValue.map(item => item.value);
                setValue("Branch", valuesArray);
                setValue("branchIds", valuesArray);
              }}
              key={companyId}
              companyId={companyId}
              value={value}
              customStyles={customStyles}
              name={name}
              ref={ref}
              isDisabled={false}
  
            />
            )}
          />
          {!getValues("Branch") && <Error errorName={errors.parent} />}
        </div>
        {/* <div className="col-xl-6 mb-3">
          <label className="form-label">{t('vehicle')}</label>
          <Controller
            name="accessibleVehicles"
            control={control}
            
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setValue("vehicle", newValue);
                }}
                options={vehiclesOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                isMulti={true}
                defaultValue={
                  filteredUserData[0] ? filteredUserData[0].vehicle : ""
                }
              />
            )}
          />
          {!getValues("vehicle") && <Error errorName={errors.parent} />}
        </div> */}
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t('email')} <span className="text-danger">*</span>
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
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t('username')} <span className="text-danger">*</span>
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
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t('mobileNumber')} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Mobile Number"
            name="mobileNumber"
            min="0"
            onInput={(e) => { const temp = Math.max(0, e.target.value); e.target.value = temp < 1 ? '' : temp }}
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].mobileNumber : ""
            }
          />
          <Error errorName={errors.mobileNumber} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            {t('country')}<span className="text-danger">*</span>
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
            // value={getValues("country")}
            defaultValue={defaultValue}
          />
          {!getValues("country") && <Error errorName={errors.country} />}
        </div>
        <div
          className={`${isStateDisabled ? "col-xl-6 mb-3 pe-none" : "col-xl-6 mb-3"
            }`}
        >
          <label className="form-label">
            {t('state')}
          </label>
          <div style={{ background: "white" }}>
            <StateSelect
              countryid={countryid}
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
          {!getValues("state") && <Error errorName={errors.state} />}
        </div>
        {!isEdit && (<><div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t('password')} <span className="text-danger">*</span>
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
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">
              {t('confirmPassword')} <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <CustomInput
                type={showConfirmPassword ? "text" : "password"}
                register={register}
                label="Confirm Password"
                name="confirmPassword"
                placeholder=""
                defaultValue={
                  filteredUserData[0] ? filteredUserData[0].confirmPassword : ""
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
          </div> </>)}
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t('featureTemplate')} <span className="text-danger">*</span>
          </label>
          <Controller
            name="featureTemplateId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                onChange={(e) => {
                  setTempValue(e);
                  setValue("featureTemplateId", e.value);
                }}
                options={TemplateOptions}
                ref={field.ref}
                name={field.name}
                styles={customStyles}
                value={TemplateOptions.find(option => option.value === field.value)}
              // defaultValue={filteredUserData[0] ? TemplateOptions.find(option => option._id === filteredUserData[0].featureTemplateId) : ""}
              />
            )}
          />
          {!getValues("featureTemplateId") && (
            <Error errorName={errors.featureTemplateId} />
          )}
        </div>
        <div className="col-xl-6 mb-3 ">
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
          {t('submit')}
        </Button>
      </div>
    </div>
  );
};

export default Account;
