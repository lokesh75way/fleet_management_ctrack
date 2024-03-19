import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import { useParams } from "react-router-dom";
import { featureTemplateOptions } from "../VehicleTabs/Options";
import CustomInput from "../../Input/CustomInput";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import useStorage from "../../../../hooks/useStorage";
import "../../../../scss/pages/_driver-tracking.scss";
import DummyData from "../../../../users.json";
import { getSelectValues } from "../../../../utils/selectValues";

const Account = ({
  handleNext,
  register,
  setValue,
  onSubmit,
  handleSubmit,
  getValues,
  errors,
  control,
}) => {
  const { checkUser } = useStorage();
  const [tempValue, setTempValue] = useState();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [isStateDisabled, setIsStateDisabled] = useState(true);

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: "0.25rem 0 ", // Adjust the height as needed
    }),

    
  };


  const defaultCompanyOptions = DummyData.filter(
    (item) => item.role === "company"
  ).map((item) => ({
    label: item.userName,
    value: item.id,
  }));

  console.log('ye he default company data', defaultCompanyOptions);

  const { id } = useParams();
  const User = JSON.parse(localStorage.getItem("userJsonData"));
  const role = localStorage.getItem("role");
  const loggedinemail = localStorage.getItem("loginDetails-name");

  
  
  let parentbgname;
  if(role === 'company') {
    const parentbgnamefilter = User.filter(user => user.parentCompany === loggedinemail);
    parentbgname = parentbgnamefilter[0].parentBusinessGroup;
  }
  
  const branchData = User.filter(
    (item) => item.role === "branch" && item.id == id
  );

  const userData = JSON.parse(localStorage.getItem("userJsonData"));

  const newData = userData.filter((data) => data.id === parseInt(id, 10));

  const defaultValues = getSelectValues();

  const [filteredUserData, setFilteredUserData] = useState(newData);
  const [businessUserOptions, setBusinessUserOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [parentOptions, setParentOptions] = useState([]);
  const [vehiclesOptions, setVehiclesOptions] = useState([]);
  const [businessUserValue, setBusinessUserValue] = useState();
  const [companyValue, setCompanyValue] = useState([]);
  const [parentValue, setParentValue] = useState();

  useEffect(() => {
    const tempbusinessUserOptions = DummyData.filter(
      (item) => item.role === "businessgroup"
    ).map((item) => ({
      label: item.userName,
      value: item.id,
    }));

    let tempcompanyOptions;
    if(role === "businessgroup"){

      tempcompanyOptions = DummyData.filter(
        (item) => item.role === "company"
      )
        .filter((cp) => cp.parent === loggedinemail)
        .map((item) => ({
          label: item.userName,
          value: item.id,
        }));
        
      }else{
        
        tempcompanyOptions = DummyData.filter(
          (item) => item.role === "company"
        )
          .filter((cp) => cp.parent === businessUserValue)
          .map((item) => ({
            label: item.userName,
            value: item.id,
          }));
        
    }


    let tempparentOptions;

    if(role === 'company') {
      tempparentOptions = DummyData.filter((item) => item.role === "branch")
        .filter((br) => br.parentCompany === loggedinemail)
        .map((item) => ({
          label: item.userName,
          value: item.id,
        }));
      }else{
        tempparentOptions = DummyData.filter((item) => item.role === "branch")
          .filter((br) => br.parentCompany === companyValue)
          .map((item) => ({
            label: item.userName,
            value: item.id,
          }));
    }

    let tempvehicleOptions;
    if(role === 'company') {
      tempvehicleOptions = DummyData.filter(item => item.vehicleName && item.company === loggedinemail ).map((item) => ({
        label: item.vehicleName,
        value: item.id,
      }));
      
    }else{
      tempvehicleOptions = DummyData.filter(item => item.vehicleName && item.company === companyValue ).map((item) => ({
        label: item.vehicleName,
        value: item.id,
      }));
      

    }



    tempcompanyOptions.push({ label: "None", value: 0 });

    setBusinessUserOptions(tempbusinessUserOptions);

    console.log('ye he value ',businessUserValue);
    if(businessUserValue) {
      setCompanyOptions(tempcompanyOptions);
    }
    else{

      setCompanyOptions([...defaultCompanyOptions,{ label: "None", value: 0 }]);
    }
    setVehiclesOptions(tempvehicleOptions);


    setParentOptions(tempparentOptions);
  }, [businessUserValue, companyValue, parentValue]);

  const [filteredCompanyData, setFilteredCompanyData] = useState(branchData);

  useEffect(() => {
    setValue(
      "parentBusinessGroup",
      filteredCompanyData[0] ? filteredCompanyData[0].parentBusinessGroup : ""
    );
    setValue(
      "parentCompany",
      filteredCompanyData[0] ? filteredCompanyData[0].parentCompany : ""
    );
    setValue(
      "parentBranch",
      filteredCompanyData[0] ? filteredCompanyData[0].parentBranch : ""
    );
    setValue(
      "country",
      filteredCompanyData[0] ? filteredCompanyData[0].country : ""
    );
    setValue(
      "state",
      filteredCompanyData[0] ? filteredCompanyData[0].state : ""
    );
  }, []);


  

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Business Group</label>
          <Controller
            name="businessUser"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setBusinessUserValue(newValue.label);
                  setValue("parentBusinessGroup", newValue.label);
                }}
                options={businessUserOptions}
                ref={ref}
                isDisabled={defaultValues.business.disabled}
                name={name}
                styles={customStyles}
                defaultValue={role === 'company' && {
                  label: parentbgname,
                  value: parentbgname,
                } 
              }
                
              />
            )}
          />
        </div>


        


        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Company
          </label>

          <Controller
            name="parentCompany"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setCompanyValue(newValue.label);
                  setValue("parentCompany", newValue.label);
                }}
                isDisabled={defaultValues.company.disabled}
                options={companyOptions}
                ref={ref}
                name={name}
                styles={customStyles}

                defaultValue={role === 'company' && {
                  label: loggedinemail,
                  value: loggedinemail,
                } }

                
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Branch</label>
          <Controller
            name="Branch"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setValue("Branch", newValue);
                }}
                options={parentOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                isMulti={true}
                defaultValue={
                  filteredUserData[0] ? filteredUserData[0].Branch : ""
                }
              />
            )}
          />
          {!getValues("Branch") && <Error errorName={errors.parent} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Vehicle</label>
          <Controller
            name="accessibleVehicles"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setValue("vehicle", newValue);
                }}
                options={vehiclesOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                isMulti={true}
                defaultValue={
                  filteredUserData[0] ? filteredUserData[0].vehicle : ""
                }
              />
            )}
          />
          {!getValues("vehicle") && <Error errorName={errors.parent} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="email"
            register={register}
            label="Email"
            className="form-control"
            name="email"
            defaultValue={filteredUserData[0] ? filteredUserData[0].email : ""}
            placeholder=""
          />
          <Error errorName={errors.email} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            User Name <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="User Name"
            name="userName"
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].userName : ""
            }
          />
          <Error errorName={errors.userName} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Mobile Number <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Mobile Number"
            name="mobileNumber"
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].mobileNumber : ""
            }
          />
          <Error errorName={errors.mobileNumber} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Country<span className="text-danger">*</span>
          </label>
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setValue("country", e.name);
              setIsStateDisabled(false);
            }}
            containerClassName="bg-white"
            inputClassName="border border-white customSelectHeight"
            placeHolder="Select Country"
          />
          {!getValues("country") && <Error errorName={errors.country} />}
        </div>
        <div
          className={`${
            isStateDisabled ? "col-xl-6 mb-3 pe-none" : "col-xl-6 mb-3"
          }`}
        >
          <label className="form-label">
            State<span className="text-danger">*</span>
          </label>
          <div style={{ background: "white" }}>
            <StateSelect
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
                setValue("state", e.name);
              }}
              containerClassName="bg-white"
              inputClassName="border border-white customSelectHeight"
              placeHolder="Select State"
            />
          </div>
          {!getValues("state") && <Error errorName={errors.state} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Password <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="password"
            register={register}
            label="Password"
            name="password"
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].password : ""
            }
          />
          <Error errorName={errors.password} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Confirm Password <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="password"
            register={register}
            label="Confirm Password"
            name="confirmPassword"
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].confirmPassword : ""
            }
          />
          <Error errorName={errors.confirmPassword} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Feature Template <span className="text-danger">*</span>
          </label>
          <Controller
            name="featureTemplate"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setTempValue(newValue.label);
                  setValue("featureTemplate", newValue.label);
                }}
                options={featureTemplateOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={featureTemplateOptions[0]}
              />
            )}
          />
          {!getValues("featureTemplate") && (
            <Error errorName={errors.featureTemplate} />
          )}
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

export default Account;
