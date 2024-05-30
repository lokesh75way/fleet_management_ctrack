import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  deviceTypeOptions,
  copyFromOptions,
  distanceCounterOptions,
  unitOfDistanceOptions,
  speedDetectionOptions,
  tarrifTypeOptions,
  rucLicenseOptions,
} from "./Options";
import AsyncSelect from "react-select/async";
import CustomInput from "../../Input/CustomInput";
import DummyData from "../../../../users.json";
import useStorage from "../../../../hooks/useStorage";
import { useParams } from "react-router-dom";
import { getCompany } from "../../../../services/api/CompanyServices";
import { getGroups } from "../../../../services/api/BusinessGroup";
import { allCompanyOptions, businessGroupOptions } from "../../ReusableApi/Api";
import { useTranslation } from "react-i18next";

import CompanyDropdown from "../../CompanyDropdown";
import BranchDropdown from "../../BranchDropdown";
import GroupDropdown from "../../GroupDropdown";
import ParentBranchDropdown from "../../ParentBranch";
import CustomCheckbox from "./CustomCheckbox";


const Licensing = ({
  register,
  setValue,
  getValues,
  errors,
  control,
  handleSubmit,
  onSubmit,
  formData,
}) => {
  const requiredLicenses = [
    { category: 'ADSD No', description: '', inheritedCategory: '' },
    { category: 'Driving Licence', description: '', inheritedCategory: '' },
    { category: 'RFid No', description: '', inheritedCategory: '' }
  ];
  const rucLicenses = [
    { licenseNumber: '', purchaseDate: '', vehicleType: '',licenseType: '' },
    { licenseNumber: '', purchaseDate: '', vehicleType: '',licenseType: '' },
    { licenseNumber: '', purchaseDate: '', vehicleType: '',licenseType: '' }
  ];
  const [isLicenseReminderEnabled, setIsLicenseReminderEnabled] = useState(false);
  const [isRoadworthyReminderEnabled, setIsRoadworthyReminderEnabled] = useState(false);

  const handleLicenseCheckboxChange = (event) => {
    setIsLicenseReminderEnabled(event.target.checked);
  };

  const handleRoadworthyCheckboxChange = (event) => {
    setIsRoadworthyReminderEnabled(event.target.checked);
  };
  
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
 

  const { t } = useTranslation();

 

  return (
    <div className="p-4 relative">
      <div className="d-flex justify-content-between" style={{ width: "100%" }}>
        <div className="row" style={{ width: "50%" }}>
        <div className="border border-1 p-3 row rounded">
            <div className="col-xl-6 mb-3">
              <label className="form-label">
                {t("License number")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="text"
                required
                register={register}
                name="licenseNumber"
                placeholder=""
                defaultValue={getValues("licenseNumber")}
              />
              <Error errorName={errors.licenseNumber} />
            </div>
            <div className="col-xl-6 mb-3">
              <label className="form-label">
                {t("Roadworthy number")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="text"
                required
                register={register}
                name="roadworthyNumber"
                placeholder=""
                defaultValue={getValues("roadworthyNumber")}
              />
              <Error errorName={errors.roadworthyNumber} />
            </div>
          </div>
         {/* License Reminder */}
         <div className="border-container position-relative p-3 mt-5 row">
            <div className="heading-container d-flex align-items-center position-absolute">
              <CustomCheckbox
                register={register}
                name="licenseReminder"
                label="License Reminder"
                checked={isLicenseReminderEnabled}
                onChange={handleLicenseCheckboxChange}
              />
            </div>
            <div className="col-xl-6 mb-3 mt-2">
              <label className="form-label">
                {t("Last renewal date")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="date"
                required
                register={register}
                name="licenseLastRenewalDate"
                defaultValue={getValues("licenseLastRenewalDate")}
                disabled={!isLicenseReminderEnabled}
              />
              <Error errorName={errors.licenseLastRenewalDate} />
            </div>
            <div className="col-xl-6 mb-3">
              <label className="form-label">
                {t("Period (months)")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="number"
                required
                register={register}
                name="licensePeriod"
                defaultValue={getValues("licensePeriod")}
                disabled={!isLicenseReminderEnabled}
              />
              <Error errorName={errors.licensePeriod} />
            </div>
            <div className="col-xl-6 mb-3">
              <label className="form-label">
                {t("Next renewal due on")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="date"
                required
                register={register}
                name="licenseNextRenewalDue"
                defaultValue={getValues("licenseNextRenewalDue")}
                disabled={!isLicenseReminderEnabled}
              />
              <Error errorName={errors.licenseNextRenewalDue} />
            </div>
            <div className="col-xl-6 mb-3">
              <label className="form-label">
                {t("Reminder starts (weeks before expiry)")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="number"
                required
                register={register}
                name="licenseReminderStart"
                defaultValue={getValues("licenseReminderStart")}
                disabled={!isLicenseReminderEnabled}
              />
              <Error errorName={errors.licenseReminderStart} />
            </div>
          </div>

            {/* Roadworthy Reminder */}
            <div className="border-container position-relative p-3 mt-5 row">
            <div className="heading-container d-flex align-items-center position-absolute">
              <CustomCheckbox
                register={register}
                name="roadworthyReminder"
                label="Roadworthy Reminder"
                checked={isRoadworthyReminderEnabled}
                onChange={handleRoadworthyCheckboxChange}
              />
            </div>
            <div className="col-xl-6 mb-3 mt-2">
              <label className="form-label">
                {t("Last renewal date")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="date"
                required
                register={register}
                name="roadworthyLastRenewalDate"
                defaultValue={getValues("roadworthyLastRenewalDate")}
                disabled={!isRoadworthyReminderEnabled}
              />
              <Error errorName={errors.roadworthyLastRenewalDate} />
            </div>
            <div className="col-xl-6 mb-3">
              <label className="form-label">
                {t("Period (months)")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="number"
                required
                register={register}
                name="roadworthyPeriod"
                defaultValue={getValues("roadworthyPeriod")}
                disabled={!isRoadworthyReminderEnabled}
              />
              <Error errorName={errors.roadworthyPeriod} />
            </div>
            <div className="col-xl-6 mb-3">
              <label className="form-label">
                {t("Next renewal due on")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="date"
                required
                register={register}
                name="roadworthyNextRenewalDue"
                defaultValue={getValues("roadworthyNextRenewalDue")}
                disabled={!isRoadworthyReminderEnabled}
              />
              <Error errorName={errors.roadworthyNextRenewalDue} />
            </div>
            <div className="col-xl-6 mb-3">
              <label className="form-label">
                {t("Reminder starts (weeks before expiry)")} <span className="text-danger">*</span>
              </label>
              <CustomInput
                type="number"
                required
                register={register}
                name="roadworthyReminderStart"
                defaultValue={getValues("roadworthyReminderStart")}
                disabled={!isRoadworthyReminderEnabled}
              />
              <Error errorName={errors.roadworthyReminderStart} />
            </div>
          </div>
          
          
        </div>
        {/* <div className="row" style={{ width: "50%" }}>
          <div className="d-flex justify-content-between align-items-center">

          <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("Assigned Ruc License")} <span className="text-danger">*</span>
          </label>
          <Controller
            name="AssignedRucLicense"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setValue("AssignedRucLicense", newValue.value);
                }}
                options={rucLicenseOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{
                  label: getValues("AssignedRucLicense"),
                  value: getValues("AssignedRucLicense"),
                }}
              />
            )}
          />
          {!getValues("AssignedRucLicense") && <Error errorName={errors.AssignedRucLicense} />}
        </div>
          <div className="col-xl-6 mt-3">
          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={() => setValue("AssignedRucLicense", '')}
          >
            Terminate
          </button>
          </div>
          </div>

          <div className="col-xl-6 mb-3">
            <label className="form-label">
              {t("Date Of Purchase")} <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="date"
              required
              register={register}
              name="dateOfPurchase"
              defaultValue={getValues("dateOfPurchase")}
            />
            <Error errorName={errors.dateOfPurchase} />
          </div>
          <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("licenseNumber")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            required
            register={register}
            name="licenseNumber"
            label="License Number"
            placeholder=""
            defaultValue={getValues("licenseNumber")}
          />
          <Error errorName={errors.licenseNumber} />
        </div>
          
          
          <div className="col-xl-6 mb-3">
            <label className="form-label">
              {t("RUC Vehicle Type")} <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="text"
              required
              register={register}
              name="rucVehicleType"
              defaultValue={getValues("rucVehicleType")}
            />
            <Error errorName={errors.rucVehicleType} />
          </div>
          <div className="col-xl-6 mb-3">
            <label className="form-label">
              {t("Permitted Weight")} <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="text"
              required
              register={register}
              name="permittedWeight"
              defaultValue={getValues("permittedWeight")}
            />
            <Error errorName={errors.permittedWeight} />
          </div>
          
          <div className="col-xl-6 mb-3">
            <label className="form-label">
              {t("Min distance recorder (km)")} <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="number"
              required
              register={register}
              name="minDistanceRecorder"
              defaultValue={getValues("minDistanceRecorder")}
            />
            <Error errorName={errors.minDistanceRecorder} />
          </div>
          <div className="col-xl-6 mb-3">
            <label className="form-label">
              {t("Max distance recorder (km)")} <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="number"
              required
              register={register}
              name="maxDistanceRecorder"
              defaultValue={getValues("maxDistanceRecorder")}
            />
            <Error errorName={errors.maxDistanceRecorder} />
          </div>

          <div className="col-xl-6 mb-3">
            <label className="form-label">
              {t("Max distance recorder (km)")} <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="number"
              required
              register={register}
              name="maxDistanceRecorder"
              defaultValue={getValues("maxDistanceRecorder")}
            />
            <Error errorName={errors.maxDistanceRecorder} />
          </div>
          <div className="col-xl-6 mb-3">
            <label className="form-label">
              {t("Reminder distance(km)")} <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="number"
              required
              register={register}
              name="reminderDistance"
              defaultValue={getValues("reminderDistance")}
            />
            <Error errorName={errors.reminderDistance} />
          </div>

          
          
          
          
          <div className="col-xl-12 mb-3">
              <div className="table-responsive">
                <table className="table table-bordered overflow-scroll">
                  <thead>
                    <tr>
                      <th>{t("License Number")}</th>
                      <th>{t("Purchase Date")}</th>
                      <th>{t("vehicle Type")}</th>
                      <th>{t("license Type")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rucLicenses.map((license, index) => (
                      <tr key={index}>
                        <td>
                          <CustomInput
                            type="text"
                            register={register}
                            name={`rucLicenses[${index}].licenseNumber`}
                            defaultValue={license.licenseNumber}
                          />
                        </td>
                        <td>
                          <CustomInput
                            type="text"
                            register={register}
                            name={`requiredLicenses[${index}].purchaseDate`}
                            defaultValue={license.purchaseDate}
                          />
                        </td>
                        <td>
                          <CustomInput
                            type="text"
                            register={register}
                            name={`rucLicenses[${index}].vehicleType`}
                            defaultValue={license.vehicleType}
                          />
                        </td>
                        <td>
                          <CustomInput
                            type="text"
                            register={register}
                            name={`rucLicenses[${index}].licenseType`}
                            defaultValue={license.licenseType}
                          />
                        </td>
                        
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        </div> */}

       
        
       
      </div>
      
      <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "2rem 0" }}>
        <Button type="submit" onClick={handleSubmit(onSubmit)} style={{ width: "10%" }}>
          {t('next')}
        </Button>
      </div>
    </div>
  );
};

export default Licensing;
