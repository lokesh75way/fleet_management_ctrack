import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-bootstrap";
import Error from "../../Error/Error";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import '../../../../scss/pages/_driver-tracking.scss'
import {
  options,
  permitOptions,
  fuelTypeOptions,
  distanceQuantitySelectOptions,
  durationSelectOptions,
  durationCostSelectOptions,
} from "./Options";
import CustomInput from "../../Input/CustomInput";
import {useTranslation} from 'react-i18next'


const Profile = ({ register, setValue, errors, handleSubmit, onSubmit, control, getValues,formData}) => {
  const id = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCheckedDBFC, setIsCheckedDBFC] = useState(false);
  const [isCheckedDBFC2, setIsCheckedDBFC2] = useState(false);
  const [isCheckedCBO, setIsCheckedCBO] = useState(false);
  const [isCheckedCBO2, setIsCheckedCBO2] = useState(false);
  const [isCheckedWC, setIsCheckedWC] = useState(false);
  const [isCheckedGS, setIsCheckedGS] = useState(false);
  const [tempValue, setTempValue] = useState();

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", 
    }),
  };
  const handleChange = (e)=>{
    setSelectedOption(e.target.value)
    setValue('fuelSensor', e.target.value)
  }

  const {t} = useTranslation();

  useEffect(()=>{
    if(formData && id){
      // setValue("businessGroupId",formData?.[0].companyId?.businessGroupId?._id)
      // setValue("companyName",formData[0].companyId?.companyName)
      // setValue("userName", formData[0].userName)
      // setValue("email",formData[0].email)
      // setValue("mobileNumber",formData[0].mobileNumber)
      // setValue("helpDeskEmail",formData[0].companyId?.helpDeskEmail)
      // setValue("whatsappContactNumber",formData[0].companyId?.whatsappContactNumber)
      // setValue("helpDeskTelephoneNumber",formData[0].companyId?.helpDeskTelephoneNumber)
      // setValue("street1",formData[0].companyId?.street1)
      // setValue("street2",formData[0].companyId?.street2)
      // setValue("contactPerson",formData[0].companyId?.contactPerson)
      // setValue("faxNumber",formData[0].companyId?.faxNumber)
      // setValue("zipCode",formData[0].companyId?.zipCode)
      // setValue("city",formData[0].companyId?.city)
      // setValue("storageCapacity",formData[0].companyId?.capacity )
      // setValue("country",formData[0].country)
      // setValue("state",formData[0].state || '' )
      // setDefaultCountry({ name:formData[0].country })
      // setSelectStateName({name : formData[0].state || ''})
      // setBussinessGpLable(formData?.[0].companyId?.businessGroupId?.groupName)
      
      setValue("plateNumber",formData[0].plateNumber || '' )
      setValue("vehicleCategory",formData[0].vehicleCategory || '' )
      setValue("dvirTemplate",formData[0].dvirTemplate || '' )
      setValue("purchaseAmount",formData[0].purchaseAmount || '' )
      setValue("manufacturerDate",formData[0].manufacturerDate || '' )
      setValue("purchaseDate",formData[0].purchaseDate || '' )
      setValue("weightCapacity",formData[0].weightCapacity || '' )
      setValue("gpsInstallationDate",formData[0].gpsInstallationDate || '' )
      setValue("gpsWarranty", formData[0].gpsWarranty || '' )
      setValue("companyAverage",formData[0].companyAverage || '' )
      setValue("permit",formData[0].permit || '' )
      setValue("installationDate",formData[0].installationDate || '' )
      setValue("registrationNumber",formData[0].registrationNumber || '' )
      setValue("fuelType",formData[0].fuelType || '' )
      const distanceBaseFuelConsumption = formData?.[0]?.distanceBaseFuelConsumption
      setValue("distanceBasedDistanceQuantity", formData[0].distanceBasedDistanceQuantity || '' )
      if(distanceBaseFuelConsumption){
        setValue("distanceBaseFuelConsumption",formData[0].distanceBaseFuelConsumption || '' )
        setValue("distanceBaseFuelConsumptionUnit",formData[0].distanceBaseFuelConsumptionUnit || '' )
        setIsCheckedDBFC(true)
      }
      setValue("durationBaseFuelConsumptionDurationQuanitty",formData[0].durationBaseFuelConsumptionDurationQuanitty || '')
      setValue("durationBaseFuelConsumptionDurationUnit",formData[0].durationBaseFuelConsumptionDurationUnit || '' )
      const durationBaseDistanceQuantity = formData?.[0]?.durationBaseDistanceQuantity
      if(durationBaseDistanceQuantity){
        setValue("durationBaseDistanceQuantity",formData[0].durationBaseDistanceQuantity || '' )
        setValue("durationBaseFuelConsumptionUnit",formData[0].durationBaseFuelConsumptionUnit || '' )
        setIsCheckedDBFC2(true)
      }
      setValue("fuelIdlingConsumption",formData[0].fuelIdlingConsumption || '' )
      setValue("fuelIdlingConsumptionUnit",formData[0].fuelIdlingConsumptionUnit || '' )
      setValue("consumptionTolerancePercent",formData[0].consumptionTolerancePercent || '' )
      setValue("vinNumber",formData[0].vinNumber || '' )
      setValue("engineNumber",formData[0].engineNumber || '' )
      setValue("odometer",formData[0].odometer || '' )
      setValue("LBSDetectionRadius", formData[0].LBSDetectionRadius || '' )
      setValue("engineHour",formData[0].engineHour || '' )
      setValue("passengerSeat",formData[0].passengerSeat || '' )
      const distanceCostQuantity = formData?.[0]?.distanceCostQuantity
      if(distanceCostQuantity){
        setValue("distanceCostQuantity",distanceCostQuantity)
        setIsCheckedCBO(true)
      }
      const durationCostQuantity = formData?.[0]?.durationCostQuantity
      if(durationCostQuantity){
        setValue("durationCostQuantity",durationCostQuantity)
        setValue("durationUnit",formData[0].durationUnit || '' )
        setIsCheckedCBO2(true)
      }
      setValue("rfidTimeoutDuration",formData[0].rfidTimeoutDuration || '' )
      setValue("sleepModeDuration",formData[0].sleepModeDuration || '' )
      setValue("minimumWorkingHour",formData[0].minimumWorkingHour || '' )
      const weightSensor = formData?.[0]?.weightSensor
      if(weightSensor){
        setValue("weightSensor",weightSensor)
        setIsCheckedWC(weightSensor)
      }
      setValue("fuelSensor",formData[0].fuelSensor || '' )
      setValue("noOfTanks",formData[0].noOfTanks || '' )
      const gSensor = formData?.[0]?.gSensor
      if(gSensor){
        setIsCheckedGS(gSensor)
      }
      setValue("axisX",formData[0].axisX || '' )
      setValue("axisY",formData[0].axisY || '' )
      setValue("axisZ",formData[0].axisZ || '' )
      setValue("duration",formData[0].duration || '' )
      setValue("underweightTolerance",formData[0].underweightTolerance || '' )
      setValue("overweightTolerance",formData[0].overweightTolerance || '' )
      setValue("loadingUnloadingTolerance",formData[0].loadingUnloadingTolerance || '' )
      

      // setValue("plateNumber",FormData.plateNumber || '' )
      // setValue("vehicleCategory",FormData.vehicleCategory || '' )
      // setValue("purchaseAmount",FormData.purchaseAmount || '' )
      // setValue("DVIRTemplate",FormData.DVIRTemplate || '' )
      // setValue("weightCapacity",FormData.weightCapacity || '' )
      // setValue("companyAverage",FormData.companyAverage || '' )
      // setValue("permit",FormData.permit || '' )
      // setValue("registrationNumber",FormData.registrationNumber || '' )
      // setValue("fuelType",FormData.fuelType || '' )
      // setValue("fuelIdlingConsumption",FormData.fuelIdlingConsumption || '' )
      // setValue("vinNumber",FormData.vinNumber || '' )
      // setValue("engineNumber",FormData.engineNumber || '' )
      // setValue("duration",FormData.duration || '' )
      // setValue("sleepModeDuration",FormData.sleepModeDuration || '' )
      // setValue("underweightTolerance",FormData.underweightTolerance || '' )
      // setValue("overweightTolerance",FormData.overweightTolerance || '' )
      // setValue("loadingUnloadingTolerance",FormData.loadingUnloadingTolerance || '' )
      
    }
  },[formData,id])

  return (
    <div className="p-4">
      <div className="row" style={{ width: "80%"}}>
        {/* <div className="col-xl-3 mb-3">
          <label className="form-label">{t('plateNumber')}</label>
          <CustomInput
            type="text"
            register={register}
            label="Plate Number"
            name="plateNumber"
            placeholder=""
          />
          <Error errorName={errors.plateNumber} />
        </div> */}
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t('vehicleCategory')}</label> 
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="optradioCustom1"
                onChange={() => {setValue("vehicleCategory", "MOVABLE")
                setTempValue('vechicleCategory')
              }}
              checked={getValues("vehicleCategory") === "MOVABLE"}
              />
              <label className="form-check-label" style={{ marginBottom: "0" }}>
              {t('movable')}
              </label>
            </div>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                onChange={() => {setValue("vehicleCategory", "IMMOVABLE")
                setTempValue('vehicleCategory')
              }}
                name="optradioCustom1"
                checked={getValues("vehicleCategory") === "IMMOVABLE"}
              />
              <label className="form-check-label" style={{ marginBottom: "0" }}>
              {t('immovable')}
              </label>

            </div>
          </div>
             {!getValues("vehicleCategory") && <Error errorName={errors.vehicleCategory} />}
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t('DVIRTemplate')}</label>
          <CustomInput
            type="text"
            register={register}
            label="DVIR Plate"
            name="dvirTemplate"
            placeholder=""
          />
          <Error errorName={errors.dvirTemplate} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t('purchaseAmount')}</label>
          <CustomInput
            type="text"
            register={register}
            label="Purchase Amount"
            name="purchaseAmount"
            placeholder=""
          />
          <Error errorName={errors.purchaseAmount} />
        </div>
        <div className="col-xl-3 mb-3 d-flex flex-column">
          <label className="form-label">{t('manufactureDate')}</label>
          <Controller
            name="manufacturerDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("manufacturerDate")? new Date(getValues("manufacturerDate")) : new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) => setValue("manufacturerDate", newValue)}
              />
            )}
          />
        </div>
        {/* <div className="col-xl-3 mb-3 d-flex flex-column">
          <label className="form-label">{t('purchaseDate')}</label>
          <Controller
            name="purchaseDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("purchaseDate")? new Date(getValues("purchaseDate")) : new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) => setValue("purchaseDate", newValue)}
              />
            )}
          />
        </div> */}
        {/* <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t('weightCapacity')}</label>
          <CustomInput
            type="text"
            register={register}
            label="Weight Capacity"
            name="weightCapacity"
            placeholder=""
          />
          <Error errorName={errors.weightCapacity} />
        </div> */}
        {/* <div className="col-xl-3 mb-3 d-flex flex-column">
          <label className="form-label">{t('GPSInstallationDate')}</label>
          <Controller
            name="gpsInstallationDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("gpsInstallationDate") ? new Date(getValues("gpsInstallationDate")) : new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) =>
                  setValue("gpsInstallationDate", newValue)
                }
              />
            )}
          />
        </div> */}
        {/* <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('GPSWarranty')}
          </label>
          <CustomInput
            type="number"
            register={register}
            label="GPS Warranty"
            name="gpsWarranty"
            placeholder=""
          />
          <Error errorName={errors.gpsWarranty} />
        </div> */}
        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('companyAverage')}
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Company Average"
            name="companyAverage"
            placeholder=""
          />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t('permit')}</label>
          <Controller
            name="permit"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, rules, ref } }) => (
              <Select
                onChange={(newValue) => {setTempValue(newValue.value); setValue("permit", newValue.value)}}
                options={permitOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={permitOptions[0]}
                value={{label:getValues('permit'), value :getValues('permit')}}
              />
            )}
          />
          {!getValues('permit') && <Error errorName={errors.permit} />}
        </div>
        <div className="col-xl-3 mb-3 d-flex flex-column">
          <label className="form-label">{t('installationDate')}</label>
          <Controller
            name="installationDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("installationDate")? new Date(getValues("installationDate")) : new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) => setValue("installationDate", newValue)}
              />
            )}
          />
        </div>
     
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t('fuelType')}</label>
          <Controller
            name="fuelType"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {setTempValue(newValue.value); setValue("fuelType", newValue.value)}}
                options={fuelTypeOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={fuelTypeOptions[0]}
                value={{label:getValues('fuelType'), value :getValues('fuelType')}}
              />
            )}
          />
          {!getValues('fuelType') && <Error errorName={errors.fuelType} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('distanceBasedFuelConsumption')} </label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsCheckedDBFC(!isCheckedDBFC)}
              className="form-check-input border border-2"
              checked={isCheckedDBFC}
            />
            <CustomInput
              type="number"
              register={register}
              label="Distance"
              style={{ width: "5rem", margin: " 0 .4rem" }}
              name="distanceBasedDistanceQuantity"
              placeholder=""
            />
            <span>{t('kilometer')}</span>
            {isCheckedDBFC && (
              <>
                <span style={{ paddingLeft: ".6rem" }}>/</span>
                <CustomInput
                  type="number"
                  register={register}
                  label = "Distance Quantity"
                  style={{ width: "6rem", margin: " 0 1rem" }}
                  name="distanceBaseFuelConsumption"
                  placeholder=""
                />
                <Controller
                  name="distanceBaseFuelConsumptionUnit"
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                    onChange={(newValue) =>
                      setValue("distanceBaseFuelConsumptionUnit", newValue.value)
                    }
                    options={distanceQuantitySelectOptions}
                    ref={ref}
                    name={name}
                    styles={customStyles}
                    defaultValue={distanceQuantitySelectOptions[0]}
                    />
                    )}
                />
              </>
            )}
          </div>
            <Error errorName={errors.distanceBaseFuelConsumption} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('durationBasedFuelConsumption')} </label> 
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsCheckedDBFC2(!isCheckedDBFC2)}
              className="form-check-input border border-2"
              id="customCheckBox1"
              checked={isCheckedDBFC2}
            />
            <CustomInput
              type="number"
              register={register}
              label="Duration"
              style={{ width: "5rem", margin: " 0 1rem" }}
              name="durationBaseFuelConsumptionDurationQuanitty"
              placeholder=""
            />
            <Controller
              name="durationBaseFuelConsumptionDurationUnit"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                onChange={(newValue) =>
                  setValue("durationBaseFuelConsumptionDurationUnit", newValue.value)
                }
                options={durationSelectOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={durationSelectOptions[0]}
                value={{label:getValues('durationBaseFuelConsumptionDurationUnit'), value :getValues('durationBaseFuelConsumptionDurationUnit')}}
                />
                )}
            />
            {isCheckedDBFC2 && (
              <>
                <span style={{ paddingLeft: ".4rem", paddingRight : ".4rem" }}>/</span>
                <CustomInput
                  type="number"
                  register={register}
                  label="Duration Quantity"
                  style={{ width: "6rem", margin: " 0 1rem" }}
                  name="durationBaseDistanceQuantity"
                  placeholder=""
                />
                <Controller
                  name="durationBaseFuelConsumptionUnit"
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                    onChange={(newValue) =>
                      setValue("durationBaseFuelConsumptionUnit", newValue.value)
                    }
                    options={distanceQuantitySelectOptions}
                    ref={ref}
                    name={name}
                    styles={customStyles}
                    defaultValue={distanceQuantitySelectOptions[0]}
                    value={{label:getValues('durationBaseFuelConsumptionUnit'), value :getValues('durationBaseFuelConsumptionUnit')}}
                    />
                    )}
                />
              </>
            )}
          </div>
            <Error errorName={errors.durationBaseFuelConsumptionDurationQuanitty} />
        </div>
     
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">{t('consumptionTolerance')}</label>
          <div className="d-flex align-items-center">
            <CustomInput
              type="number"
              register={register}
              style={{marginRight: ".5rem"}}
              name="consumptionTolerancePercent"
              placeholder=""
            />
            <span style={{ padding: " 1rem" }}>%</span>
          </div>
        </div>

        <div className="col-xl-3 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('vinNumber')} 
          </label>
          <CustomInput
            type="text"
            register={register}
            label="VIN Number"
            name="vinNumber"
            placeholder=""
          />
          <Error errorName={errors.vinNumber} />
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
        <Button type="submit" onClick={handleSubmit(onSubmit)} style={{ width: "10%" }}> {t('next')}</Button>
      </div>
    </div>
  );
};

export default Profile;
