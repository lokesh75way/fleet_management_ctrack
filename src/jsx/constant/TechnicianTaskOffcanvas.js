import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import DatePicker from "react-datepicker";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useForm, Controller } from "react-hook-form";
import { branchOptions } from "../components/TabComponent/VehicleTabs/Options";
import Select from "react-select";
import Error from "../components/Error/Error";

const TechnicianOffcanvas = forwardRef(
  ({ Title, handleSubmit, editData, setEditData }, ref) => {
    const [startDate, setStartDate] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [addEmploye, setAddEmploye] = useState(false);
    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
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

    const { control, getValues, formState: errors } = useForm();

    const [selectedOption, setSelectedOption] = useState(null);
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
              <form onClick={(e) => handleSubmit(e)}>
                <div className="row">
                  {/* <div className="col-xl-6 mb-3 ">
                    <label className="form-label">
                      Company <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="branch"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          // onChange={(newValue) => setValue("branch", newValue.value)}
                          options={branchOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={branchOptions[0]}
                        />
                      )}
                    />
                    <Error errorName={errors.branch} />
                  </div> */}

                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Branch <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="branch"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          // onChange={(newValue) => setValue("branch", newValue.value)}
                          options={branchOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          defaultValue={branchOptions[0]}
                        />
                      )}
                    />
                    <Error errorName={errors.branch} />
                  </div>

                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Technicnan <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="tasks"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          // onChange={(newValue) => setValue("branch", newValue.value)}
                          // options={branchOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          // defaultValue={branchOptions[0]}
                        />
                      )}
                    />
                    <Error errorName={errors.branch} />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Task Category <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="tasks"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          // onChange={(newValue) => setValue("branch", newValue.value)}
                          // options={branchOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          // defaultValue={branchOptions[0]}
                        />
                      )}
                    />
                    <Error errorName={errors.branch} />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput2"
                      className="form-label"
                    >
                      Task Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput2"
                      placeholder=""
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Task Priority <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="tasks"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          // onChange={(newValue) => setValue("branch", newValue.value)}
                          // options={branchOptions}
                          ref={ref}
                          name={name}
                          styles={customStyles}
                          // defaultValue={branchOptions[0]}
                        />
                      )}
                    />
                    <Error errorName={errors.branch} />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Contact Person Name 
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput2"
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
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput2"
                      placeholder=""
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Service Location<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput2"
                      placeholder=""
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
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
                          className="form-control"
                          // onChange={(newValue) => setValue("manufactureDate", newValue)}
                        />
                      )}
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Description 
                    </label>
                    <div className="mb-3 ">
                      <textarea
                        className="form-txtarea form-control"
                        rows="8"
                        id="comment"
                      ></textarea>
                    </div>
                  </div>
                  {/* <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput99" className="form-label">Created Date<span className="text-danger">*</span></label>                                    
                                    <DatePicker 
                                        className="form-control"
                                        selected={startDate} 
                                        onChange={(date) => setStartDate(date)} 
                                    />
                                </div> */}
                  {/* <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput8" className="form-label">Date of Birth <span className="text-danger">*</span></label>                                    
                                    <DatePicker 
                                        className="form-control"
                                        selected={startDate2} 
                                        onChange={(date) => setStartDate2(date)} 
                                    />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput10" className="form-label">Reporting To <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="exampleFormControlInput10" placeholder="" />
                                </div>		
                                <div className="col-xl-6 mb-3">
                                    <label className="form-label">Language Select <span className="text-danger">*</span></label>
                                    <select className="default-select form-control">
                                        <option  data-display="Select">Please select</option>
                                        <option value="html">English</option>
                                        <option value="css">Hindi</option>
                                        <option value="javascript">Canada</option>
                                    </select>
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label className="form-label">User Role <span className="text-danger">*</span></label>
                                    <select className="default-select form-control">
                                        <option  data-display="Select">Please select</option>
                                        <option value="html">Parmanent</option>
                                        <option value="css">Parttime</option>
                                        <option value="javascript">Per Hours</option>
                                    </select>
                                </div>
                                <div className="col-xl-12 mb-3">
                                    <label className="form-label">Address <span className="text-danger">*</span></label>
                                    <textarea rows="2" className="form-control"></textarea>
                                </div>
                                <div className="col-xl-12 mb-3">
                                    <label className="form-label">About <span className="text-danger">*</span></label>
                                    <textarea rows="2" className="form-control"></textarea>
                                </div>	 */}
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

export default TechnicianOffcanvas;
