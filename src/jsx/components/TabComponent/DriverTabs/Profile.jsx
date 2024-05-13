import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import { useParams,useNavigate,useLocation } from "react-router-dom";

import {useTranslation} from 'react-i18next'
import {
  branchOptions,
  companyOptions,
  businessGroupOptions,
} from "../VehicleTabs/Options";
import CustomInput from "../../Input/CustomInput";
import GroupDropdown from "../../GroupDropdown";
import CompanyDropdown from "../../CompanyDropdown";
import BranchDropdown from "../../BranchDropdown";
import { getDriverById } from "../../../../services/api/driverService";
import { notifyError } from "../../../../utils/toast";
import ParentBranchDropdown from "../../ParentBranch";

const Profile = ({
  setValue,
  register,
  handleSubmit,
  onSubmit,
  getValues,
  errors,
  reset,
  control,
  formData
}) => {
  const [selectStateName, setSelectStateName] = useState({
    name: "",
  });
  const [stateid, setstateid] = useState(0);
  const [countryid, setCountryid] = useState(0);
  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const [groupId, setGroupId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [businessDisabled, setBusinessDisabled] = useState(false);
  const [companyDisabled, setCompanyDisabled] = useState(false);
  const [editData, setEditData] = useState({});
  const [dValues, setDvalues] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState();
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };
  const {t} = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");
  const loggedInUser = localStorage.getItem("loginDetails-name");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));


  useEffect(() => {
    if (id) {
      const data = location.state[0];
      setDvalues(data);
    }
  }, [id]);

  useEffect(() => {
    if (dValues && id) {
      setValue("businessGroupName", dValues.businessGroupId?.groupName);
      setValue("businessGroupId", dValues.businessGroupId?._id);
      setValue("companyName", dValues.companyId?.companyName);
      setValue("companyId", dValues.companyId?._id);
      setCompanyId(dValues.companyId?._id);
      setValue("branchId", dValues.branchId?._id);
      setValue("branchName", dValues.branchId?.branchName);
      setValue("firstName", dValues.firstName);
      setValue("lastName", dValues.lastName);
      setValue("city", dValues.city);
      setValue("employeeNumber", dValues.employeeNumber);
      setValue("country", dValues.country);
      setValue("zipCode", dValues.zipCode);
      setValue("street1", dValues.street1);
      setValue("street2", dValues.street2);
      setValue("contact1", dValues.contact1);
      setValue("contact2", dValues.contact2);
      setDefaultCountry({ name: dValues.country })
      setValue("country", dValues.country)
      setSelectStateName({ name: dValues.state || '' })
      setValue("state", dValues.state)
    }
  }, [dValues, id]);

  const [bussinessGpLable, setBussinessGpLable] = useState(null)

  useEffect(() => {
    if(userDetails.user.role === 'COMPANY'){
      let bus
      setValue("businessGroupId", userDetails?.user.businessGroupId);
      setGroupId(userDetails?.user.businessGroupId);
      setBusinessDisabled(true);
      
      setValue("companyId", userDetails?.user.companyId)
      setCompanyId(userDetails?.user.companyId);
      setCompanyDisabled(true);
    }
    if(userDetails.user.role === 'BUSINESS_GROUP'){
      setValue("businessGroupId", userDetails?.user.businessGroupId[0]?._id);
      setGroupId(userDetails?.user.businessGroupId[0]?._id);
      setBusinessDisabled(true);
    }
},[])

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t('businessGroup')} <span className="text-danger">*</span>
          </label>
          {id ? (
            <Controller
              name="businessGroupId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => {
                return (
                <GroupDropdown
                  onChange={ (newValue) => {
                     setValue("businessGroupId", newValue.value);
                     setValue("businessGroupName", newValue.value);
                    setGroupId(newValue.value);
                    setCompanyId(null);
                  }}
                  value={value}
                  customStyles={customStyles}
                  ref={ref}
                  isDisabled={businessDisabled}
                  name={name}
                />

              )}}
            />
          ) : (
            <Controller
              name="businessGroupId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <GroupDropdown
                  onChange={ (newValue) => {
                     setValue("businessGroupId", newValue.value);
                     setValue("businessGroupName", newValue.value);
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
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          {t('company')} <span className="text-danger">*</span>
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
                  // isDisabled={companyDisabled}
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
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          {t('branch')}
          </label>
          <Controller
            name="branchId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <ParentBranchDropdown
              key={companyId}
              companyId={companyId}
              onChange={(newValue) => {
                setValue("branchId", newValue.value);
                setValue("branchName", newValue.value);
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
          {!getValues("branchId") && <Error errorName={errors.branchId} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          {t('firstName')}<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="First Name"
            name="firstName"
            placeholder={t('firstName')}
            defaultValue={''}
          />
          <Error errorName={errors.firstName} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          {t('lastName')} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Last Name"
            name="lastName"
            placeholder={t('lastName')}
            defaultValue={''}
          />
          <Error errorName={errors.lastName} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('employeeNumber')} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
          
            register={register}
            label="Employee Number"
            name="employeeNumber"
            placeholder=""
            defaultValue={""}
          />
          <Error errorName={errors.employeeNumber} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
          {t('country')} <span className="text-danger">*</span>
          </label>
          <CountrySelect
            onChange={(e) => {
              setSelectStateName({ name: "Select State" });
              setCountryid(e.id);
              setValue("country", e.name);
              setIsStateDisabled(false);
            }}
            containerClassName="bg-white"
            inputClassName="border border-white"
            placeHolder="Select Country"
             defaultValue={defaultCountry}
          />
          {!getValues("country") && <Error errorName={errors.country} />}
        </div>
        <div className={`${isStateDisabled ? 'col-xl-6 mb-3 pe-none':'col-xl-6 mb-3'}`}>
          <label className="form-label">
          {t('state')}
          </label>
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
          {t('city')} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="City"
            name="city"
            placeholder=""
            defaultValue={""}
          />
          <Error errorName={errors.city} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
          {t('zipCode')}
          </label>
          <CustomInput
            type="number"
            register={register}
            label="zipCode"
            name="zipCode"
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            placeholder=""
            defaultValue={""}
          />
          <Error errorName={errors.zipCode} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('street1')} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street1"
            name="street1"
            placeholder=""
            defaultValue={""}
          />
          <Error errorName={errors.street1} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('street2')}
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street2"
            name="street2"
            placeholder=""
            defaultValue={""}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
          {t('contactNumber1')} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Contact Number1"
            name="contact1"
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            placeholder=""
            defaultValue={""}
          />
          <Error errorName={errors.contact1} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
          {t('contactNumber2')} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Contact Number2"
            name="contact2"
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            placeholder=""
            defaultValue={""}
          />
          <Error errorName={errors.contact2} />
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
          {t('next')}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
