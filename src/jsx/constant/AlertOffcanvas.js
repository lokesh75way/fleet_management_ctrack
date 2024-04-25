import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import Select from "react-select";
import "react-country-state-city/dist/react-country-state-city.css";
import { Controller, FormProvider } from "react-hook-form";
import Error from "../components/Error/Error";
import {
  alertTypeOptions,
  objectOptions,
  severityOptions,
} from "../components/TabComponent/VehicleTabs/Options";
import CustomInput from "../components/Input/CustomInput";
import "../../scss/pages/_driver-tracking.scss";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import BranchDropdown from "../components/BranchDropdown";

const AlertOffcanvas = forwardRef(
  (
    {
      Title,
      register,
      setValue,
      getValues,
      control,
      errors,
      handleSubmit,
      onSubmit,
      clearErrors,
      reset,
      editData,
      setEditData,
    },
    ref
  ) => {
    // console.log("edit data inside modal", editData);
    const [addEmploye, setAddEmploye] = useState(false);
    const [tempVehicle, setTempVehicle] = useState("");
    const [tempValue, setTempValue] = useState("");
    const [tempValidDays, setTempValidDays] = useState("");
    const [companyId, setCompanyId] = useState();
    const { t } = useTranslation();
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    useImperativeHandle(ref, () => ({
      showModal() {
        setAddEmploye(true);
      },

      closeModal() {
        reset();
        clearErrors();
        setAddEmploye(false);
      },
    }));

    useEffect(() => {
      if (userDetails.user.role === "COMPANY") {
        setCompanyId(userDetails?.user.companyId[0]?._id);
      }
    }, []);

    const customStyles = {
      control: (base) => ({
        ...base,
        padding: ".25rem 0 ",
      }),
    };

    useEffect(() => {
      reset({});
      clearErrors();
      if (addEmploye && editData) reset({ ...editData });
      else setEditData();
    }, [addEmploye]);

    const handleBasedOn = (e) => {
      setTempVehicle(e.target.value);
      setValue("basedOn", e.target.value);
    };
    const handleValue = (e) => {
      setTempValue(e.target.value);
      setValue("value", e.target.value);
    };
    const handleValidDays = (e) => {
      setTempValidDays(e.target.value);
      setValue("validDays", e.target.value);
    };
    const handleActionChange = (e) => {
      console.log({ e });
      const vl = getValues(e.target.name);
      setValue(e.target.name, e.target.checked);
    };
    
    return (
      <>
        <Offcanvas
          show={addEmploye}
          onHide={setAddEmploye}
          className="offcanvas-end customeoff"
          placement="end"
        >
          <div className="offcanvas-header">
            <h5 className="modal-title" id="#gridSystemModal">
              {Title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setAddEmploye(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="offcanvas-body">
            <div className="container-fluid">
              <FormProvider>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-xl-6 mb-3 ">
                      <label className="form-label">{t("branch")}</label>
                      <Controller
                        name="branch"
                        control={control}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <BranchDropdown
                            onChange={(newValue) => {
                              const newArray = newValue.map((temp)=> temp.value)
                              setValue("branch", newArray);
                            }}
                            value={value}
                            customStyles={customStyles}
                            ref={ref}
                            companyId={companyId}
                            name={name}
                          />
                        )}
                      />
                      {!getValues("branch") && (
                        <Error errorName={errors.branch} />
                      )}
                    </div>

                    <div className="col-xl-6 mb-3">
                      <label className="form-label">
                        {t("basedOn")}
                        <span className="text-danger">*</span>
                      </label>
                      <div
                        className="basic-form"
                        style={{ marginTop: ".5rem" }}
                      >
                        <div className="form-check custom-checkbox form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            value="VEHICLE"
                            checked={
                              (getValues("basedOn") ?? tempVehicle) ===
                              "VEHICLE"
                            }
                            onChange={handleBasedOn}
                          />
                          <label
                            className="form-check-label"
                            style={{ marginBottom: "0" }}
                          >
                            {t("vehicle")}
                          </label>
                        </div>
                        <div className="form-check custom-checkbox form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            value="VEHICLE_GROUP"
                            checked={
                              (getValues("basedOn") ?? tempVehicle) ===
                              "VEHICLE_GROUP"
                            }
                            onChange={handleBasedOn}
                          />
                          <label
                            className="form-check-label"
                            style={{ marginBottom: "0" }}
                          >
                            {t("vehicleGroup")}
                          </label>
                        </div>
                        <div className="form-check custom-checkbox form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            value="VEHICLE_TYPE"
                            checked={
                              (getValues("basedOn") ?? tempVehicle) ===
                              "VEHICLE_TYPE"
                            }
                            onChange={handleBasedOn}
                          />
                          <label
                            className="form-check-label"
                            style={{ marginBottom: "0" }}
                          >
                            {t("vehicleType")}
                          </label>
                        </div>
                      </div>
                      {!getValues("basedOn") && (
                        <Error errorName={errors.basedOn} />
                      )}
                    </div>
                    <div className="col-xl-6 mb-3 ">
                      <label className="form-label">
                        {t("object")} <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="object"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <Select
                            onChange={(newValue) => {
                              setValue("object", newValue.value);
                            }}
                            options={objectOptions}
                            ref={ref}
                            name={name}
                            styles={customStyles}
                            value={
                              objectOptions.filter(
                                (l) => l.value == getValues("object")
                              )?.[0]
                            }
                          />
                        )}
                      />
                      {!getValues("object") && (
                        <Error errorName={errors.object} />
                      )}
                    </div>

                    <div
                      className={`${
                        (getValues("basedOn") ?? tempVehicle) !==
                        "VEHICLE_GROUP"
                          ? "col-xl-6 mb-3 pe-none red"
                          : "col-xl-6 mb-3"
                      }`}
                    >
                      <label className="form-label">
                        {t("objectGroup")}{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <CustomInput
                        type="text"
                        register={register}
                        label="Object Group"
                        name="objectGroup"
                        placeholder=""
                      />
                      <Error errorName={errors.objectGroup} />
                    </div>

                    <div className="col-xl-6 mb-3 ">
                      <label className="form-label">
                        {t("alertName")} <span className="text-danger">*</span>
                      </label>
                      <CustomInput
                        type="text"
                        register={register}
                        label="Alert Name"
                        name="alertName"
                        placeholder=""
                      />
                      <Error errorName={errors.alertName} />
                    </div>
                    <div className="col-xl-6 mb-3 ">
                      <label className="form-label">
                        {t("alertType")} <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="alertType"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <Select
                            onChange={(newValue) => {
                              setValue("alertType", newValue.value);
                            }}
                            options={alertTypeOptions}
                            ref={ref}
                            name={name}
                            styles={customStyles}
                            value={
                              alertTypeOptions.filter(
                                (l) => l.value === getValues("alertType")
                              )?.[0]
                            }
                          />
                        )}
                      />
                      {!getValues("alertType") && (
                        <Error errorName={errors.alertType} />
                      )}
                    </div>
                    <div className="col-xl-6 mb-3">
                      <label className="form-label">
                        Value<span className="text-danger">*</span>
                      </label>
                      <div
                        className="basic-form"
                        style={{ marginTop: ".5rem" }}
                      >
                        <div className="form-check custom-checkbox form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            value="START"
                            checked={
                              (getValues("value") ?? tempValue) === "START"
                            }
                            onChange={handleValue}
                          />
                          <label
                            className="form-check-label"
                            style={{ marginBottom: "0" }}
                          >
                            {t("start")}
                          </label>
                        </div>
                        <div className="form-check custom-checkbox form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            value="CANCEL"
                            checked={
                              (getValues("value") ?? tempValue) === "CANCEL"
                            }
                            onChange={handleValue}
                          />
                          <label
                            className="form-check-label"
                            style={{ marginBottom: "0" }}
                          >
                            {t("cancel")}
                          </label>
                        </div>
                        <div className="form-check custom-checkbox form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            value="BOTH"
                            checked={
                              (getValues("value") ?? tempValue) === "BOTH"
                            }
                            onChange={handleValue}
                          />
                          <label
                            className="form-check-label"
                            style={{ marginBottom: "0" }}
                          >
                            {t("both")}
                          </label>
                        </div>
                      </div>
                      {!getValues("BOTH") && (
                        <Error errorName={errors.value} />
                      )}
                    </div>
                    <div className="col-xl-6 mb-3">
                      <label className="form-label">{t("validDays")}</label>
                      <div
                        className="basic-form"
                        style={{ marginTop: ".5rem" }}
                      >
                        <div className="form-check custom-checkbox form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            value="EVERYDAY"
                            checked={
                              (getValues("validDays") ?? tempValidDays) ===
                              "EVERYDAY"
                            }
                            onChange={handleValidDays}
                          />
                          <label
                            className="form-check-label"
                            style={{ marginBottom: "0" }}
                          >
                            {t("everyday")}
                          </label>
                        </div>
                        <div className="form-check custom-checkbox form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            value="CUSTOM"
                            checked={
                              (getValues("validDays") ?? tempValidDays) === "CUSTOM"
                            }
                            onChange={handleValidDays}
                          />
                          <label
                            className="form-check-label"
                            style={{ marginBottom: "0" }}
                          >
                            {t("custom")}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 mb-3 ">
                      <label className="form-label">{t("validTimeFrom")}</label>
                      <div className="d-flex align-items-center justify-content-evenly">
                        <Controller
                          name="validFrom"
                          control={control}
                          render={({ value, name }) => (
                            <DatePicker
                              selected={
                                getValues("validFrom")
                                  ? new Date(getValues("validFrom"))
                                  : new Date()
                              }
                              className="form-control customDateHeight"
                              onChange={(newValue) =>
                                setValue("validFrom", newValue)
                              }
                            />
                          )}
                        />
                        <span className="px-1">{t("to")}</span>
                        <Controller
                          name="validTo"
                          control={control}
                          render={({ value, name }) => (
                            <DatePicker
                              selected={
                                getValues("validTo")
                                  ? new Date(getValues("validTo"))
                                  : new Date()
                              }
                              className="form-control customDateHeight"
                              onChange={(newValue) =>
                                setValue("validTo", newValue)
                              }
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 mb-3 ">
                      <label className="form-label">{t("action")} </label>
                      <div className="d-flex align-items-center">
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="action.SMS"
                              checked={getValues("action.SMS")}
                              onInput={handleActionChange}
                            />
                            {t("sms")}
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="action.Email"
                              checked={getValues("action.Email")}
                              onInput={handleActionChange}
                            />
                            {t("email")}
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="action.Notification"
                              checked={getValues("action.Notification")}
                              onInput={handleActionChange}
                            />
                            {t("notification")}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">
                      {t("severity")} <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="severity"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) => {
                            setValue("severity", newValue.value);
                          }}
                          options={severityOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          value={
                            severityOptions.filter(
                              (l) => l.value == getValues("severity")
                            )?.[0]
                          }
                        />
                      )}
                    />
                    {!getValues("severity") && (
                      <Error errorName={errors.severity} />
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={() => {
                        handleSubmit(onSubmit);
                      }}
                      className="btn btn-primary me-1 m-1"
                    >
                      {t("submit")}
                    </button>
                    <Link
                      to={"#"}
                      onClick={() => setAddEmploye(false)}
                      className="btn btn-danger light ms-1 m-1"
                    >
                      {t("cancel")}
                    </Link>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </Offcanvas>
      </>
    );
  }
);

export default AlertOffcanvas;
