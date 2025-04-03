import React from "react";
import { Button } from "react-bootstrap";

import CustomInput from "@/components/Input/CustomInput";
import Error from "@/components/Error/Error";

const Leave = ({
  handleNext,
  register,
  setValue,
  handleSubmit,
  onSubmit,
  control,
  errors,
  getValues,
  isFormSubmitting,
}) => {
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Casual Leave
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Casual Leave"
            name="casualLeave"
            placeholder=""
            defaultValue="Casual Leave"
            disabled
          />
          <Error errorName={errors.casualLeave} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            No of Days
          </label>
          <CustomInput
            type="text"
            register={register}
            label="No Of Days"
            name="noOfDaysCL"
            onChange={(e) => {
              setValue("leave[0].days", e.target.value);
            }}
          />
          <Error errorName={errors.noOfDaysCL} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Sick Leave
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Sick Leave"
            name="sickLeave"
            placeholder=""
            defaultValue="Sick Leave"
            disabled
          />
          <Error errorName={errors.sickLeave} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            No of Days
          </label>
          <CustomInput
            type="text"
            register={register}
            label="No Of DaysSL"
            name="noOfDays"
            placeholder=""
            onChange={(e) => setValue("leave[1].days", e.target.value)}
          />
          <Error errorName={errors.noOfDays} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Privilege Leave
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Privilege Leave"
            name="privilegeLeave"
            placeholder=""
            defaultValue="Privilege Leave"
            disabled
          />
          <Error errorName={errors.privilegeLeave} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            No of Days
          </label>
          <CustomInput
            type="text"
            register={register}
            label="No Of Days"
            name="noOfDaysPL"
            onChange={(e) => {
              setValue("leave[2].days", e.target.value);
            }}
          />
          <Error errorName={errors.noOfDaysPL} />
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
          disabled={isFormSubmitting}
          type="submit"
          onClick={handleSubmit(onSubmit)}
          style={{ width: "10%" }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Leave;
