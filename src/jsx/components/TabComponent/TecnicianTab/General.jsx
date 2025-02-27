import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import Error from "../../../../components/Error/Error";
import CustomInput from "../../../../components/Input/CustomInput";
import "@/assets/scss/pages/_driver-tracking.scss";

import { useTranslation } from "react-i18next";
import CompanyDropdown from "../../../../features/company/components/DropDownList";
import { useParams } from "react-router-dom";
const General = ({
  register,
  setValue,
  control,
  errors,
  getValues,
  handleSubmit,
  onSubmit,
}) => {
  const [tempGender, setTempGender] = useState("");
  const [date, setDate] = useState({});
  const { t } = useTranslation();
  const { id } = useParams();
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };
  const handleChange = (e) => {
    setTempGender(e.target.value);
    setValue("gender", e.target.value);
  };
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100); // 100 years ago
  const maxDate = new Date();

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("company")} <span className="text-danger">*</span>
          </label>
          <Controller
            name="company"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <CompanyDropdown
                onChange={(newValue) => {
                  setValue("company", newValue.value);
                }}
                value={value}
                customStyles={customStyles}
                ref={ref}
                name={name}
              />
            )}
          />
          {!getValues("company") && <Error errorName={errors.company} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("firstName")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="First Name"
            name="firstName"
            placeholder=""
          />
          <Error errorName={errors.firstName} />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("middleName")}</label>
          <CustomInput
            type="text"
            register={register}
            label="middleName"
            name="middleName"
            placeholder=""
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("lastName")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Last Name"
            name="lastName"
            placeholder=""
          />
          <Error errorName={errors.lastName} />
        </div>

        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("technicianNumber")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Technician Number"
            name="technicianNo"
            placeholder=""
          />
          <Error errorName={errors.technicianNo} />
        </div>

        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("email")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            label="Email"
            name="email"
            placeholder=""
          />
          <Error errorName={errors.email} />
        </div>

        <div className="col-xl-6 mb-3">
          <label className="form-label">
            {t("gender")}
            <span className="text-danger">*</span>
          </label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                value="MALE"
                checked={(getValues("gender") ?? tempGender) === "MALE"}
                onChange={handleChange}
              />
              <label className="form-check-label" style={{ marginBottom: "0" }}>
                {t("male")}
              </label>
            </div>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                value="FEMALE"
                checked={(getValues("gender") ?? tempGender) === "FEMALE"}
                onChange={handleChange}
              />
              <label className="form-check-label" style={{ marginBottom: "0" }}>
                {t("female")}
              </label>
            </div>
          </div>
          {!getValues("gender") && <Error errorName={errors.gender} />}
        </div>

        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("mobileNumber")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Mobile Number"
            name="mobileNumber"
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            placeholder=""
          />
          <Error errorName={errors.mobileNumber} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("emergencyContact")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Emergency Contact"
            name="emergencyContact"
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            placeholder=""
          />
          <Error errorName={errors.emergencyContact} />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">
            {t("dateOfJoin")}
            <span className="text-danger">*</span>
          </label>
          <Controller
            name="dateOfJoin"
            control={control}
            register={register}
            render={({ value, name }) => (
              <DatePicker
                selected={
                  getValues("dateOfJoin")
                    ? new Date(getValues("dateOfJoin"))
                    : new Date()
                }
                className="form-control customDateHeight"
                onChange={(newValue) => {
                  setDate({ ...date, dateOfJoin: newValue });
                  setValue("dateOfJoin", newValue.toISOString().split("T")[0]);
                }}
              />
            )}
          />
          {!getValues("dateOfJoin") && <Error errorName={errors.dateOfJoin} />}
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">
            {" "}
            {t("dateOfBirth")}
            <span className="text-danger">*</span>
          </label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={
                  getValues("dateOfBirth")
                    ? new Date(getValues("dateOfBirth"))
                    : new Date()
                }
                minDate={minDate}
                maxDate={maxDate}
                className="form-control customDateHeight"
                onChange={(newValue) => {
                  setDate({
                    ...date,
                    dateOfBirth: newValue,
                  });
                  setValue("dateOfBirth", newValue.toISOString().split("T")[0]);
                }}
                showYearDropdown
                scrollableYearDropdown={true}
                popperClassName="date-picker-reports"
                yearDropdownItemNumber={50}
              />
            )}
          />
          {!getValues("dateOfBirth") && (
            <Error errorName={errors.dateOfBirth} />
          )}
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
          {t("Next")}
        </Button>
      </div>
    </div>
  );
};

export default General;
