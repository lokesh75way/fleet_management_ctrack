// import React, {useState, useRef, useEffect} from 'react';
// import {Link} from 'react-router-dom';
// import { CSVLink } from 'react-csv';
// import { IMAGES,SVGICON} from '../../constant/theme';
// import MainPagetitle from '../../layouts/MainPagetitle';
// import InviteCustomer from '../../constant/ModalList';
// import CompanyOffcanvas from '../../constant/CompanyOffcanvas';
// import EditCompanyOffcanvas from '../../constant/EditCompanyCanvas';
// import { IoMdAdd } from "react-icons/io";
// import DeleteDrawer from '../../components/Drawer/DeleteDrawer';
// import {CompanyTable, DriverTable} from "../../components/Tables/Tables";
// import TableData from '../../components/Tables/TableData';

// const Company = () => {  
//     const [tableData, setTableData] = useState(CompanyTable);
//     const headers = [
//         {
//             First:"Short Name",
//             Second:"Reseller",
//             Third:"Application",
//             Fourth:"User Name",
//             Five:"Mobile Number",
//             Six:"User group",
//             Seven:"Location",
//             Eight:"Payment Status",
//             Nine:"Action"
//         }
//        ]

//     const company = useRef();
//     return (
//         <>
//             <MainPagetitle mainTitle="Company" pageTitle={'Company'} parentTitle={'Home'} />  
//             <div className="container-fluid">
// 				<div className="row">
// 			    	<div className="col-xl-12">
//                         <div className="card">            
//                             <div className="card-body p-0">
//                                 <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">   
//                                     <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
//                                         <h4 className="heading mb-0">Companies</h4>                                        
//                                         <div>
                                            
//                                             <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"                                            
//                                                 onClick={()=>company.current.showModal()}
//                                             ><IoMdAdd/></Link> {" "}
//                                         </div>
//                                     </div>          
//                                    <TableData tableData={tableData} headers={headers[0]}
//                                     setTableData={setTableData}/>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <CompanyOffcanvas 
//                 ref={company}
//                 Title="Add Company"
//             />
            
//         </>
//     );
// };
// export default Company;

import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { CSVLink } from 'react-csv';

import { IMAGES } from '../../constant/theme';
import MainPagetitle from '../../layouts/MainPagetitle';
import InviteCustomer from '../../constant/ModalList';
import CompanyOffcanvas from '../../constant/CompanyOffcanvas';
import EditCompanyOffcanvas from '../../constant/EditCompanyCanvas';
import TableData from "../../components/Tables/TableData"
import {CompanyTable} from "../../components/Tables/Tables";

// const csvlink = {
//     headers : headers,
//     data : tableData,
//     filename: "csvfile.csv"
// }

const Company = () => {  
    const [data, setData] = useState(
		document.querySelectorAll("#employee-tbl_wrapper tbody tr")
	);
    const [tableData, setTableData] = useState(CompanyTable);
    const [editTableData, setEditTableData] = useState([]);
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
    console.log(tableData);

   }
   // for editing data in table
   const editDrawerOpen = (item)=>{
    // console.log(item);
    setEditTableData(item);
    edit.current.showModal();


   }

    const invite = useRef();
    // const employe = useRef();
    const company = useRef();
    const edit = useRef();
    return (
        <>
            <MainPagetitle mainTitle="Company" pageTitle={'Company'} parentTitle={'Home'} />  
            <div className="container-fluid">
				<div className="row">
			    	<div className="col-xl-12">
                        <div className="card">            
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">   
                                    <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                                        <h4 className="heading mb-0">Companies</h4>                                        
                                        <div>
                                            
                                            <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"                                            
                                                onClick={()=>company.current.showModal()}
                                            >+ Add Company</Link> {" "}
                                              <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"                                            
                                                onClick={()=>edit.current.showModal()}
                                            >+ Edit Company</Link> {" "}
                                           
                                        </div>
                                    </div>          
                                    <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                            <thead>
                                                <tr>  
                                                <th>Short Name</th>                                                 
                                                    <th>Resller</th>
                                                    <th>Application</th>
                                                    <th>User Name</th>
                                                    <th>Mobile Number</th>
                                                    <th>User Group</th>
                                                    <th>Location</th>
                                                  
                                                    <th>Payment Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               <TableData tableData={tableData} onConfirmDelete={onConfirmDelete} editDrawerOpen={editDrawerOpen}/>
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
                                                    to="/company"
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
                                                        to="/company"
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
                                                    to="/company"
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
            <CompanyOffcanvas 
                ref={company}
                Title="Add Company"
            />
             <EditCompanyOffcanvas
                ref={edit}
                Title="Edit Company"
                editTableData={editTableData}
            />
            
        </>
    );
};
export default Company;

