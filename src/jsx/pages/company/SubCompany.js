import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { CSVLink } from 'react-csv';

import { IMAGES } from '../../constant/theme';
import MainPagetitle from '../../layouts/MainPagetitle';
import SubCompanyOffcanvas from '../../constant/SubCompanyOffcanvas';


const tableData = [
    {shortname: '1001', application: 'Computer Science', image:IMAGES.contact1, contact:'+91 123 456 7890',status:'Active' ,reseller: 'Ricky Antony', username: 'ra@gmail.com', location:'India', usergroup:'East Minister Company'},    
    {shortname: '1002', application: 'Computer Science', image:IMAGES.contact2, contact:'+91 123 456 7890',status:'Inactive' ,reseller: 'Ankites Risher', username: 'abc@gmail.com', location:'Brazil', usergroup:'East Minister Company'},    
    {shortname: '1003', application: 'Computer Science', image:IMAGES.contact3, contact:'+91 123 456 7890',status:'Active' ,reseller: 'Ricky M', username: 'pqr@gmail.com', location:'France', usergroup:'East Minister Company'},    
    {shortname: '1004', application: 'Computer Science', image:IMAGES.contact1, contact:'+91 123 456 7890',status:'Active' ,reseller: 'Elijah James', username: 'stuy@gmail.com', location:'Dubai', usergroup:'East Minister Company'},    
    {shortname: '1005', application: 'Computer Science', image:IMAGES.contact2, contact:'+91 123 456 7890',status:'Inactive' ,reseller: 'Honey Risher', username: 'xyz@gmail.com', location:'USA', usergroup:'East Minister Company'},    
    {shortname: '1006', application: 'Computer Science', image:IMAGES.contact2, contact:'+91 123 456 7890',status:'Active' ,reseller: 'Honey Risher', username: 'xyz@gmail.com', location:'USA', usergroup:'East Minister Company'},    
    {shortname: '1007', application: 'Computer Science', image:IMAGES.contact2, contact:'+91 123 456 7890',status:'Inactive' ,reseller: 'Ankites Risher', username: 'abc@gmail.com', location:'Brazil', usergroup:'East Minister Company'},    
    {shortname: '1008', application: 'Computer Science', image:IMAGES.contact3, contact:'+91 123 456 7890',status:'Active' ,reseller: 'Ricky M', username: 'pqr@gmail.com', location:'France', usergroup:'East Minister Company'},    
    {shortname: '1009', application: 'Computer Science', image:IMAGES.contact1, contact:'+91 123 456 7890',status:'Inactive' ,reseller: 'Ricky Antony', username: 'ra@gmail.com', location:'India', usergroup:'East Minister Company'},    
    {shortname: '1010', application: 'Computer Science', image:IMAGES.contact1, contact:'+91 123 456 7890',status:'Active' ,reseller: 'Elijah James', username: 'stuy@gmail.com', location:'Dubai', usergroup:'East Minister Company'},    
    {shortname: '1011', application: 'Computer Science', image:IMAGES.contact2, contact:'+91 123 456 7890',status:'Inactive' ,reseller: 'Ankites Risher', username: 'abc@gmail.com', location:'Brazil', usergroup:'East Minister Company'},    
    {shortname: '1012', application: 'Computer Science', image:IMAGES.contact1, contact:'+91 123 456 7890',status:'Active' ,reseller: 'Ricky Antony', username: 'ra@gmail.com', location:'India', usergroup:'East Minister Company'},    
];

const headers = [
    { label: "Short Name", key: "shortname" },
    { label: "Reseller", key: "reseller" },
    { label: "Application", key: "application" },
    { label: "User Name", key: "username" },
    { label: "Contact Number", key: "contact" },
    { label: "Location", key: "location" },
    { label: "Status", key: "status" },
    { label: "User Group", key: "usergroup" }
]

const csvlink = {
    headers : headers,
    data : tableData,
    filename: "csvfile.csv"
}

