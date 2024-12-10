import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-country-state-city/dist/react-country-state-city.css";
import { Controller, useForm } from "react-hook-form";
import Error from "../../components/Error/Error";
import {
  subCompanyOptions,
  dateFormatOptions,
  DateSelectionOptions,
  vehicleGroupOptions,
  companyOptions,
  businessGroupOptions,
} from "@/constants/options";
import {
  FaBatteryFull,
  FaCircle,
  FaKey,
  FaSearch,
  FaWifi,
} from "react-icons/fa";
import { findHighestAndLowestDates } from "../../utils/helper";

const FilterOffcanvas = forwardRef(
  (
    {
      Title,
      editData,
      setEditData,
      setCompanyHandler,
      setDatehandler,
      setBusinessHandler,
      data,
    },
    ref
  ) => {
    const { control, formState: errors } = useForm();
    const [addEmploye, setAddEmploye] = useState(false);
    const [startDate, setStartDate] = useState(new Date(0));
    const [endDate, setEndDate] = useState(new Date(0));

    const role = localStorage.getItem("role");
    const loginId = localStorage.getItem("loginDetails-name");

    const dateRangeText = startDate.toLocaleDateString();
    const [selectCompanyFilter, SetSelectCompanyFilter] = useState({
      value: "All Companies",
      label: "All Companies",
    });

    const [selectGroupFilter, SetSelectGroupFilter] = useState({
      value: "All Groups",
      label: "All Groups",
    });

    useImperativeHandle(ref, () => ({
      showModal() {
        setAddEmploye(true);
      },
    }));

    useEffect(() => {
      if (role === "businessgroup") {
        SetSelectGroupFilter({
          value: loginId,
          label: loginId,
        });
        setBusinessHandler(loginId);
      }

      if (role === "company") {
        SetSelectCompanyFilter({
          value: loginId,
          label: loginId,
        });
        setCompanyHandler(loginId);
      }

      const dates = findHighestAndLowestDates(data);
      setStartDate(dates.lowestDate);
      setEndDate(dates.highestDate);
      setDatehandler({
        startDate: dates.lowestDate,
        endDate: dates.highestDate,
      });
    }, []);

    const { register, setValue, getValues, handleSubmit } = useForm();
    const nav = useNavigate();

    const FilterSubmitHandler = () => {
      setDatehandler({
        startDate: startDate,
        endDate: endDate,
      });

      if (role === "admin") {
        setBusinessHandler(selectGroupFilter.label);
      }

      if (role === "admin" || role === "businessgroup") {
        setCompanyHandler(selectCompanyFilter.label);
      }
    };

    return (
      <>
        <Offcanvas
          show={addEmploye}
          onHide={setAddEmploye}
          className="offcanvas-end "
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
              {/* <i className="fa-solid fa-xmark"></i> */}
            </button>
          </div>
          <div id="filter_reports" className="offcanvas-body">
            <div className="container-fluid">
              <form onSubmit={handleSubmit(FilterSubmitHandler)}>
                <div className="container ">
                  <div className="row w-100 m-2">
                    <div className="col-12  mb-3 ">
                      <label className="form-label">Business Group</label>
                      <Controller
                        name="Business"
                        control={control}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <Select
                            onChange={(newValue) => {
                              SetSelectGroupFilter({
                                value: newValue.value,
                                label: newValue.label,
                              });
                            }}
                            isDisabled={
                              role === "businessgroup" || role === "company"
                            }
                            name={name}
                            menuPosition={"fixed"}
                            options={businessGroupOptions}
                            value={selectGroupFilter}
                          />
                        )}
                      />
                    </div>
                    <div className="col-12  mb-3 ">
                      <label className="form-label">Company</label>
                      <Controller
                        name="company"
                        control={control}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <Select
                            onChange={(newValue) => {
                              SetSelectCompanyFilter({
                                value: newValue.value,
                                label: newValue.label,
                              });
                            }}
                            name={name}
                            isDisabled={role === "company"}
                            menuPosition={"fixed"}
                            options={companyOptions}
                            value={selectCompanyFilter}
                          />
                        )}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Date</label>
                      <Controller
                        name="dateSelection"
                        control={control}
                        render={({ value, name }) => (
                          <DatePicker
                            // width="0px"
                            className="form-control w-100"
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            onChange={(dates) => {
                              const [start, end] = dates;
                              setStartDate(start);
                              setEndDate(end);
                            }}
                            dateFormat="dd/MM/yy"
                            placeholderText={dateRangeText}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="row w-100 m-2">
                    {/* <div className="col-xl-12 mb-3 ">
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
                  </div> */}
                    {/* <div className=" p-2" style={{ height: "80%" }}>
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
                  </div> */}
                    <div className="col-xl-12">
                      <button
                        type="submit"
                        onClick={() => setAddEmploye(false)}
                        className="btn btn-primary me-1 w-100"
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
  }
);

export default FilterOffcanvas;
