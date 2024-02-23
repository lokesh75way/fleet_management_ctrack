// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { CSVLink } from 'react-csv';
// import { IMAGES, SVGICON } from '../../constant/theme';
// import MainPagetitle from '../../layouts/MainPagetitle';
// import InviteCustomer from '../../constant/ModalList';
// import CompanyOffcanvas from '../../constant/CompanyOffcanvas';
// import EditCompanyOffcanvas from '../../constant/EditCompanyCanvas';
// import { IoMdAdd } from "react-icons/io";
// import DeleteWithConfirm from '../../components/Drawer/DeleteDrawer';


// const TableData = ({ tableData, headers, onEdit, onDelete }) => {

//     const [data, setData] = useState(
//         document.querySelectorAll("#employee-tbl_wrapper tbody tr")
//     );
//     const [deletedrawer, setDeleteDrawer] = useState(false);
//     const [formData, setFormData] = useState(null);
//     const sort = 10;
//     const activePag = useRef(0);
//     const [test, settest] = useState(0);
//     const chageData = (frist, sec) => {
//         for (var i = 0; i < data.length; ++i) {
//             if (i >= frist && i < sec) {
//                 data[i].classList.remove("d-none");
//             } else {
//                 data[i].classList.add("d-none");
//             }
//         }
//     };

//     useEffect(() => {
//         setData(document.querySelectorAll("#employee-tbl_wrapper tbody tr"));
//     }, [test]);

//     activePag.current === 0 && chageData(0, sort);
//     let paggination = Array(Math.ceil(data.length / sort))
//         .fill()
//         .map((_, i) => i + 1);
//     const onClick = (i) => {
//         activePag.current = i;
//         chageData(activePag.current * sort, (activePag.current + 1) * sort);
//         settest(i);
//     };

//     //for deleting the data in table
//     const handleDelete = (id) => {

//     }
//     const handleEdit = (item) => {
//         edit.current.showModal();
//         setFormData(item);
//     }
//     const edit = useRef();
//     return (
//         <>
//             <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
//                 <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
//                     <thead>
//                         <tr>
//                             <th>{headers.First}</th>
//                             <th>{headers.Second}</th>
//                             <th>{headers.Third}</th>
//                             <th>{headers.Fourth}</th>
//                             <th>{headers.Five}</th>
//                             <th>{headers.Six}</th>
//                             <th>{headers.Seven}</th>
//                             <th>{headers.Eight}</th>
//                             <th>{headers.Nine}</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tableData.map((item, index) => (
//                             <tr key={item.id}>
//                                 <td><span>{item.id}</span></td>
//                                 <td>
//                                     <div className="products">
//                                         <img src={item.image} className="avatar avatar-md" alt="" />
//                                         <div>
//                                             <h6>{item.title}</h6>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td><span>{item.department}</span></td>
//                                 <td><span className="text-primary">{item.email}</span></td>
//                                 <td>
//                                     <span>{item.contact}</span>
//                                 </td>
//                                 <td>
//                                     <span>{item.usergroup}</span>
//                                 </td>
//                                 <td>
//                                     <span>{item.location}</span>
//                                 </td>
//                                 <td>
//                                     <span className={`badge light border-0 ${item.status === "Active" ? 'badge-success' : 'badge-danger'} `} style={{ width: "50%" }}>{item.status}</span>
//                                 </td>
//                                 <td>
//                                     <span className='row'>
//                                         <span className='cursor-pointer col-xl-6' onClick={() => onEdit(item)}>{item.edit}</span>
//                                         <DeleteWithConfirm onClick={() => onDelete(item.id)}>{item.delete}</DeleteWithConfirm>

//                                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
//                 <div className="d-sm-flex text-center justify-content-between align-items-center">
//                     <div className="dataTables_info">
//                         Showing {activePag.current * sort + 1} to{" "}
//                         {data.length > (activePag.current + 1) * sort
//                             ? (activePag.current + 1) * sort
//                             : data.length}{" "}
//                         of {data.length} entries
//                     </div>
//                     <div
//                         className="dataTables_paginate paging_simple_numbers"
//                         id="example2_paginate"
//                     >
//                         <Link
//                             className="paginate_button previous disabled"
//                             to="/company"
//                             onClick={() =>
//                                 activePag.current > 0 &&
//                                 onClick(activePag.current - 1)
//                             }
//                         >
//                             <i className="fa-solid fa-angle-left" />
//                         </Link>
//                         <span>
//                             {paggination.map((number, i) => (
//                                 <Link
//                                     key={i}
//                                     to="/company"
//                                     className={`paginate_button  ${activePag.current === i ? "current" : ""
//                                         } `}
//                                     onClick={() => onClick(i)}
//                                 >
//                                     {number}
//                                 </Link>
//                             ))}
//                         </span>
//                         <Link
//                             className="paginate_button next"
//                             to="/company"
//                             onClick={() =>
//                                 activePag.current + 1 < paggination.length &&
//                                 onClick(activePag.current + 1)
//                             }
//                         >
//                             <i className="fa-solid fa-angle-right" />
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//             <EditCompanyOffcanvas
//                 ref={edit}
//                 Title="Edit Company"
//                 formData={formData}
//                 tableData={tableData}
//                 setTableData={()=>{}}
//                 headers={headers}
//             />

//         </>
//     )
// }

// export default TableData

import React from 'react'
import DeleteWithConfirm from '../../components/Drawer/DeleteDrawer';

const TableData = ({ tableData,onConfirmDelete,editDrawerOpen }) => {
    return (
        <>
            {tableData.map((item, index) => (
                <tr key={index}>
                    <td><span>{item.id}</span></td>
                    <td>
                        <div className="products">
                            <img src={item.image} className="avatar avatar-md" alt="" />
                            <div>
                                <h6>{item.title}</h6>
                            </div>
                        </div>
                    </td>
                    <td><span>{item.department}</span></td>
                    <td><span className="text-primary">{item.email}</span></td>
                    <td>
                        <span>{item.contact}</span>
                    </td>
                    <td>
                        <span>{item.usergroup}</span>
                    </td>
                    <td>
                        <span>{item.location}</span>
                    </td>
                    <td>
                        <span className={`badge light border-0 ${item.status === "Active" ? 'badge-success' : 'badge-danger'} `} style={{ width: "45%" }}>{item.status}</span>
                    </td>
                    <td>
                        <span className='row'>
                            <span className='cursor-pointer col-xl-6' onClick={()=>editDrawerOpen(item)} >{item.edit}</span>
                            <DeleteWithConfirm onConfirmDelete={onConfirmDelete} id={item.id} >{item.delete}</DeleteWithConfirm>

                        </span>                                </td>
                </tr>
            ))}
        </>
    )
}

export default TableData