import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";

const CompanyAccount = ({ setValue,getValues, register, onSubmit, handleSubmit, errors }) => {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [isCheckCP, setIsCheckCP] = useState(false);
  const [isCheckESP, setIsCheckEsP] = useState(false);

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Country<span className="text-danger">*</span></label>
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setValue("country", e.id);
            }}
            containerClassName="bg-white"
            inputClassName="border border-white"
            placeHolder="Select Country"
          />
         { !getValues('country') && <Error errorName={errors.country} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">State<span className="text-danger">*</span></label>
          <div style={{ background: "white" }}>
            <StateSelect
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
                setValue("state", e.id);
              }}
              containerClassName="bg-white"
              inputClassName="border border-white"
              placeHolder="Select State"
            />
          </div>
          {!getValues('state') && <Error errorName={errors.state} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Short Name <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            required
            register={register}
            lable="Short Name"
            name="shortName"
            placeholder=""
          />
           <Error errorName={errors.shortName} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            User Name <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            required
            label="User Name"
            name="userName"
            placeholder=""
          />
          <Error errorName={errors.userName} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Change Password</label>
          <div className="form-check custom-checkbox mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="customCheckBox1"
              onClick={() => setIsCheckCP(!isCheckCP)}
            />
          </div>
        </div>
        {isCheckCP && (
          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Old Password<span className="text-danger">*</span>
              </label>
              <CustomInput
                type="password"
                register={register}
                name="oldPassword"
                label="Old Password"
                placeholder=""
              />
              <Error errorName={errors.oldPassword} />
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                New Password<span className="text-danger">*</span>
              </label>
              <CustomInput
                type="password"
                register={register}
                label="New Password"
                name="newPassword"
                placeholder=""
              />
              <Error errorName={errors.newPassword} />
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Retype Password<span className="text-danger">*</span>
              </label>
              <CustomInput
                type="password"
                register={register}
                label="Retype Passwor"
                name="retypePassword"
                placeholder=""
              />
              <Error errorName={errors.retypePassword} />
            </div>
          </>
        )}
        
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Password Recovery Email</label>
          <CustomInput
            type="email"
            register={register}
            label="Password Recovery Email"
            name="passwordRecoveryEmail"
            placeholder=""
          />
          <Error errorName={errors.passwordRecoveryEmail} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Help Desk Email</label>
          <CustomInput
            type="email"
            register={register}
            name="helpDeskEmail"
            label="Help Desk Email"
            placeholder=""
          />
          <Error errorName={errors.helpDeskEmail} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Help Desk Telephone Number</label>
          <CustomInput
            type="number"
            register={register}
            className="form-control"
            label="Help Desk Telephone Number"
            name="helpDeskTelephoneNumber"
            placeholder=""
          />
          <Error errorName={errors.helpDeskTelephoneNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Mobile Number</label>
          <CustomInput
            type="number"
            register={register}
            name="mobileNumber"
            label="Mobile Number"
            placeholder=""
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
          />
          <Error errorName={errors.whatsappContactNumber} />
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
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Contact Person</label>
          <input
            type="text"
            {...register("contactPerson")}
            className="form-control"
            name="contactPerson"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Fax Number
          </label>
          <input
            type="number"
            {...register("faxNumber")}
            className="form-control"
            name="faxNumber"
            placeholder=""
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
        <Button type="submit" onClick={handleSubmit(onSubmit)}  style={{ width: "10%" }}>
          {" "}
          Next
        </Button>
      </div>
    </div>
  );
};

export default CompanyAccount;