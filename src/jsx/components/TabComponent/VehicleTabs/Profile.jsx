import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-bootstrap";
import Error from "../../Error/Error";
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

const Profile = ({ register, setValue, errors, handleSubmit, onSubmit, control, getValues}) => {
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

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Plate Number<span className="text-danger">*</span></label>
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
          <label className="form-label">Vehicle Category</label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="optradioCustom1"
                onChange={() => setValue("vehicleCategory", "MOVABLE")}
              />
              <label className="form-check-label" style={{ marginBottom: "0" }}>
                Movable
              </label>
            </div>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                onChange={() => setValue("vehicleCategory", "IMMOVABLE")}
                name="optradioCustom1"
              />
              <label className="form-check-label" style={{ marginBottom: "0" }}>
                Immovable
              </label>
            </div>
          </div>
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">DVIR Template<span className="text-danger">*</span></label>
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
          <label className="form-label">Purchase Amount<span className="text-danger">*</span></label>
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
          <label className="form-label">Manufacture Date</label>
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
          <label className="form-label">Purchase Date</label>
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
          <label className="form-label">Weight Capacity<span className="text-danger">*</span></label>
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
          <label className="form-label">GPS Installation Date</label>
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
            GPS Warranty<span className="text-danger">*</span>
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
            Company Average
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
          <label className="form-label">Permit<span className="text-danger">*</span></label>
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
          <label className="form-label">Installation Date</label>
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
            Registration Number<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Registration Number"
            name="registrationNumber"
            placeholder=""
          />
          <Error errorName={errors.registrationNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Fuel Type<span className="text-danger">*</span></label>
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
          <label className="form-label">Distance based Fuel Consumption </label>
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
              style={{ width: "6rem", margin: " 0 2rem" }}
              name="distance"
              placeholder=""
            />
            <span>Kilometer</span>
            {isCheckedDBFC && (
              <>
                <span style={{ paddingLeft: ".6rem" }}>/</span>
                <CustomInput
                  type="number"
                  register={register}
                  label = "Distance Quantity"
                  style={{ width: "6rem", margin: " 0 1rem" }}
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
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Duration based Fuel Consumption </label>
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
              style={{ width: "6rem", margin: " 0 2rem" }}
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
                <span style={{ paddingLeft: ".6rem", paddingRight : ".6rem" }}>/</span>
                <CustomInput
                  type="number"
                  register={register}
                  label="Duration Quantity"
                  style={{ width: "6rem", margin: " 0 1rem" }}
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
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Fuel Idling Consumption</label>
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
          <label className="form-label">Consumption Tolerance</label>
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
            VIN(Chassis) Number :
          </label>
          <CustomInput
            type="text"
            register={register}
            label="VIN Number"
            name="vinNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Engine Number
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
            Odometer
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
            LBS Detection Radius
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
            Engine Hours
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
            No of passenger seats<span className="text-danger">*</span>
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
          <label className="form-label">Cost Based On</label>
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
              Distance
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
              Duration
            </label>
          </div>
        </div>
     
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">Distance<span className="text-danger">*</span></label>
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
            <label className="form-label">Duration<span className="text-danger">*</span></label>
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
            RFID Timeout Duration
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
            Sleep Mode Duration
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Sleep Mode Duration"
            name="sleepModeDuration"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Minimum Working Hours
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
          <label className="form-label">Weight Sensor</label>
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
              {isCheckedWC ? "Checked" : "Unchecked"}
            </label>
          </div>
        </div>
      
          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">Underweight Tolerance</label>
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
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">Overweight Tolerance</label>
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
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">Loading/Unloading Tolerance </label>
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
            </div>
          </>
   
        <div className="col-xl-6 mb-3">
          <label className="form-label">Fuel Sensor</label>
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
                Single
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
                Multiple
              </label>
            </div>
          </div>
        </div>

          <div className="col-xl-6 mb-3 ">
            <label className="form-label">No of Tanks</label>
            <div className={`${ selectedOption !== 'multiple' ?  "d-flex align-items-center pe-none" : "d-flex align-items-center" }`}>
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
          <label className="form-label">G Sensor</label>
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
              {isCheckedGS ? "Checked" : "Unchecked"}
            </label>
          </div>
        </div>

          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">Axis X</label>
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
              <label className="form-label">Axis Y</label>
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
              <label className="form-label">Axis Z</label>
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
        <Button type="submit" onClick={handleSubmit(onSubmit)} style={{ width: "10%" }}> Submit</Button>
      </div>
    </div>
  );
};

export default Profile;
