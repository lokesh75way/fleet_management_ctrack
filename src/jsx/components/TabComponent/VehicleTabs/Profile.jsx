import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";

const Profile = () => {
  const { register } = useForm();
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [isChecked6, setIsChecked6] = useState(false);
  const [isMultiple, setIsMultiple] = useState(false);
  
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Plate Number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("plateNumber", {
              required: "Plate Number is required",
            })}
            className="form-control"
            name="plateNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Vehicle Category<span className="text-danger">*</span>
          </label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="customRadioBox987"
                name="optradioCustom1"
              />
              <label
                className="form-check-label"
                htmlFor="customRadioBox987"
                style={{ marginBottom: "0" }}
              >
                Movable
              </label>
            </div>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="customRadioBox988"
                name="optradioCustom1"
              />
              <label
                className="form-check-label"
                htmlFor="customRadioBox988"
                style={{ marginBottom: "0" }}
              >
                Immovable
              </label>
            </div>
          </div>
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            DVIR Template <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("DVIRTemplate", {
              required: "DVIR Template is required",
            })}
            className="form-control"
            name="DVIRTemplate"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Purchase Amount <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("purchaseAmount", {
              required: "Purchase Amount is required",
            })}
            className="form-control"
            name="purchaseAmount"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Manufacture Date <span className="text-danger">*</span>
          </label>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Purchase Date <span className="text-danger">*</span>
          </label>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Weight Capacity <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("weightCapacity", {
              required: "Weight Capacity is required",
            })}
            className="form-control"
            name="weightCapacity"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            GPS Installation Date <span className="text-danger">*</span>
          </label>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            GPS Warranty <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("GPSWarranty", {
              required: "GPS Warranty is required",
            })}
            className="form-control"
            name="GPSWarranty"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Company Average <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("companyAverage", {
              required: "Company Average is required",
            })}
            className="form-control"
            name="companyAverage"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Permit <span className="text-danger">*</span>
          </label>
          <Select
            defaultValue={selectedOption}
            styles={customStyles}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Installation Date <span className="text-danger">*</span>
          </label>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Registration Number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("registrationNumber", {
              required: "Registration Number is required",
            })}
            className="form-control"
            name="registrationNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Fuel Type <span className="text-danger">*</span>
          </label>
          <Select
            defaultValue={selectedOption}
            styles={customStyles}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Distance based Fuel Consumption{" "}
            <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsChecked1(!isChecked1)}
              className="form-check-input"
              id="customCheckBox1"
              required
            />
            <input
              type="number"
              {...register("distance", {
                required: "Distance is required",
              })}
              className="form-control"
              style={{ width: "6rem", margin: " 0 1rem" }}
              name="distance"
              placeholder=""
            />
            <span>Kilometer</span>
            {isChecked1 && (
              <>
                <span style={{ paddingLeft: ".6rem" }}>/</span>
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                  className="form-control"
                  style={{ width: "6rem", margin: " 0 1rem" }}
                  name="quantity"
                  placeholder=""
                />
                <Select
                  defaultValue={selectedOption}
                  styles={customStyles}
                  onChange={setSelectedOption}
                  options={options}
                />
              </>
            )}
          </div>
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Duration based Fuel Consumption{" "}
            <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsChecked2(!isChecked2)}
              className="form-check-input"
              id="customCheckBox1"
              required
            />
            <input
              type="number"
              {...register("distance", {
                required: "Distance is required",
              })}
              className="form-control"
              style={{ width: "6rem", margin: " 0 1rem" }}
              name="distance"
              placeholder=""
            />
            <Select
              defaultValue={selectedOption}
              styles={customStyles}
              onChange={setSelectedOption}
              options={options}
            />
            {isChecked2 && (
              <>
                <span style={{ paddingLeft: ".6rem" }}>/</span>
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                  className="form-control"
                  style={{ width: "6rem", margin: " 0 1rem" }}
                  name="quantity"
                  placeholder=""
                />
                <Select
                  defaultValue={selectedOption}
                  styles={customStyles}
                  onChange={setSelectedOption}
                  options={options}
                />
              </>
            )}
          </div>
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Fuel Idling Consumption <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center">
            <input
              type="number"
              {...register("distance", {
                required: "Distance is required",
              })}
              className="form-control"
              style={{ width: "50%", marginRight: "1rem" }}
              name="distance"
              placeholder=""
            />
            <Select
              defaultValue={selectedOption}
              styles={customStyles}
              onChange={setSelectedOption}
              options={options}
            />
            <span style={{ padding: " 0 .5rem" }}>/Hr</span>
          </div>
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Consumption Tolerance <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center">
            <input
              type="number"
              {...register("consumptionTolerance", {
                required: "Consumption Tolerance is required",
              })}
              min="1"
              max="100"
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
            VIN(Chassis) Number : <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("vinNumber", {
              required: "VIN Number Number is required",
            })}
            className="form-control"
            name="vinNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Engine Number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("engineNumber", {
              required: "Engine Number is required",
            })}
            className="form-control"
            name="engineNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Odometer <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("Odometer", {
              required: "Odometer is required",
            })}
            className="form-control"
            name="Odometer"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            LBS Detection Radius <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("LBSDetectionRadius", {
              required: "LBS Detection Radius is required",
            })}
            className="form-control"
            name="LBSDetectionRadius"
            placeholder="Max value upto 5000meters"
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Engine Hours <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("engineHours", {
              required: "Engine Hours is required",
            })}
            className="form-control"
            name="engineHours"
            placeholder="Max value upto 5000meters"
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            No of passenger seats <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("passengerSeats", {
              required: "Passenger Seats is required",
            })}
            className="form-control"
            name="passengerSeats"
            placeholder="Max value upto 5000meters"
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Cost Based On <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsChecked3(!isChecked3)}
              className="form-check-input"
              id="customCheckBox1"
              required
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
              onChange={() => setIsChecked4(!isChecked4)}
              className="form-check-input"
              id="customCheckBox1"
              required
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
        {isChecked3 && (
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">
              Distance <span className="text-danger">*</span>
            </label>
            <div className="d-flex align-items-center">
              <input
                type="number"
                {...register("distanceCost", {
                  required: "Distance is required",
                })}
                min="1"
                max="100"
                className="form-control"
                style={{ marginRight: ".5rem" }}
                name="distanceCost"
                placeholder=""
              />
              <span style={{ padding: " 0 .5rem" }}>$/Km</span>
            </div>
          </div>
        )}
        {isChecked4 && (
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">
              Duration <span className="text-danger">*</span>
            </label>
            <div className="d-flex align-items-center">
              <input
                type="number"
                {...register("durationCost", {
                  required: "Duration is required",
                })}
                className="form-control"
                style={{ maxWidth: "70%", marginRight: ".5rem" }}
                name="durationCost"
                placeholder=""
              />
              <span style={{ padding: " 0 .5rem" }}>$/</span>
              <Select
                defaultValue={selectedOption}
                styles={customStyles}
                onChange={setSelectedOption}
                options={options}
              />
            </div>
          </div>
        )}

        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            RFID Timeout Duration <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("RFIDTimeoutDuration", {
              required: "RFID Timeout Duration is required",
            })}
            className="form-control"
            name="RFIDTimeoutDuration"
            placeholder="Max value upto 5000meters"
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Sleep Mode Duration <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("sleepModeDuration", {
              required: "Sleep Mode Duration is required",
            })}
            className="form-control"
            name="sleepModeDuration"
            placeholder="Max value upto 5000meters"
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Minimum Working Hours <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("minimumWorkingHours ", {
              required: "Minimum Working Hours  is required",
            })}
            className="form-control"
            name="minimumWorkingHours"
            placeholder="Max value upto 5000meters"
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Weight Sensor <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsChecked5(!isChecked5)}
              className="form-check-input"
              id="customCheckBox1"
              required
            />
            <label
              className="form-check-label"
              style={{ marginBottom: "0", marginRight: "1rem" }}
              htmlFor="customCheckBox1"
            >
              {isChecked5 ? "Checked" : "Unchecked"}
            </label>
          </div>
        </div>
        {isChecked5 && (
          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Underweight Tolerance <span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("distanceCost", {
                    required: "Distance is required",
                  })}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="distanceCost"
                  placeholder=""
                />
                <span style={{ padding: " 0 .5rem" }}>%</span>
              </div>
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Overweight Tolerance <span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("distanceCost", {
                    required: "Distance is required",
                  })}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="distanceCost"
                  placeholder=""
                />
                <span style={{ padding: " 0 .5rem" }}>%</span>
              </div>
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Loading/Unloading Tolerance{" "}
                <span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("distanceCost", {
                    required: "Distance is required",
                  })}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="distanceCost"
                  placeholder=""
                />
                <span style={{ padding: " 0 .5rem" }}>%</span>
              </div>
            </div>
          </>
        )}

        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Fuel Sensor<span className="text-danger">*</span>
          </label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="customRadioBox987"
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
                onClick={()=>setIsMultiple(!isMultiple)}
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
        {isMultiple && (
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                No of Tanks <span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("distanceCost", {
                    required: "Distance is required",
                  })}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="distanceCost"
                  placeholder=""
                />
                <span style={{ padding: " 0 .5rem" }}>mG</span>
              </div>
            </div>
        )}

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            G Sensor <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              onChange={() => setIsChecked6(!isChecked6)}
              className="form-check-input"
              id="customCheckBox1"
              required
            />
            <label
              className="form-check-label"
              style={{ marginBottom: "0", marginRight: "1rem" }}
              htmlFor="customCheckBox1"
            >
              {isChecked6 ? "Checked" : "Unchecked"}
            </label>
          </div>
        </div>
        {isChecked6 && (
          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Axis X <span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("distanceCost", {
                    required: "Distance is required",
                  })}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="distanceCost"
                  placeholder=""
                />
                <span style={{ padding: " 0 .5rem" }}>mG</span>
              </div>
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Axis Y <span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("distanceCost", {
                    required: "Distance is required",
                  })}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="distanceCost"
                  placeholder=""
                />
                <span style={{ padding: " 0 .5rem" }}>mG</span>
              </div>
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Axis Z <span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  {...register("distanceCost", {
                    required: "Distance is required",
                  })}
                  className="form-control"
                  style={{ marginRight: ".5rem" }}
                  name="distanceCost"
                  placeholder=""
                />
                <span style={{ padding: " 0 .5rem" }}>mG</span>
              </div>
            </div>
          </>
        )}
      </div>
        <div style={{ width: "100%", display:"flex", justifyContent:"center", margin:"2rem 0"}}>
          <Button style={{ width: "10%"}}> Next</Button>
        </div>
    </div>
  );
};

export default Profile;
