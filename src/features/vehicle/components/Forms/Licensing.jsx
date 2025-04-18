import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import Error from "@/components/Error/Error";
import CustomInput from "@/components/Input/CustomInput";
import CustomCheckbox from "@/components/Input/CustomCheckbox";

const Licensing = ({
  register,
  getValues,
  errors,
  handleSubmit,
  onSubmit,
  watch,
  isFormSubmitting,
}) => {
  const { t } = useTranslation();
  const isLicenseReminderDisabled = watch("licenseReminder", false);
  const isRoadworthyReminderEnabled = watch("roadworthyReminder", false);

  return (
    <div className="p-4 relative">
      <div className="d-flex justify-content-between" style={{ width: "100%" }}>
        <div className="row" style={{ width: "50%" }}>
          <div className="border border-1 p-3 row rounded">
            <div className="col-xl-6 mb-3">
              <label className="form-label">{t("licenseNumber")}</label>
              <CustomInput
                type="text"
                required
                register={register}
                name="licenseNumber_dupe"
                placeholder=""
                disabled
                value={getValues("licenseNumber")}
              />
              <Error errorName={errors.licenseNumber} />
            </div>
            <div className="col-xl-6 mb-3">
              <label className="form-label">{t("roadworthyNumber")}</label>
              <CustomInput
                type="text"
                required
                register={register}
                name="roadWorthy_dupe"
                placeholder=""
                disabled
                value={getValues("roadWorthy")}
              />
              <Error errorName={errors.roadWorthy} />
            </div>
          </div>
          {/* License Reminder */}
          <div className="border-container position-relative p-3 mt-5 row">
            <div className="heading-container d-flex align-items-center position-absolute">
              <CustomCheckbox
                // onChange={onChange}
                register={register}
                name="licenseReminder"
                label={t("licenseReminder")}
                checked={getValues("licenseReminder")}
              />
            </div>
            <div className="col-xl-6 mb-3 mt-2">
              <label className="form-label">{t("lastRenewalDate")}</label>
              <CustomInput
                type="date"
                required
                register={register}
                name="licenseLastRenewalDate"
                defaultValue={getValues("licenseLastRenewalDate")}
                // disabled={!watch("licenseReminder")}
                disabled={!isLicenseReminderDisabled}
              />
              <Error errorName={errors.licenseLastRenewalDate} />
            </div>
            <div className="col-xl-6 mb-3">
              <label className="form-label">{t("period(months)")}</label>
              <CustomInput
                type="number"
                required
                register={register}
                name="licensePeriod"
                defaultValue={getValues("licensePeriod")}
                disabled={!isLicenseReminderDisabled}
              />
              <Error errorName={errors.licensePeriod} />
            </div>
            <div className="col-xl-6 mb-3">
              <label className="form-label">{t("nextRenewalDueOn")}</label>
              <CustomInput
                type="date"
                required
                register={register}
                name="licenseNextRenewalDue"
                defaultValue={getValues("licenseNextRenewalDue")}
                disabled={!isLicenseReminderDisabled}
              />
              <Error errorName={errors.licenseNextRenewalDue} />
            </div>
            <div className="col-xl-6 mb-3">
              <label className="form-label">
                {t("reminderStarts")}
              </label>
              <CustomInput
                type="number"
                required
                register={register}
                name="licenseReminderStart"
                defaultValue={getValues("licenseReminderStart")}
                disabled={!isLicenseReminderDisabled}
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
                label={t("RoadworthyReminder")}
              />
            </div>
            <div className="col-xl-6 mb-3 mt-2">
              <label className="form-label">{t("lastRenewalDate")}</label>
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
              <label className="form-label">{t("period(months)")}</label>
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
              <label className="form-label">{t("nextRenewalDueOn")}</label>
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
                {t("reminderStarts")}
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
          disabled={isFormSubmitting}
          style={{ width: "10%" }}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default Licensing;
