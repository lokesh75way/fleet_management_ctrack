import React, { useEffect, useState } from "react";
import Select from "react-select";
import Map from "./Map";
import CustomInput from "../../components/Input/CustomInput";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { geofenceMapSchema } from "../../utils/yup";
import { categoryOptions, toleranceOptions } from "@/constants/options";
import { Button } from "react-bootstrap";
import Error from "../../components/Error/Error";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  createGeofenceData,
  getGeofenceById,
  updateGeofence,
} from "../../services/api/GeoFenceService";

import { useTranslation } from "react-i18next";
import CompanyDropdown from "../components/CompanyDropdown";

const GeofenceDetail = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [defaultData, setDefaultData] = useState();
  const [tempValue, setTempValue] = useState();
  const [groupId, setGroupId] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [companyId, setCompanyId] = useState();
  const [companyDisabled, setCompanyDisabled] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  const getGeofenceDataById = async () => {
    if (id) {
      const { data } = await getGeofenceById(id);
      setDefaultData(data);
      reset(data);
      setSelectedOption(data.geofenceAccess);
    }
  };

  useEffect(() => {
    if (userDetails.user.role === "COMPANY") {
      setValue("businessGroupId", userDetails?.user.businessGroupId);
      setGroupId(userDetails?.user.businessGroupId);

      setValue("companyId", userDetails?.user.companyId);
      setCompanyId(userDetails?.user.companyId);
      setCompanyDisabled(true);
    }
    if (userDetails.user.role === "BUSINESS_GROUP") {
      setValue("businessGroupId", userDetails?.user.businessGroupId);
      setGroupId(userDetails?.user.businessGroupId);
    }

    if (id) {
      getGeofenceDataById();
    }
  }, [id]);

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    getValues,
    control,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(geofenceMapSchema),
    defaultValues: {
      category: categoryOptions[0].value,
      tolerance: toleranceOptions[0].value,
    },
  });
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setValue("geofenceAccess", e.target.value);
  };

  const onSubmit = async (data) => {
    try {
      if (id) {
        const { success } = await updateGeofence(id, data);
        if (success) {
          notifySuccess("Geofence updated successfully!");
          navigate("/settings/geofence");
        }
        return;
      } else {
        const { success } = await createGeofenceData(data);
        if (success) {
          notifySuccess("New Geofence Created!");
          navigate("/settings/geofence");
        }
        return;
      }
    } catch (error) {
      console.log(error);
      notifyError("Some error occured !!");
      return;
    }
  };

  const Geofence = JSON.parse(localStorage.getItem("geofenceData"));
  const GeoData = Geofence?.filter((item) => item.id == id);
  const [filteredGeoData, setFilteredGeoData] = useState(GeoData);
  const { t } = useTranslation();
  return (
    <div>
      <div style={{ padding: "10px", backgroundColor: "#FFFDFD" }}>
        <h2 style={{ fontSize: "20px" }}>{t("geofenceDetail")}l</h2>
      </div>

      <div className="" style={{ display: "flex", height: "88vh" }}>
        <div
          className="col-md-3"
          style={{
            padding: "15px",
            boxShadow: "9px 0 4px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            overflow: "auto",
          }}
        >
          <FormProvider>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <label htmlFor="company" className="form-label">
                  {t("company")}:<span className="text-danger">*</span>
                </label>
                <Controller
                  name="company"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <CompanyDropdown
                      key={groupId}
                      groupId={groupId}
                      onChange={(newValue) => {
                        setValue("company", newValue.value);
                        setValue("companyName", newValue.value);
                        setCompanyId(newValue.value);
                      }}
                      value={value}
                      customStyles={customStyles}
                      ref={ref}
                      isDisabled={companyDisabled}
                      name={name}
                    />
                  )}
                />
                <Error errorName={errors.company} />
              </div>
              <div className="mb-2">
                <label htmlFor="company" className="form-label">
                  {t("name")}:<span className="text-danger">*</span>
                </label>
                <CustomInput
                  type="text"
                  label="Name"
                  register={register}
                  name="name"
                  // defaultValue={
                  //   filteredGeoData[0] ? filteredGeoData[0].name : ""
                  // }
                />
                <Error errorName={errors.name} />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  {t("category")}:<span className="text-danger">*</span>
                </label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      onChange={(newValue) => {
                        setTempValue(newValue.value);
                        setValue("category", newValue.value);
                      }}
                      options={categoryOptions}
                      ref={ref}
                      name={name}
                      styles={customStyles}
                      value={{ value, label: value }}
                    />
                  )}
                />
                {!getValues("category") && (
                  <Error errorName={errors.category} />
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {t("geofenceAccess")}:<span className="text-danger">*</span>
                </label>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "5rem" }}
                >
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      value="PUBLIC"
                      checked={selectedOption === "PUBLIC"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">{t("public")}</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      value="PRIVATE"
                      checked={selectedOption === "PRIVATE"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">{t("private")}</label>
                  </div>
                </div>
                {!getValues("geofenceAccess") && (
                  <Error errorName={errors.geofenceAccess} />
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="contactNumber" className="form-label">
                  {t("contactNumber")}:<span className="text-danger">*</span>
                </label>
                <CustomInput
                  type="number"
                  register={register}
                  label="Contact Number"
                  name="contactNumber"
                  min="0"
                  onInput={(e) => {
                    const temp = Math.max(0, e.target.value);
                    e.target.value = temp < 1 ? "" : temp;
                  }}
                  // defaultValue={
                  //   filteredGeoData[0] ? filteredGeoData[0].contactNumber : ""
                  // }
                />
                <Error errorName={errors.contactNumber} />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  {t("address")}:
                </label>
                <textarea
                  className="form-control"
                  {...register("address")}
                  label="Address"
                  name="address"
                  // defaultValue={
                  //   filteredGeoData[0] ? filteredGeoData[0].address : ""
                  // }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  {t("tolerance")}:<span className="text-danger">*</span>
                </label>
                <Controller
                  name="tolerance"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      onChange={(newValue) => {
                        setTempValue(newValue.value);
                        setValue("tolerance", newValue.value);
                      }}
                      options={toleranceOptions}
                      ref={ref}
                      name={name}
                      styles={customStyles}
                      value={{ label: value, value: value }}
                    />
                  )}
                />
                {!getValues("tolerance") && (
                  <Error errorName={errors.tolerance} />
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">{t("description")}:</label>
                <textarea
                  className="form-control"
                  {...register("description")}
                  name="description"
                  label="Description"
                  // defaultValue={
                  //   filteredGeoData[0] ? filteredGeoData[0].description : ""
                  // }
                />
              </div>
              {!getValues("location") && <Error errorName={errors.location} />}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "2rem 0",
                }}
              >
                <Button type="submit" onClick={handleSubmit(onSubmit)}>
                  {" "}
                  {t("submit")}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Right side */}
        <div className="col-md-9" style={{ paddingLeft: "15px" }}>
          <Map
            setValue={setValue}
            watch={watch}
            getValues={getValues}
            defaultValues={defaultData}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};

export default GeofenceDetail;
