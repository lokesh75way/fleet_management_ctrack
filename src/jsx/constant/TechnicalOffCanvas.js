import React, { useState, forwardRef, useImperativeHandle  } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import {
    CountrySelect, 
  } from "react-country-state-city";
  import "react-country-state-city/dist/react-country-state-city.css";

const TechnicalOffCanvas =forwardRef((props, ref) => {
    const [startDate, setStartDate] = useState(new Date());
	const [startDate2, setStartDate2] = useState(new Date());
    const [addEmploye , setAddEmploye] = useState(false);
    const [countryid, setCountryid] = useState(0);
    useImperativeHandle(ref, () => ({
        showEmployeModal() {
            setAddEmploye(true)
        }    
    }));
    const nav = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        nav("#");
    }
    return (
        <>
            <Offcanvas show={addEmploye} onHide={setAddEmploye} className="offcanvas-end customeoff" placement='end'>
				<div className="offcanvas-header">
					<h5 className="modal-title" id="#gridSystemModal">{props.Title}</h5>
					<button type="button" className="btn-close" 
						onClick={()=>setAddEmploye(false)}
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div className="offcanvas-body">
                    <div className="container-fluid">
                        
                        <form onClick={(e)=>handleSubmit(e)}>
                            <div className="row">
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Technician ID <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="" />
                                </div>	
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">Technician Name <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="" />
                                </div>	
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput3" className="form-label">Email <span className="text-danger">*</span></label>
                                    <input type="email" className="form-control" id="exampleFormControlInput3" placeholder="" />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput4" className="form-label">Password <span className="text-danger">*</span></label>
                                    <input type="password" className="form-control" id="exampleFormControlInput4" placeholder="" />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label className="form-label">Country <span className="text-danger">*</span></label>
                                    <CountrySelect
                                      onChange={(e) => {
                                          setCountryid(e.id);
                                        }}
                                      containerClassName='bg-white'
                                      inputClassName='border border-white'
                                      placeHolder="Select Country"
                                    />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput88" className="form-label">Contact Number <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" id="exampleFormControlInput88" placeholder="" />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput19" className="form-label">Emergency Contact number <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" id="exampleFormControlInput19" placeholder="" />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label className="form-label">Verification via <span className="text-danger">*</span></label>
                                    <select className="default-select form-control">
                                        <option  data-display="Select">Please select</option>
                                        <option value="html">password</option>
                                    </select>
                                </div>
                                {/* <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput10" className="form-label">Reporting To <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="exampleFormControlInput10" placeholder="" />
                                </div>		 */}
                                {/* <div className="col-xl-6 mb-3">
                                    <label className="form-label">User Role <span className="text-danger">*</span></label>
                                    <select className="default-select form-control">
                                        <option  data-display="Select">Please select</option>
                                        <option value="html">Parmanent</option>
                                        <option value="css">Parttime</option>
                                        <option value="javascript">Per Hours</option>
                                    </select>
                                </div> */}
                                <div className="col-xl-12 mb-3">
                                    <label className="form-label">Address <span className="text-danger">*</span></label>
                                    <textarea rows="2" className="form-control"></textarea>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary me-1">Submit</button>
                                <Link to={"#"} onClick={()=>setAddEmploye(false)} className="btn btn-danger light ms-1">Cancel</Link>
                            </div>
                        </form>
                    </div>
				</div>
			</Offcanvas>     
        </>
    );
});

export default TechnicalOffCanvas;