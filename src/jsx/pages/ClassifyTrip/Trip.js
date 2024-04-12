import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-country-state-city/dist/react-country-state-city.css";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { tripStatusOptions } from "../../components/TabComponent/VehicleTabs/Options";
import "../../../scss/pages/_driver-tracking.scss";
import Error from "../../components/Error/Error";
import CustomInput from "../../components/Input/CustomInput";
import DriverDropdown from "../../components/DriverDropdown";

const Trip = ({
  Title,
  editData,
  setEditData,
  register,
  setValue,
  getValues,
  handleSubmit,
  onSubmit,
  errors,
  control,
  clearErrors,
}) => {
  const [addEmploye, setAddEmploye] = useState(false);
  const [tempValue, setTempValue] = useState();
  const [dValues, setDvalues] = useState([]);
  const navigate = useNavigate();
  const location = useLocation()
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const data = location.state[0];
      setDvalues(data);
    }
  }, [id]);

  useEffect(() => {
    console.log(dValues,"mn")
    if (dValues && id) {
    //   setValue("startTime", dValues?.startTime);
      setValue("startLocation", dValues?.startLocation);
      setValue("reachLocation", dValues?.reachLocation);
      setValue("distance", dValues?.distance);
      setValue("fuelConsumption", dValues?.fuelConsumption);
      setValue("tripStatus", dValues?.tripStatus);
      setValue('driver', dValues?.driver)
    }
    else{
      setValue("startTime", new Date());
      setValue("reachTime", new Date());
    }
  }, [dValues, id]);



  return (
    <>
      <div className="p-4">
        <div className="row" style={{ width: "70%", margin: "auto" }}>
          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              Start Time <span className="text-danger">*</span>
            </label>
            <Controller
              name="startTime"
              control={control}
              render={({ value, name }) => (
                <DatePicker
                  selected={getValues("startTime") || new Date()}
                  className="form-control customDateHeight"
                  onChange={(newValue) => setValue("startTime", newValue)}
                />
              )}
            />
            <Error errorName={errors.startTime} />
          </div>
          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              Start Location <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="text"
              register={register}
              label="Start Location"
              name="startLocation"
              placeholder=""
            />
            <br />
            <Error errorName={errors.startLocation} />
          </div>
          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              Reach Time <span className="text-danger">*</span>
            </label>
            <Controller
              name="reachTime"
              control={control}
              render={({ value, name }) => (
                <DatePicker
                  selected={getValues("reachTime") || new Date()}
                  className="form-control customDateHeight"
                  onChange={(newValue) => setValue("reachTime", newValue)}
                />
              )}
            />
            <br />
            <Error errorName={errors.reachTime} />
          </div>
          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              Reach Location <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="text"
              register={register}
              label="Reach Location"
              name="reachLocation"
              placeholder=""
            />
            <Error errorName={errors.reachLocation} />
          </div>
          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              Distance
            </label>
            <CustomInput
              type="number"
              register={register}
              label="Distance"
              name="distance"
              placeholder=""
            />
          </div>
          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              Fuel Consumption
            </label>
            <CustomInput
              type="number"
              register={register}
              label="Fuel Consumption"
              name="fuelConsumption"
              placeholder=""
            />
          </div>
          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              Driver <span className="text-danger">*</span>
            </label>
            <Controller
              name="driver"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <DriverDropdown
                  onChange={(newValue) => {
                    setValue("driver", newValue.value);
                  }}
                  value={value}
                  customStyles={customStyles}
                  ref={ref}
                  name={name}
                />
              )}
            />
            <Error errorName={errors.driver} />
          </div>
          {/* <div className="col-xl-6 mb-3">
                      <label
                        htmlFor="exampleFormControlInput3"
                        className="form-label"
                      >
                        Last Modified By
                      </label>
                      <CustomInput
                        type="text"
                        register={register}
                        label="Last Modified By"
                        name="lastModifiedBy"
                        placeholder=""
                      />
                    </div> */}
          {/* <div className="col-xl-6 mb-3 d-flex flex-column">
                      <label className="form-label">Last Modified Date</label>
                      <Controller
                        name="lastModifiedDate"
                        control={control}
                        render={({ value, name }) => (
                          <DatePicker
                            selected={
                              getValues("lastModifiedDate") || new Date()
                            }
                            className="form-control customDateHeight"
                            onChange={(newValue) => {
                              setTempValue(newValue.value);
                              setValue("lastModifiedDate", newValue);
                            }}
                          />
                        )}
                      />
                    </div> */}
          <div className="col-xl-6 mb-3">
            <label className="form-label">Trip Status</label>
            <Controller
              name="tripStatus"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  onChange={(newValue) => {
                    setTempValue(newValue.value);
                    setValue("tripStatus", newValue.value);
                  }}
                  options={tripStatusOptions}
                  ref={ref}
                  name={name}
                  styles={customStyles}
                  defaultValue={tripStatusOptions[0]}
                />
              )}
            />
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
          <button
            type="submit"
            onClick={() => {
              handleSubmit(onSubmit);
            }}
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
      </div>
    </>
  );
};

export default Trip;
