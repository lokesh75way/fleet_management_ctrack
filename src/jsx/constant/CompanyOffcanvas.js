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

const CompanyOffcanvas = forwardRef(
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
      setEditData({ ...editData, [name]: value });
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
              <div>
                <label>Document</label>
                <div className="dz-default dlab-message upload-img mb-3">
                  <form action="#" className="dropzone">
                    <svg
                      width="41"
                      height="40"
                      viewBox="0 0 41 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                        stroke="#DADADA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.5 20V35"
                        stroke="#DADADA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                        stroke="#DADADA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                        stroke="#DADADA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="fallback">
                      <input name="file" type="file" multiple />
                    </div>
                  </form>
                </div>
              </div>
              <form onClick={(e) => handleSubmit(e)}>
                <div className="row">
                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput2"
                      className="form-label"
                    >
                      Short Name <span className="text-danger">*</span>
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
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Reseller <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      defaultValue={editData.title}
                      onChange={handleChange}
                      id="exampleFormControlInput1"
                      placeholder=""
                    />
                  </div>

                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="form-label"
                    >
                      User Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      defaultValue={editData.email}
                      onChange={handleChange}
                      id="exampleFormControlInput3"
                      placeholder=""
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput4"
                      className="form-label"
                    >
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleFormControlInput4"
                      placeholder=""
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      User Group<span className="text-danger">*</span>
                    </label>
                    <select className="default-select form-control">
                      <option data-display="Select">Please select</option>
                      <option value="html">West Minister Company</option>
                      <option value="css">East Minister Company</option>
                      <option value="javascript">North Minister Company</option>
                      <option value="javascript">South Minister Company</option>
                    </select>
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput88"
                      className="form-label"
                    >
                      Mobile Number<span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="contact"
                      defaultValue={editData.contact}
                      onChange={handleChange}
                      id="exampleFormControlInput88"
                      placeholder=""
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Country <span className="text-danger">*</span>
                    </label>
                    <CountrySelect
                      className="default-select form-control"
                      containerClassName="bg-white"
                      inputClassName="border border-white"
                      onChange={(e) => {
                        setCountryid(e.id);
                      }}
                      placeHolder="Select Country"
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      State <span className="text-danger">*</span>
                    </label>
                    <StateSelect
                      className="default-select form-control"
                      containerClassName="bg-white"
                      inputClassName="border border-white"
                      countryid={countryid}
                      onChange={(e) => {
                        setstateid(e.id);
                      }}
                      placeHolder="Select State"
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="form-label"
                    >
                      City<span className="text-danger">*</span>
                    </label>
                    <CitySelect
                      className="default-select form-control bg-light"
                      containerClassName="bg-white"
                      inputClassName="border border-white"
                      countryid={countryid}
                      stateid={stateid}
                      onChange={(e) => {
                        console.log(e);
                      }}
                      placeHolder="Select City"
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput88"
                      className="form-label"
                    >
                      Monthly SMS Limt <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleFormControlInput88"
                      placeholder=""
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label
                      htmlFor="exampleFormControlInput88"
                      className="form-label"
                    >
                      Daily SMS Limt <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleFormControlInput88"
                      placeholder=""
                    />
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      User Time Zone <span className="text-danger">*</span>
                    </label>
                    <select className="default-select form-control">
                      <option data-display="Select">Please select</option>
                      <option value="html">India</option>
                      <option value="css">UAE</option>
                      <option value="javascript">Other</option>
                    </select>
                  </div>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">
                      Payment Status <span className="text-danger">*</span>
                    </label>
                    <select className="default-select form-control">
                      <option data-display="Select">Please select</option>
                      <option value="html">Paid</option>
                      <option value="css">Pending</option>
                    </select>
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

export default CompanyOffcanvas;
