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


const Servicing = ({
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
    <div className="p-4">
      <div className="row" style={{ width: "85%", margin: "auto" }}>
        <h4 className="mb-4"> Usage based vehicle servicing reminder</h4>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("currentODO (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="Current ODO"
            name="currentODO"
            placeholder=""
            defaultValue={getValues("currentODO")}
          />
          <Error errorName={errors.currentODO} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("lastServiceODO (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="Current ODO"
            name="lastServiceODO"
            placeholder=""
            defaultValue={getValues("lastServiceODO")}
          />
          <Error errorName={errors.lastServiceODO} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("lastServiceODO (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="Current ODO"
            name="lastServiceODO"
            placeholder=""
            defaultValue={getValues("lastServiceODO")}
          />
          <Error errorName={errors.lastServiceODO} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("nextServiceDueIn (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="nextServiceDueIn"
            name="nextServiceDueIn"
            placeholder=""
            defaultValue={getValues("nextServiceDueIn")}
          />
          <Error errorName={errors.nextServiceDueIn} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("reminderStart (BeforeNextService) (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="Reminder Start"
            name="reminderStart"
            placeholder=""
            defaultValue={getValues("reminderStart")}
          />
          <Error errorName={errors.reminderStart} />
        </div>
        <h4 className="my-4">Based on operating hours</h4>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("currentODO (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="Current ODO"
            name="currentODO"
            placeholder=""
            defaultValue={getValues("currentODO")}
          />
          <Error errorName={errors.currentODO} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("lastServiceODO (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="Current ODO"
            name="lastServiceODO"
            placeholder=""
            defaultValue={getValues("lastServiceODO")}
          />
          <Error errorName={errors.lastServiceODO} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("lastServiceODO (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="Current ODO"
            name="lastServiceODO"
            placeholder=""
            defaultValue={getValues("lastServiceODO")}
          />
          <Error errorName={errors.lastServiceODO} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("nextServiceDueIn (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="nextServiceDueIn"
            name="nextServiceDueIn"
            placeholder=""
            defaultValue={getValues("nextServiceDueIn")}
          />
          <Error errorName={errors.nextServiceDueIn} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("reminderStart (BeforeNextService) (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="Reminder Start"
            name="reminderStart"
            placeholder=""
            defaultValue={getValues("reminderStart")}
          />
          <Error errorName={errors.reminderStart} />
        </div>
        <h4 className="my-4"> Time based vehicle servicing reminder</h4>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("currentODO (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="Current ODO"
            name="currentODO"
            placeholder=""
            defaultValue={getValues("currentODO")}
          />
          <Error errorName={errors.currentODO} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("lastServiceODO (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="Current ODO"
            name="lastServiceODO"
            placeholder=""
            defaultValue={getValues("lastServiceODO")}
          />
          <Error errorName={errors.lastServiceODO} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("lastServiceODO (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="Current ODO"
            name="lastServiceODO"
            placeholder=""
            defaultValue={getValues("lastServiceODO")}
          />
          <Error errorName={errors.lastServiceODO} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("nextServiceDueIn (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="nextServiceDueIn"
            name="nextServiceDueIn"
            placeholder=""
            defaultValue={getValues("nextServiceDueIn")}
          />
          <Error errorName={errors.nextServiceDueIn} />
        </div>
        <div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("reminderStart (BeforeNextService) (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            label="Reminder Start"
            name="reminderStart"
            placeholder=""
            defaultValue={getValues("reminderStart")}
          />
          <Error errorName={errors.reminderStart} />
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

export default Servicing;
