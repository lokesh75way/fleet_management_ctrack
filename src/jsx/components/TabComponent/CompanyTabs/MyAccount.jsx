import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  branchOptions,
  employeeDesignationOptions,
  tagViaOptions,
  defaultObjectNumberOptions,
} from "../VehicleTabs/Options";
import DummyData from '../../../../users.json'
const MyAccount = ({ setValue, register, handleNext }) => {
  const { formState: errors, control } = useForm();
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

  const businessUserOptions = DummyData.filter((item) => item.role === "business group").map((item) => ({
    label: item.email,
    value: item.id,
  }));

  const companyOptions = DummyData.filter((item) => item.role === "company").map((item) => ({
    label: item.email,
    value: item.id,
  }));
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Business User</label>
          <Select
            options={businessUserOptions}
            containerClassName="bg-white"
            inputClassName="border border-white"
            placeHolder="Select Country"
          />
        </div>

        <div className="col-xl-6 mb-3">
          <label className="form-label">Company</label>
          <Select
          options={companyOptions}
            containerClassName="bg-white"
            inputClassName="border border-white"
            placeHolder="Company"
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
        <div className="col-xl-6 mb-3">
          <label className="form-label">State</label>
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
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Short Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("shortName", {
              required: "Short Number is required",
            })}
            className="form-control"
            name="shortName"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            User Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("userName", {
              required: "User Number is required",
            })}
            className="form-control"
            name="userName"
            placeholder=""
          />
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
              <input
                type="password"
                {...register("oldPassword")}
                className="form-control"
                name="oldPassword"
                placeholder=""
              />
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                New Password<span className="text-danger">*</span>
              </label>
              <input
                type="password"
                {...register("newPassword")}
                className="form-control"
                name="newPassword"
                placeholder=""
              />
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Retype Password<span className="text-danger">*</span>
              </label>
              <input
                type="password"
                {...register("retypePassword")}
                className="form-control"
                name="retypePassword"
                placeholder=""
              />
            </div>
          </>
        )}
        <div className="col-xl-6 mb-3">
          <label className="form-label">Enable Security Pin</label>
          <div className="form-check custom-checkbox mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="customCheckBox1"
              onClick={() => setIsCheckEsP(!isCheckESP)}
            />
          </div>
        </div>
        {isCheckESP && (
          <>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Security Pin
              </label>
              <input
                type="number"
                {...register("securityPin")}
                className="form-control"
                name="securityPin"
                placeholder=""
              />
            </div>
            <div className="col-xl-6 mb-3 ">
              <label className="form-label">
                Retype Security Pin
              </label>
              <input
                type="number"
                {...register("retypeSecurityPin")}
                className="form-control"
                name="retypeSecurityPin"
                placeholder=""
              />
            </div>
          </>
        )}
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Password Recovery Email</label>
          <input
            type="email"
            {...register("passwordRecoveryEmail")}
            className="form-control"
            name="passwordRecoveryEmail"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Help Desk Email</label>
          <input
            type="email"
            {...register("helpDeskEmail")}
            className="form-control"
            name="helpDeskEmail"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Help Desk Telephone Number</label>
          <input
            type="number"
            {...register("helpDeskTelephoneNumber")}
            className="form-control"
            name="helpDeskTelephoneNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Mobile Number</label>
          <input
            type="number"
            {...register("mobileNumber")}
            className="form-control"
            name="mobileNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Whatsapp Contact Number</label>
          <input
            type="number"
            {...register("whatsappContactNumber")}
            className="form-control"
            name="whatsappContactNumber"
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
        <Button onClick={handleNext} style={{ width: "10%" }}>
          {" "}
          Next
        </Button>
      </div>
    </div>
  );
};

export default MyAccount;
