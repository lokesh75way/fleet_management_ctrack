import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import MainPagetitle from "../layouts/MainPagetitle";
import { useNavigate } from "react-router-dom";
import SubUserTable from "../components/Tables/SubUserTable";
import useStorage from "../../hooks/useStorage";
import { clsx } from 'clsx';
import {useTranslation} from 'react-i18next'
import UserServices from '../../services/api/UserServices'
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { notifyError, notifySuccess } from "../../utils/toast";
// import CompanyOffcanvas from '../../constant/CompanyOffcanvas';
// const csvlink = {
  //     headers : headers,
  //     data : tableData,
  //     filename: "csvfile.csv"
  // }
  const SubUser = () => {

    const {t} = useTranslation();
    const {isRtl} = useContext(ThemeContext);
    const arrowleft = clsx({'fa-solid fa-angle-right':isRtl, 'fa-solid fa-angle-left':!isRtl})
    const arrowright = clsx({'fa-solid fa-angle-left':isRtl, 'fa-solid fa-angle-right':!isRtl})
    //call get api from userservice
    const [fetchtableData, fetchSetTableData] = useState([]);

    useEffect(() => {
      UserServices.getUser()
      .then(response => {
        console.log(response, 'response')
        if(response?.data?.success === true){
          fetchSetTableData(response.data.data)
          const fusers = response.data.data.data
          localStorage.setItem("userJsonData", JSON.stringify(fusers));

        }else{
          notifyError(response?.message?.message)
        }
      }).catch(error => {
        notifyError(error?.message?.message);
      })
    }, [])
  const navigate = useNavigate();
  const {checkRole,checkUserName} = useStorage()
  const role = checkRole()
  const userName = checkUserName()
  const userData = JSON.parse(localStorage.getItem("userJsonData"));
  var UserData;
  if(checkRole() === 'company'){
    UserData = userData.filter((item)=> (item.role === 'user' && item.type === 'company' && item.parent === userName))
  }
  else if(role === 'businessgroup'){
    UserData = userData.filter((item)=> (item.role === 'user' && item.type === 'businessgroup' && item.parent === userName))
  } 
  else if(checkRole() === 'admin') UserData = userData.filter((item)=> item.role === 'user' && item.type === 'admin'  )

  const [tableData, setTableData] = useState(UserData);
  const [editData, setEditData] = useState();
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
  const onConfirmDelete = (id) => {
    UserServices.deleteUser(id)
    .then(response => {
      if(response?.data?.success === true){
        notifySuccess("User deleted successfully !!");
        const existingData = JSON.parse(localStorage.getItem("userJsonData"));
        const index = existingData.findIndex((item) => item._id === id);
        console.log(index, 'index')
        existingData.splice(index, 1);
        localStorage.setItem("userJsonData", JSON.stringify(existingData));
        const updatedData = tableData.filter((item) => item._id !== id);
        setTableData(updatedData);
        
      }else{
        notifyError(response?.message?.message)
      }
    }).catch(error => {
      notifyError(error?.message?.message);
    })

    
  };
  const editDrawerOpen = (item) => {
    // tableData.map((table) => table.id === item && setEditData(table));
    navigate(`/subUser/edit/${item}`);
    // setEditTableData(item);
  };
  return (
    <>
      <MainPagetitle mainTitle="User" pageTitle={"User"} parentTitle={"Home"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t('users')}</h4>
                    <div>
                      <Link
                        to={"/subUser/create"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        // onClick={()=>subuser.current.showModal()}
                      >
                        + {t('addUser')}
                      </Link>{" "}
                    </div>
                  </div>
                  <div
                    id="employee-tbl_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <table
                      id="empoloyees-tblwrapper"
                      className="table ItemsCheckboxSec dataTable no-footer mb-0"
                    >
                      <thead>
                        <tr>
                          <th>{t('id')}</th>
                          <th>{t('username')}</th>
                          <th>{t('mobileNumber')}</th>
                          <th>{t('email')}</th>
                          <th>{t('location')}</th>
                          <th>{t('action')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <SubUserTable tableData={tableData} onConfirmDelete={onConfirmDelete} editDrawerOpen={editDrawerOpen} />
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
                          to="/subUser"
                          onClick={() =>
                            activePag.current > 0 &&
                            onClick(activePag.current - 1)
                          }
                        >
                          <i className={arrowleft} />
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
                          to="/subUser"
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
      {/* <CompanyOffcanvas 
                ref={subuser}
                Title="Add Sub User"
            /> */}
    </>
  );
};

export default SubUser;
