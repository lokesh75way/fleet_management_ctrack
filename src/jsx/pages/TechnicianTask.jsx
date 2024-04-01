import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';

import { IMAGES } from '../constant/theme';
import MainPagetitle from '../layouts/MainPagetitle';
import InviteCustomer from '../constant/ModalList';
import {TechnicianTaskData} from '../components/Tables/Tables'
import TechnicianTaskTable from '../components/Tables/TechnicianTaskTable';
import TechnicianTaskOffcanvas from '../constant/TechnicianTaskOffcanvas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {technicianTaskSchema} from '../../yup'
import {useTranslation} from 'react-i18next'

import { clsx } from 'clsx';
import { ThemeContext } from '../../context/ThemeContext';

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

const TechnicianTask = (ref) => {

    const { t } = useTranslation();
    const {isRtl} = useContext(ThemeContext);
    const arrowleft = clsx({'fa-solid fa-angle-right':isRtl, 'fa-solid fa-angle-left':!isRtl})
    const arrowright = clsx({'fa-solid fa-angle-left':isRtl, 'fa-solid fa-angle-right':!isRtl})
    const[tableData, setTableData] = useState(TechnicianTaskData)
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
    const {register, formState:{errors}, setValue, getValues, control, handleSubmit,clearErrors} = useForm({
        resolver: yupResolver(technicianTaskSchema )
      })
    
      const onSubmit = (data)=>{
        console.log(data)
      } 

    const technicianTask = useRef();
    return (
        <>
            <MainPagetitle mainTitle={t('technicianTask')} pageTitle={t('technicianTask')} parentTitle={t('technician')} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                                    <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                                        <h4 className="heading mb-0">{t('technicianTask')}</h4>
                                        <div>
 
                                            <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"
                                                onClick={() => technicianTask.current.showModal()}
                                            >+ {t('addTechnicianTask')}</Link> {" "}
                                           
                                        </div>
                                    </div>
                                    <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                            <thead>
                                                <tr>
                                                    <th>{t('id')}</th>
                                                    <th>{t('taskName')}</th>
                                                    <th>{t('taskCategory')}</th>
                                                    <th>{t('technicianName')}</th>
                                                    <th>{t('serviceLocation')}</th>
                                                    <th>{t('reportingTime')}</th>
                                                    <th>{t('action')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <TechnicianTaskTable editData={editData} tableData={tableData} onConfirmDelete={onConfirmDelete} editDrawerOpen={editDrawerOpen} setEditData={setEditData}/>
                                            </tbody>
                                            
                                        </table>
                                        <div className="d-sm-flex text-center justify-content-between align-items-center">
                                            <div className="dataTables_info">
                                            {t('showing')} {activePag.current * sort + 1} {t('to')}{" "}
                                                {data.length > (activePag.current + 1) * sort
                                                    ? (activePag.current + 1) * sort
                                                    : data.length}{" "}
                                                {t('of')} {data.length} {t('entries')}
                                            </div>
                                            <div
                                                className="dataTables_paginate paging_simple_numbers"
                                                id="example2_paginate"
                                            >
                                                <Link
                                                    className="paginate_button previous disabled"
                                                    to="/technicianTask"
                                                    onClick={() =>
                                                        activePag.current > 0 &&
                                                        onClick(activePag.current - 1)
                                                    }
                                                >
                                                    <i className={arrowleft}/>
                                                </Link>
                                                <span>
                                                    {paggination.map((number, i) => (
                                                    <Link
                                                        key={i}
                                                        to="/technicianTask"
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
                                                    to="/technicianTask"
                                                    onClick={() =>
                                                        activePag.current + 1 < paggination.length &&
                                                        onClick(activePag.current + 1)
                                                    }
                                                >
                                                    <i className={arrowright} />
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
            <TechnicianTaskOffcanvas 
                ref={technicianTask}
                editData={editData}
                control={control}
                setValue={setValue}
                getValues={getValues}
                onSubmit={onSubmit}
                register={register}
                errors={errors}
                setEditData={setEditData}
                handleSubmit={handleSubmit}
                clearErrors={clearErrors}
                Title={ editData.id === 0 ? t('addTask') : t('editTask')}
            />
        </>
    );
};

export default TechnicianTask;