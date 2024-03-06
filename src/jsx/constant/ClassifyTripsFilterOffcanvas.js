import React, { useState, forwardRef, useImperativeHandle } from "react";
import "../../scss/pages/_driver-tracking.scss";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-country-state-city/dist/react-country-state-city.css";
import { Controller, FormProvider } from "react-hook-form";
import Error from "../components/Error/Error";
import {
  subCompanyOptions,
} from "../components/TabComponent/VehicleTabs/Options";
import {
  FaBatteryFull,
  FaCircle,
  FaKey,
  FaSearch,
  FaWifi,
} from "react-icons/fa";
import CustomInput from '../components/Input/CustomInput'

const ClassifyTripsFilterOffcanvas = forwardRef(({ Title,errors,control,register, setValue, getValues,handleSubmit,onSubmit }, ref) => {
  const [addEmploye, setAddEmploye] = useState(false);
  const [tempValue, setTempValue] = useState();
  useImperativeHandle(ref, () => ({
    showModal() {
      setAddEmploye(true);
    },
  }));
  const nav = useNavigate();
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
            <FormProvider>
            <form onClick={handleSubmit(onSubmit)}>
              <div className="d-flex">
                <div className="row w-50 m-2">
                  <div className="col-xl-12 mb-3 ">
                    <label className="form-label">Branch</label>
                    <Controller
                      name="branch"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            setValue("branch", newValue.value)
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
                  <div className="col-xl-12 mb-3">
                    <label className="form-label">From Date</label>
                    <Controller
                      name="fromDate"
                      control={control}
                      render={({ value, name }) => (
                        <DatePicker
                          selected={getValues("fromDate") || new Date()}
                          className="form-control"
                          onChange={(newValue) =>
                            {setTempValue(newValue)
                            setValue("fromDate", newValue)}
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="col-xl-12 mb-3">
                    <label className="form-label">To Date</label>
                    <Controller
                      name="toDate"
                      control={control}
                      render={({ value, name }) => (
                        <DatePicker
                          selected={getValues("toDate") || new Date()}
                          className="form-control"
                          onChange={(newValue) =>
                            {setTempValue(newValue)
                            setValue("toDate", newValue)}
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="position-absolute bottom-0 mb-4">
                <button
                  type="submit"
                  onClick={() => setAddEmploye(false)}
                  className="btn btn-primary light me-1"
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
                  <div className=" p-2" style={{ height:"80%"}} >
                  <div className="col-xl-12 mb-3">
                    <div className="search-driver-tab p-2 rounded-1 w-100">
                      <input
                        type="text"
                        {...register("search")}
                        label="Search"
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
                  <div className="position-absolute bottom-0 mb-4" >
                <button
                  type="submit"
                  onClick={() => setAddEmploye(false)}
                  className="btn btn-primary me-4"
                >
                  Apply
                </button>
                <button
                  className="btn btn-primary me-4"
                >
                  XLS
                </button>
                <button
                  className="btn btn-primary me-4"
                >
                  PDF
                </button>
              </div>
                </div>
              </div>
              
            </form>
            </FormProvider>
          </div>
        </div>
      </Offcanvas>
    </>
  );
});

export default ClassifyTripsFilterOffcanvas;
