import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import DatePicker from "react-datepicker";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useForm, Controller, FormProvider } from "react-hook-form";
import Select from "react-select";
import Error from "../components/Error/Error";
import CustomInput from "../components/Input/CustomInput";
import '../../scss/pages/_driver-tracking.scss'
import {taskCategoryOptions, severityOptions, technicianOptions, branchOptions} from '../components/TabComponent/VehicleTabs/Options'

const TechnicianOffcanvas = forwardRef(
  ({ Title, handleSubmit, editData, setEditData, control, setValue, getValues,register, errors,clearErrors, onSubmit }, ref) => {
    const [addEmploye, setAddEmploye] = useState(false);
    const [tempValue, setTempValue] = useState();
    useImperativeHandle(ref, () => ({
      showModal() {
        setAddEmploye(true);
      },
    }));
    const nav = useNavigate();
    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(e.target.value);
      setEditData({ ...editData, [name]: value });
    };

    const [selectedOption, setSelectedOption] = useState(null);
    const customStyles = {
      control: (base) => ({
        ...base,
        padding: ".25rem 0 ", // Adjust the height as needed
      }),
    };
    useEffect(()=>{
      if(addEmploye === true){
        clearErrors("technician")
        clearErrors('taskCategory')
        clearErrors('taskName')
        clearErrors('taskPriority')
        clearErrors('serviceLocation')
        clearErrors('plannedReportingDate')
        clearErrors('reportingTime')
        setValue("technician",'')
        setValue('taskCategory','')
        setValue('taskName','')
        setValue('taskPriority','')
        setValue('serviceLocation','')
        setValue('plannedReportingDate','')
        setValue('reportingTime','')
        setValue('contactPersonName','')
        setValue('contactPersonNumber','')
      }
    },[addEmploye])

    return (
      <>
        <Offcanvas
          show={addEmploye}
          onHide={setAddEmploye}
          className="offcanvas-end customeoff"
          placement="end"
        >
          <div className="offcanvas-header">
            <h5 className="modal-title" id="#gridSystemModal">
              {Title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setAddEmploye(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="offcanvas-body">
            <div className="container-fluid">
              <FormProvider>
              <form onSubmit={ handleSubmit(onSubmit)}>
                <div className="row"> 
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Technician <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="technician"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) => {setTempValue(newValue.value);setValue("technician", newValue.value)}}
                          options={technicianOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={technicianOptions[0]}
                        />
                      )}
                    />
                    {!getValues('technician') && <Error errorName={errors.technician} />}
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Task Category <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="c"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>{setTempValue(newValue.value); setValue("taskCategory", newValue.value)}}
                          options={taskCategoryOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={taskCategoryOptions[0]}
                        />
                      )}
                    />
                     { !getValues('taskCategory') && <Error errorName={errors.taskCategory} />}
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput2"
                      className="form-label"
                    >
                      Task Name <span className="text-danger">*</span>
                    </label>
                    <CustomInput
                      type="text"
                      register={register}
                      name="taskName"
                      label="Task Name"
                      placeholder=""
                    />
                    <Error errorName={errors.taskName} />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Task Priority <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="taskPriority"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) => {setTempValue(newValue.value); setValue("taskPriority", newValue.value)}}
                          options={severityOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={severityOptions[0]}
                        />
                      )}
                    />
                   { !getValues('taskPriority') && <Error errorName={errors.taskPriority} />}
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Contact Person Name 
                    </label>
                    <CustomInput
                      type="text"
                      register={register}
                      name="contactPersonName"
                      label="Contact Person Name"
                      placeholder=""
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="form-label"
                    >
                      Contact Person Number
                    </label>
                    <CustomInput
                      type="number"
                      register={register}
                      name="contactPersonNumber"
                      label="Contact Person Number"
                      placeholder=""
                    />
                    <Error errorName={errors.contactPersonNumber} />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Service Location<span className="text-danger">*</span>
                    </label>
                    <CustomInput
                      type="text"
                      name="serviceLocation"
                      register={register}
                      label="Service Location"
                      placeholder=""
                    />
                    <Error errorName={errors.serviceLocation} />
                  </div>
                  <div className="col-xl-6 mb-3 d-flex flex-column">
                    <label className="form-label">
                      Planned Reporting <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="plannedReportingDate"
                      control={control}
                      render={({ value, name }) => (
                        <DatePicker
                          selected={
                            getValues("plannedReportingDate") || new Date()
                          }
                          className="form-control customDateHeight"
                          onChange={(newValue) => setValue("plannedReportingDate", newValue)}
                        />
                      )}
                    />
                    {!getValues("plannedReportingDate") && <Error errorName={errors.plannedReportingDate} />}
                  </div>
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">Reporting Time <span className="text-danger">*</span></label>
                      <CustomInput
                        type="time"
                        register={register}
                        name="reportingTime"
                        label="Reporting Time"
                        placeholder=""
                      />
                      <Error errorName={errors.reportingTime} />
                      </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Description 
                    </label>
                    <div className="mb-3 ">
                      <textarea
                        className="form-txtarea form-control"
                        {...register}
                        name='description'
                        label="Description"
                        rows="8"
                        id="comment"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={() => {handleSubmit(onSubmit)}}
                    className="btn btn-primary me-1"
                  >
                    Submit
                  </button>
                  <Link
                    to={"#"}
                    onClick={() => setAddEmploye(false)}
                    className="btn btn-danger light ms-1"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
              </FormProvider>
            </div>
          </div>
        </Offcanvas>
      </>
    );
  }
);

export default TechnicianOffcanvas;
