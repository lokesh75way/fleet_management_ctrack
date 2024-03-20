import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";
import DummyData from "../../../../users.json";
import useStorage from "../../../../hooks/useStorage";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyAccount = ({
  setValue,
  getValues,
  register,
  onSubmit,
  handleSubmit,
  errors,
  control,
}) => {
  const [selectStateName, setSelectStateName] = useState({
    name: "Select State",
  });
  const { t } = useTranslation();
  const { checkRole, checkUserName } = useStorage();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [tempValue, setTempValue] = useState();
  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const role = localStorage.getItem("role");

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  const businessUserOptions = DummyData.filter(
    (item) => item.role === "businessgroup"
  ).map((item) => ({
    label: item.userName,
    value: item.id,
  }));

  const companyOptions = DummyData.filter(
    (item) => item.role === "company"
  ).map((item) => ({
    label: item.userName,
    value: item.id,
  }));

  useEffect(() => {
    if (role === "businessgroup") {
      setTempValue(localStorage.getItem("loginDetails-name"));
      setValue("parent", localStorage.getItem("loginDetails-name"));
    }
  }, []);

  const { id } = useParams();
  const companyData = JSON.parse(localStorage.getItem("userJsonData"));

  const newData = companyData.filter((data) => data.id.toString() === id);

  const [filteredCompanyData, setFilteredCompanyData] = useState(newData);

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            {t("businessGroup")}
            <span className="text-danger">*</span>
          </label>
          {checkRole() === "admin" ? (
            <Controller
              name="parent"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  onChange={(newValue) => {
                    setTempValue(newValue.label);
                    setValue("parent", newValue.label);
                  }}
                  options={businessUserOptions}
                  ref={ref}
                  name={name}
                  styles={customStyles}
                />
              )}
            />
          ) : (
            <Controller
              name="parent"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  onChange={(newValue) => {
                    setTempValue(newValue.label);
                    setValue("parent", newValue.label);
                  }}
                  options={[{ value: checkUserName(), label: checkUserName() }]}
                  ref={ref}
                  isDisabled={localStorage.getItem("role") !== "Admin"}
                  name={name}
                  styles={customStyles}
                  defaultValue={[
                    { value: checkUserName(), label: checkUserName() },
                  ]}
                />
              )}
            />
          )}
          {!getValues("parent") && <Error errorName={errors.parent} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("companyName")} <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            required
            label="User Name"
            name="userName"
            placeholder=""
            defaultValue={
              filteredCompanyData[0] ? filteredCompanyData[0].userName : ""
            }
          />
          <Error errorName={errors.userName} />
        </div>
        {/* <div className="col-xl-6 mb-3">
          <label className="form-label">Company<span className="text-danger">*</span></label>
          <CustomInput
            type="text"
            register={register}
            required
            label="Company"
            name="company"
            placeholder=""
            defaultValue={filteredCompanyData[0] ? filteredCompanyData[0].company : ''}
          />
           <Error errorName={errors.company} />
        </div> */}

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("email")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            label="Email"
            name="email"
            placeholder=""
            defaultValue={
              filteredCompanyData[0] ? filteredCompanyData[0].email : ""
            }
          />
          <Error errorName={errors.email} />
        </div>
        {!id && (
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">
              {t("password")}
              <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="password"
              register={register}
              name="password"
              label="password"
              placeholder=""
              defaultValue={getValues("password")}
            />
            <Error errorName={errors.password} />
          </div>
        )}
       
        <div className="col-xl-6 mb-3 ">
        <label className="form-label">
            {t("helpDeskEmail")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            name="helpDeskEmail"
            label="Help Desk Email"
            placeholder=""
            defaultValue={
              filteredCompanyData[0] ? filteredCompanyData[0].helpDeskEmail : ""
            }
          />
          <Error errorName={errors.helpDeskEmail} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("helpDeskTelephoneNumber")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            className="form-control"
            label="Help Desk Telephone Number"
            name="helpDeskTelephoneNumber"
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            defaultValue={
              filteredCompanyData[0]
                ? filteredCompanyData[0].helpDeskTelephoneNumber
                : ""
            }
            placeholder=""
          />
          <Error errorName={errors.helpDeskTelephoneNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            {t("mobileNumber")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            name="mobileNumber"
            label="Mobile Number"
            placeholder=""
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            defaultValue={
              filteredCompanyData[0] ? filteredCompanyData[0].mobileNumber : ""
            }
          />
          <Error errorName={errors.mobileNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("whatsappContactNumber")}</label>
          <CustomInput
            type="number"
            register={register}
            className="form-control"
            label="Whatsapp Contact Number"
            name="whatsappContactNumber"
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            placeholder=""
            defaultValue={
              filteredCompanyData[0]
                ? filteredCompanyData[0].whatsappContactNumber
                : ""
            }
          />
          <Error errorName={errors.whatsappContactNumber} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            {t("country")}
            <span className="text-danger">*</span>
          </label>
          <CountrySelect
            onChange={(e) => {
              console.log(e);
              setSelectStateName({ name: "Select State" });
              setCountryid(e.id);
              setValue("country", e.name);
              setIsStateDisabled(false);
            }}
            containerClassName="bg-white"
            inputClassName="border border-white"
            placeHolder="Select Country"
          />
          {!getValues("country") && <Error errorName={errors.country} />}
        </div>
        <div
          className={`${
            isStateDisabled ? "col-xl-6 mb-3 pe-none" : "col-xl-6 mb-3"
          }`}
        >
          <label className="form-label">{t("state")}</label>
          <div style={{ background: "white" }}>
            <StateSelect
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
                setValue("state", e.name);
              }}
              containerClassName="bg-white"
              inputClassName="border border-white"
              placeHolder="Select State"
              defaultValue={selectStateName}
            />
          </div>
          {!getValues("state") && <Error errorName={errors.state} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("city")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="City"
            name="city"
            placeholder=""
            defaultValue={
              filteredCompanyData[0] ? filteredCompanyData[0].city : ""
            }
          />
          <Error errorName={errors.city} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            {t("zipCode")}
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Zip Code"
            name="zipCode"
            placeholder=""
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            defaultValue={
              filteredCompanyData[0] ? filteredCompanyData[0].zipCode : ""
            }
          />
          <Error errorName={errors.zipCode} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("street1")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street1"
            name="street1"
            placeholder=""
            defaultValue={
              filteredCompanyData[0] ? filteredCompanyData[0].street1 : ""
            }
          />
          <Error errorName={errors.street1} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("street2")}
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street2"
            name="street2"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("contactPerson")}</label>
          <CustomInput
            type="text"
            register={register}
            label="Contact Person"
            name="contactPerson"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            {t("faxNumber")}
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Fax Number"
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
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          style={{ width: "10%" }}
        >
          {" "}
          {t("submit")}
        </Button>
      </div>
    </div>
  );
};

export default MyAccount;
