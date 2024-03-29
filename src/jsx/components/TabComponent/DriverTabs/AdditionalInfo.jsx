import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { licenseToDriveOptions } from "../VehicleTabs/Options";
import CustomInput from "../../Input/CustomInput";
import Error from "../../Error/Error";
import { useParams } from "react-router-dom";
import '../../../../scss/pages/_driver-tracking.scss';
import {useTranslation} from 'react-i18next'

const AdditionalInfo = ({ setValue, register, handleSubmit, onSubmit, getValues, control,errors }) => {


  const {t} = useTranslation();
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("userJsonData"));
  const newData = userData.filter((data) => data.id === parseInt(id, 10));
  const [filteredUserData, setFilteredUserData] = useState(newData);

  const [selectedOption, setSelectedOption] = useState(null);
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setValue("licenseAvailable", e.target.value);
  };
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t('dateOfBirth')}</label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("dateOfBirth") || new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) => setValue("dateOfBirth", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('age')}<span className="text-danger">*</span></label>
          <CustomInput
            type="text"
            register={register}
            label="Age"
            name="age"
            placeholder=""
            defaultValue={filteredUserData[0]?.age || " "}
          />
          <Error errorName={errors.age} />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t('dateOfJoining')}</label>
          <Controller
            name="dateOfJoining"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("dateOfJoining") || new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) => setValue("dateOfJoining", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t('dateOfLeaving')}</label>
          <Controller
            name="dateOfLeaving"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("dateOfLeaving") || new Date()}
                className="form-control customDateHeight"
                onChange={(newValue) => setValue("dateOfLeaving", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('drivingExperienceSince')}<span className="text-danger">*</span></label>
          <CustomInput
            type="text"
            register={register}
            label="Driving Experience Since"
            name="drivingExperienceSince"
            placeholder=""
            defaultValue={filteredUserData[0]?.drivingExperienceSince || ""}
          />
          <Error errorName={errors.drivingExperienceSince} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t('licenseAvailable')}</label>
          <div className="basic-form" style={{ marginTop: ".5rem" }}>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="customRadioBox987"
                name="optradioCustom1"
                value="yes"
                checked={selectedOption === "yes"}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="customRadioBox987"
                style={{ marginBottom: "0" }}
              >
                {t('yes')}
              </label>
            </div>
            <div className="form-check custom-checkbox form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="customRadioBox988"
                value="no"
                checked={selectedOption === "no"}
                onChange={handleChange}
                name="optradioCustom1"
              />
              <label
                className="form-check-label"
                htmlFor="customRadioBox988"
                style={{ marginBottom: "0" }}
              >
                {t('no')}
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
                    defaultValue={licenseToDriveOptions[0]}
                  />
                  
                )}
                />
                { !getValues('licenseToDrive') && <Error errorName={errors.licenseToDrive} />}
            </div>
            <div className={`${ selectedOption !== "yes" ?  "col-xl-6 mb-3 d-flex flex-column  pe-none" : "col-xl-6 mb-3 d-flex flex-column" }`}>
              <label className="form-label">{t('licenseIssueDate')}</label>
              <Controller
                name="licenseIssueDate"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                    selected={getValues("licenseIssueDate") || new Date()}
                    className="form-control customDateHeight"
                    onChange={(newValue) =>
                      setValue("licenseIssueDate", newValue)
                    }
                  />
                )}
              />
            </div>
            <div className="col-xl-6 mb-3 d-flex flex-column">
              <label className="form-label">{t('licenseExpiryDate')}</label>
              <Controller
                name="licenseExpiryDate"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                    selected={getValues("licenseExpiryDate") || new Date()}
                    className="form-control customDateHeight"
                    onChange={(newValue) =>
                      setValue("licenseExpiryDate", newValue)
                    }
                  />
                )}
              />
            </div>
          </>
    
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('lifeInsuranceNumber')}</label>
          <CustomInput
            type="text"
            register={register}
            label="Life Insurance Number"
            name="lifeInsuranceNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t('lifeInsuranceExpiryDtae')}</label>
          <Controller
                name="lifeInsuranceExpiryDtae"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                    selected={getValues("lifeInsuranceExpiryDtae") || new Date()}
                    className="form-control customDateHeight"
                    onChange={(newValue) =>
                      setValue("lifeInsuranceExpiryDtae", newValue)
                    }
                  />
                )}
              />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('mediclaimNumber')}</label>
          <CustomInput
            type="text"
            register={register}
            label="Mediclaim Number"
            name="mediclaimNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t('mediclaimExpiryDate')}</label>
          <Controller
                name="mediclaimExpiryDate"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                    selected={getValues("mediclaimExpiryDate") || new Date()}
                    className="form-control customDateHeight"
                    onChange={(newValue) =>
                      setValue("mediclaimExpiryDate", newValue)
                    }
                  />
                )}
            />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('active')}</label>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input"
              id="customCheckBox1"
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
        <Button type="submit" onClick={handleSubmit(onSubmit)} style={{ width: "10%" }}>
          {" "}
          {t('submit')}
        </Button>
      </div>
    </div>
  );
};

export default AdditionalInfo;
