import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
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
import '../../scss/pages/_driver-tracking.scss'

import {useTranslation} from 'react-i18next'

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
    },
    ref
  ) => {


    console.log('edit data inside modal',editData);
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
        setCompanyId(userDetails?.user.companyId);
      }
    }, []);

    const customStyles = {
      control: (base) => ({
        ...base,
        padding: ".25rem 0 ",
      }),
    };
    const {t} = useTranslation();
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
                    <label className="form-label">{t('branch')}</label>
                    <Controller
                      name="branch"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            {setTempValue(newValue.value);
                            setValue("branch", newValue.value)}
                          }
                          options={branchOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={branchOptions[0]}
                        />
                      )}
                    />
                    { !getValues('branch') && <Error errorName={errors.branch} />}
                  </div>

                  <div className="col-xl-6 mb-3">
                    <label className="form-label">{t('basedOn')}<span className="text-danger">*</span></label>
                    <div className="basic-form" style={{ marginTop: ".5rem" }}>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="vehicle"
                          checked={selectedOption === "vehicle"}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          style={{ marginBottom: "0" }}
                        >
                          {t('vehicle')}
                        </label>
                      </div>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="vehicleGroup"
                          checked={selectedOption === "vehicleGroup"}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          style={{ marginBottom: "0" }}
                        >
                          {t('vehicleGroup')}
                        </label>
                      </div>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="vehicleType"
                          checked={selectedOption === "vehicleType"}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          style={{ marginBottom: "0" }}
                        >
                         {t('vehicleType')}
                        </label>
                      </div>
                    </div>
                    { !getValues('basedOn') && <Error errorName={errors.basedOn} />}
                  </div>
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">
                    {t('object')} <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="object"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            {setTempValue(newValue.value)
                            setValue("object", newValue.value)}
                          }
                          options={objectOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={objectOptions[0]}
                        />
                      )}
                    />
                   { !getValues('object') && <Error errorName={errors.object} />}
                  </div>
                 
                    <div className={`${ selectedOption !== 'vehicleGroup' ?  "col-xl-6 mb-3 pe-none red" : "col-xl-6 mb-3"}`}>
                    <label className="form-label">
                    {t('objectGroup')} <span className="text-danger">*</span>
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
                    {t('alertName')} <span className="text-danger">*</span>
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
                    {t('alertType')} <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="alertType"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            {setTempValue(newValue.value);
                            setValue("alertType", newValue.value)}
                          }
                          options={alertTypeOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={alertTypeOptions[0]}
                        />
                      )}
                    />
                    {!getValues('alertType') && <Error errorName={errors.alertType} />}
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">Value<span className="text-danger">*</span></label>
                    <div className="basic-form" style={{ marginTop: ".5rem" }}>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="start"
                          checked={selectedOption2 === "start"}
                          onChange={handleChange2}
                        />
                        <label
                          className="form-check-label"
                          style={{ marginBottom: "0" }}
                        >
                          {t('start')}
                        </label>
                      </div>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="cancel"
                          checked={selectedOption2 === "cancel"}
                          onChange={handleChange2}
                        />
                        <label
                          className="form-check-label"
                          style={{ marginBottom: "0" }}
                        >
                          {t('cancel')}
                        </label>
                      </div>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="both"
                          checked={selectedOption2 === "both"}
                          onChange={handleChange2}
                        />
                        <label
                          className="form-check-label"
                          style={{ marginBottom: "0" }}
                        >
                          {t('both')}
                        </label>
                      </div>
                    </div>
                    { !getValues('alertValue') && <Error errorName={errors.alertValue} />}
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">{t('validDays')}</label>
                    <div className="basic-form" style={{ marginTop: ".5rem" }}>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="everyday"
                          checked={selectedOption3 === "everyday"}
                          onChange={handleChange3}
                        />
                        <label
                          className="form-check-label"
                          style={{ marginBottom: "0" }}
                        >
                          {t('everyday')}
                        </label>
                      </div>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="custom"
                          checked={selectedOption3 === "custom"}
                          onChange={handleChange3}
                        />
                        <label
                          className="form-check-label"
                          style={{ marginBottom: "0" }}
                        >
                          {t('custom')}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">{t('validTimeFrom')}</label>
                    <div className="d-flex align-items-center justify-content-evenly">
                      <CustomInput
                        type="time"
                        register={register}
                        label="Valid time From"
                        name="validTimeFrom1"
                        placeholder=""
                      />
                      <span className="px-1">{t('to')}</span>
                      <CustomInput
                        type="time"
                        register={register}
                        label="Valid Time From"
                        name="validTimeFrom2"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">{t('action')} </label>
                    <div className="d-flex align-items-center">
                      <div className="form-check form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value=""
                            defaultChecked
                          />
                          {t('sms')}
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value=""
                          />
                          {t('email')}
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value=""
                          />
                          {t('notification')}
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
                            objectOptions.filter(
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
