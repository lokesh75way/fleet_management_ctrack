import React from "react";
import { Button } from "react-bootstrap";
import { useFieldArray } from "react-hook-form";

import CustomInput from "@/components/Input/CustomInput";
import Error from "@/components/Error/Error";

const labels = {
  CASUAL: "Casual Leave",
  SICK: "Sick Leave",
  PRIVILEGE: "Privilege Leave",
};

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
  const { fields, update } = useFieldArray({
    control,
    name: "leave",
  });

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        {fields.map((item, index) => {
          return (
            <>
              <div key={`${item.id}-1`} className="col-xl-6 mb-3">
                <label
                  htmlFor="exampleFormControlInput3"
                  className="form-label"
                >
                  {labels[item.leaveType]}
                  <span className="text-danger">*</span>
                </label>
                <CustomInput
                  type="text"
                  register={register}
                  label={labels[item.leaveType]}
                  name={item.leaveType}
                  placeholder=""
                  defaultValue={labels[item.leaveType]}
                  disabled
                />
                <Error errorName={errors.leave?.[index]?.leaveType} />
              </div>
              <div key={`${item.id}-2`} className="col-xl-6 mb-3">
                <label
                  htmlFor="exampleFormControlInput3"
                  className="form-label"
                >
                  No of Days
                </label>
                <CustomInput
                  type="text"
                  label="No Of Days"
                  name="days"
                  value={item.days}
                  onChange={(e) => {
                    update(index, {
                      ...fields[index],
                      days: e.target.value,
                    });
                  }}
                />
                <Error errorName={errors.leave?.[index]?.days} />
              </div>
            </>
          );
        })}
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
