import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-country-state-city/dist/react-country-state-city.css";
import { Controller, useForm } from "react-hook-form";
import Error from "../components/Error/Error";
import {
  branchOptions,
  alertTypeOptions,
} from "../components/TabComponent/VehicleTabs/Options";

const AlertOffcanvas = forwardRef(
  (
    {
      Title,
      editData,
      setEditData,
      register,
      setValue,
      getValues,
      handleSubmit,
      onSubmit,
    },
    ref
  ) => {
    const { control, formState: errors } = useForm();
    const [startDate, setStartDate] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [addEmploye, setAddEmploye] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedOption3, setSelectedOption3] = useState(null);
    useImperativeHandle(ref, () => ({
      showModal() {
        setAddEmploye(true);
      },
    }));
    const nav = useNavigate();
    const handleChange = (e) => {
      setSelectedOption(e.target.value);
      setValue("basedOn", e.target.value);
    };
    const handleChange2 = (e) => {
      setSelectedOption2(e.target.value);
      setValue("value", e.target.value);
    };
    const handleChange3 = (e) => {
      setSelectedOption3(e.target.value);
      setValue("validDays", e.target.value);
    };
    const customStyles = {
      control: (base) => ({
        ...base,
        padding: ".25rem 0 ", // Adjust the height as needed
      }),
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
              <form onClick={()=>handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">Company</label>
                    <Controller
                      name="company"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            setValue("company", newValue.value)
                          }
                          options={branchOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={branchOptions[0]}
                        />
                      )}
                    />
                  </div>
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">Branch</label>
                    <Controller
                      name="branch"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            setValue("branch", newValue.value)
                          }
                          options={branchOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={branchOptions[0]}
                        />
                      )}
                    />
                  </div>

                  <div className="col-xl-6 mb-3">
                    <label className="form-label">Based On</label>
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
                          Vehicle
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
                          Vehicle Group
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
                          Vehicle Type
                        </label>
                      </div>
                    </div>
                  </div>
                  {selectedOption === 'vehicleGroup'}
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">
                      Alert Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("alertName", {
                        required: "Alert Name is required",
                      })}
                      className="form-control"
                      name="alertName"
                      placeholder=""
                    />
                    <Error errorName={errors.alertName} />
                  </div>
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">
                      Alert Type <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="alertType"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            setValue("alertType", newValue.value)
                          }
                          options={alertTypeOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={alertTypeOptions[0]}
                        />
                      )}
                    />
                    <Error errorName={errors.alertType} />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">Value</label>
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
                          Start
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
                          Cancel
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
                          Both
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">Valid Days</label>
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
                          Everyday
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
                          Custom
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">Valid Time From</label>
                    <div className="d-flex align-items-center">
                      <input
                        type="time"
                        {...register("validTimeFrom")}
                        className="form-control"
                        name="validTimeFrom"
                        placeholder=""
                      />
                      <span className="px-2">To</span>
                      <input
                        type="time"
                        {...register("validTimeFrom")}
                        className="form-control"
                        name="validTimeFrom"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">Action </label>
                    <div className="d-flex align-items-center">
                      <div className="form-check form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value=""
                            defaultChecked
                          />
                          SMS
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value=""
                          />
                          Email
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value=""
                          />
                          Notification
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={() => setAddEmploye(false)}
                    className="btn btn-primary me-1"
                  >
                    Submit
                  </button>
                  <Link
                    to={"#"}
                    onClick={() => setAddEmploye(false)}
                    className="btn btn-danger light ms-1"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Offcanvas>
      </>
    );
  }
);

export default AlertOffcanvas;
