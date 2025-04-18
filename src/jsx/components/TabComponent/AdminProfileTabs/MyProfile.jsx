import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Error from "../../../../components/Error/Error";
import CustomInput from "../../../../components/Input/CustomInput";
import DummyData from "../../../../users.json";
import useStorage from "../../../../hooks/useStorage";

const MyProfile = ({
  data,
  setValue,
  getValues,
  register,
  onSubmit,
  handleSubmit,
  errors,
  control,
  isEdit,
  setIsEdit,
}) => {
  const { checkRole, checkUser } = useStorage();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [tempValue, setTempValue] = useState();
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  const businessUserOptions = DummyData.filter(
    (item) => item.role === "businessgroup"
  ).map((item) => ({
    label: item.email,
    value: item.id,
  }));

  const companyOptions = DummyData.filter(
    (item) => item.role === "company"
  ).map((item) => ({
    label: item.email,
    value: item.id,
  }));

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            User Name<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            required
            label="User Name"
            name="userName"
            // disabled={!isEdit}
            defaultValue={data?.userName || " "}
          />
          <Error errorName={errors.userName} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Country<span className="text-danger">*</span>
          </label>
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setValue("country", e.id);
            }}
            containerClassName="bg-white"
            inputClassName="border border-white"
            placeHolder="Select Country"
          />
          {!getValues("country") && <Error errorName={errors.country} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            State<span className="text-danger">*</span>
          </label>
          <div style={{ background: "white" }}>
            <StateSelect
              autocomplate="off"
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
                setValue("state", e.id);
              }}
              // defaultValue={{  name: data.state }}
              containerClassName="bg-white"
              inputClassName="border border-white"
              placeHolder="Select State"
            />
          </div>
          {!getValues("state") && <Error errorName={errors.state} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Email<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            defaultValue={data?.email || " "}
            label="Email"
            name="email"
            // disabled={!isEdit}
          />
          <Error errorName={errors.email} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Help Desk Email<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            name="helpDeskEmail"
            label="Help Desk Email"
            defaultValue={data?.helpDeskEmail || " "}
            // disabled={!isEdit}
          />
          <Error errorName={errors.helpDeskEmail} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Help Desk Telephone Number<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            defaultValue={data?.helpDeskTelephoneNumber || " "}
            className="form-control"
            label="Help Desk Telephone Number"
            name="helpDeskTelephoneNumber"
            // disabled={!isEdit}
          />
          <Error errorName={errors.helpDeskTelephoneNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Mobile Number<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            name="mobileNumber"
            defaultValue={data?.mobileNumber || " "}
            label="Mobile Number"
            // disabled={!isEdit}
          />
          {!getValues("mobileNumber") && (
            <Error errorName={errors.mobileNumber} />
          )}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Whatsapp Contact Number</label>
          <CustomInput
            type="number"
            register={register}
            className="form-control"
            label="Whatsapp Contact Number"
            defaultValue={data?.whatsappContactNumber || " "}
            name="whatsappContactNumber"
            // disabled={!isEdit}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            City<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            defaultValue={data?.city}
            register={register}
            label="City"
            name="city"
            // disabled={!isEdit}
          />
          <Error errorName={errors.city} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Zip Code
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Zip Code"
            defaultValue={data?.zipCode || " "}
            name="zipCode"
            // disabled={!isEdit}
          />
          <Error errorName={errors.zipCode} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Street1<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street1"
            defaultValue={data?.street1 || " "}
            name="street1"
            // disabled={!isEdit}
          />
          <Error errorName={errors.street1} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Street2
          </label>
          <CustomInput
            type="text"
            defaultValue={data?.street2 || " "}
            register={register}
            label="Street2"
            name="street2"
            // disabled={!isEdit}
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
        <Button
          type="submit"
          disabled={!isEdit}
          onClick={handleSubmit(onSubmit)}
          style={{ width: "10%" }}
        >
          {" "}
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MyProfile;
