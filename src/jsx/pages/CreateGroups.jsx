import React, {useState, useRef, useEffect,useContext} from 'react';
import {Link} from 'react-router-dom';
import MainPagetitle from '../layouts/MainPagetitle';
import GroupTable from '../components/Tables/GroupTable';
import { useNavigate } from 'react-router-dom';
import TemplateServices from '../../services/api/TemplateServices';


const CreateGroups = () => {


    // const templateData = JSON.parse(localStorage.getItem("templateData")) || []

    useEffect(() => {
        const fetchData = async () => {
          try {
            const templateData = await TemplateServices.getModules();
            console.log("Received template data:", templateData);
            setGroupsDataState(templateData.data); // Assuming 'data' property contains template data array
          } catch (error) {
            console.error("Error fetching template data:", error);
          }
        };
    
        fetchData();
      }, []);
    

    const [groupsDataState,setGroupsDataState] = useState([])
    const [isEditTrue,setIsEditTrue] = useState(-1)

    const navigate = useNavigate();

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
    const getAllModules = async()=>{
        const {data,isSuccess} = await TemplateServices.getModules()
        console.log(data)
        return data
    }

    // useEffect(()=>{
    //     const data = getAllModules();
    //     setGroupsDataState(data)
    // },[])

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

        const newdata = groupsDataState.filter((e,i)=>{
            if(index != i) return e;
        })
        localStorage.setItem('templateData', JSON.stringify(newdata))
        setGroupsDataState(newdata);

    }

    const handleAddGroup = ()=>{
        const props = {
            isEditTrue,setIsEditTrue
        }
        navigate('permission',{state:JSON.stringify(props)});
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
                                            <GroupTable isEditTrue={isEditTrue} setIsEditTrue={setIsEditTrue} tableData={groupsDataState} onConfirmDelete={onConfirmDelete}/>
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
        </>
    );
};
export default CreateGroups;