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
import GroupDropdownList from "@/features/businessGroup/components/DropDownList";
import CompanyDropdownList from "@/features/company/components/DropDownList";
import { useUserRoleData } from "@/hooks/useUserRoleData";
import BranchDropdown from "@/jsx/components/BranchDropdown";
import VehicleDropdown from "@/jsx/components/VehicleDropdown";

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
  const { groupId, setGroupId, companyId, setCompanyId, businessDisabled, companyDisabled, branchDisabled, setBranchIds, vehicleIds, setVehicleIds, branchIds } = useUserRoleData();
  const { t } = useTranslation();
  const [addEmploye, setAddEmploye] = useState(false);
  const [tempValue, setTempValue] = useState();
  const [dValues, setDvalues] = useState([]);
  // const [branchId, setBranchId] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
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
      let startTime = dValues?.startTime;
      let reachTime = dValues?.reachTime;
      if(startTime) {
        startTime = new Date(startTime);
        setValue("startTime", startTime);
      }
      if(reachTime) {
        reachTime = new Date(reachTime);
        setValue("reachTime", reachTime);
      }
      
      setValue("businessUser", dValues?.businessUser);
      setValue("companyId", dValues?.companyId);
      setValue("branchIds", dValues?.branchIds);
      setValue("driverId", dValues?.driverId?._id);
      setValue("vehicleId", dValues?.vehicleId);
      setValue("startLocation", dValues?.startLocation);
      setValue("reachLocation", dValues?.reachLocation);
      setValue("distance", dValues?.distance);
      setValue("fuelConsumption", dValues?.fuelConsumption);
      setValue("tripStatus", dValues?.tripStatus);

      setGroupId(dValues?.businessUser);
      setCompanyId(dValues?.companyId);
      setBranchIds(dValues?.branchIds);

    } else {
      setValue("startTime", new Date());
      setValue("reachTime", new Date());
    }
  }, [dValues, id]);

  return (
    <>
      <div className="p-4">
        <div className="row" style={{ width: "70%", margin: "auto" }}>
          <div className="col-xl-4 mb-3">
            <label className="form-label">{t("businessGroup")}</label>
            <Controller
              name="businessUser"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <GroupDropdownList
                  // key={groupId}
                  onChange={async (newValue) => {
                    setValue("businessUser", newValue.value);
                    setGroupId(newValue.value);
                    setCompanyId(null);
                    setVehicleIds([]);
                    setValue("companyId", null);
                    setValue("branchIds", []);
                    setValue("vehicleId", "");
                    setValue("driverId", "");
                    setBranchIds([]);
                  }}
                  value={value}
                  customStyles={customStyles}
                  ref={ref}
                  isDisabled={businessDisabled}
                  name={name}
                />
              )}
            />
            <Error errorName={errors.businessUser} />
          </div>
          <div className="col-xl-4 mb-3">
            <label className="form-label">{t("company")}</label>
            <Controller
              name="companyId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <CompanyDropdownList
                  onChange={async (newValue) => {
                    setValue("companyId", newValue.value);
                    setCompanyId(newValue.value);
                    setValue("branchIds", []);
                    setValue("vehicleId", "");
                    setBranchIds([]);
                    setVehicleIds([]);
                    setValue("driverId", "");
                  }}
                  key={groupId}
                  groupId={groupId}
                  value={value}
                  customStyles={customStyles}
                  name={name}
                  ref={ref}
                  isDisabled={companyDisabled || !groupId}
                />
              )}
            />
            <Error errorName={errors.companyId} />
          </div>
          <div className="col-xl-4 mb-3">
            <label className="form-label">{t("branch")}</label>
            <Controller
              name="branchIds"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <BranchDropdown
                  onChange={(newValue) => {
                    const newArray = newValue.map((temp) => temp.value);
                    setValue("branchIds", newArray);
                    setBranchIds(newArray);
                  }}
                  value={value}
                  customStyles={customStyles}
                  ref={ref}
                  companyId={companyId}
                  name={name}
                  isDisabled={branchDisabled || !companyId}
                />
              )}
            />
            {!getValues("Branch") && <Error errorName={errors.parent} />}
          </div>

          <div className="d-flex justify-content-center align-items-center p-4 border rounded-2 mx-auto bg-light gap-4 mb-3" style={{ width: "97%" }}>
            <div className="w-100 mb-3 d-flex flex-column">
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
              <Error errorName={errors.startTime} />
            </div>
            <div className="w-100 mb-3 d-flex flex-column">
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
              <Error errorName={errors.startLocation} />
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center p-4 border rounded-2 mx-auto bg-light gap-4 mb-3" style={{ width: "97%" }}>
            <div className="w-100 mb-3 d-flex flex-column">
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
              <Error errorName={errors.reachTime} />
            </div>

            <div className="w-100 mb-3 d-flex flex-column">
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
            <label className="form-label">{t("vehicle")}</label>
            <Controller
              name="vehicleId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <VehicleDropdown
                  onChange={(newValue) => {
                    setValue("vehicleId", newValue.value);
                    setVehicleIds(newValue.value);
                  }}
                  value={value}
                  branchids={branchIds}
                  companyId={companyId}
                  customStyles={customStyles}
                  isMulti={false}
                  ref={ref}
                  name={name}
                  isDisabled={companyId ? false : true}
                />
              )}
            />
            <Error errorName={errors.vehicleId} />
          </div>
          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              {t("driver")} <span className="text-danger">*</span>
            </label>
            <Controller
              name="driverId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <DriverDropdown
                  onChange={(newValue) => {
                    setValue("driverId", newValue.value);
                  }}
                  value={value}
                  customStyles={customStyles}
                  ref={ref}
                  name={name}
                  isClearable={false}
                  isDisabled={!companyId}
                />
              )}
            />
            <Error errorName={errors.driverId} />
          </div>
          {/* <div className="col-xl-4 mb-3">
            <label className="form-label">{t("tripStatus")}</label>
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
          </div> */}
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
