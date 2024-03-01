import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-country-state-city/dist/react-country-state-city.css";
import { Controller, useForm } from "react-hook-form";
import Error from "../components/Error/Error";
import {
  branchOptions,
  ObjectOptions,
  TypeOptions,
  jobOptions,
} from "../components/TabComponent/VehicleTabs/Options";

const ExpenseOffcanvas = forwardRef(
  (
    {
      Title,
      editData,
      setEditData,
      register,
      setValue,
      getValues,
      handleSubmit,
      onSubmit,
    },
    ref
  ) => {
    const { control, formState: errors } = useForm();
    const [startDate, setStartDate] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [addEmploye, setAddEmploye] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCheckCJ, setIsCheckCJ] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedOption3, setSelectedOption3] = useState(null);

    useImperativeHandle(ref, () => ({
      showModal() {
        setAddEmploye(true);
      },
    }));
    const nav = useNavigate();
    const handleChange = (e) => {
      setSelectedOption(e.target.value);
      setValue("category", e.target.value);
    };
    const handleChange2 = (e) => {
      setSelectedOption2(e.target.value);
      setValue("jobAllocation", e.target.value);
    };
    // const handleChange3 = (e) => {
    //   setSelectedOption3(e.target.value);
    //   setValue("validDays", e.target.value);
    // };
    const customStyles = {
      control: (base) => ({
        ...base,
        padding: ".25rem 0 ", // Adjust the height as needed
      }),
    };

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
              <form onClick={() => handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">Branch</label>
                    <Controller
                      name="branch"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            setValue("branch", newValue.value)
                          }
                          options={branchOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={branchOptions[0]}
                        />
                      )}
                    />
                  </div>

                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">Object</label>
                    <Controller
                      name="object"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            setValue("object", newValue.value)
                          }
                          options={ObjectOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={ObjectOptions[0]}
                        />
                      )}
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">Category</label>
                    <div className="basic-form" style={{ marginTop: ".5rem" }}>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="variable"
                          checked={selectedOption === "variable"}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          style={{ marginBottom: "0" }}
                        >
                          Variable
                        </label>
                      </div>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="fix"
                          checked={selectedOption === "fix"}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          style={{ marginBottom: "0" }}
                        >
                          Fix
                        </label>
                      </div>
                    </div>
                  </div>
                  {selectedOption === "variable" && (
                    <div className="col-xl-6 mb-3">
                      <label className="form-label">Consider Job</label>
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox1"
                          onClick={()=>setIsCheckCJ(!isCheckCJ)}
                        />
                      </div>
                    </div>
                  )}
                  {
                    isCheckCJ && <>
                    <div className="col-xl-6 mb-3">
                    <label className="form-label">Job Allocation</label>
                    <div className="basic-form" style={{ marginTop: ".5rem" }}>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="inProgress"
                          checked={selectedOption2 === "inProgress"}
                          onChange={handleChange2}
                        />
                        <label
                          className="form-check-label"
                          style={{ marginBottom: "0" }}
                        >
                          In-Progress
                        </label>
                      </div>
                      <div className="form-check custom-checkbox form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="completed"
                          checked={selectedOption2 === "completed"}
                          onChange={handleChange2}
                        />
                        <label
                          className="form-check-label"
                          style={{ marginBottom: "0" }}
                        >
                          Completed
                        </label>
                      </div>
                    </div>
                  </div>
                  {
                    selectedOption2 === 'completed' && <>
                        <div className="col-xl-6 mb-3">
                        <label className="form-label">
                          Completed Till
                        </label>
                        <div className="d-flex align-items-center">
                        <Controller
                          name="startDate"
                          control={control}
                          render={({ value, name }) => (
                            <DatePicker
                              selected={getValues("startDate") || new Date()}
                              className="form-control"
                              onChange={(newValue) =>
                                setValue("startDate", newValue)
                              }
                            />
                          )}
                        />
                        <span className="mx-2" >To</span>
                        <Controller
                          name="endDate"
                          control={control}
                          render={({ value, name }) => (
                            <DatePicker
                              selected={getValues("endDate") || new Date()}
                              className="form-control"
                              onChange={(newValue) =>
                                setValue("endDate", newValue)
                              }
                            />
                          )}
                        />
                        </div>
                      </div>
                    </>

                  }
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">Job</label>
                    <Controller
                      name="job"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            setValue("job", newValue.value)
                          }
                          options={jobOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={jobOptions[0]}
                        />
                      )}
                    />
                  </div>
                    </>
                  }
                  <div className="col-xl-6 mb-3 ">
                    <label className="form-label">Type</label>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          onChange={(newValue) =>
                            setValue("type", newValue.value)
                          }
                          options={TypeOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={TypeOptions[0]}
                        />
                      )}
                    />
                  </div>
                  {selectedOption === "fix" && (
                    <>
                      <div className="col-xl-6 mb-3">
                        <label className="form-label">
                          From Date <span className="text-danger">*</span>
                        </label>
                        <Controller
                          name="fromDate"
                          control={control}
                          render={({ value, name }) => (
                            <DatePicker
                              selected={getValues("fromDate") || new Date()}
                              className="form-control"
                              onChange={(newValue) =>
                                setValue("fromDate", newValue)
                              }
                            />
                          )}
                        />
                        <Error errorName={errors.fromDate} />
                      </div>
                      <div className="col-xl-6 mb-3">
                        <label className="form-label">
                          To Date <span className="text-danger">*</span>
                        </label>
                        <Controller
                          name="toDate"
                          control={control}
                          render={({ value, name }) => (
                            <DatePicker
                              selected={getValues("toDate") || new Date()}
                              className="form-control"
                              onChange={(newValue) =>
                                setValue("toDate", newValue)
                              }
                            />
                          )}
                        />
                        <Error errorName={errors.toDate} />
                      </div>
                    </>
                  )}

                  {selectedOption === "variable" && (
                    <div className="col-xl-6 mb-3">
                      <label className="form-label">
                        Expense Date <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="expenseDate"
                        control={control}
                        render={({ value, name }) => (
                          <DatePicker
                            selected={getValues("expenseDate") || new Date()}
                            className="form-control"
                            onChange={(newValue) =>
                              setValue("expenseDate", newValue)
                            }
                          />
                        )}
                      />
                      <Error errorName={errors.referenceNumber} />
                    </div>
                  )}
                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="form-label"
                    >
                      Amount <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      {...register("amount", {
                        required: "Number is required",
                      })}
                      className="form-control"
                      name="amount"
                      placeholder=""
                    />
                    <Error errorName={errors.amount} />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="form-label"
                    >
                      Reference Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      {...register("referenceNumber")}
                      className="form-control"
                      name="referenceNumber"
                      placeholder=""
                    />
                  </div>
                  {selectedOption === "variable" && (
                    <>
                      <div className="col-xl-6 mb-3">
                        <label
                          htmlFor="exampleFormControlInput3"
                          className="form-label"
                        >
                          Odometer
                        </label>
                        <input
                          type="number"
                          {...register("odometer")}
                          className="form-control"
                          name="odometer"
                          placeholder=""
                        />
                      </div>
                      <div className="col-xl-6 mb-3">
                        <label
                          htmlFor="exampleFormControlInput3"
                          className="form-label"
                        >
                          Work Hour
                        </label>
                        <input
                          type="time"
                          {...register("workHour")}
                          className="form-control"
                          name="workHour"
                          placeholder=""
                        />
                      </div>
                    </>
                  )}
                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="form-label"
                    >
                      Bill Upload
                    </label>
                    <input
                      type="file"
                      {...register("billUpload")}
                      className="form-control"
                      name="billUpload"
                      placeholder=""
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="form-label"
                    >
                      Description
                    </label>
                    <input
                      type="textarea"
                      {...register("description")}
                      className="form-control"
                      name="description"
                      placeholder=""
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={() => setAddEmploye(false)}
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
            </div>
          </div>
        </Offcanvas>
      </>
    );
  }
);

export default ExpenseOffcanvas;
