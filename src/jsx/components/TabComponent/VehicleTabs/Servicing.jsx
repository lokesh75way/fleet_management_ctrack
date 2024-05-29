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

  const [selectedOption, setSelectedOption] = useState('ODO');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="p-4">
      <div className="row" style={{ width: "85%", margin: "auto" }}>
        <h4 className="mb-4">Usage based vehicle servicing reminder</h4>
        <div className="form-check mb-4 mx-4">
          <input
            type="radio"
            name="serviceOption"
            id="odoOption"
            value="ODO"
            checked={selectedOption === 'ODO'}
            onChange={() => handleOptionChange('ODO')}
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="odoOption">
            Based On ODO
          </label>
        </div>

        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("currentODO (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="currentODO"
            placeholder=""
            defaultValue={getValues("currentODO")}
            disabled={selectedOption !== 'ODO'}
          />
          <Error errorName={errors.currentODO} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("lastServiceODO (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="lastServiceODO"
            placeholder=""
            defaultValue={getValues("lastServiceODO")}
            disabled={selectedOption !== 'ODO'}
          />
          <Error errorName={errors.lastServiceODO} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("nextServiceDueIn (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="nextServiceDueIn"
            placeholder=""
            defaultValue={getValues("nextServiceDueIn")}
            disabled={selectedOption !== 'ODO'}
          />
          <Error errorName={errors.nextServiceDueIn} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("nextServiceDueIn (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="nextServiceDueIn"
            placeholder=""
            defaultValue={getValues("nextServiceDueIn")}
            disabled={selectedOption !== 'ODO'}
          />
          <Error errorName={errors.nextServiceDueIn} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("reminderStart (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="reminderStart"
            placeholder=""
            defaultValue={getValues("reminderStart")}
            disabled={selectedOption !== 'ODO'}
          />
          <Error errorName={errors.reminderStart} />
        </div>

        <div className="form-check mb-4 mx-4">
          <input
            type="radio"
            name="serviceOption"
            id="hoursOption"
            value="Hours"
            checked={selectedOption === 'Hours'}
            onChange={() => handleOptionChange('Hours')}
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="hoursOption">
            Based on operating hours
          </label>
        </div>

        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("currentRunningHours (Hours)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="currentRunningHours"
            placeholder=""
            defaultValue={getValues("currentRunningHours")}
            disabled={selectedOption !== 'Hours'}
          />
          <Error errorName={errors.currentRunningHours} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("hoursAtLastService (Hours)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="hoursAtLastService"
            placeholder=""
            defaultValue={getValues("hoursAtLastService")}
            disabled={selectedOption !== 'Hours'}
          />
          <Error errorName={errors.hoursAtLastService} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("ServiceInterval (Hours)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="ServiceInterval"
            placeholder=""
            defaultValue={getValues("ServiceInterval")}
            disabled={selectedOption !== 'Hours'}
          />
          <Error errorName={errors.ServiceInterval} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("nextServiceDueIn (Hours)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="nextServiceDueIn"
            placeholder=""
            defaultValue={getValues("nextServiceDueIn")}
            disabled={selectedOption !== 'ODO'}
          />
          <Error errorName={errors.nextServiceDueIn} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("reminderStart (Hours)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="reminderStart"
            placeholder=""
            defaultValue={getValues("reminderStart")}
            disabled={selectedOption !== 'Hours'}
          />
          <Error errorName={errors.reminderStart} />
        </div>

        <h4 className="my-4">Time based vehicle servicing reminder</h4>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("LastSrviceDate (Weeks)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="LastSrviceDate"
            placeholder=""
            defaultValue={getValues("LastSrviceDate")}
          />
          <Error errorName={errors.currentODO} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("lastServiceODO (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="lastServiceODO"
            placeholder=""
            defaultValue={getValues("lastServiceODO")}
          />
          <Error errorName={errors.lastServiceODO} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("nextServiceDueIn (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="nextServiceDueIn"
            placeholder=""
            defaultValue={getValues("nextServiceDueIn")}
          />
          <Error errorName={errors.nextServiceDueIn} />
        </div>
        <div className="col-xl-3 mb-3">
          <label className="form-label">
            {t("reminderStart (km)")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
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
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default Servicing;
