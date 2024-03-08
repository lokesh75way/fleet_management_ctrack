import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { ChromePicker } from "react-color";
import Select from "react-select";
import Map from "./Map";
import { BiNoEntry } from "react-icons/bi";
import CustomInput from "../components/Input/CustomInput";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { geofenceMapSchema } from "../../yup";
import {
  categoryOptions,
  toleranceOptions,
} from "../components/TabComponent/VehicleTabs/Options";
import { Button } from "react-bootstrap";
import Error from "../components/Error/Error";

const GeofenceDetail = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [tempValue, setTempValue] = useState();
  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  const defaultCenter = {
    lat: -3.745,
    lng: -38.523,
  };

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(defaultCenter);
      map.fitBounds(bounds);
      setMap(map);
    },
    [defaultCenter]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  // const handleColorChange = (color) => {
  //   setFormData((prevData) => ({ ...prevData, color: color.hex }));
  // };
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(geofenceMapSchema),
  });
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setValue("geofenceAccess", e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div >
      <div style={{ padding: "10px", backgroundColor: "#FFFDFD" }}>
        <h2 style={{ fontSize: "20px" }}>Geofence Detail</h2>
      </div>

      <div className="" style={{ display: "flex", height: "88vh" }}>
        <div
          className="col-md-3"
          style={{
            padding: "15px",
            boxShadow: "9px 0 4px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            overflow:"auto"
          }}
        >
          <FormProvider>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <label htmlFor="company" className="form-label">
                  Company:<span className="text-danger">*</span>
                </label>
                <CustomInput
                  type="text"
                  name="company"
                  register={register}
                  label="Company"
                />
                <Error errorName={errors.company} />
              </div>
              <div className="mb-2">
                <label htmlFor="company" className="form-label">
                  Name:<span className="text-danger">*</span>
                </label>
                <CustomInput
                  type="text"
                  label="Name"
                  register={register}
                  name="name"
                />
                <Error errorName={errors.name} />
              </div>

              <div className="mb-3">
                <label className="form-label">Category:<span className="text-danger">*</span></label>
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
                      defaultValue={categoryOptions[0]}
                    />
                  )}
                />
                {!getValues('category') && <Error errorName={errors.category} />}
              </div>
              <div className="mb-3">
                <label className="form-label">Geofence Access:<span className="text-danger">*</span></label>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "5rem" }}
                >
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      value="public"
                      checked={selectedOption === "public"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Public</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      value="private"
                      checked={selectedOption === "private"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Private</label>
                  </div>
                </div>
                { !getValues('geofenceAccess') && <Error errorName={errors.geofenceAccess} />}
              </div>

              <div className="mb-3">
                <label htmlFor="contactNumber" className="form-label">
                  Contact Number:<span className="text-danger">*</span>
                </label>
                <CustomInput
                  type="number"
                  register={register}
                  label="Contact Number"
                  name="contactNumber"
                />
                <Error errorName={errors.contactNumber} />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address:
                </label>
                <textarea
                  className="form-control"
                  {...register}
                  label="Address"
                  name="address"
                />
              </div>

              {/* <div className="mb-3">
            <label htmlFor="color" className="form-label">
              Color:
            </label>
            <ChromePicker
              color={formData.color}
              onChangeComplete={(color) => handleColorChange(color)}
            />
          </div> */}

              <div className="mb-3">
                <label className="form-label">Tolerance:<span className="text-danger">*</span></label>
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
                      defaultValue={toleranceOptions[0]}
                    />
                  )}
                />
                {!getValues('contactNunber') &&<Error errorName={errors.contactNumber} />}
              </div>

              <div className="mb-3">
                <label className="form-label">Description:</label>
                <textarea
                  className="form-control"
                  name="description"
                  {...register}
                  label="Description"
                />
              </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "2rem 0",
                  }}
                >
                  <Button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                  >
                    {" "}
                    Next
                  </Button>
                </div>
            </form>
          </FormProvider>
        </div>

        {/* Right side */}
        <div className="col-md-9" style={{ paddingLeft: "15px" }}>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default GeofenceDetail;
