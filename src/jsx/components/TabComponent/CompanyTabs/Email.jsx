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
import CustomInput from "../../Input/CustomInput";

const Email = ({ setValue, register, handleNext }) => {
  const { formState: errors, control } = useForm();

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">From Email Address :</label>
          <Controller
            name="fromEmailAddress"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="row align-items-center">
                <CustomInput
                  type="text"
                  required
                  register={register}
                  label="From Email Address"
                  name="fromEmailAddress"
                  placeholder=""
                />
              </div>
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Username :</label>
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="row align-items-center">
                <CustomInput
                  type="text"
                  required
                  register={register}
                  label="Username"
                  name="username"
                  placeholder=""
                />
              </div>
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Password :	</label>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="row align-items-center">
                <CustomInput
                  type="password"
                  required
                  register={register}
                  label="Password"
                  name="password"
                  placeholder=""
                />
              </div>
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Host :</label>
          <Controller
            name="host"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="row align-items-center">
                <CustomInput
                  type="text"
                  required
                  register={register}
                  label="Host"
                  name="host"
                  placeholder=""
                />
              </div>
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Outgoing port :	</label>
          <Controller
            name="outgoingPort"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="row align-items-center">
                <CustomInput
                  type="text"
                  required
                  register={register}
                  label="Outgoing port"
                  name="outgoingPort"
                  placeholder=""
                />
              </div>
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">SMTP Authentication :	</label>
          <Controller
            name="SMTPAuthentication"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="SMTPAuthentication"
                    onChange={() => setValue("SMTPAuthentication")}
                  />
                </div>
              </div>
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">TLS Authentication :</label>
          <Controller
            name="TLS Authentication"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="TLSAuthentication"
                    onChange={() => setValue("TLSAuthentication")}
                  />
                </div>
              </div>
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Email Verification :	</label>
          <Controller
            name="emailVerification"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="emailVerification"
                    onChange={() => setValue("emailVerification")}
                  />
                </div>
              </div>
            )}
          />
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Failed Reports Announcement :	</label>
          <Controller
            name="failedReportsAnnouncement"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <div className="basic-form" style={{ marginTop: ".5rem" }}>
                <div className="form-check custom-checkbox form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="failedReportsAnnouncement"
                    onChange={() => setValue("failedReportsAnnouncement")}
                  />
                </div>
              </div>
            )}
          />
        </div>

        <div className="col-4">
                  <button className="btn btn-primary" type="button">
                   Test Configuration
                  </button>
          </div>


      </div>
    </div>
  );
};

export default Email;
