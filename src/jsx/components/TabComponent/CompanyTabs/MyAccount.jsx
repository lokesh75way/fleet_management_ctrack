import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";
import DummyData from '../../../../users.json'
import useStorage from "../../../../hooks/useStorage";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useParams } from "react-router-dom";

const MyAccount = ({ setValue,getValues, register, onSubmit, handleSubmit, errors, control }) => {
  const {checkRole, checkUser} = useStorage()
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [tempValue,setTempValue] = useState();
  const [isCheckCP, setIsCheckCP] = useState(false);

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  const businessUserOptions = DummyData.filter((item) => item.role === "businessgroup").map((item) => ({
    label: item.email,
    value: item.id,
  }));

  const companyOptions = DummyData.filter((item) => item.role === "company").map((item) => ({
    label: item.email,
    value: item.id,
  }));

  const [disabledState, setDisabledState] = useState();

  const role = localStorage.getItem('role');

  
  useEffect(()=>{
    if(role == 'admin') setDisabledState(true);
    else setDisabledState(false);

  },[])

  const { id } = useParams();

    console.log("CompanyForm ID from params:", id);
  
  
    const companyData = JSON.parse(localStorage.getItem('companyData'))
  
    const newData = companyData.filter(data => data.id === id);
  
    const [filteredCompanyData,setFilteredCompanyData] = useState(newData);
  
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Business Group</label>
          {checkRole() ? <CustomInput
            type="text"
            required
            register={register}
            lable="Parent"
            name="parent"
            placeholder=""
            value={checkUser()}
            isDisabled={disabledState}
          />
          :
          <Controller
            name="parent"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {setTempValue(newValue.label); setValue("parent", newValue.label)}}
                options={businessUserOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={businessUserOptions[0]}
              />
            )}
          />}
        </div>

        <div className="col-xl-6 mb-3">
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
        </div>
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
            User Name <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            required
            label="User Name"
            name="userName"
            placeholder=""
            defaultValue={filteredCompanyData[0] ? filteredCompanyData[0].userName : ''}
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
                defaultValue={filteredCompanyData[0].oldPassword}
                
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
            defaultValue={filteredCompanyData[0] ? filteredCompanyData[0].passwordRecoveryEmail : ''}
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
            defaultValue={filteredCompanyData[0] ? filteredCompanyData[0].mobileNumber : ''}
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
            City<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="City"
            name="city"
            placeholder=""
          />
          <Error errorName={errors.city} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Zip Code<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Zip Code"
            name="zipCode"
            placeholder=""
            defaultValue={filteredCompanyData[0] ? filteredCompanyData[0].zipCode : ''}
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
            name="street1"
            placeholder=""
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
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MyAccount;