const SubCompany = () => {  
    const [data, setData] = useState(
		document.querySelectorAll("#employee-tbl_wrapper tbody tr")
	);
	const sort = 10;
	const activePag = useRef(0);
	const [test, settest] = useState(0);
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};
   
   useEffect(() => {
      setData(document.querySelectorAll("#employee-tbl_wrapper tbody tr"));
	}, [test]);

   activePag.current === 0 && chageData(0, sort);
   let paggination = Array(Math.ceil(data.length / sort))
      .fill()
      .map((_, i) => i + 1);
	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		settest(i);
	};
   
    const invite = useRef();
    const subCompany = useRef();
    return (
        <>
            <MainPagetitle mainTitle="Sub Company" pageTitle={'Sub Company'} parentTitle={'Home'} />  
            <div className="container-fluid">
				<div className="row">
			    	<div className="col-xl-12">
                        <div className="card">            
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">   
                                    <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                                        <h4 className="heading mb-0">Sub Companies</h4>                                        
                                        <div>
                                            
                                            <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"                                            
                                                onClick={()=>subCompany.current.showModal()}
                                            >+ Add Sub Company</Link> {" "}
                                           
                                        </div>
                                    </div>          
                                    <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                            <thead>
                                                <tr>                                                   
                                                    <th>Short Name</th>
                                                    <th>Reseller</th>
                                                    <th>Application</th>
                                                    <th>User Name</th>
                                                    <th>Contact Number</th>
                                                    <th>Location</th>
                                                    <th>User Group</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableData.map((item, index)=>(
                                                    <tr key={index}>                                                       
                                                        <td><span>{item.shortname}</span></td>
                                                        <td>
                                                            <div className="products">
                                                                <img src={item.image}  className="avatar avatar-md" alt="" />
                                                                <div>
                                                                    <h6>{item.reseller}</h6>
                                                                    <span>Web Designer</span>	
                                                                </div>	
                                                            </div>
                                                        </td>
                                                        <td><span>{item.application}</span></td>
                                                        <td><span className="text-primary">{item.username}</span></td>
                                                        <td>
                                                            <span>{item.contact}</span>
                                                        </td>	
                                                        <td>
                                                            <span>{item.location}</span>
                                                        </td>
                                                        <td>
                                                            <span>{item.usergroup}</span>
                                                        </td>
                                                        <td>
                                                            <span className={`badge light border-0 ${item.status==="Active" ? 'badge-success' : 'badge-danger'} `}>{item.status}</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            
                                        </table>
                                        <div className="d-sm-flex text-center justify-content-between align-items-center">
                                            <div className="dataTables_info">
                                                Showing {activePag.current * sort + 1} to{" "}
                                                {data.length > (activePag.current + 1) * sort
                                                    ? (activePag.current + 1) * sort
                                                    : data.length}{" "}
                                                of {data.length} entries
                                            </div>
                                            <div
                                                className="dataTables_paginate paging_simple_numbers"
                                                id="example2_paginate"
                                            >
                                                <Link
                                                    className="paginate_button previous disabled"
                                                    to="/sub-company"
                                                    onClick={() =>
                                                        activePag.current > 0 &&
                                                        onClick(activePag.current - 1)
                                                    }
                                                >
                                                    <i className="fa-solid fa-angle-left" />
                                                </Link>
                                                <span>
                                                    {paggination.map((number, i) => (
                                                    <Link
                                                        key={i}
                                                        to="/sub-company"
                                                        className={`paginate_button  ${
                                                            activePag.current === i ? "current" : ""
                                                        } `}
                                                        onClick={() => onClick(i)}
                                                    >
                                                        {number}
                                                    </Link>
                                                    ))}
                                                </span>
                                                <Link
                                                    className="paginate_button next"
                                                    to="/sub-company"
                                                    onClick={() =>
                                                        activePag.current + 1 < paggination.length &&
                                                        onClick(activePag.current + 1)
                                                    }
                                                >
                                                    <i className="fa-solid fa-angle-right" />
                                                </Link>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SubCompanyOffcanvas 
                ref={subCompany}
                Title="Add Sub Company"
            />
            
        </>
    );
};

export default SubCompany;