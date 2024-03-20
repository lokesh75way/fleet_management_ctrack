import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import "../../scss/pages/_driver-tracking.scss";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-country-state-city/dist/react-country-state-city.css";
import { Controller, FormProvider } from "react-hook-form";
import Error from "../components/Error/Error";
import {
  branchOptions,
  subCompanyOptions,
} from "../components/TabComponent/VehicleTabs/Options";
import {
  FaBatteryFull,
  FaCircle,
  FaKey,
  FaSearch,
  FaWifi,
} from "react-icons/fa";
import CustomInput from "../components/Input/CustomInput";
import { findHighestAndLowestDates } from "../../utils/helper";

const ClassifyTripsFilterOffcanvas = forwardRef(
  (
    {
      data,
      Title,
      errors,
      control,
      register,
      setValue,
      getValues,
      handleSubmit,
      onSubmit,
      filterData,
      setFilterData,
      submitFilterHandler
    },
    ref
  ) => {
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
    const filterSubmitHandler = (e)=>{
      e.preventDefault();
      submitFilterHandler(filterData);
    }

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
                <form onSubmit={filterSubmitHandler}>
                  <div className="container">
                    <div className="row ">
                      <div className="col-xl-12 mb-3 ">
                        <label className="form-label">Branch</label>
                        <Controller
                          name="branch"
                          control={control}
                          render={({
                            field: { onChange, value, name, ref },
                          }) => (
                            <Select
                              onChange={(newValue) =>{
                                setFilterData((prev)=>({
                                  ...prev , 
                                  branch : newValue
                                }));
                                setValue("branch", newValue.label)}
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
                      <div className="col-xl-12 mb-3 d-flex flex-column">
                        <label className="form-label">From Date</label>
                        <Controller
                          name="fromDate"
                          control={control}
                          render={({ value, name }) => (
                            <DatePicker
                              selected={filterData.from}
                              className="form-control"
                              onChange={(newValue) => {
                                setFilterData((prev)=>({
                                  ...prev , 
                                  from : newValue
                                }));
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="col-xl-12 mb-3 d-flex flex-column">
                        <label className="form-label">To Date</label>
                        <Controller
                          name="toDate"
                          control={control}
                          render={({ value, name }) => (
                            <DatePicker
                              selected={filterData.to}
                              className="form-control"
                              onChange={(newValue) => {
                                setFilterData((prev)=>({
                                  ...prev , 
                                  to : newValue
                                }));
                                setTempValue(newValue);
                                setValue("toDate", newValue);
                              }}
                            />
                          )}
                        />
                      </div>

                      <div className="col-xl-12 mb-3">
                        <div className="search-driver-tab p-2 rounded-1 w-100">
                          <input
                            type="text"
                            {...register("search")}
                            label="Search"
                            placeholder="search"
                            onChange={(newValue)=> setFilterData((prev)=>({
                              ...prev , 
                              search : newValue.target.value
                            })) }
                            className="form-control-driver-tab"
                          />
                          <FaSearch
                            style={{ fontSize: "1.5rem", padding: "2px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-4">
                          <button
                            type="submit"
                            onClick={() => setAddEmploye(false)}
                            className="btn btn-primary me-4 w-100"
                          >
                            Apply
                          </button>
                        </div>
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
  }
);

export default ClassifyTripsFilterOffcanvas;
