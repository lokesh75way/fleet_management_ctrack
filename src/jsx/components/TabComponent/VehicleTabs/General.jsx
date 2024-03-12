import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  deviceTypeOptions,
  branchOptions,
  copyFromOptions,
  distanceCounterOptions,
  unitOfDistanceOptions,
  speedDetectionOptions,
  businessGroupOptions,
  companyOptions,
} from "./Options";
import CustomInput from "../../Input/CustomInput";
import DummyData from "../../../../users.json";
import useStorage from "../../../../hooks/useStorage";
import { useParams } from "react-router-dom";

const General = ({
  register,
  setValue,
  getValues,
  errors,
  control,
  handleSubmit,
  onSubmit,
}) => {
  const { checkRole, checkUser } = useStorage();
  const [tempValue, setTempValue] = useState();
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const { id } = useParams();
  const loggedInUser = localStorage.getItem("loginDetails-name");
  const userData = JSON.parse(localStorage.getItem("userJsonData"));
  const newData = userData.filter((data) => data.id == parseInt(id, 10));
  const [filteredUserData, setFilteredUserData] = useState(newData);
  const role = localStorage.getItem("role");
  const branchOption = DummyData.filter(
    (item) => item.parent === checkUser()
  ).map((item) => ({
    label: item.email,
    value: item.id,
  }));

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Business Group <span className="text-danger">*</span>
          </label>
          <Controller
            name="business"
            control={control}
            rules={{ required: true }}
            disabled={true}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  console.log(newValue);
                  setTempValue(newValue?.value);
                  setValue("business", newValue?.value);
                }}
                isDisabled={role === "company" || role === "businessgroup"}
                options={businessGroupOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={{
                  label : 
                  filteredUserData[0]?.parentBusinessGroup ||
                  (loggedInUser !== "Admin" ? loggedInUser : "")
                }
                }
              />
            )}
          />
          {!getValues("branch") && <Error errorName={errors.branch} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Company <span className="text-danger">*</span>
          </label>
          <Controller
            name="company"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setTempValue(newValue?.value);
                  setValue("company", newValue?.value);
                }}
                isDisabled={role === "company"}
                options={companyOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={{
                  label:
                    filteredUserData[0]?.parentCompany ||
                    (role === "company" ? loggedInUser : ""),
                }}
              />
            )}
          />
          {!getValues("branch") && <Error errorName={errors.branch} />}
        </div>
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
                onChange={(newValue) => {
                  console.log(newValue);
                  setTempValue(newValue?.value);
                  setValue("branch", newValue?.value);
                }}
                options={branchOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={{
                  label:
                    filteredUserData[0]?.parentBranch ||
                    " "
                }}
              />
            )}
          />
          {!getValues("branch") && <Error errorName={errors.branch} />}
        </div>

        {checkRole() === "company" && (
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">Company</label>
            <CustomInput
              type="text"
              register={register}
              label="Company"
              name="company"
              placeholder=""
              value={checkUser()}
            />
          </div>
        )}
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
                onChange={(newValue) => {
                  setTempValue(newValue.label);
                  setValue("branch", newValue.label);
                }}
                options={
                  checkRole() === "company" ? branchOption : branchOptions
                }
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={
                  checkRole() === "company" ? branchOption[0] : branchOptions[0]
                }
              />
            )}
          />
          {!getValues("branch") && <Error errorName={errors.branch} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Vehicle Name <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            required
            register={register}
            label="Vehicle Name"
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
                onChange={(newValue) => {
                  setTempValue(newValue.value);
                  setValue("deviceType", newValue.value);
                }}
                options={deviceTypeOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={deviceTypeOptions[0]}
              />
            )}
          />
          {!getValues("deviceType") && <Error errorName={errors.deviceType} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            IMEI Number <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="IMEINumber"
            label="IMEI Number"
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
          <Error errorName={errors.copyFrom} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Server Address
          </label>
          <CustomInput
            type="text"
            register={register}
            name="serverAddress"
            placeholder=""
          />
        </div>
        <Error errorName={errors.serverAddress} />
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            SIM Number <span className="text-danger">*</span>
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
            Secondary SIM Number<span className="text-danger">*</span>
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
          <Error errorName={errors.distanceCounter} />
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
          <Error errorName={errors.unitOfDistance} />
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
          <Error errorName={errors.speedDetection} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Device Accuracy Tolerance<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            name="deviceAccuracyTolerance"
            placeholder=""
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
          Submit
        </Button>
      </div>
    </div>
  );
};

export default General;
