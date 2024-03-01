import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-country-state-city/dist/react-country-state-city.css";
import { Controller, useForm } from "react-hook-form";
import Error from "../components/Error/Error";
import {
  subCompanyOptions,
  dateFormatOptions,
  DateSelectionOptions,
  vehicleGroupOptions,
} from "../components/TabComponent/VehicleTabs/Options";
import {
  FaBatteryFull,
  FaCircle,
  FaKey,
  FaSearch,
  FaWifi,
} from "react-icons/fa";

const FilterOffcanvas = forwardRef(({ Title, editData, setEditData }, ref) => {
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
  const { register, setValue, getValues, handleSubmit, onSubmit } = useForm();
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
            <form onClick={() => handleSubmit(onSubmit)}>
              <div className="d-flex">
                <div className="row w-50 m-2">
                  <div className="col-xl-12 mb-3 ">
                    <label className="form-label">Sub Company</label>
                    <Controller
                      name="subCompany"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            setValue("subCompany", newValue.value)
                          }
                          options={subCompanyOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={subCompanyOptions[0]}
                        />
                      )}
                    />
                  </div>
                  <div className="col-xl-12 mb-3 ">
                    <label className="form-label">Vehicle Group</label>
                    <Controller
                      name="vehicleGroup"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            setValue("vehicleGroup", newValue.value)
                          }
                          options={subCompanyOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={subCompanyOptions[0]}
                        />
                      )}
                    />
                  </div>
                  <div className="col-xl-12 mb-3 ">
                    <label className="form-label">Vehicle Type</label>
                    <Controller
                      name="vehicleBrand"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            setValue("vehicleBrand", newValue.value)
                          }
                          options={subCompanyOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={subCompanyOptions[0]}
                        />
                      )}
                    />
                  </div>
                  <div className="col-xl-12 mb-3 ">
                    <label className="form-label">Vehicle Brand</label>
                    <Controller
                      name="vehicleBrand"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            setValue("vehicleBrand", newValue.value)
                          }
                          options={subCompanyOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={subCompanyOptions[0]}
                        />
                      )}
                    />
                  </div>
                  <div className="col-xl-12 mb-3 ">
                    <label className="form-label">Vehicle Model</label>
                    <Controller
                      name="vehicleModel"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            setValue("vehicleModel", newValue.value)
                          }
                          options={subCompanyOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={subCompanyOptions[0]}
                        />
                      )}
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">Duration Time</label>
                    <div className="basic-form" style={{ marginTop: ".5rem" }}>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="customRadioBox987"
                          value="hhmm"
                          checked={selectedOption === "hhmm"}
                          onChange={handleChange}
                          name="optradioCustom1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customRadioBox987"
                          style={{ marginBottom: "0" }}
                        >
                          HH:MM
                        </label>
                      </div>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="customRadioBox988"
                          name="optradioCustom1"
                          value="decimal"
                          checked={selectedOption === "decimal"}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customRadioBox988"
                          style={{ marginBottom: "0" }}
                        >
                          Decimal
                        </label>
                      </div>
                    </div>
                  </div>
                  <div style={{marginTop:"3rem"}}>
                <button
                  type="submit"
                  onClick={() => setAddEmploye(false)}
                  className="btn btn-primary me-1"
                >
                  Save Filter
                </button>
                <Link
                  to={"#"}
                  onClick={() => setAddEmploye(false)}
                  className="btn btn-danger light ms-1"
                >
                  Delete Filter
                </Link>
              </div>
                </div>
                <div className="row w-50 m-2">
                  <div className="col-xl-12 mb-3">
                    <label className="form-label"> Date Selection</label>
                    <Controller
                      name="dateSelection"
                      control={control}
                      render={({ value, name }) => (
                        <DatePicker
                          selected={getValues("dateSelection") || new Date()}
                          className="form-control"
                          onChange={(newValue) =>
                            setValue("dateSelection", newValue)
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="col-xl-12 mb-3 ">
                    <label className="form-label">Time Range</label>
                    <div className="d-flex align-items-center">
                      <input
                        type="time"
                        {...register("timeRange")}
                        className="form-control"
                        name="timeRange"
                        placeholder=""
                      />
                      <span className="mx-2">To</span>
                      <input
                        type="time"
                        {...register("timeRange")}
                        className="form-control"
                        name="timeRange"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className=" p-2" style={{ height:"80%"}} >
                  <div className="col-xl-12 mb-3 ">
                    <div className="search-driver-tab p-2 w-100 rounded-1">
                      <input
                        type="text"
                        placeholder="search"
                        className="form-control-driver-tab"
                      />
                      <FaSearch
                        style={{ fontSize: "1.5rem", padding: "2px" }}
                      />
                    </div>
                  </div>
                  <div className="d-flex mt-2 fs-6 align-items-center">
                    <div
                      className="form-check custom-checkbox mb-3"
                      style={{ marginRight: "5px" }}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckBox1"
                        required
                      />
                    </div>
                    <div className=" bg-white w-100 p-2 d-flex justify-content-between">
                      <span>Company 1</span>
                      <span className="text-end">[1]</span>
                    </div>
                  </div>
                  <div className="d-flex mt-2 fs-6 align-items-center">
                    <div
                      className="form-check custom-checkbox"
                      style={{ marginRight: "5px" }}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckBox1"
                        required
                      />
                    </div>
                    <div className="bg-white w-100 d-flex align-items-center">
                      <FaCircle
                        style={{
                          fontSize: "1.2rem",
                          padding: "2px",
                          margin: "0 .3rem",
                          background: "white",
                          color: "rgb(39,129,0)",
                        }}
                      />
                      <div
                        className="bg-white w-50 p-1 d-flex flex-column justify-content-between"
                        style={{ fontSize: ".8rem" }}
                      >
                        <span>Test1</span>
                        <span>22-02-2024 3:00 PM</span>
                      </div>
                      <div className="d-flex w-50 justify-content-evenly">
                        <span>11</span>
                        <FaWifi />
                        <FaKey />
                        <FaBatteryFull />
                      </div>
                    </div>
                  </div>
                  </div>
                  <div style={{marginTop:"1rem"}}>
                <button
                  type="submit"
                  onClick={() => setAddEmploye(false)}
                  className="btn btn-primary me-1"
                >
                  Apply
                </button>
              </div>
                </div>
              </div>
              
            </form>
          </div>
        </div>
      </Offcanvas>
    </>
  );
});

export default FilterOffcanvas;
