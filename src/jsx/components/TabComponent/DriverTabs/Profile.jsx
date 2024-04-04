import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import { useParams } from "react-router-dom";

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

const Profile = ({
  setValue,
  register,
  handleSubmit,
  onSubmit,
  getValues,
  errors,
}) => {
  const [selectStateName, setSelectStateName] = useState({
    name: "",
  });
  const [stateid, setstateid] = useState(0);
  const { control } = useForm();
  const [countryid, setCountryid] = useState(0);
  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const [groupId, setGroupId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };
  const {t} = useTranslation();
  const { id } = useParams();
  const role = localStorage.getItem("role");
  const loggedInUser = localStorage.getItem("loginDetails-name");

  

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t('businessGroup')} <span className="text-danger">*</span>
          </label>
          <Controller
            name="businessGroupId"
            control={control}
            rules={{ required: true }}
            disabled={true}
            render={({ field: { onChange, value, name, ref } }) => (
              <GroupDropdown
                onChange={async (newValue) => {
                  setValue("businessGroupId", newValue.value);
                  console.log("this inside busijedd", newValue.value)
                  setGroupId(newValue.value);
                  setCompanyId(null);
                }}
                value={value}
                customStyles={customStyles}
                ref={ref}
                isDisabled={false}
                name={name}
              />
            )}
          />
          {!getValues("businessGroupId") && (
            <Error errorName={errors.businessGroupId} />
          )}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          {t('company')} <span className="text-danger">*</span>
          </label>
          <Controller
            name="companyId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <CompanyDropdown
              onChange={async (newValue) => {
                setValue("parentCompany", newValue.value);
                setValue("companyId", newValue.value)
                setCompanyId(newValue.value);
              }}
              key={groupId}
              groupId={groupId}
              value={value}
              customStyles={customStyles}
              name={name}
              ref={ref}
              isDisabled={false}
            />
            )}
          />
          {!getValues("companyId") && <Error errorName={errors.companyId} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          {t('branch')} <span className="text-danger">*</span>
          </label>
          <Controller
            name="branchId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <BranchDropdown
                onChange={(newValue) => {
                  const valuesArray = newValue.map(item => item.value);
                  setValue("Branch", valuesArray);
                  setValue("branchId", valuesArray);
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
            placeholder="first name"
            defaultValue={""}
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
            placeholder="last name"
            defaultValue={""}
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
          {t('submit')}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
