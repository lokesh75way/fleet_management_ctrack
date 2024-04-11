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
      const FormData = formData[0];

      setValue("plateNumber",FormData.plateNumber || '' )
      setValue("vehicleCategory",FormData.vehicleCategory || '' )
      setValue("purchaseAmount",FormData.purchaseAmount || '' )
      setValue("DVIRTemplate",FormData.DVIRTemplate || '' )
      setValue("weightCapacity",FormData.weightCapacity || '' )
      setValue("companyAverage",FormData.companyAverage || '' )
      setValue("permit",FormData.permit || '' )
      setValue("registrationNumber",FormData.registrationNumber || '' )
      setValue("fuelType",FormData.fuelType || '' )
      setValue("fuelIdlingConsumption",FormData.fuelIdlingConsumption || '' )
      setValue("vinNumber",FormData.vinNumber || '' )
      setValue("engineNumber",FormData.engineNumber || '' )
      setValue("duration",FormData.duration || '' )
      setValue("sleepModeDuration",FormData.sleepModeDuration || '' )
      setValue("underweightTolerance",FormData.underweightTolerance || '' )
      setValue("overweightTolerance",FormData.overweightTolerance || '' )
      setValue("loadingUnloadingTolerance",FormData.loadingUnloadingTolerance || '' )
      
    }
  },[formData,id])

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t('plateNumber')}<span className="text-danger">*</span></label>
          <CustomInput
            type="text"
            register={register}
            label="Plate Number"
            name="plateNumber"
            placeholder=""
          />
          <Error errorName={errors.plateNumber} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t('vehicleCategory')}</label> <span className="text-danger">*</span>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="optradioCustom1"
                onChange={() => {setValue("vehicleCategory", "MOVABLE")
                setTempValue('vechicleCategory')
              }}
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
              />
              <label className="form-check-label" style={{ marginBottom: "0" }}>
              {t('immovable')}
              </label>

            </div>
          </div>
             {!getValues("vehicleCategory") && <Error errorName={errors.vehicleCategory} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t('DVIRTemplate')}<span className="text-danger">*</span></label>
          <CustomInput
            type="text"
            register={register}
            label="DVIR Plate"
            name="DVIRTemplate"
            placeholder=""
          />
          <Error errorName={errors.DVIRTemplate} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t('purchaseAmount')}<span className="text-danger">*</span></label>
          <CustomInput
            type="text"
            register={register}
            label="Purchase Amount"
            name="purchaseAmount"
            placeholder=""
          />
          <Error errorName={errors.purchaseAmount} />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t('manufactureDate')}</label>
          <Controller
            name="manufactureDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("manufactureDate") || new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) => setValue("manufactureDate", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t('purchaseDate')}</label>
          <Controller
            name="purchaseDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("purchaseDate") || new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) => setValue("purchaseDate", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('weightCapacity')}<span className="text-danger">*</span></label>
          <CustomInput
            type="text"
            register={register}
            label="Weight Capacity"
            name="weightCapacity"
            placeholder=""
          />
          <Error errorName={errors.weightCapacity} />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t('GPSInstallationDate')}</label>
          <Controller
            name="GPSInstallationDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("GPSInstallationDate") || new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) =>
                  setValue("GPSInstallationDate", newValue)
                }
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('GPSWarranty')}<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="GPS Warranty"
            name="GPSWarranty"
            placeholder=""
          />
          <Error errorName={errors.GPSWarranty} />
        </div>
        <div className="col-xl-6 mb-3">
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
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('permit')}<span className="text-danger">*</span></label>
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
              />
            )}
          />
          {!getValues('permit') && <Error errorName={errors.permit} />}
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t('installationDate')}</label>
          <Controller
            name="installationDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("installationDate") || new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) => setValue("installationDate", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('registrationNumber')}<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Registration Number"
            name="registrationNumber"
            placeholder=""
          />
          <Error errorName={errors.registrationNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('fuelType')}<span className="text-danger">*</span></label>
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
              />
            )}
          />
          {!getValues('fuelType') && <Error errorName={errors.fuelType} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('distanceBasedFuelConsumption')} </label><span className="text-danger">*</span>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsCheckedDBFC(!isCheckedDBFC)}
              className="form-check-input border border-2"
            />
            <CustomInput
              type="number"
              register={register}
              label="Distance"
              style={{ width: "5rem", margin: " 0 .4rem" }}
              name="distance"
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
                  style={{ width: "5rem", margin: " 0 .4rem" }}
                  name="distanceQuantity"
                  placeholder=""
                />
                <Controller
                  name="distanceQuantitySelect"
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                    onChange={(newValue) =>
                      setValue("distanceQuantitySelect", newValue.value)
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
            <Error errorName={errors.distance} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('durationBasedFuelConsumption')} </label> <span className="text-danger">*</span>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsCheckedDBFC2(!isCheckedDBFC2)}
              className="form-check-input border border-2"
              id="customCheckBox1"
            />
            <CustomInput
              type="number"
              register={register}
              label="Duration"
              style={{ width: "5rem", margin: " 0 .4rem" }}
              name="duration"
              placeholder=""
            />
            <Controller
              name="durationSelect"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                onChange={(newValue) =>
                  setValue("durationSelect", newValue.value)
                }
                options={durationSelectOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={durationSelectOptions[0]}
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
                  style={{ width: "5rem", margin: " 0 .4rem" }}
                  name="durationQuantity"
                  placeholder=""
                />
                <Controller
                  name="durationQuantitySelect"
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                    onChange={(newValue) =>
                      setValue("durationQuantitySelect", newValue.value)
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
            <Error errorName={errors.duration} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('fuelIdlingConsumption')}</label>
          <div className="d-flex align-items-center">
            <CustomInput
              type="number"
              register={register}
              label="Fuel Idling Consumption"
              name="fuelIdlingConsumption"
              placeholder=""
            />
            <Controller
              name="fuelIdlingConsumptionSelect"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  onChange={(newValue) =>
                    setValue("fuelIdlingConsumptionSelect", newValue.value)
                  }
                  options={distanceQuantitySelectOptions}
                  ref={ref}
                  name={name}
                  styles={customStyles}
                  className="ms-4 me-4"
                  defaultValue={distanceQuantitySelectOptions[0]}
                />
              )}
            />
            <span style={{ padding: " 0 .5rem" }}>/Hr</span>
          </div>
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('consumptionTolerance')}</label>
          <div className="d-flex align-items-center">
            <CustomInput
              type="number"
              register={register}
              style={{marginRight: ".5rem"}}
              name="consumptionTolerance"
              placeholder=""
            />
            <span style={{ padding: " 1rem" }}>%</span>
          </div>
        </div>

        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('vinNumber')} <span className="text-danger">*</span>
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
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('engineNumber')}
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Engine Number"
            name="engineNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('odometer')}
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Odometer"
            name="Odometer"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('LBSDetectionRadius')}
          </label>
          <CustomInput
            type="number"
            register={register}
            label="LBS Detection Radius"
            name="LBSDetectionRadius"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('engineHours')}
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Engine Hours"
            name="engineHours"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('passengerSeats')}<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Passenger Seats"
            name="passengerSeats"
            placeholder=""
          />
          <Error errorName={errors.passengerSeats} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('costBasedOn')}</label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsCheckedCBO(!isCheckedCBO)}
              className="form-check-input"
              id="customCheckBox1"
            />
            <label
              className="form-check-label"
              style={{ marginBottom: "0", marginRight: "1rem" }}
              htmlFor="customCheckBox1"
            >
              {t('distance')}
            </label>
            <input
              type="checkbox"
              onChange={() => setIsCheckedCBO2(!isCheckedCBO2)}
              className="form-check-input"
              id="customCheckBox1"
            />
            <label
              className="form-check-label"
              style={{ marginBottom: "0" }}
              htmlFor="customCheckBox1"
            >
              {t('duration')}
            </label>
          </div>
        </div>
            
     
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">{t('distanceCost')}</label>
            <div className={`${!isCheckedCBO ?  "d-flex align-items-center pe-none" : "d-flex align-items-center" }`}>
              <CustomInput
                type="number"
                register={register}
                label="Distance Cost"
                style={{ marginRight: ".5rem" }}
                name="distanceCost"
                placeholder=""
              />
              <span style={{ padding: "0 1rem" }}>$/Km</span>
            </div>
              <Error errorName={errors.distanceCost} />
          </div>

  
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">{t('duration')}</label>
            <div className={`${!isCheckedCBO2 ?  "d-flex align-items-center pe-none" : "d-flex align-items-center" }`}>
              <CustomInput
                type="number"
                register={register}
                label="Duration Cost"
                style={{ maxWidth: "70%", marginRight: ".5rem" }}
                name="durationCost"
                placeholder=""
              />
              <span style={{ padding: " 0 .5rem" }}>$/</span>
              <Controller
              name="durationCostSelect"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  onChange={(newValue) =>
                    setValue("durationCostSelect", newValue.value)
                  }
                  options={durationCostSelectOptions}
                  ref={ref}
                  name={name}
                  styles={customStyles}
                  defaultValue={durationCostSelectOptions[0]}
                />
              )}
            />
            </div>
            <Error errorName={errors.durationCost} />
          </div>
   
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('RFIDTimeoutDuration')}
          </label>
          <CustomInput
            type="number"
            register={register}
            label="RFIDT Timeout Duration"
            name="RFIDTimeoutDuration"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('sleepModeDuration')} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Sleep Mode Duration"
            name="sleepModeDuration"
            placeholder=""
          />
          <Error errorName={errors.sleepModeDuration} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('minimumWorkingHours')}
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Minimum Working Hours"
            name="minimumWorkingHours"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('weightSensor')}</label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsCheckedWC(!isCheckedWC)}
              className="form-check-input border border-2"
              id="customCheckBox1"
            />
            <label
              className="form-check-label"
              style={{ marginBottom: "0", marginRight: "1rem" }}
              htmlFor="customCheckBox1"
            >
              {isCheckedWC ? t('checked') : t('unchecked')}
            </label>
          </div>
        </div>
      
          { isCheckedWC &&  <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">{t('underweightTolerance')}</label><span className="text-danger">*</span>
              <div className={`${!isCheckedWC ?  "d-flex align-items-center pe-none" : "d-flex align-items-center" }`}>
                <CustomInput
                  type="number"
                  register={register}
                  label="Underweight Tolerance"
                  style={{ marginRight: ".5rem" }}
                  name="underweightTolerance"
                  placeholder=""
                />
                <span style={{ padding: " 0 1rem" }}>%</span>
              </div>
              <Error errorName={errors.underweightTolerance} />
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">{t('overweightTolerance')}</label><span className="text-danger">*</span>
              <div className={`${!isCheckedWC ?  "d-flex align-items-center pe-none" : "d-flex align-items-center" }`}>
                <CustomInput
                  type="number"
                  register={register}
                  label="Overweight Tolerance"
                  style={{ marginRight: ".5rem" }}
                  name="overweightTolerance"
                  placeholder=""
                />
                <span style={{ padding: " 0 1rem" }}>%</span>
              </div>
              <Error errorName={errors.overweightTolerance} />
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">{t('loadingUnloadingTolerance')} </label><span className="text-danger">*</span>
              <div className={`${!isCheckedWC ?  "d-flex align-items-center pe-none" : "d-flex align-items-center" }`}>
                <CustomInput
                  type="number"
                  register={register}
                  label="Loading/Unloading Tolerance "
                  style={{ marginRight: ".5rem" }}
                  name="loadingUnloadingTolerance"
                  placeholder=""
                />
                <span style={{ padding: " 0 1rem" }}>%</span>
              </div>
              <Error errorName={errors.loadingUnloadingTolerance} />
            </div>
          </>}
   
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t('fuelSensor')}</label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="customRadioBox987"
                value='SINGLE'
                checked={selectedOption === 'SINGLE'}
                onChange={handleChange}
                name="optradioCustom1"
              />
              <label
                className="form-check-label"
                htmlFor="customRadioBox987"
                style={{ marginBottom: "0" }}
              >
                {t('single')}
              </label>
            </div>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="customRadioBox988"
                name="optradioCustom1"
                value='MULTIPLE'
                checked={selectedOption === 'MULTIPLE'}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="customRadioBox988"
                style={{ marginBottom: "0" }}
              >
                {t('multiple')}
              </label>
            </div>
          </div>
        </div>

          <div className="col-xl-6 mb-3 ">
            <label className="form-label">{t('noOfTanks')}</label>
            <div className={`${ selectedOption !== 'single' ?  "d-flex align-items-center" : "d-flex align-items-center pe-none" }`}>
              <CustomInput
                type="number"
                register={register}
                label="No Of Tanks"
                style={{ marginRight: ".5rem" }}
                name="noOfTanks"
                placeholder=""
              />
              <span style={{ padding: " 0 1rem" }}>mG</span>
            </div>
          </div>
  

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('GSensor')}</label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsCheckedGS(!isCheckedGS)}
              className="form-check-input border border-2"
              id="customCheckBox1"
            />
            <label
              className="form-check-label"
              style={{ marginBottom: "0", marginRight: "1rem" }}
              htmlFor="customCheckBox1"
            >
              {isCheckedGS ? t('checked') : t('unchecked')}
            </label>
          </div>
        </div>

          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">{t('axisX')}</label>
              <div className={`${ !isCheckedGS ?  "d-flex align-items-center pe-none" : "d-flex align-items-center" }`}>
                <CustomInput
                  type="number"
                  register={register}
                  label="Axis X"
                  style={{ marginRight: ".5rem" }}
                  name="axisX"
                  placeholder=""
                />
                <span style={{ padding: " 0 1rem" }}>mG</span>
              </div>
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">{t('axisY')}</label>
              <div className={`${ !isCheckedGS ?  "d-flex align-items-center pe-none" : "d-flex align-items-center" }`}>
                <CustomInput
                  type="number"
                  register={register}
                  label="Axis Y"
                  style={{ marginRight: ".5rem" }}
                  name="axisY"
                  placeholder=""
                />
                <span style={{ padding: " 0 1rem" }}>mG</span>
              </div>
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">{t('axisZ')}</label>
              <div className={`${ !isCheckedGS ?  "d-flex align-items-center pe-none" : "d-flex align-items-center" }`}>
                <CustomInput
                  type="number"
                  register={register}
                  label="Axis Z"
                  style={{ marginRight: ".5rem" }}
                  name="axisZ"
                  placeholder=""
                />
                <span style={{ padding: " 0 1rem" }}>mG</span>
              </div>
            </div>
          </>
  
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
