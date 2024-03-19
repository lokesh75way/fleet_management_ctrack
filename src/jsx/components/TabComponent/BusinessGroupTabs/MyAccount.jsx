import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";
import DummyData from "../../../../users.json";
import '../../../../scss/pages/_driver-tracking.scss'
const MyAccount = ({
  data,
  setValue,
  getValues,
  register,
  onSubmit,
  handleSubmit,
  errors,
  control,
}) => {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [tempValue, setTempValue] = useState();
  const [isStateDisabled, setIsStateDisabled] = useState(true);


  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };

const user = localStorage.getItem('loginDetails-email')




 
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
          <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Business Group Name <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="User Name"
            name="userName"
            placeholder=""
            defaultValue={getValues("userName")}
          />
          <Error errorName={errors.userName} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Email<span className="text-danger">*</span></label>
          <CustomInput
            type="email"
            register={register}
            name="email"
            label="email"
            placeholder=""
            defaultValue={getValues('email')}
          />
          <Error errorName={errors.email} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Password<span className="text-danger">*</span></label>
          <CustomInput
            type="password"
            register={register}
            name="password"
            label="password"
            placeholder=""
            defaultValue={getValues('password')}
          />
          <Error errorName={errors.password} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Help Desk Email<span className="text-danger">*</span></label>
          <CustomInput
            type="email"
            register={register}
            name="helpDeskEmail"
            label="Help Desk Email"
            placeholder=""
            defaultValue={getValues('helpDeskEmail')}
          />
          <Error errorName={errors.helpDeskEmail} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Help Desk Telephone Number<span className="text-danger">*</span></label>
          <CustomInput
            type="number"
            register={register}
            className="form-control"
            label="Help Desk Telephone Number"
            name="helpDeskTelephoneNumber"
            placeholder=""
            defaultValue={getValues('helpDeskTelephoneNumber')}

          />
          <Error errorName={errors.helpDeskTelephoneNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Mobile Number<span className="text-danger">*</span></label>
          <CustomInput
            type="number"
            register={register}
            name="mobileNumber"
            label="Mobile Number"
            placeholder=""
            defaultValue={getValues('mobileNumber')}

          />
          <Error errorName={errors.mobileNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Whatsapp Contact Number</label>
          <CustomInput
            type="number"
            register={register}
            className="form-control"
            label="Whatsapp Contact Number"
            name="whatsappContactNumber"
            placeholder=""
            defaultValue={getValues('whatsappContactNumber')}

          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Country<span className="text-danger">*</span>
          </label>
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setValue("country", e.name);
              setIsStateDisabled(false)
            }}
            containerClassName="bg-white"
            inputClassName="border border-white customSelectHeight"
            placeHolder="Select Country"
          />
          {!getValues("country") && <Error errorName={errors.country} />}
        </div>
        <div className={`${isStateDisabled ? 'col-xl-6 mb-3 pe-none':'col-xl-6 mb-3'}`}>
          <label className="form-label">
            State
          </label>
          <div style={{ background: "white" }}>
            <StateSelect
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
                setValue("state", e.id);
              }}
              containerClassName="bg-white"
              inputClassName="border border-white customSelectHeight"
              placeHolder="Select State"
            />
          </div>
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            City<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="City"
            name="city"
            placeholder=""
            defaultValue={getValues('city')}

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
            name="zipCode"
            placeholder=""
            defaultValue={getValues('zipCode')}

          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Street1<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street1"
            name="street1"
            placeholder=""
            defaultValue={getValues('street1')}

          />
          <Error errorName={errors.street1} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Street2
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street2"
            name="street2"
            placeholder=""
            defaultValue={getValues('street2')}

          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Contact Person</label>
          <CustomInput
            type="text"
            register={register}
            label="Contact Person"
            name="contactPerson"
            placeholder=""
            defaultValue={getValues("contactPerson")}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Fax Number
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Fax Number"
            name="faxNumber"
            placeholder=""
            defaultValue={getValues("faxNumber")}
          />
        </div>
        <div className="col-xl-6 mb-3" >
          <label className="form-label">Upload File</label>
          <input
            type="file"
            label="Document Name"
            name={`documentFile`}
            className="form-control"
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

export default MyAccount;
