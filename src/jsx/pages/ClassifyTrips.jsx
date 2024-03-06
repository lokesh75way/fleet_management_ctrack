import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';

import { IMAGES } from '../constant/theme';
import MainPagetitle from '../layouts/MainPagetitle';
import InviteCustomer from '../constant/ModalList';
import ClassifyTripTable from '../components/Tables/ClassifyTripTable';
import {ClassifyTripData} from '../components/Tables/Tables';
import ClassifyTripsFilterOffcanvas from '../constant/ClassifyTripsFilterOffcanvas'
import ClassifyTripsOffcanvas from '../constant/ClassifyTripsOffcanvas'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {classifyTripsSchema} from '../../yup'

const ClassifyTrip = (ref) => {
    const[tableData, setTableData] = useState(ClassifyTripData)
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
        control,
      } = useForm({
        resolver: yupResolver(
            classifyTripsSchema
        ),
      });
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
        classifyTrips.current.showModal();
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
    const onSubmit = (data) => {
        console.log(data);
      };  

    const classifyTrips = useRef();
    const classifyTripsFilter = useRef();
    return (
        <>
            <MainPagetitle mainTitle="Classify Trip" pageTitle={'Classify Trip'} parentTitle={'Settings'} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                                    <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                                        <h4 className="heading mb-0">Classify Trip</h4>
                                        <div className=''>
 
                                            <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"
                                                onClick={() => classifyTripsFilter.current.showModal()}
                                            >+ Filter</Link> {" "}
 
                                            <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"
                                                onClick={() => classifyTrips.current.showModal()}
                                            >+ Add Trips</Link> {" "}
                                        </div>
                                    </div>
                                    <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Trip ID</th>
                                                    <th>Start Time</th>
                                                    <th>Start Location</th>
                                                    <th>Reach Time</th>
                                                    <th>Reach Location</th>
                                                    <th>Distance</th>
                                                    <th>Fuel Consumption</th>
                                                    <th>Driver</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <ClassifyTripTable editData={editData} tableData={tableData} onConfirmDelete={onConfirmDelete} editDrawerOpen={editDrawerOpen} setEditData={setEditData}/>
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
                                                    to="/classifyTrip"
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
                                                        to="/classifyTrip"
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
                                                    to="/classifyTrip"
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
            <ClassifyTripsFilterOffcanvas 
                ref={classifyTripsFilter}
                // editData={editData}
                // setEditData={setEditData}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                control={control}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                Title={"Add Filter"}
            />
            <ClassifyTripsOffcanvas 
                ref={classifyTrips}
                // editData={editData}
                // setEditData={setEditData}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                control={control}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                Title={"Add Trips"}
            />
        </>
    );
};

export default ClassifyTrip;