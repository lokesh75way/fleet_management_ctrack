import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";
import DummyData from "../../../../users.json";
import { useParams } from "react-router-dom";
import { getSelectValues } from "../../../../utils/selectValues";

const MyAccount = ({
  setValue,
  getValues,
  register,
  onSubmit,
  handleSubmit,
  errors,
  control,
}) => {
  // const {checkRole, checkUserName} = useStorage()
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [tempValue, setTempValue] = useState();

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };

  const [businessUserOptions, setBusinessUserOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [parentOptions, setParentOptions] = useState([]);

  const [businessUserValue, setBusinessUserValue] = useState([]);
  const [companyValue, setCompanyValue] = useState([]);
  const [parentValue, setParentValue] = useState();

  useEffect(() => {
    const tempbusinessUserOptions = DummyData.filter(
      (item) => item.role === "businessgroup"
    ).map((item) => ({
      label: item.userName,
      value: item.id,
    }));

    const tempcompanyOptions = DummyData.filter(
      (item) => item.role === "company"
    )
      .filter((cp) => cp.parent === businessUserValue)
      .map((item) => ({
        label: item.userName,
        value: item.id,
      }));

    const tempparentOptions = DummyData.filter((item) => item.role === "branch")
      .filter((br) => br.parentCompany === companyValue)
      .map((item) => ({
        label: item.userName,
        value: item.id,
      }));

    tempparentOptions.push({ label: "None", value: 0 });

    setBusinessUserOptions(tempbusinessUserOptions);
    setCompanyOptions(tempcompanyOptions);
    setParentOptions(tempparentOptions);
  }, [businessUserValue, companyValue, parentValue]);

  const { id } = useParams();
  const User = JSON.parse(localStorage.getItem("userJsonData"));
  const branchData = User.filter(
    (item) => item.role === "branch" && item.id == id
  );
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

  const defaultValues = getSelectValues();
  // console.log(defaultValues)

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Business User</label>
          {/* {
             checkRole() === "admin" ? 
          } */}
          {id ? (
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
                  name={name}
                  styles={customStyles}
                  defaultValue={{
                    label: filteredCompanyData[0]
                      ? filteredCompanyData[0].parentBusinessGroup
                      : "",
                    value: filteredCompanyData[0]
                      ? filteredCompanyData[0].id
                      : "",
                  }}
                />
              )}
            />
          ) : (
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
                  defaultValue={{
                    label: defaultValues.business.defaultValues,
                    value: defaultValues.business.defaultValues,
                  }}
                />
              )}
            />
          )}
        </div>

        <div className="col-xl-6 mb-3">
          <label className="form-label">
            Company<span className="text-danger">*</span>
          </label>
          {id ? (
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
                  options={companyOptions}
                  ref={ref}
                  name={name}
                  styles={customStyles}
                  defaultValue={{
                    label: filteredCompanyData[0]
                      ? filteredCompanyData[0].parentCompany
                      : "",
                    value: filteredCompanyData[0]
                      ? filteredCompanyData[0].id
                      : "",
                  }}
                />
              )}
            />
          ) : (
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
                  defaultValue={{
                    label: defaultValues.company.defaultValues ,
                    value: defaultValues.company.defaultValues ,
                  }}
                />
              )}
            />
          )}

          {!getValues("company") && <Error errorName={errors.company} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">Parent Branch</label>
          <Controller
            name="parent"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setParentValue(newValue.value);
                  setValue("parentBranch", newValue.value);
                }}
                options={parentOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={{
                  label: filteredCompanyData[0]
                    ? filteredCompanyData[0].parentBranch
                    : "",
                  value: filteredCompanyData[0]
                    ? filteredCompanyData[0].id
                    : "",
                }}
              />
            )}
          />
          {!getValues("parent") && <Error errorName={errors.parent} />}
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
            // defaultValue={{ id: 1, name: filteredCompanyData[0] ? filteredCompanyData[0].country : "" }}
          />
          {!getValues("country") && <Error errorName={errors.country} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            State<span className="text-danger">*</span>
          </label>
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
              // defaultValue={{ id: 1, name: filteredCompanyData[0] ? filteredCompanyData[0].state : "" }}
            />
          </div>
          {!getValues("state") && <Error errorName={errors.state} />}
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Branch Name <span className="text-danger">*</span>
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
            defaultValue={
              filteredCompanyData[0] ? filteredCompanyData[0].city : ""
            }
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
            defaultValue={
              filteredCompanyData[0] ? filteredCompanyData[0].zipCode : ""
            }
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
            defaultValue={
              filteredCompanyData[0] ? filteredCompanyData[0].street1 : ""
            }
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
