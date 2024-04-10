import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
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
import DriverDropdown from "../components/DriverDropdown";

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
      // onSubmit,
      filterData,
      setFilterData,
      submitFilterHandler,
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
    // const filterSubmitHandler = (e,data) => {
    //   e.preventDefault();
    //   console.log(data,"thisis")
    //   // submitFilterHandler();
    // };

    const onSubmit = (data) =>{
      console.log(data, "thisis")
    }

    return (
      <>
        <Offcanvas
          show={addEmploye}
          onHide={setAddEmploye}
          className="offcanvas-end customeoff classy_filter"
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
                  <div className="container">
                    <div className="row ">
                      <div className="col-xl-12 mb-3 ">
                        <label className="form-label">Driver</label>
                        <Controller
                          name="driverId"
                          control={control}
                          render={({
                            field: { onChange, value, name, ref },
                          }) => (
                            <DriverDropdown
                              onChange={(newValue) => {
                                setValue("driverId", newValue.value);
                              }}
                              value={value}
                              customStyles={customStyles}
                              ref={ref}
                              name={name}
                            />
                          )}
                        />
                      </div>
                      <div className="col-xl-12 mb-3 d-flex flex-column">
                        <label className="form-label">Start Date</label>
                        <Controller
                          name="fromDate"
                          control={control}
                          render={({ value, name }) => (
                            <DatePicker
                              selected={filterData.start}
                              className="form-control"
                              onChange={(newValue) => {
                                setValue("fromDate", newValue);
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="col-xl-12 mb-3 d-flex flex-column">
                        <label className="form-label">End Date</label>
                        <Controller
                          name="toDate"
                          control={control}
                          render={({ value, name }) => (
                            <DatePicker
                              selected={filterData.end}
                              className="form-control"
                              onChange={(newValue) => {
                                setValue("toDate", newValue);
                              }}
                            />
                          )}
                        />
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
