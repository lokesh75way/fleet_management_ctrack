import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-bootstrap";
import Error from "../../Error/Error";
import {
  options,
  permitOptions,
  fuelTypeOptions,
  distanceQuantitySelectOptions,
  durationSelectOptions,
  durationCostSelectOptions,
} from "./Options";

const Profile = ({handleNext, register, setValue}) => {
  const { control, getValues } = useForm();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCheckedDBFC, setIsCheckedDBFC] = useState(false);
  const [isCheckedDBFC2, setIsCheckedDBFC2] = useState(false);
  const [isCheckedCBO, setIsCheckedCBO] = useState(false);
  const [isCheckedCBO2, setIsCheckedCBO2] = useState(false);
  const [isCheckedWC, setIsCheckedWC] = useState(false);
  const [isCheckedGS, setIsCheckedGS] = useState(false);

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
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
          <label className="form-label">Plate Number</label>
          <input
            type="text"
            {...register("plateNumber")}
            className="form-control"
            name="plateNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Vehicle Category</label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="optradioCustom1"
                onChange={() => setValue("vehicleCategory", "movable")}
              />
              <label className="form-check-label" style={{ marginBottom: "0" }}>
                Movable
              </label>
            </div>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                onChange={() => setValue("vehicleCategory", "immovable")}
                name="optradioCustom1"
              />
              <label className="form-check-label" style={{ marginBottom: "0" }}>
                Immovable
              </label>
            </div>
          </div>
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">DVIR Template</label>
          <input
            type="text"
            {...register("DVIRTemplate")}
            className="form-control"
            name="DVIRTemplate"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Purchase Amount</label>
          <input
            type="text"
            {...register("purchaseAmount")}
            className="form-control"
            name="purchaseAmount"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Manufacture Date</label>
          <Controller
            name="manufactureDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("manufactureDate") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("manufactureDate", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Purchase Date</label>
          <Controller
            name="purchaseDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("purchaseDate") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("purchaseDate", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Weight Capacity</label>
          <input
            type="text"
            {...register("weightCapacity")}
            className="form-control"
            name="weightCapacity"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">GPS Installation Date</label>
          <Controller
            name="GPSInstallationDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("GPSInstallationDate") || new Date()}
                className="form-control"
                onChange={(newValue) =>
                  setValue("GPSInstallationDate", newValue)
                }
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            GPS Warranty
          </label>
          <input
            type="text"
            {...register("GPSWarranty")}
            className="form-control"
            name="GPSWarranty"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Company Average
          </label>
          <input
            type="text"
            {...register("companyAverage")}
            className="form-control"
            name="companyAverage"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Permit</label>
          <Controller
            name="permit"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("permit", newValue.value)}
                options={permitOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={permitOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Installation Date</label>
          <Controller
            name="installationDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("installationDate") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("installationDate", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Registration Number
          </label>
          <input
            type="text"
            {...register("registrationNumber")}
            className="form-control"
            name="registrationNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Fuel Type</label>
          <Controller
            name="fuelType"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("fuelType", newValue.value)}
                options={fuelTypeOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={fuelTypeOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Distance based Fuel Consumption </label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsCheckedDBFC(!isCheckedDBFC)}
              className="form-check-input"
            />
            <input
              type="number"
              {...register("distance")}
              className="form-control"
              style={{ width: "6rem", margin: " 0 1rem" }}
              name="distance"
              placeholder=""
            />
            <span>Kilometer</span>
            {isCheckedDBFC && (
              <>
                <span style={{ paddingLeft: ".6rem" }}>/</span>
                <input
                  type="number"
                  {...register("distanceQuantity")}
                  className="form-control"
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
              className="form-check-input"
              id="customCheckBox1"
            />
            <input
              type="number"
              {...register("duration")}
              className="form-control"
              style={{ width: "6rem", margin: " 0 1rem" }}
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
                <span style={{ paddingLeft: ".6rem" }}>/</span>
                <input
                  type="number"
                  {...register("durationQuantity")}
                  className="form-control"
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
            <input
              type="number"
              {...register("fuelIdlingConsumption")}
              className="form-control"
              style={{ width: "50%", marginRight: "1rem" }}
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
            <input
              type="number"
              {...register("consumptionTolerance")}
              className="form-control"
              style={{ marginRight: ".5rem" }}
              name="consumptionTolerance"
              placeholder=""
            />
            <span style={{ padding: " 0 .5rem" }}>%</span>
          </div>
        </div>

        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            VIN(Chassis) Number :
          </label>
          <input
            type="text"
            {...register("vinNumber")}
            className="form-control"
            name="vinNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Engine Number
          </label>
          <input
            type="text"
            {...register("engineNumber")}
            className="form-control"
            name="engineNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Odometer
          </label>
          <input
            type="text"
            {...register("Odometer")}
            className="form-control"
            name="Odometer"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            LBS Detection Radius
          </label>
          <input
            type="number"
            {...register("LBSDetectionRadius")}
            className="form-control"
            name="LBSDetectionRadius"
            placeholder="Max value upto 5000meters"
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Engine Hours
          </label>
          <input
            type="text"
            {...register("engineHours")}
            className="form-control"
            name="engineHours"
            placeholder="Max value upto 5000meters"
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            No of passenger seats
          </label>
          <input
            type="number"
            {...register("passengerSeats")}
            className="form-control"
            name="passengerSeats"
            placeholder="Max value upto 5000meters"
          />
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
        {isCheckedCBO && (
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">Distance</label>
            <div className="d-flex align-items-center">
              <input
                type="number"
                {...register("distanceCost")}
                className="form-control"
                style={{ marginRight: ".5rem" }}
                name="distanceCost"
                placeholder=""
              />
              <span style={{ padding: " 0 .5rem" }}>$/Km</span>
            </div>
          </div>
        )}
        {isCheckedCBO2 && (
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">Duration</label>
            <div className="d-flex align-items-center">
              <input
                type="number"
                {...register("durationCost")}
                className="form-control"
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
          </div>
        )}
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            RFID Timeout Duration
          </label>
          <input
            type="number"
            {...register("RFIDTimeoutDuration")}
            className="form-control"
            name="RFIDTimeoutDuration"
            placeholder="Max value upto 5000meters"
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Sleep Mode Duration
          </label>
          <input
            type="number"
            {...register("sleepModeDuration")}
            className="form-control"
            name="sleepModeDuration"
            placeholder="Max value upto 5000meters"
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Minimum Working Hours
          </label>
          <input
            type="number"
            {...register("minimumWorkingHours")}
            className="form-control"
            name="minimumWorkingHours"
            placeholder="Max value upto 5000meters"
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Weight Sensor</label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsCheckedWC(!isCheckedWC)}
              className="form-check-input"
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
        {isCheckedWC && (
          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">Underweight Tolerance</label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("underweightTolerance")}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="underweightTolerance"
                  placeholder=""
                />
                <span style={{ padding: " 0 .5rem" }}>%</span>
              </div>
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">Overweight Tolerance</label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("overweightTolerance")}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="overweightTolerance"
                  placeholder=""
                />
                <span style={{ padding: " 0 .5rem" }}>%</span>
              </div>
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">Loading/Unloading Tolerance </label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("loadingUnloadingTolerance")}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="loadingUnloadingTolerance"
                  placeholder=""
                />
                <span style={{ padding: " 0 .5rem" }}>%</span>
              </div>
            </div>
          </>
        )}
        <div className="col-xl-6 mb-3">
          <label className="form-label">Fuel Sensor</label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="customRadioBox987"
                value='single'
                checked={selectedOption === 'single'}
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
                value='multiple'
                checked={selectedOption === 'multiple'}
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
        {selectedOption === 'multiple' && (
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">No of Tanks</label>
            <div className="d-flex align-items-center">
              <input
                type="number"
                {...register("noOfTanks")}
                className="form-control"
                style={{ marginRight: ".5rem" }}
                name="noOfTanks"
                placeholder=""
              />
              <span style={{ padding: " 0 .5rem" }}>mG</span>
            </div>
          </div>
        )}

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">G Sensor</label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsCheckedGS(!isCheckedGS)}
              className="form-check-input"
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
        {isCheckedGS && (
          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">Axis X</label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("axisX")}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="axisX"
                  placeholder=""
                />
                <span style={{ padding: " 0 .5rem" }}>mG</span>
              </div>
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">Axis Y</label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("axisY")}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="axisY"
                  placeholder=""
                />
                <span style={{ padding: " 0 .5rem" }}>mG</span>
              </div>
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">Axis Z</label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("axisZ")}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="axisZ"
                  placeholder=""
                />
                <span style={{ padding: " 0 .5rem" }}>mG</span>
              </div>
            </div>
          </>
        )}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "2rem 0",
        }}
      >
        <Button onClick={handleNext} style={{ width: "10%" }}> Next</Button>
      </div>
    </div>
  );
};

export default Profile;
