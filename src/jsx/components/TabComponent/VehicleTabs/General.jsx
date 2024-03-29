import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Error from "../../Error/Error";
import {
  deviceTypeOptions,
  copyFromOptions,
  distanceCounterOptions,
  unitOfDistanceOptions,
  speedDetectionOptions,
  businessGroupOptions,
} from "./Options";
import AsyncSelect from "react-select/async";
import CustomInput from "../../Input/CustomInput";
import DummyData from "../../../../users.json";
import useStorage from "../../../../hooks/useStorage";
import { useParams } from "react-router-dom";
import { getCompany } from "../../../../services/api/CompanyServices";
import { getGroups } from "../../../../services/api/BusinessGroup";

const General = ({
  register,
  setValue,
  getValues,
  errors,
  control,
  handleSubmit,
  onSubmit,
}) => {
  const { checkRole, checkUserName } = useStorage();
  const [tempValue, setTempValue] = useState();
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const { id } = useParams();
  const loggedInUser = localStorage.getItem("loginDetails-name");
  const userData = JSON.parse(localStorage.getItem("userJsonData"));
  const [allCompany, setAllCompany] = useState([]);
  const [allBusinessGroup, setAllBusinessGroup] = useState([]);
  const newData = userData.filter((data) => data.id == parseInt(id, 10));
  const [filteredUserData, setFilteredUserData] = useState(newData);
  const role = checkRole()

  // useEffect(()=>{
  //   getCompanyData()
  //   getBusinessData()
  // },[])
  // let businessGroupOptions;
  // const getCompanyData = async()=>{
  //   const {data} = await getGroups()
  //   businessGroupOptions = data.map((item)=>{
  //     return 
  //   })
  //   setAllCompany(allCompany)
  // }
  const businessGroupOptions = async (inputValue) => {
    try {
      const businessGroupResponse = await getGroups();
      const businessGroupData = businessGroupResponse.data;
      console.log("businessGroupData",businessGroupData)
      const response = businessGroupData.map((item) => ({
        label: item?.businessGroupId?.groupName,
        value: item?.businessGroupId?._id,
      }))
      console.log("response",response)
      return response;
    } catch (error) {
      console.error("Error fetching business group options:", error);
      return []; // Return empty array in case of an error
    }
  };
  const allCompanyOptions = async (inputValue) => {
    try {
      const companyResponse = await getCompany();
      const companyData = companyResponse.data.data.data;
      const response = companyData.map((item) => ({
        label: item?.companyId?.companyName,
        value: item?.companyId?._id,
      }));
      return response
    } catch (error) {
      console.error("Error fetching company options:", error);
      return []; // Return empty array in case of an error
    }
  };
  useEffect(()=>{
    businessGroupOptions()
    allCompanyOptions()
  },[])

  let companyOptions,branchOptions;
  if(role === 'admin'){
    companyOptions = DummyData.filter((item)=> item.role === 'company').map((item) => ({
      label: item.userName,
      value: item.id,
    }));
    branchOptions = DummyData.filter(
      (item) => item.role === 'branch'
    ).map((item) => ({
      label: item.userName,
      value: item.id,
    }));
  }
  else if(role === 'businessgroup'){
    companyOptions = DummyData.filter((item)=> item.role === 'company' && item.parent === checkUserName()).map((item) => ({
      label: item.userName,
      value: item.id,
    }));
    branchOptions = DummyData.filter(
      (item) => item.parentBusinessGroup === checkUserName() && item.role === 'branch'
    ).map((item) => ({
      label: item.userName,
      value: item.id,
    }));
  }
  else if(role === 'company'){
    branchOptions = DummyData.filter(
      (item) => item.parentCompany === checkUserName() && item.role === 'branch'
    ).map((item) => ({
      label: item.userName,
      value: item.id,
    }));
    companyOptions = DummyData.filter(
      (item) => item.userName === checkUserName()
    )
  }

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Business Group <span className="text-danger">*</span>
          </label>
          <Controller
            name="business"
            control={control}
            rules={{ required: true }}
            disabled={true}
            render={({ field: { onChange, value, name, ref } }) => (
              <AsyncSelect
                cacheOptions
                defaultOptions
                onChange={(newValue) => {
                  setTempValue(newValue?.value);
                  setValue("business", newValue?.value);
                }}
                isDisabled={role === "COMPANY" || role === "BUSINESS_GROUP"}
                loadOptions={businessGroupOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{label:getValues('business'), value :getValues('business')}}
                // value={{
                //   label : 
                //   filteredUserData?.[0]?.parentBusinessGroup ||
                //   (role === "admin" ? '' : role === "businessgroup" ? loggedInUser : companyOptions?.[0].parent ),
                //   value : 
                //   filteredUserData?.[0]?.parentBusinessGroup ||
                //   (loggedInUser !== "Admin" ? loggedInUser : companyOptions[0].parent )
                // }
                // }
              />
            )}
          />
          {!getValues("business") && <Error errorName={errors.business} />}
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Company <span className="text-danger">*</span>
          </label>
          <Controller
            name="company"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <AsyncSelect
                cacheOptions
                defaultOptions
                onChange={(newValue) => {
                  setTempValue(newValue?.value);
                  setValue("company", newValue?.label);
                }}
                isDisabled={role === "COMPANY"}
                loadOptions={allCompanyOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{label:getValues('company'), value :getValues('company')}}
                // value={{
                //   label:
                //     filteredUserData[0]?.parentCompany ||
                //     (role === "company" ? loggedInUser : ""),
                //   value:
                //     filteredUserData[0]?.parentCompany ||
                //     (role === "company" ? loggedInUser : "")
                // }}
              />
            )}
          />
          {!getValues("company") && <Error errorName={errors.company} />}
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Branch
          </label>
          <Controller
            name="branch"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setTempValue(newValue.label);
                  setValue("branch", newValue.label);
                }}
                options={branchOptions}
                ref={ref}
                name={name}
                styles={customStyles}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Vehicle Name <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            required
            register={register}
            label="Vehicle Name"
            name="vehicleName"
            placeholder=""
          />
          <Error errorName={errors.vehicleName} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Device Type <span className="text-danger">*</span>
          </label>
          <Controller
            name="deviceType"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => {
                  setTempValue(newValue.value);
                  setValue("deviceType", newValue.value);
                }}
                options={deviceTypeOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                value={{label:getValues('deviceType'), value :getValues('deviceType')}}
              />
            )}
          />
          {!getValues("deviceType") && <Error errorName={errors.deviceType} />}
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            IMEI Number <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="imeiNumber"
            label="IMEI Number"
            placeholder=""
          />
          <Error errorName={errors.imeiNumber} />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">Copy From</label>
          <Controller
            name="copyFrom"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) => setValue("copyFrom", newValue.value)}
                options={copyFromOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={copyFromOptions[0]}
              />
            )}
          />
          <Error errorName={errors.copyFrom} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Server Address
          </label>
          <CustomInput
            type="text"
            register={register}
            name="serverAddress"
            placeholder=""
          />
        </div>
        <Error errorName={errors.serverAddress} />
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            SIM Number <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            required
            register={register}
            name="simNumber"
            placeholder=""
          />
          <Error errorName={errors.simNumber} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Secondary SIM Number<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            name="secondarySimNumber"
            placeholder=""
          />
          <Error errorName={errors.secondarySimNumber} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            Distance Counter
          </label>
          <Controller
            name="distanceCounter"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>
                  setValue("distanceCounter", newValue.value)
                }
                options={distanceCounterOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={distanceCounterOptions[0]}
              />
            )}
          />
          <Error errorName={errors.distanceCounter} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            Unit of Distance
          </label>
          <Controller
            name="unitOfDistance"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>
                  setValue("unitOfDistance", newValue.value)
                }
                options={unitOfDistanceOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={unitOfDistanceOptions[0]}
              />
            )}
          />
          <Error errorName={errors.unitOfDistance} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            Speed Detection
          </label>
          <Controller
            name="speedDetection"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                onChange={(newValue) =>
                  setValue("speedDetection", newValue.value)
                }
                options={speedDetectionOptions}
                ref={ref}
                name={name}
                styles={customStyles}
                defaultValue={speedDetectionOptions[0]}
              />
            )}
          />
          <Error errorName={errors.speedDetection} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Device Accuracy Tolerance<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            name="deviceAccuracyTolerance"
            placeholder=""
          />
          <Error errorName={errors.deviceAccuracyTolerance} />
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

export default General;
