import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';

import MainPagetitle from '../../../layouts/MainPagetitle';
import { DriverData } from '../../../components/Tables/Tables';
import FilterOffcanvas from '../../../constant/FilterOffcanvas';
import DriverTable from '../../../components/Tables/DriverTable';

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

const DriverBehaviour = (ref) => {
    const[tableData, setTableData] = useState(DriverData)
    const [editData , setEditData] = useState({
        id:0,
        status:'',    
        title:'',
        contact:0,
        age:0,
        drivingExperience:0,
        gender:'',
        location:''
    });
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

    // const[formData, setFormData] = useState()

    

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
        tableData.map((table)=>(
            table.id === item && setEditData(table)
        ))

        // setEditTableData(item);
        filter.current.showModal();
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const updateTable = tableData.map((table)=>{
            if(table.id === editData.id) {
                console.log(table.id)   
                return {...table, ...editData };
            }
            return table;
        })
        setTableData(updateTable)
    }  

    const filter = useRef();
    return (
        <>
            <MainPagetitle mainTitle="DriverBehaviour" pageTitle={'DriverBehaviour'} parentTitle={'Home'} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                                    <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                                        <h4 className="heading mb-0">DriverBehaviour</h4>
                                        <div>
 
                                            <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"
                                                onClick={() => filter.current.showModal()}
                                            >+ Filter</Link> {" "}

                                        </div>
                                    </div>
                                    <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Employee ID</th>
                                                    <th>Employee Name</th>
                                                    <th>Age</th>
                                                    <th>Contact Number</th>
                                                    <th>Gender</th>
                                                    <th>Driving Experience</th>
                                                    <th>Location</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <DriverTable editData={editData} tableData={tableData} onConfirmDelete={onConfirmDelete} editDrawerOpen={editDrawerOpen} setEditData={setEditData}/>
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
                                                    to="/driver"
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
                                                        to="/driver"
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
                                                    to="/driver"
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
            <FilterOffcanvas 
                ref={filter}
                editData={editData}
                setEditData={setEditData}
                handleSubmit={handleSubmit}
                Title={ editData.id === 0 ? "Add Filter" : "Edit Filter"}
            />
        </>
    );
};

export default DriverBehaviour;