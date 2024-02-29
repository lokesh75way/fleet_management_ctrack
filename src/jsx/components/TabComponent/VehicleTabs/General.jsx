import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  branchOptions,
  deviceTypeOptions,
  copyFromOptions,
  distanceCounterOptions,
  unitOfDistanceOptions,
  speedDetectionOptions,
} from "./Options";

const General = ({ handleNext, register, setValue}) => {
  const{control, getValues,formState: errors} = useForm()
  
  const [selectedOption, setSelectedOption] = useState(null);
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Branch <span className="text-danger">*</span>
          </label>
          <Controller
            name="branch"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("branch", newValue.value)}
                options={branchOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={branchOptions[0]}
              />
            )}
          />
          <Error errorName={errors.branch} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Vehicle Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("vehicleName", {
              required: "Vehicle Name is required",
            })}
            className="form-control"
            name="vehicleName"
            placeholder=""
          />
          <Error errorName={errors.vehicleName} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Device Type <span className="text-danger">*</span>
          </label>
          <Controller
            name="deviceType"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("deviceType", newValue.value)}
                options={deviceTypeOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={deviceTypeOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            IMEI Number <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("IMEINumber", {
              required: "IMEI Number is required",
            })}
            className="form-control"
            name="IMEINumber"
            placeholder=""
          />
          <Error errorName={errors.IMEINumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Copy From</label>
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
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Server Address
          </label>
          <input
            type="text"
            {...register("serverAddress")}
            className="form-control"
            name="serverAddress"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            SIM Number
          </label>
          <input
            type="number"
            {...register("simNumber")}
            className="form-control"
            name="simNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Secondary SIM Number
          </label>
          <input
            type="number"
            {...register("secondarySimNumber")}
            className="form-control"
            name="secondarySimNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            Distance Counter
          </label>
          <Controller
            name="distanceCounter"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>
                  setValue("distanceCounter", newValue.value)
                }
                options={distanceCounterOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={distanceCounterOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            Unit of Distance
          </label>
          <Controller
            name="unitOfDistance"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>
                  setValue("unitOfDistance", newValue.value)
                }
                options={unitOfDistanceOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={unitOfDistanceOptions[0]}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            Speed Detection
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
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Device Accuracy Tolerance
          </label>
          <input
            type="number"
            {...register("deviceAccuracyTolerance")}
            className="form-control"
            name="deviceAccuracyTolerance"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Shift Group
          </label>
          <input
            type="text"
            {...register("shiftGroup")}
            className="form-control"
            name="shiftGroup"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Shift Name
          </label>
          <input
            type="text"
            {...register("shiftName")}
            className="form-control"
            name="shiftName"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            QR Code
          </label>
          <input
            type="text"
            {...register("qrCode")}
            className="form-control"
            name="qrCode"
            placeholder=""
          />
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
        <Button onClick={handleNext} style={{ width: "10%" }}> Next</Button>
      </div>
    </div>
  );
};

export default General;
