import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { CSVLink } from 'react-csv';

import { IMAGES } from '../../constant/theme';
import MainPagetitle from '../../layouts/MainPagetitle';
import SubCompanyOffcanvas from '../../constant/SubCompanyOffcanvas';
import SubCompanyTable from '../../components/Tables/SubCompanyTable';
import {SubCompanyData} from '../../components/Tables/Tables'

const headers = [
    { label: "id", key: "id" },
    { label: "Reseller", key: "reseller" },
    { label: "Application", key: "application" },
    { label: "User Name", key: "username" },
    { label: "Contact Number", key: "contact" },
    { label: "Location", key: "location" },
    { label: "Status", key: "status" },
    { label: "User Group", key: "usergroup" }
]


const SubCompany = () => {  
    const [data, setData] = useState(
		document.querySelectorAll("#employee-tbl_wrapper tbody tr")
	);
    const [tableData , setTableData] = useState(SubCompanyData);
    const [editData , setEditData] = useState({});
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

    const onConfirmDelete = (id) => {
        const updatedData = tableData.filter(item => item.id !== id);
        setTableData(updatedData);
    }
    const editDrawerOpen = (item)=>{
        console.log(item)
        tableData.map((table)=>(
            table.id === item && setEditData(table)
        ))
        // setEditTableData(item);
        subCompany.current.showModal();
    }
   
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
                                                    <th>ID</th>
                                                    <th>Reseller</th>
                                                    <th>Application</th>
                                                    <th>User Name</th>
                                                    <th>Contact Number</th>
                                                    <th>Location</th>
                                                    <th>User Group</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <SubCompanyTable tableData={tableData} editDrawerOpen={editDrawerOpen} onConfirmDelete={onConfirmDelete} />
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