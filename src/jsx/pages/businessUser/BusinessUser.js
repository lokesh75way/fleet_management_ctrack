import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { CSVLink } from 'react-csv';

import { IMAGES } from '../../constant/theme';
import MainPagetitle from '../../layouts/MainPagetitle';
import InviteCustomer from '../../constant/ModalList';
import CompanyOffcanvas from '../../constant/CompanyOffcanvas';
// import {BusinessData} from "../../components/Tables/Tables";
import BusinessTable from  "../../components/Tables/BusinessTable"

const BusinessUser = () => {  
    const [data, setData] = useState(
		document.querySelectorAll("#employee-tbl_wrapper tbody tr")
	);
    const BusinessData = JSON.parse(localStorage.getItem('businessData'))
    const [tableData, setTableData] = useState(BusinessData);
    const [editData , setEditData] = useState({
        id:0,
        title:'',
        contact:0,
        email:'',
        status:'',
        location:'',
        usergroup:''
    });
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
    // for deleting data in table
   const onConfirmDelete =(id)=>{
    const updatedData = tableData.filter(item => item.id !== id);
    setTableData(updatedData);

   }
   const editDrawerOpen = (item)=>{
    tableData.map((table)=>(
        table.id === item && setEditData(table)
    ))

    company.current.showModal();
}
// const handleSubmit=(e)=>{
//     e.preventDefault();
//     const updateTable = tableData.map((table)=>{
//         if(table.id === editData.id) {
//             console.log(table.id)   
//             return {...table, ...editData };
//         }
//         return table;
//     })
//     setTableData(updateTable)
// }  
    const company = useRef();
    const edit = useRef();
    return (
        <>
            <MainPagetitle mainTitle="BusinessUser" pageTitle={'BusinessUser'} parentTitle={'Home'} />  
            <div className="container-fluid">
				<div className="row">
			    	<div className="col-xl-12">
                        <div className="card">            
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">   
                                    <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                                        <h4 className="heading mb-0">BusinessUsers</h4>                                        
                                        <div>
                                            
                                            <Link to={"/business/create"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"                                            
                                            >+ Add Business User</Link> {" "}
                                        </div>
                                    </div>          
                                    <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                            <thead>
                                                <tr>  
                                                <th>ID</th>                                                 
                                                    <th>Parent</th>
                                                    <th>Business User</th>
                                                    <th>Mobile Number</th>
                                                    <th>Location</th>
                                                    <th>Payment Status</th>
                                                    <th>Branches</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               <BusinessTable tableData={tableData} onConfirmDelete={onConfirmDelete} editDrawerOpen={editDrawerOpen}/>
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
                                                    to="/business"
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
                                                        to="/business"
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
                                                    to="/business"
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
                ref={company}
                Title={ editData.id === 0 ? "Add Company" : "Edit Company"}
                handleSubmit={handleSubmit}
                editData={editData}
                setEditData={setEditData}
            /> */}
        </>
    );
};
export default BusinessUser;

