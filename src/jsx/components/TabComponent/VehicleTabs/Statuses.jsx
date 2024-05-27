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





const General = ({
  register,
  setValue,
  getValues,
  errors,
  control,
  handleSubmit,
  onSubmit,
  formData,
}) => {
  const [groupId, setGroupId] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  const [businessDisabled, setBusinessDisabled] = useState(false);
  const [companyDisabled, setCompanyDisabled] = useState(false);

  const { checkRole, checkUserName } = useStorage();
  
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const { id } = useParams();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  // const newData = userData?.filter((data) => data.id == parseInt(id, 10));
  const [filteredUserData, setFilteredUserData] = useState([]);
  const [isBuisnessGroupDisabled, setIsBuisnessGroupDisabled] = useState(false)

  const role = checkRole();

  const { t } = useTranslation();

  // const[formData,setFormData] = useState([])
  useEffect(() => {
    if (formData && id) {
      setValue("businessGroupId", formData?.[0]?.businessGroupId);
      setGroupId(formData?.[0]?.businessGroupId);
      setValue("companyId", formData?.[0]?.companyId);
      setCompanyId(formData?.[0]?.companyId);
      setValue("imeiNumber", formData?.[0].imeiNumber);

      setValue("vehicleName", formData?.[0].vehicleName);
      setValue("plateNumber", formData?.[0].plateNumber);
      setValue("branchId", formData[0]?.branchId?._id)
      // setValue(
      //   "branch",
      //   formData?.[0]?.branchId.map((branch) => branch._id)
      // );
      setValue("simNumber", formData?.[0].simNumber);
      setValue("secondrySimNumber", formData?.[0].secondrySimNumber);
      setValue("IMEINumber", formData?.[0].IMEINumber);
      setValue("registrationNumber", formData?.[0].registrationNumber);
      setValue("weightCapacity", formData?.[0].weightCapacity);
      setValue("deviceType", formData?.[0].deviceType);
      setValue("serverAddress", formData?.[0].serverAddress);
      setValue("distanceCounter", formData?.[0].distanceCounter);
      setValue("unitOfDistance", formData?.[0].unitOfDistance);
      setValue("speedDetection", formData?.[0].speedDetection);
      
      setValue(
        "deviceAccuracyTolerance",
        formData?.[0].deviceAccuracyTolerance
      );

      
    }
  }, [formData, id]);

  useEffect(() => {
    if(checkRole() !== "SUPER_ADMIN"){
      setIsBuisnessGroupDisabled(true)
    }
    if(userDetails?.user?.role === 'BUSINESS_GROUP'){
      setValue("businessGroupId", userDetails?.user.businessGroupId);
    }
},[])


  return (
    <div className="p-4 relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row" style={{ width: "100%" }}>

          {/* Alarms Section */}
          <div className="col-xl-6 mb-3">
            <h5>{t("Alarms")}</h5>
            <CustomCheckbox register={register} name="boxTamper" label={t("Box Tamper")} />
            <CustomCheckbox register={register} name="batteryTamper" label={t("Battery Tamper")} />
            <CustomCheckbox register={register} name="internalBatteryLow" label={t("Internal Battery Low")} />
            <CustomCheckbox register={register} name="detectGSMJamming" label={t("Detect GSM Jamming")} />
            <CustomCheckbox register={register} name="illegalMovement" label={t("Illegal Movement")} />
            <CustomCheckbox register={register} name="excessiveIdling" label={t("Excessive Idling")} />
            <CustomCheckbox register={register} name="panic" label={t("Panic")} />
            <div className="mb-3">
              <label className="form-label">{t("Activate after (seconds)")}</label>
              <CustomInput
                type="number"
                register={register}
                name="excessiveIdlingActivateAfter"
                defaultValue={getValues("excessiveIdlingActivateAfter")}
              />
              <Error errorName={errors.excessiveIdlingActivateAfter} />
            </div>
          </div>

          {/* Speed Violations Section */}
          <div className="col-xl-6 mb-3">
            <h5>{t("Speed Violations")}</h5>
            <CustomCheckbox register={register} name="speedViolations" label={t("Speed Violations")} />
            <div className="mb-3">
              <label className="form-label">{t("Limit (km/h)")}</label>
              <CustomInput
                type="number"
                register={register}
                name="speedViolationsLimit"
                defaultValue={getValues("speedViolationsLimit")}
              />
              <Error errorName={errors.speedViolationsLimit} />
            </div>
            <CustomCheckbox register={register} name="criticalSpeedAlert" label={t("Critical Speed Alert")} />
            <CustomCheckbox register={register} name="generateRoadTypeSpeedViolations" label={t("Generate Road Type Speed Violations")} />
          </div>

          {/* Accident Detection Section */}
          <div className="col-xl-6 mb-3">
            <h5>{t("Accident Detection")}</h5>
            <CustomCheckbox register={register} name="rollOver" label={t("Roll Over")} />
            <CustomCheckbox register={register} name="incident" label={t("Incident")} />
            <CustomCheckbox register={register} name="highGForce" label={t("High G-force")} />
            <CustomCheckbox register={register} name="severeGForce" label={t("Severe G-force")} />
            <div className="mb-3">
              <label className="form-label">{t("G-force Threshold (milli-g)")}</label>
              <CustomInput
                type="number"
                register={register}
                name="gForceThreshold"
                defaultValue={getValues("gForceThreshold")}
              />
              <Error errorName={errors.gForceThreshold} />
            </div>
          </div>

          {/* Harsh Driving Section */}
          <div className="col-xl-6 mb-3">
            <h5>{t("Harsh Driving")}</h5>
            <CustomCheckbox register={register} name="harshAcceleration" label={t("Harsh Acceleration")} />
            <CustomCheckbox register={register} name="harshBraking" label={t("Harsh Braking")} />
            <CustomCheckbox register={register} name="harshCornering" label={t("Harsh Cornering")} />
            <div className="mb-3">
              <label className="form-label">{t("Acceleration Threshold (m/s²)")}</label>
              <CustomInput
                type="number"
                register={register}
                name="accelerationThreshold"
                defaultValue={getValues("accelerationThreshold")}
              />
              <Error errorName={errors.accelerationThreshold} />
            </div>
          </div>

          {/* Geo Zones Section */}
          <div className="col-xl-6 mb-3">
            <h5>{t("Geo Zones")}</h5>
            <CustomCheckbox register={register} name="enableSuppressedGeoZones" label={t("Enable Suppressed Geo Zones")} />
          </div>
          
        </div>
        
        <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "2rem 0" }}>
          <Button type="submit" style={{ width: "10%" }}>
            {t('Submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default General;
