import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";
import DummyData from "../../../../users.json";
import useStorage from "../../../../hooks/useStorage";
import AsyncSelect from "react-select/async";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useParams } from "react-router-dom";
import {useTranslation} from 'react-i18next'
import { storageCapacityOptions } from "../VehicleTabs/Options";
import { getGroups } from "../../../../services/api/BusinessGroup";
import { businessGroupOptions } from "../../ReusableApi/Api";
import FileUploader from "../../../../components/FileUploader";
import GroupDropdown from "../../GroupDropdown";

const MyAccount = ({
  setValue,
  getValues,
  register,
  onSubmit,
  handleSubmit,
  errors,
  control,
  formData
}) => {
  const [loading, setLoading] = useState(false);
  const [defaultCountry,setDefaultCountry] = useState();
  const [selectStateName, setSelectStateName] = useState({
    name: "",
  });
  const { t } = useTranslation();
  const { checkRole, checkUserName } = useStorage();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [tempValue, setTempValue] = useState();
  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const [bussinessGpLable, setBussinessGpLable] = useState(null)
  const [isBuisnessGroupDisabled, setIsBuisnessGroupDisabled] = useState(false)
  const role = localStorage.getItem("role");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  
  useEffect(()=>{
    // getBusinessGroup()
    businessGroupOptions()
  },[])


  const companyOptions = DummyData.filter(
    (item) => item.role === "company"
  ).map((item) => ({
    label: item.country,
    value: item.country,
  }));


  useEffect(() => {
    if(checkRole() !== "SUPER_ADMIN"){
      console.log("super admin")
      setIsBuisnessGroupDisabled(true)
    }
    if(userDetails.user.role === 'BUSINESS_GROUP'){
      console.log(userDetails?.user.businessGroupId,"sbhsjksbfkjsfabfkjasf")
      setValue("businessGroupId", userDetails?.user.businessGroupId);
    }
},[])

  const { id } = useParams();
//   let newData = [];
// if(id){
//   console.log("jhdfgkwhebflwibefeklwjfewfwe", formData, formData[0].companyId)
//    newData = formData[0].companyId
// }
useEffect(()=>{
  if(formData && id){
    setValue("businessGroupId",formData?.[0].companyId?.businessGroupId?._id)
    setValue("companyName",formData[0].companyId?.companyName)
    setValue("userName", formData[0].userName)
    setValue("email",formData[0].email)
    setValue("mobileNumber",formData[0].mobileNumber)
    setValue("helpDeskEmail",formData[0].companyId?.helpDeskEmail)
    setValue("whatsappContactNumber",formData[0].companyId?.whatsappContactNumber)
    setValue("helpDeskTelephoneNumber",formData[0].companyId?.helpDeskTelephoneNumber)
    setValue("street1",formData[0].companyId?.street1)
    setValue("street2",formData[0].companyId?.street2)
    setValue("contactPerson",formData[0].companyId?.contactPerson)
    setValue("faxNumber",formData[0].companyId?.faxNumber)
    setValue("zipCode",formData[0].companyId?.zipCode)
    setValue("city",formData[0].companyId?.city)
    setValue("storageCapacity",formData[0].companyId?.capacity )
    setValue("country",formData[0].country)
    setValue("state",formData[0].state || '' )
    setDefaultCountry({ name:formData[0].country })
    setSelectStateName({name : formData[0].state || ''})
    setBussinessGpLable(formData?.[0].companyId?.businessGroupId?.groupName)
  }
},[formData,id])


  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            {t("businessGroup")}
            <span className="text-danger">*</span>
          </label>
            <Controller
              name="businessGroupId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                // <AsyncSelect
                //   cacheOptions
                //   defaultOptions
                //   onChange={(newValue) => {
                //     console.log(newValue)
                //     setBussinessGpLable(newValue.label)
                //     setValue("businessGroupId", newValue.value);
                //   }}
                //   loadOptions={businessGroupOptions}
                //   ref={ref}
                //   isDisabled={checkRole() !== "SUPER_ADMIN"}
                //   name={name}
                //   styles={customStyles}
                //   value={{label: bussinessGpLable , value : value}}
                // />
                <GroupDropdown
                  onChange={(newValue) => {
                    console.log(newValue)
                    setBussinessGpLable(newValue.value)
                    setValue("businessGroupId", newValue.value);
                    
                  }}
                  value={value}
                    ref={ref}
                    isDisabled={isBuisnessGroupDisabled}
                    name={name}
                    customStyles={customStyles}
                  />
              )}
            />
          {!getValues("businessGroupId") && <Error errorName={errors.businessGroupId} />}
        </div> 
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("companyName")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            required
            label="Company Name"
            name="companyName"
            defaultValue={getValues('companyName')}
            placeholder=""
          />
          <Error errorName={errors.companyName} />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          {t('username')} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            required
            label="User Name"
            name="userName"
            placeholder=""
            defaultValue={getValues('userName')}
          />
          <Error errorName={errors.userName} />
        </div>
        {/* <div className="col-xl-6 mb-3">
          <label className="form-label">Company<span className="text-danger">*</span></label>
          <CustomInput
            type="text"
            register={register}
            required
            label="Company"
            name="company"
            placeholder=""
            defaultValue={filteredCompanyData[0] ? filteredCompanyData[0].company : ''}
          />
           <Error errorName={errors.company} />
        </div> */}

        <div className="col-xl-6 mb-3 ">
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
          />
          <Error errorName={errors.email} />
        </div>
        {!id && (
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">
              {t("password")}
              <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="password"
              register={register}
              name="password"
              label="password"
              placeholder=""
              defaultValue={getValues("password")}
            />
            <Error errorName={errors.password} />
          </div>
        )}
       
        <div className="col-xl-6 mb-3 ">
        <label className="form-label">
            {t("helpDeskEmail")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            name="helpDeskEmail"
            label="Help Desk Email"
            placeholder=""
            defaultValue={getValues('helpDeskEmail')}
          />
          <Error errorName={errors.helpDeskEmail} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("helpDeskTelephoneNumber")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            className="form-control"
            label="Help Desk Telephone Number"
            name="helpDeskTelephoneNumber"
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            defaultValue={getValues('helpDeskTelephoneNumber')}
            placeholder=""
          />
          <Error errorName={errors.helpDeskTelephoneNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("mobileNumber")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            name="mobileNumber"
            label="Mobile Number"
            placeholder=""
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            defaultValue={getValues('mobileNumber')}
          />
          <Error errorName={errors.mobileNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("whatsappContactNumber")}</label>
          <CustomInput
            type="number"
            register={register}
            className="form-control"
            label="Whatsapp Contact Number"
            name="whatsappContactNumber"
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            placeholder=""
            defaultValue={getValues('whatsappContactNumber')}
          />
          <Error errorName={errors.whatsappContactNumber} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            {t("country")}
            <span className="text-danger">*</span>
          </label>
          <CountrySelect
            onChange={(e) => {
              console.log(e);
              setSelectStateName({ name: "" });
              setCountryid(e.id);
              setValue("country", e.name);
              setIsStateDisabled(false);
            }}
            defaultValue={defaultCountry}
            containerClassName="bg-white"
            inputClassName="border border-white"
            placeHolder="Select Country"
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
                setValue("state", e.name);
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
            defaultValue={getValues('city')}
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
            defaultValue={getValues('zipCode')}
          />
          <Error errorName={errors.zipCode} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('storageCapacity')}</label>
          <Controller
            name="storageCapacity"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("storageCapacity", newValue.value)}
                options={storageCapacityOptions}
                ref={ref}
                name="storageCapacity"
                styles={customStyles}
                value={{label: getValues("storageCapacity") ,value: getValues("storageCapacity")}}
              />
            )}
          />

            <p style={{fontStyle: "italic"}}>
              {t('forMoreThan120DaysPlease')} <a href="#" class="link-primary">{t('contact')}</a> {t('yourAccountManager')}
            </p>

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
            defaultValue={getValues('street1')}
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
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("contactPerson")}</label>
          <CustomInput
            type="text"
            register={register}
            label="Contact Person"
            name="contactPerson"
            defaultValue={getValues('contactPerson')}
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            {t("faxNumber")}
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Fax Number"
            name="faxNumber"
            defaultValue={getValues('faxNumber')}
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3" >
          <label className="form-label">{t('uploadLogo')}</label>
          <FileUploader
            setValue={setValue}
            register={register}
            label="Business Group Logo"
            name="logo"
            getValue={getValues}
            setLoading={setLoading}
            loading={loading}
          />
           {loading && <small>Uploading...</small>}
          <Error errorName={errors.businessGroupLogo} />
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
          {"Next"}
        </Button>
      </div>
    </div>
  );
};

export default MyAccount;
