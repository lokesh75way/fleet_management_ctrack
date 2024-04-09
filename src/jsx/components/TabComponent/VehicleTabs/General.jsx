import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  deviceTypeOptions,
  copyFromOptions,
  distanceCounterOptions,
  unitOfDistanceOptions,
  speedDetectionOptions,
} from "./Options";
import AsyncSelect from "react-select/async";
import CustomInput from "../../Input/CustomInput";
import DummyData from "../../../../users.json";
import useStorage from "../../../../hooks/useStorage";
import { useParams } from "react-router-dom";
import { getCompany } from "../../../../services/api/CompanyServices";
import { getGroups } from "../../../../services/api/BusinessGroup";
import { allCompanyOptions, businessGroupOptions } from "../../ReusableApi/Api";
import {useTranslation} from 'react-i18next'

import CompanyDropdown from "../../CompanyDropdown";
import ParentBranchDropdown from "../../ParentBranch";
import GroupDropdown from "../../GroupDropdown";





const General = ({
  register,
  setValue,
  getValues,
  errors,
  control,
  handleSubmit,
  onSubmit,
  formData
}) => {


  const [groupId, setGroupId] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  const [businessDisabled, setBusinessDisabled] = useState(false);
  const [companyDisabled, setCompanyDisabled] = useState(false);


  const { checkRole, checkUserName } = useStorage();
  const [tempValue, setTempValue] = useState();
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("userJsonData"));
  const newData = userData.filter((data) => data.id == parseInt(id, 10));
  const [filteredUserData, setFilteredUserData] = useState(newData);


  const role = checkRole()

  // useEffect(()=>{
  //   getCompanyData()
  //   getBusinessData()
  // },[])
  // let businessGroupOptions;
  // const getCompanyData = async()=>{
  //   const {data} = await getGroups()
  //   businessGroupOptions = data.map((item)=>{
  //     return 
  //   })
  //   setAllCompany(allCompany)
  // }

  useEffect(()=>{
    businessGroupOptions()
    allCompanyOptions()
  },[])


  

  const {t} = useTranslation();

  let companyOptions,branchOptions;
  if(role === 'admin'){
    companyOptions = DummyData.filter((item)=> item.role === 'company').map((item) => ({
      label: item.userName,
      value: item.id,
    }));
    branchOptions = DummyData.filter(
      (item) => item.role === 'branch'
    ).map((item) => ({
      label: item.userName,
      value: item.id,
    }));
  }
  else if(role === 'businessgroup'){
    companyOptions = DummyData.filter((item)=> item.role === 'company' && item.parent === checkUserName()).map((item) => ({
      label: item.userName,
      value: item.id,
    }));
    branchOptions = DummyData.filter(
      (item) => item.parentBusinessGroup === checkUserName() && item.role === 'branch'
    ).map((item) => ({
      label: item.userName,
      value: item.id,
    }));
  }
  else if(role === 'company'){
    branchOptions = DummyData.filter(
      (item) => item.parentCompany === checkUserName() && item.role === 'branch'
    ).map((item) => ({
      label: item.userName,
      value: item.id,
    }));
    companyOptions = DummyData.filter(
      (item) => item.userName === checkUserName()
    )
  }
  // const[formData,setFormData] = useState([])
  useEffect(()=>{
    
    if(formData && id){
      const FormData = formData[0];
      setValue("businessGroupId",FormData?.businessGroupId)
      setValue("businessId",FormData?.businessGroupId)
      setValue("company",FormData?.companyId)
      setValue("businessGroupName",FormData?.businessGroupName)
      console.log('imei number ',FormData?.imeiNumber);
      setValue("imeiNumber",FormData?.imeiNumber)
      setValue("vehicleName",FormData?.vehicleName)
      setValue("plateNumber",FormData?.plateNumber)
      setValue("branch",FormData?.branch)
      setValue("simNumber",FormData?.simNumber)
      setValue("IMEINumber",FormData?.IMEINumber)
      setValue("registrationNumber",FormData?.registrationNumber)
      setValue("weightCapacity",FormData?.weightCapacity)
      
      setValue("deviceType",FormData?.deviceType)
      setValue("serverAddress",FormData?.serverAddress)
      setValue("distanceCounter",FormData?.distanceCounter)
      setValue("unitOfDistance",FormData?.unitOfDistance)
      setValue("deviceAccuracyTolerance",FormData?.deviceAccuracyTolerance)
    }
  },[formData,id])

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
            render={({ field: { onChange, value, name, ref } }) => (
              <GroupDropdown
              onChange={ (newValue) => {
                setValue("businessGroupId", newValue.value);
                setValue("businessId", newValue.value);
                setValue("businessGroupName", newValue.label);
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
          {!getValues("businessGroupId") && <Error errorName={errors.businessGroupId} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          {t('company')}  <span className="text-danger">*</span>
          </label>
          <Controller
            name="company"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <CompanyDropdown 
              key={groupId}
              groupId={groupId}
              onChange={(newValue) => {
               
                setCompanyId(newValue.value)
                setValue("companyId", newValue.value);
                setValue("company", newValue.label);
              }}
              value={value}
              customStyles={customStyles}
              ref={ref}
              isDisabled={companyDisabled}
              name={name}
            />
            )}
          />
          {!getValues("company") && <Error errorName={errors.company} />}
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          {t('branch')} 
          </label>
          <Controller
            name="branch"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <ParentBranchDropdown
                key={companyId}
                companyId={companyId}
                onChange={async (newValue) => {
                  // setValue("parentBranchId", newValue.value);
                  setValue("branchId", newValue.value);
                  setValue("branch", newValue.value);
                  setValue("branchName", newValue.label);
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
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          {t('vehicleName')} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            required
            register={register}
            label="Vehicle Name"
            name="vehicleName"
            placeholder=""
            defaultValue={getValues('vehicleName')}
          />
          <Error errorName={errors.vehicleName} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
          {t('deviceType')}  <span className="text-danger">*</span>
          </label>
          <Controller
            name="deviceType"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setTempValue(newValue.value);
                  setValue("deviceType", newValue.value);
                }}
                options={deviceTypeOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{label:getValues('deviceType'), value :getValues('deviceType')}}
              />
            )}
          />
          {!getValues("deviceType") && <Error errorName={errors.deviceType} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('IMEINumber')}  <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="imeiNumber"
            label="IMEI Number"
            placeholder=""
            defaultValue={getValues('imeiNumber')}
          />
          <Error errorName={errors.imeiNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('copyFrom')} </label>
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
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('serverAddress')} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            name="serverAddress"
            placeholder=""
            defaultValue={getValues('serverAddress')}
          />
        <Error errorName={errors.serverAddress} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
          {t('simNumber')}  <span className="text-danger">*</span>
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
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
          {t('secondarySimNumber')} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            name="secondarySimNumber"
            placeholder=""
          />
          <Error errorName={errors.secondarySimNumber} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
          {t('distanceCounter')} <span className="text-danger">*</span>
          </label>
          <Controller
            name="distanceCounter"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>{
                  setValue("distanceCounter", newValue.value)
                  setTempValue("frgefrg")
                }
                  
                }
                options={distanceCounterOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                // defaultValue={distanceCounterOptions[0]}
                value={{label:getValues('distanceCounter'), value :getValues('distanceCounter')}}
              />
            )}
          />
          {!getValues("distanceCounter") && <Error errorName={errors.distanceCounter} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
          {t('unitOfDistance')} <span className="text-danger">*</span>
          </label>
          <Controller
            name="unitOfDistance"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>
                  {                    
                    setValue("unitOfDistance", newValue.value)
                    setTempValue(newValue.value);
                  }
                }
                options={unitOfDistanceOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{label:getValues('unitOfDistance'), value :getValues('unitOfDistance')}}
              />
            )}
          />
          {!getValues("unitOfDistance") && <Error errorName={errors.unitOfDistance} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
          {t('speedDetection')} 
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
              />
            )}
          />
          <Error errorName={errors.speedDetection} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
          {t('deviceAccuracyTolerance')} <span className="text-danger">*</span>
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
          {t('next')} 
        </Button>
      </div>
    </div>
  );
};

export default General;
