import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { CSVLink } from 'react-csv';

import { IMAGES } from '../constant/theme';
import MainPagetitle from '../layouts/MainPagetitle';
// import CompanyOffcanvas from '../../constant/CompanyOffcanvas';

const tableData = [
    {emplid: '1001', age: 32, image:IMAGES.contact1, contact:'+91 123 456 7890',status:'Active' ,title: 'Ricky Antony', drivingExperience : 5, gender:'Female', location:'India', branches : 4},    
    {emplid: '1002', age: 29, image:IMAGES.contact2, contact:'+91 123 456 7890',status:'Inactive' ,title: 'Ankites Risher', drivingExperience : 7, gender:'Male', location:'Brazil', branches : 4},    
    {emplid: '1003', age: 41, image:IMAGES.contact3, contact:'+91 123 456 7890',status:'Active' ,title: 'Ricky M', drivingExperience : 3, gender:'Male', location:'France', branches : 4},    
    {emplid: '1004', age: 31, image:IMAGES.contact1, contact:'+91 123 456 7890',status:'Active' ,title: 'Elijah James', drivingExperience : 5, gender:'Female', location:'Dubai', branches : 4},    
    {emplid: '1005', age: 32, image:IMAGES.contact2, contact:'+91 123 456 7890',status:'Inactive' ,title: 'Honey Risher', drivingExperience : 5, gender:'Male', location:'USA', branches : 4},    
    {emplid: '1006', age: 42, image:IMAGES.contact2, contact:'+91 123 456 7890',status:'Active' ,title: 'Honey Risher', drivingExperience : 9, gender:'Male', location:'USA', branches : 4},    
    {emplid: '1007', age: 32, image:IMAGES.contact2, contact:'+91 123 456 7890',status:'Inactive' ,title: 'Ankites Risher', drivingExperience : 5, gender:'Male', location:'Brazil', branches : 4},    
    {emplid: '1008', age: 34, image:IMAGES.contact3, contact:'+91 123 456 7890',status:'Active' ,title: 'Ricky M', drivingExperience : 4, gender:'Male', location:'France', branches : 4},    
    {emplid: '1009', age: 32, image:IMAGES.contact1, contact:'+91 123 456 7890',status:'Inactive' ,title: 'Ricky Antony', drivingExperience : 5, gender:'Female', location:'India', branches : 4},    
    {emplid: '1010', age: 29, image:IMAGES.contact1, contact:'+91 123 456 7890',status:'Active' ,title: 'Elijah James', drivingExperience : 8, gender:'Female', location:'Dubai', branches : 4},    
    {emplid: '1011', age: 32, image:IMAGES.contact2, contact:'+91 123 456 7890',status:'Inactive' ,title: 'Ankites Risher', drivingExperience : 3, gender:'Male', location:'Brazil', branches : 4},    
    {emplid: '1012', age: 32, image:IMAGES.contact1, contact:'+91 123 456 7890',status:'Active' ,title: 'Ricky Antony', drivingExperience : 5, gender:'Female', location:'India', branches : 4},    
];

const headers = [
    { label: "Employee ID", key: "emplid" },
    { label: "Employee Name", key: "title" },
    { label: "Department", key: "department" },
    { label: "Email Address", key: "email" },
    { label: "Contact Number", key: "contact" },
    { label: "Gender", key: "gender" },
    { label: "Location", key: "location" },
    { label: "Status", key: "status" },
]

// const csvlink = {
//     headers : headers,
//     data : tableData,
//     filename: "csvfile.csv"
// }

const SubUser = () => {  
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
    // const employe = useRef();
    const subuser = useRef();
    const edit = useRef();
    return (
        <>
        <MainPagetitle mainTitle="User" pageTitle={'User'} parentTitle={'Home'} />
            <div className="container-fluid">
				<div className="row">
			    	<div className="col-xl-12">
                        <div className="card">            
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">   
                                    <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                                        <h4 className="heading mb-0">Users</h4>   
                                        <div>
                                            
                                            <Link to={"/subUser/create"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"                                            
                                                // onClick={()=>subuser.current.showModal()}
                                            >+ Add User</Link> {" "}
                                        </div>                                      
                                    </div>          
                                    <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                            <thead>
                                                <tr>                                                   
                                                    <th>ID</th>
                                                    <th>User Name</th>
                                                    <th>Age</th>
                                                    <th>Mobile Number</th>
                                                    <th>Experience</th>
                                                   
                                                    <th>Location</th>
                                                    <th>Branches</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableData.map((item, index)=>(
                                                    <tr key={index}>                                                       
                                                        <td><span>{item.emplid}</span></td>
                                                        <td>
                                                            <div className="products">
                                                                <img src={item.image}  className="avatar avatar-md" alt="" />
                                                                <div>
                                                                    <h6>{item.title}</h6>
                                                                    <span>Web Designer</span>	
                                                                </div>	
                                                            </div>
                                                        </td>
                                                        <td><span>{item.age}</span></td>
                                                        <td>
                                                            <span>{item.contact}</span>
                                                        </td>
                                                        
                                                        <td><span className="text-primary">{item.drivingExperience}</span></td>
                                                        <td>
                                                            <span>{item.location}</span>
                                                        </td>
                                                        <td>
                                                            <Link to={`/branch/${item.emplid}`} className="text-primary badge badge-count">
                                                                {item.branches}
                                                            </Link>
                                                        </td>
                                                        {/* <td>
                                                            <span className={`badge light border-0 ${item.status==="Active" ? 'badge-success' : 'badge-danger'} `}>{item.status}</span>
                                                        </td> */}
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
                                                    to="/subUser"
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
                                                        to="/subUser"
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
                                                    to="/general"
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
            {/* <CompanyOffcanvas 
                ref={subuser}
                Title="Add Sub User"
            /> */}
        </>
    );
};

export default SubUser;