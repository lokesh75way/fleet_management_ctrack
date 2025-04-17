import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-country-state-city/dist/react-country-state-city.css";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { tripStatusOptions } from "@/constants/options";
import "@/assets/scss/pages/_driver-tracking.scss";
import Error from "../../../components/Error/Error";
import CustomInput from "../../../components/Input/CustomInput";
import DriverDropdown from "../../components/DriverDropdown";
import { useTranslation } from "react-i18next";
import GroupDropdown from "@/features/businessGroup/components/DropDownList";
import CompanyDropdown from "@/features/company/components/DropDownList";
import BranchDropdownList from "@/features/branch/components/DropDownList";
import VehicleDropdownList from "@/features/vehicle/components/DropdownList";

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
  const { t } = useTranslation();
  const [addEmploye, setAddEmploye] = useState(false);
  const [tempValue, setTempValue] = useState();
  const [dValues, setDvalues] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [company, setCompany] = useState();
  const [branch, setBranch] = useState();
  const [vehicle, setVehicle] = useState();

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
    if (dValues && id) {
      //   setValue("startTime", dValues?.startTime);
      setValue("startLocation", dValues?.startLocation);
      setValue("reachLocation", dValues?.reachLocation);
      setValue("distance", dValues?.distance);
      setValue("fuelConsumption", dValues?.fuelConsumption);
      setValue("tripStatus", dValues?.tripStatus || tripStatusOptions[0].value);
      setValue("driver", dValues?.driver);
    } else {
      setValue("startTime", new Date());
      setValue("reachTime", new Date());
      setValue("tripStatus", tripStatusOptions[0].value);
    }
  }, [dValues, id]);

  return (
    <>
      <div className="p-4">
        <div className="row" style={{ width: "70%", margin: "auto" }}>
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">
              {t("businessGroup")} <span className="text-danger">*</span>
            </label>
            <Controller
              name="businessGroupId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <GroupDropdown
                  onChange={(newValue) => {
                    if (getValues("businessGroupId") != newValue.value) {
                      setValue("businessGroupId", newValue.value);
                      setValue("businessGroupName", newValue.label);
                      setValue("companyId", "");
                      setValue("branchId", "");
                      setCompany(null);
                      setBranch(null);
                    }
                  }}
                  defaultValue={value}
                  customStyles={customStyles}
                  name={name}
                />
              )}
            />
            <Error errorName={errors.businessGroupId} />
          </div>
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">
              {t("company")} <span className="text-danger">*</span>
            </label>
            <Controller
              name="companyId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <CompanyDropdown
                  groupId={getValues("businessGroupId")}
                  onChange={(newValue) => {
                    if (getValues("companyId") != newValue.value) {
                      setValue("companyId", newValue.value);
                      setValue("branchId", "");
                      setCompany(newValue);
                      setBranch(null);
                    }
                  }}
                  defaultValue={value}
                  value={company}
                  customStyles={customStyles}
                  name={name}
                />
              )}
            />
            <Error errorName={errors.companyId} />
          </div>
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">{t("branch")}</label>
            <Controller
              name="branchId"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <BranchDropdownList
                  companyId={getValues("companyId")}
                  groupId={getValues("businessGroupId")}
                  onChange={(newValue) => {
                    setValue("branchId", newValue?.value);
                    setBranch(newValue);
                  }}
                  defaultValue={value}
                  value={branch}
                  customStyles={customStyles}
                  isDisabled={false}
                  name={name}
                />
              )}
            />
          </div>
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">
              {t("vehicleName")}
              <span className="text-danger">*</span>
            </label>
            <Controller
              name="vehicleId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <VehicleDropdownList
                  companyId={getValues("companyId")}
                  groupId={getValues("businessGroupId")}
                  onChange={(newValue) => {
                    setValue("vehicleId", newValue?.value);
                    setVehicle(newValue);
                  }}
                  defaultValue={value}
                  value={vehicle}
                  customStyles={customStyles}
                  isDisabled={false}
                  name={name}
                />
              )}
            />
          </div>
          <div className="col-xl-6 mb-3">
            <div className="d-flex flex-column">
              <label htmlFor="exampleFormControlInput3" className="form-label">
                {t("startTime")} <span className="text-danger">*</span>
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
            </div>
            <Error errorName={errors.startTime} />
          </div>
          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              {t("startLocation")} <span className="text-danger">*</span>
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
            <div className="d-flex flex-column">
              <label htmlFor="exampleFormControlInput3" className="form-label">
                {t("reachTime")} <span className="text-danger">*</span>
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
            </div>
            <Error errorName={errors.reachTime} />
          </div>
          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              {t("reachLocation")} <span className="text-danger">*</span>
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
              {t("distance")}
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
              {t("fuelConsumption")}
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
              {t("driver")} <span className="text-danger">*</span>
            </label>
            <Controller
              name="driver"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <DriverDropdown
                  onChange={(newValue) => {
                    setValue("driver", newValue.value);
                    setValue("driverName", newValue.label);
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
            <label className="form-label">{t("tripStatus")}</label>
            <Controller
              name="tripStatus"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  onChange={(newValue) => {
                    setValue("tripStatus", newValue.value); 
                    setTempValue(newValue.value);
                    onChange(newValue.value);
                  }}
                  options={tripStatusOptions}
                  ref={ref}
                  name={name}
                  styles={customStyles}
                  defaultValue={tripStatusOptions.find(
                    (option) => option.value === getValues("tripStatus")
                  )}
                  value={tripStatusOptions.find(
                    (option) => option.value === value
                  )}
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
            onClick={() => {
              setAddEmploye(false);
              navigate(-1);
            }}
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
