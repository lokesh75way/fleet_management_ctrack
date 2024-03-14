
import React, {useState, useRef, useEffect,useContext} from 'react';
import {Link} from 'react-router-dom';
import MainPagetitle from '../layouts/MainPagetitle';
import SubCompanyOffcanvas from '../constant/SubCompanyOffcanvas';
import { SubCompanyData } from '../components/Tables/Tables';
import GroupTable from '../components/Tables/GroupTable';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';


const CreateGroups = () => {

    const { groupsDataState,setGroupsDataState } = useContext(ThemeContext);
    console.log('printing from group page',groupsDataState);

    const navigate = useNavigate();

    const [data, setData] = useState(
        document.querySelectorAll("#employee-tbl_wrapper tbody tr")
    );
    const [tableData , setTableData] = useState(SubCompanyData);
    const [editData , setEditData] = useState({
        id:0,
        reseller:'',
        contact:0,
        username:'',
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
    const onConfirmDelete = (index) => {
        
        console.log('index is ',index);
        const newdata = groupsDataState.filter((e,i)=>{
            if(index != i) return e;
        })

        setGroupsDataState(newdata);

    }
    const editDrawerOpen = (item)=>{
        console.log(item)
        tableData.map((table)=>(
            table.id === item && setEditData(table)
        ))
        subCompany.current.showModal();
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
    const subCompany = useRef();


    

    const handleAddGroup = ()=>{
        navigate('permission');
    }


    return (
        <>
            <MainPagetitle mainTitle="Feature Templates" pageTitle={'Feature Templates'} parentTitle={'Settings'} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                                    <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                                        <h4 className="heading mb-0">Feature Template</h4>
                                        <div>
                                            <button  className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"
                                                onClick={handleAddGroup}
                                            >+ Add New</button> {""}
                                        </div>
                                    </div>
                                    <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Short Name</th>
                                                    <th>Template Name</th>
                                                    <th>Username</th>
                                                    <th>Contact Number</th>
                                                    <th>Location</th>
                                                    <th>User Template</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <GroupTable editData={editData} tableData={groupsDataState} onConfirmDelete={onConfirmDelete} editDrawerOpen={editDrawerOpen} setEditData={setEditData}/>
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
                                                    to="/groups"
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
                                                        to="/groups"
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
                                                    to="/groups"
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
                editData={editData}
                setEditData={setEditData}
                handleSubmit={handleSubmit}
                Title={ editData.id === 0 ? "Add Sub Company" : "Edit Sub Company"}
            />
        </>
    );
};
export default CreateGroups;