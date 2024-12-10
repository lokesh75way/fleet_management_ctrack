import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../../../components/Error/Error";
import {
  deviceTypeOptions,
  copyFromOptions,
  distanceCounterOptions,
  unitOfDistanceOptions,
  speedDetectionOptions,
} from "@/constants/options";
import AsyncSelect from "react-select/async";
import CustomInput from "../../../../components/Input/CustomInput";
import DummyData from "../../../../users.json";
import useStorage from "../../../../hooks/useStorage";
import { useParams } from "react-router-dom";
import { getCompany } from "../../../../services/api/CompanyServices";
import { getGroups } from "../../../../features/businessGroup/api";
import { allCompanyOptions, businessGroupOptions } from "../../ReusableApi/Api";
import { useTranslation } from "react-i18next";

import CompanyDropdown from "../../../../features/company/components/DropDownList";
import BranchDropdown from "../../BranchDropdown";
import GroupDropdown from "../../../../features/businessGroup/components/DropDownList";
import ParentBranchDropdown from "../../ParentBranch";
import CustomCheckbox from "./CustomCheckbox";

const Servicing = ({
  register,
  setValue,
  getValues,
  errors,
  control,
  handleSubmit,
  onSubmit,
  formData,
  watch,
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
  const [isBuisnessGroupDisabled, setIsBuisnessGroupDisabled] = useState(false);

  const role = checkRole();

  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState("ODO");
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const isUsageReminderEnabled = watch("usageReminder");
  const isTimeReminderEnabled = watch("timeReminder");

  return (
    <div className="p-4">
      <div className="row" style={{ width: "75%" }}>
        {/* Usage based vehicle servicing reminder */}
        <div className="border-container position-relative p-3 row">
          <div className="heading-container d-flex align-items-center position-absolute">
            <CustomCheckbox
              register={register}
              name="usageReminder"
              label={t("Usagebasedvehicleservicingreminder")}
              checked={isUsageReminderEnabled}
            />
          </div>
          <div className="border-container position-relative p-4 mt-5 row">
            <div className="heading-container d-flex align-items-center position-absolute">
              <input
                type="radio"
                name="serviceOption"
                id="odoOption"
                value="ODO"
                checked={selectedOption === "ODO"}
                onChange={() => handleOptionChange("ODO")}
                className="form-check-input"
                disabled={!isUsageReminderEnabled}
              />
              <label className="form-check-label mt-2" htmlFor="odoOption">
                {t("BasedOnODO")}
              </label>
            </div>

            <div className="col-xl-3 mb-3">
              <label className="form-label">{t("currentODO(km)")}</label>
              <CustomInput
                type="number"
                required
                register={register}
                name="currentODO"
                placeholder=""
                defaultValue={getValues("currentODO")}
                disabled={!isUsageReminderEnabled || selectedOption !== "ODO"}
              />
              <Error errorName={errors.currentODO} />
            </div>
            <div className="col-xl-3 mb-3">
              <label className="form-label">{t("lastServiceODO(km)")}</label>
              <CustomInput
                type="number"
                required
                register={register}
                name="lastServiceODO"
                placeholder=""
                defaultValue={getValues("lastServiceODO")}
                disabled={!isUsageReminderEnabled || selectedOption !== "ODO"}
              />
              <Error errorName={errors.lastServiceODO} />
            </div>
            <div className="col-xl-3 mb-3">
              <label className="form-label">{t("ServiceInterval(km)")}</label>
              <CustomInput
                type="number"
                required
                register={register}
                name="ServiceInterval"
                placeholder=""
                defaultValue={getValues("ServiceInterval")}
                disabled={!isUsageReminderEnabled || selectedOption !== "ODO"}
              />
              <Error errorName={errors.ServiceInterval} />
            </div>
            <div className="col-xl-3 mb-3">
              <label className="form-label">{t("nextServiceDueIn(km)")}</label>
              <CustomInput
                type="number"
                required
                register={register}
                name="nextServiceDueIn"
                placeholder=""
                defaultValue={getValues("nextServiceDueIn")}
                disabled={!isUsageReminderEnabled || selectedOption !== "ODO"}
              />
              <Error errorName={errors.nextServiceDueIn} />
            </div>
            <div className="col-xl-3 mb-3">
              <label className="form-label">
                {t("reminderStart(before next service)(km)")}
              </label>
              <CustomInput
                type="number"
                required
                register={register}
                name="reminderStart"
                placeholder=""
                defaultValue={getValues("reminderStart")}
                disabled={!isUsageReminderEnabled || selectedOption !== "ODO"}
              />
              <Error errorName={errors.reminderStart} />
            </div>
          </div>

          <div className="border-container position-relative p-4 mt-5 row">
            <div className="heading-container d-flex align-items-center position-absolute">
              <input
                type="radio"
                name="serviceOption"
                id="hoursOption"
                value="Hours"
                checked={selectedOption === "Hours"}
                onChange={() => handleOptionChange("Hours")}
                className="form-check-input"
                disabled={!isUsageReminderEnabled}
              />
              <label className="form-check-label mt-2" htmlFor="hoursOption">
                {t("Basedonoperatinghours")}
              </label>
            </div>

            <div className="col-xl-3 mb-3">
              <label className="form-label">
                {t("currentRunningHours(Hours)")}
              </label>
              <CustomInput
                type="number"
                required
                register={register}
                name="currentRunningHours"
                placeholder=""
                defaultValue={getValues("currentRunningHours")}
                disabled={!isUsageReminderEnabled || selectedOption !== "Hours"}
              />
              <Error errorName={errors.currentRunningHours} />
            </div>
            <div className="col-xl-3 mb-3">
              <label className="form-label">
                {t("hoursAtLastService(Hours)")}
              </label>
              <CustomInput
                type="number"
                required
                register={register}
                name="hoursAtLastService"
                placeholder=""
                defaultValue={getValues("hoursAtLastService")}
                disabled={!isUsageReminderEnabled || selectedOption !== "Hours"}
              />
              <Error errorName={errors.hoursAtLastService} />
            </div>
            <div className="col-xl-3 mb-3">
              <label className="form-label">
                {t("ServiceInterval (Hours)")}
              </label>
              <CustomInput
                type="number"
                required
                register={register}
                name="ServiceInterval"
                placeholder=""
                defaultValue={getValues("ServiceInterval")}
                disabled={!isUsageReminderEnabled || selectedOption !== "Hours"}
              />
              <Error errorName={errors.ServiceInterval} />
            </div>
            <div className="col-xl-3 mb-3">
              <label className="form-label">
                {t("nextServiceDueIn(Hours)")}
              </label>
              <CustomInput
                type="number"
                required
                register={register}
                name="nextServiceDueIn"
                placeholder=""
                defaultValue={getValues("nextServiceDueIn")}
                disabled={!isUsageReminderEnabled || selectedOption !== "Hours"}
              />
              <Error errorName={errors.nextServiceDueIn} />
            </div>
            <div className="col-xl-3 mb-3">
              <label className="form-label">
                {t("reminderStart(before next service)(Hours)")}
              </label>
              <CustomInput
                type="number"
                required
                register={register}
                name="reminderStart"
                placeholder=""
                defaultValue={getValues("reminderStart")}
                disabled={!isUsageReminderEnabled || selectedOption !== "Hours"}
              />
              <Error errorName={errors.reminderStart} />
            </div>
          </div>
        </div>

        {/* Time based vehicle servicing reminder */}
        <div className="border-container position-relative p-3 mt-5 row">
          <div className="heading-container d-flex align-items-center position-absolute">
            <CustomCheckbox
              register={register}
              name="timeReminder"
              label="Time based vehicle servicing reminder"
              checked={isTimeReminderEnabled}
              // onChange={handleTimeCheckboxChange}
            />
          </div>
          <div className="col-xl-3 mb-3 mt-2">
            <label className="form-label">{t("LastServiceDate(Weeks)")}</label>
            <CustomInput
              type="number"
              required
              register={register}
              name="LastSrviceDate"
              placeholder=""
              defaultValue={getValues("LastSrviceDate")}
              disabled={!isTimeReminderEnabled}
            />
            <Error errorName={errors.LastSrviceDate} />
          </div>
          <div className="col-xl-3 mb-3">
            <label className="form-label">{t("ServiceInterval(km)")}</label>
            <CustomInput
              type="number"
              required
              register={register}
              name="serviceInterval"
              placeholder=""
              defaultValue={getValues("serviceInterval")}
              disabled={!isTimeReminderEnabled}
            />
            <Error errorName={errors.serviceInterval} />
          </div>
          <div className="col-xl-3 mb-3">
            <label className="form-label">{t("nextServiceDueIn(km)")}</label>
            <CustomInput
              type="number"
              required
              register={register}
              name="nextServiceDueIn"
              placeholder=""
              defaultValue={getValues("nextServiceDueIn")}
              disabled={!isTimeReminderEnabled}
            />
            <Error errorName={errors.nextServiceDueIn} />
          </div>
          <div className="col-xl-3 mb-3">
            <label className="form-label">{t("reminderStart(km)")}</label>
            <CustomInput
              type="number"
              required
              register={register}
              name="reminderStart"
              placeholder=""
              defaultValue={getValues("reminderStart")}
              disabled={!isTimeReminderEnabled}
            />
            <Error errorName={errors.reminderStart} />
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
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default Servicing;
