import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import Select from "react-select";
import Error from "../../Error/Error";
import { adminOptions, resellerOptions } from "../VehicleTabs/Options";

const Address = ({ handleNext, register, setValue }) => {
  const { control, getValues, formState: errors } = useForm();

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setValue("fuelSensor", e.target.value);
  };
  const handleChange2 = (e) => {
    setSelectedOption2(e.target.value);
    setValue("verificationVia", e.target.value);
  };
  const handleChange3 = (e) => {
    setSelectedOption3(e.target.value);
    setValue("verificationVia", e.target.value);
  };
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Street1
          </label>
          <input
            type="text"
            {...register("street1")}
            className="form-control"
            name="street1"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Street2
          </label>
          <input
            type="text"
            {...register("street2")}
            className="form-control"
            name="street2"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            City
          </label>
          <input
            type="text"
            {...register("city")}
            className="form-control"
            name="city"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Zip Code
          </label>
          <input
            type="number"
            {...register("zipCode")}
            className="form-control"
            name="zipCode"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Country</label>
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setValue("country", e.id);
            }}
            containerClassName="bg-white"
            inputClassName="border border-white"
            placeHolder="Select Country"
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Mediclaim Number</label>
          <input
            type="text"
            {...register("mediclaimNumber")}
            className="form-control"
            name="mediclaimNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Mediclaim Expiry Date</label>
          <Controller
            name="mediclaimExpiryDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("mediclaimExpiryDate") || new Date()}
                className="form-control"
                onChange={(newValue) =>
                  setValue("mediclaimExpiryDate", newValue)
                }
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
        <Button onClick={handleNext} style={{ width: "10%" }}>
          {" "}
          Next
        </Button>
      </div>
    </div>
  );
};

export default Address;