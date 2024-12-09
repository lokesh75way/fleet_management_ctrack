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
} from "../../../../constants/options";
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
import ParentBranchDropdown from "../../../../features/branch/components/DropDownList";
import CustomCheckbox from "../../../../components/Input/CustomCheckbox";
import "@/assets/scss/pages/_driver-tracking.scss";

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
  const [isBuisnessGroupDisabled, setIsBuisnessGroupDisabled] = useState(false);

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
      setValue("branchId", formData[0]?.branchId?._id);
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
    if (checkRole() !== "SUPER_ADMIN") {
      setIsBuisnessGroupDisabled(true);
    }
    if (userDetails?.user?.role === "BUSINESS_GROUP") {
      setValue("businessGroupId", userDetails?.user.businessGroupId);
    }
  }, []);

  return (
    <div className="p-4 relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row justify-content-between" style={{ width: "100%" }}>
          {/* Contacts Section */}
          <div className="col-xl-4 mb-3">
            <div className="border-container position-relative p-3 row">
              <div className="heading-container d-flex align-items-center position-absolute">
                <h5>{t("Contacts")}</h5>
              </div>
              <div className="d-flex mb-2 gap-2">
                <Button type="button">{t("Add")}</Button>
                <Button type="button">{t("Delete")}</Button>
              </div>
              <div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>{t("Contact")}</th>
                    </tr>
                  </thead>
                  <tbody className="contact-table-container">
                    <tr>
                      <td className="top-align">
                        <CustomInput
                          type="text"
                          register={register}
                          name="contact"
                          defaultValue={getValues("contact")}
                          className="custom-input" /* Apply the custom-input class here */
                        />
                        <Error errorName={errors.contact} />
                      </td>
                    </tr>
                    <tr className="table-data-height">
                      <td className="top-align">
                        <h4>Arshad Text 1</h4>
                      </td>
                    </tr>
                    <tr>
                      <td className="top-align">
                        <h4>Arshad Text 2</h4>
                      </td>
                    </tr>
                    <tr>
                      <td className="top-align">
                        <h4>Arshad Text 3</h4>
                      </td>
                    </tr>
                    <tr>
                      <td className="top-align">
                        <h4>Arshad Text 4</h4>
                      </td>
                    </tr>
                    <tr>
                      <td className="top-align">
                        <h4>Arshad Text 5</h4>
                      </td>
                    </tr>
                    <tr>
                      <td className="top-align">
                        <h4>Arshad Text 6</h4>
                      </td>
                    </tr>
                    <tr>
                      <td className="top-align">
                        <h4>Arshad Text 7</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="col-xl-4 mb-3">
            <div className="border-container position-relative p-3 row">
              <div className="heading-container d-flex align-items-center position-absolute">
                <h5>{t("Schedule")}</h5>
              </div>
              <div className="mb-3">
                <label className="form-label">{t("Day")}</label>
                <CustomInput
                  type="text"
                  register={register}
                  name="scheduleDay"
                  defaultValue={getValues("scheduleDay")}
                />
                <Error errorName={errors.scheduleDay} />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">{t("From")}</label>
                  <CustomInput
                    type="time"
                    register={register}
                    name="scheduleFrom"
                    defaultValue={getValues("scheduleFrom")}
                  />
                  <Error errorName={errors.scheduleFrom} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">{t("To")}</label>
                  <CustomInput
                    type="time"
                    register={register}
                    name="scheduleTo"
                    defaultValue={getValues("scheduleTo")}
                  />
                  <Error errorName={errors.scheduleTo} />
                </div>
              </div>

              <div className="d-flex mb-2 gap-2">
                <Button type="button">{t("Add")}</Button>
                <Button type="button">{t("Delete")}</Button>
              </div>
              <div className="overflow-auto">
                <table className="table table-bordered top-align">
                  <thead>
                    <tr>
                      <th>{t("Day")}</th>
                      <th>{t("From")}</th>
                      <th>{t("To")}</th>
                      <th>{t("SMS")}</th>
                      <th>{t("Email")}</th>
                    </tr>
                  </thead>
                  <tbody className="schedule-table-container">
                    <tr>
                      <td className="top-align">
                        <CustomInput
                          type="text"
                          register={register}
                          name="scheduleTableDay"
                          defaultValue={getValues("scheduleTableDay")}
                        />
                        <Error errorName={errors.scheduleTableDay} />
                      </td>
                      <td className="top-align">
                        <CustomInput
                          type="time"
                          register={register}
                          name="scheduleTableFrom"
                          defaultValue={getValues("scheduleTableFrom")}
                        />
                        <Error errorName={errors.scheduleTableFrom} />
                      </td>
                      <td className="top-align">
                        <CustomInput
                          type="time"
                          register={register}
                          name="scheduleTableTo"
                          defaultValue={getValues("scheduleTableTo")}
                        />
                        <Error errorName={errors.scheduleTableTo} />
                      </td>
                      <td className="top-align">
                        <CustomInput
                          type="text"
                          register={register}
                          name="scheduleTableSMS"
                        />
                        <Error errorName={errors.scheduleTableSMS} />
                      </td>
                      <td className="top-align">
                        <CustomInput
                          type="text"
                          register={register}
                          name="scheduleTableEmail"
                        />
                        <Error errorName={errors.scheduleTableEmail} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>30</h4>
                      </td>
                      <td>
                        <h4>08:30 AM</h4>
                      </td>
                      <td>
                        <h4>10:05 PM</h4>
                      </td>
                      <td>
                        <h4>Demo</h4>
                      </td>
                      <td>
                        <h4>Email</h4>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>30</h4>
                      </td>
                      <td>
                        <h4>08:30 AM</h4>
                      </td>
                      <td>
                        <h4>10:05 PM</h4>
                      </td>
                      <td>
                        <h4>Demo</h4>
                      </td>
                      <td>
                        <h4>Email</h4>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>30</h4>
                      </td>
                      <td>
                        <h4>08:30 AM</h4>
                      </td>
                      <td>
                        <h4>10:05 PM</h4>
                      </td>
                      <td>
                        <h4>Demo</h4>
                      </td>
                      <td>
                        <h4>Email</h4>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>30</h4>
                      </td>
                      <td>
                        <h4>08:30 AM</h4>
                      </td>
                      <td>
                        <h4>10:05 PM</h4>
                      </td>
                      <td>
                        <h4>Demo</h4>
                      </td>
                      <td>
                        <h4>Email</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="col-xl-3 mb-3">
            <div className="border-container position-relative p-3 row">
              <div className="heading-container d-flex align-items-center position-absolute">
                <h5>{t("Events")}</h5>
              </div>
              <div
                className="events-container p-3"
                style={{ maxHeight: "400px", overflowY: "scroll" }}
              >
                <CustomCheckbox
                  register={register}
                  name="statusText"
                  label={t("Status Text")}
                />
                <CustomCheckbox
                  register={register}
                  name="rollover"
                  label={t("Rollover")}
                />
                <CustomCheckbox
                  register={register}
                  name="noGoArea"
                  label={t("NoGo Area")}
                />
                <CustomCheckbox
                  register={register}
                  name="NIL"
                  label={t("NIL")}
                />
                <CustomCheckbox
                  register={register}
                  name="highGForce"
                  label={t("High G-force")}
                />
                <CustomCheckbox
                  register={register}
                  name="incident"
                  label={t("Incident")}
                />
                <CustomCheckbox
                  register={register}
                  name="inWaypoint"
                  label={t("In Waypoint")}
                />
                <CustomCheckbox
                  register={register}
                  name="outWaypoint"
                  label={t("Out Waypoint")}
                />
                <CustomCheckbox
                  register={register}
                  name="panic"
                  label={t("Panic")}
                />
                <CustomCheckbox
                  register={register}
                  name="input1"
                  label={t("Input1")}
                />
                <CustomCheckbox
                  register={register}
                  name="areaAlarm"
                  label={t("Area Alarm")}
                />
                <CustomCheckbox
                  register={register}
                  name="ignitionOff"
                  label={t("Ignition Off")}
                />
                <CustomCheckbox
                  register={register}
                  name="driving"
                  label={t("Driving")}
                />
                <CustomCheckbox
                  register={register}
                  name="illegalMovement"
                  label={t("Illegal Movement")}
                />
                <CustomCheckbox
                  register={register}
                  name="severeGForce"
                  label={t("Severe G-force")}
                />
                <CustomCheckbox
                  register={register}
                  name="GSMJam"
                  label={t("GSM Jam")}
                />
                <CustomCheckbox
                  register={register}
                  name="startup"
                  label={t("Start Up")}
                />
                <CustomCheckbox
                  register={register}
                  name="excessiveIdling"
                  label={t("Excessive Idling")}
                />
                <CustomCheckbox
                  register={register}
                  name="boxTamper"
                  label={t("Box Tamper")}
                />
                <CustomCheckbox
                  register={register}
                  name="speedViolation"
                  label={t("Speed Violation")}
                />
                <CustomCheckbox
                  register={register}
                  name="input2"
                  label={t("Input2")}
                />
                <CustomCheckbox
                  register={register}
                  name="harshBraking"
                  label={t("Harsh Braking")}
                />
                <CustomCheckbox
                  register={register}
                  name="harshCornering"
                  label={t("Harsh Cornering")}
                />
                <CustomCheckbox
                  register={register}
                  name="harshAcceleration"
                  label={t("Harsh Acceleration")}
                />
                <CustomCheckbox
                  register={register}
                  name="batteryTamper"
                  label={t("Battery Tamper")}
                />
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
          <Button type="submit" style={{ width: "10%" }}>
            {t("Submit")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default General;
