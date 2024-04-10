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
import { Controller, FormProvider, useForm } from "react-hook-form";
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
import { classifyTripsFilterCanvas } from "../../yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getTrips } from "../../services/api/ClassifyTripServices";

const ClassifyTripsFilterOffcanvas = forwardRef(({ Title, filterData }, ref) => {
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
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(classifyTripsFilterCanvas),
  });

  const onSubmit = async(data) => {
    const { driverId, startDate, endDate } = data;
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
  
    
    if (!isNaN(parsedStartDate.getTime()) && !isNaN(parsedEndDate.getTime())) {

      const isoStartDate = parsedStartDate.toISOString();
      const isoEndDate = parsedEndDate.toISOString();
  
      const { data: response } = await getTrips(undefined, undefined, driverId, isoStartDate, isoEndDate);
      console.log(response, "thisis");
      filterData(response);
    } else {
      console.error('Invalid startDate or endDate');
    }
  };
  
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
                        render={({ field: { onChange, value, name, ref } }) => (
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
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            selected={field.value}
                            className="form-control"
                             onChange={(date) => field.onChange(date)}
                          />
                        )}
                      />
                    </div>
                    <div className="col-xl-12 mb-3 d-flex flex-column">
                      <label className="form-label">End Date</label>
                      <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                          selected={field.value}
                            className="form-control"
                            onChange={(date) => field.onChange(date)}
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
});

export default ClassifyTripsFilterOffcanvas;
