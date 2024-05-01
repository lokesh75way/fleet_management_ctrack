import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { licenseToDriveOptions } from "../VehicleTabs/Options";
import CustomInput from "../../Input/CustomInput";
import Error from "../../Error/Error";
import { useParams,useLocation } from "react-router-dom";
import '../../../../scss/pages/_driver-tracking.scss';
import {useTranslation} from 'react-i18next'
import dayjs from "dayjs";

const AdditionalInfo = ({
  setValue,
  register,
  handleSubmit,
  onSubmit,
  getValues,
  control,
  errors,
}) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userJsonData"));
  const newData = userData?.filter((data) => data.id === parseInt(id, 10));
  const [filteredUserData, setFilteredUserData] = useState(newData);
  const [date, setDate] = useState({})
  const [dValues, setDvalues] = useState([]);
  const [toggle, setToggle] = useState(false)

  const [selectedOption, setSelectedOption] = useState(null);
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const handleChange = (e) => {
    const value = e.target.value === "yes" ? true : false;
    setSelectedOption(value);
    setValue("licenseAvailable", value);
  };
  
  

  useEffect(() => {
    if (id) {
      const data = location.state[0];
      setDvalues(data);
    }
  }, [id]);

  useEffect(() => {
    if (dValues && id) {
      
      setValue("age", dValues.age);
      setValue("drivingExperience", dValues?.drivingExperience);
      setValue("lifeInsuranceNumber", dValues?.lifeInsuranceNumber);
      setValue("mediclaimNumber", dValues?.mediclaimNumber);
      setValue('dateOfBirth', dValues?.dateOfBirth)
      setValue('dateOfJoining', dValues?.dateOfJoining)
      setValue('dateOfLeaving', dValues?.dateOfLeaving)
      setValue('licenseExpiryDate', dValues?.licenseExpiryDate)
      setValue('licenseIssueDate', dValues?.licenseIssueDate)
      setValue('lifeInsuranceExpiry', dValues?.lifeInsuranceExpiry)
      setValue('mediclaimExpiryDate', dValues?.mediclaimExpiryDate)
      setSelectedOption(dValues.licenseAvailable)
      setToggle(dValues?.active)
    }
  }, [dValues, id]);
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100); 
  const maxDate = new Date();

  const [dateOfBirth, setDateOfBirth] = useState(null);

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null; 

    const today = dayjs();
    const birthDate = dayjs(dateOfBirth);
    const age = today.diff(birthDate, 'year');

    return age;
  }

    const handleDateOfBirthChange = (date) => {
      setDateOfBirth(date);
      const age = calculateAge(date);
      setValue("age", age); 
    };

      // Custom validation rule to check if date A is less than date B
  const dateBeforeValidator = (a, b) => {
    return dayjs(a).isBefore(dayjs(b));
  };
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t("dateOfBirth")}<span className="text-danger">*</span></label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ value, name }) => (
              <DatePicker
              selected={getValues("dateOfBirth")? new Date(getValues("dateOfBirth")) : new Date()}
                minDate={minDate}
                maxDate={maxDate}
                className="form-control customDateHeight"
                onChange={(newValue) => {
                  setValue("dateOfBirth", newValue);
                  handleDateOfBirthChange(newValue)
                }}
                showYearDropdown
                scrollableYearDropdown={true}
                popperClassName="date-picker-reports"
                yearDropdownItemNumber={50}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("age")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Age"
            name="age"
            placeholder=""
            value={getValues("age")} 
            disabled={true}
          />
          <Error errorName={errors.age} />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t("dateOfJoining")}</label>
          <Controller
            name="dateOfJoining"
            control={control}
            render={({ value, name }) => (
              <DatePicker
              selected={getValues("dateOfJoining")? new Date(getValues("dateOfJoining")) : new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) => {
                  setValue("dateOfJoining", newValue)}}
                  maxDate={getValues("dateOfLeaving")}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t("dateOfLeaving")}</label>
          <Controller
            name="dateOfLeaving"
            control={control}
            render={({ value, name }) => (
              <DatePicker
              selected={getValues("dateOfLeaving")? new Date(getValues("dateOfLeaving")) : new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) => {
                  
                  setValue("dateOfLeaving", newValue)}}
                  minDate={getValues("dateOfJoining")}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("drivingExperienceSince")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Driving Experience Since"
            name="drivingExperience"
            placeholder=""
            // defaultValue={filteredUserData[0]?.drivingExperience || ""}
          />
          <Error errorName={errors.drivingExperience} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t("licenseAvailable")}<span className="text-danger">*</span></label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                // style={{backgroundColor : 'white'}}
                id="customRadioBox987"
                name="optradioCustom1"
                value='yes'
                checked={selectedOption === true}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="customRadioBox987"
                style={{ marginBottom: "0" }}
              >
                {t("yes")}
              </label>
            </div>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                // style={{backgroundColor : 'white'}}
                id="customRadioBox988"
                value="no"
                checked={selectedOption === false}
                onChange={handleChange}
                name="optradioCustom1"
              />
              <label
                className="form-check-label"
                htmlFor="customRadioBox988"
                style={{ marginBottom: "0" }}
              >
                {t("no")}
              </label>
            </div>
          </div>
        </div>

          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">{t('licenseNumber')}</label>
              <div className={`${ selectedOption !== "yes" ?  "d-flex align-items-center pe-none" : "d-flex align-items-center" }`}>
                <CustomInput
                  type="number"
                  register={register}
                  label="License Number"
                  style={{ marginRight: ".5rem" }}
                  name="licenseNumber"
                  placeholder=""
                />
                <Error errorName={errors.licenseNumber} />
              </div>
            </div>
            <div className={`${ selectedOption !== "yes" ?  "col-xl-6 mb-3  pe-none" : "col-xl-6 mb-3 " }`}>
              <label className="form-label">{t('licenseToDrive')}</label>
              <Controller
                name="licenseToDrive"
                control={control}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Select
                    onChange={(newValue) =>
                      setValue("licenseToDrive", newValue.value)
                    }
                    options={licenseToDriveOptions}
                    ref={ref}
                    name={name}
                    styles={customStyles}
                    // defaultValue={licenseToDriveOptions[0]}
                  />
                  
                )}
                />
                { !getValues('licenseToDrive') && <Error errorName={errors.licenseToDrive} />}
            </div>
            <div className={`${ selectedOption !== true ?  "col-xl-6 mb-3 d-flex flex-column  pe-none" : "col-xl-6 mb-3 d-flex flex-column" }`}>
              <label className="form-label">{t('licenseIssueDate')}<span className="text-danger">*</span></label>
              <Controller
                name="licenseIssueDate"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                  selected={getValues("licenseIssueDate")? new Date(getValues("licenseIssueDate")) : new Date()}
                    className="form-control customDateHeight"
                    onChange={(newValue) =>
                      {
                        setValue("licenseIssueDate", newValue)
                      }
                    }
                    maxDate={getValues("licenseExpiryDate")}
                  />
                )}
              />
              <Error errorName={errors.licenseNumber} />
            </div>
            <div className="col-xl-6 mb-3 d-flex flex-column">
              <label className="form-label">{t('licenseExpiryDate')}<span className="text-danger">*</span></label>
              <Controller
                name="licenseExpiryDate"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                    selected={getValues("licenseExpiryDate")? new Date(getValues("licenseExpiryDate")) : new Date()}
                    className="form-control customDateHeight"
                    onChange={(newValue) =>{
                      setValue("licenseExpiryDate", newValue)
                    }}
                    minDate={getValues("licenseIssueDate")}
                  />
                )}
              />
            </div>
          </>
    
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("lifeInsuranceNumber")}</label>
          <CustomInput
            type="text"
            register={register}
            label="Life Insurance Number"
            name="lifeInsuranceNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t('lifeInsuranceExpiry')}</label>
          <Controller
                name="lifeInsuranceExpiry"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                  selected={getValues("lifeInsuranceExpiry")? new Date(getValues("lifeInsuranceExpiry")) : new Date()}
                    className="form-control customDateHeight"
                    onChange={(newValue) =>{
                      
                      setValue("lifeInsuranceExpiry", newValue)
                    }}
                  />
                )}
              />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("mediclaimNumber")}</label>
          <CustomInput
            type="text"
            register={register}
            label="Mediclaim Number"
            name="mediclaimNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t("mediclaimExpiryDate")}</label>
          <Controller
                name="mediclaimExpiryDate"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                  selected={getValues("mediclaimExpiryDate")? new Date(getValues("mediclaimExpiryDate")) : new Date()}
                    className="form-control customDateHeight"
                    onChange={(newValue) =>{
                      setValue("mediclaimExpiryDate", newValue)
                    }}
                  />
                )}
            />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t("active")}</label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input"
              // style={{backgroundColor : 'white'}}
              id="customCheckBox1"
              name="active"
              checked={toggle}
              onClick={()=>{setValue("active", !toggle); setToggle(!toggle)}}
            />
          </div>
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
          {t('next')}
        </Button>
      </div>
    </div>
  );
};

export default AdditionalInfo;
