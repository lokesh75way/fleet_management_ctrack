import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MainPagetitle from "../layouts/MainPagetitle";
import { useNavigate } from "react-router-dom";
import SubUserTable from "../components/Tables/SubUserTable";
import { clsx } from 'clsx';
import {useTranslation} from 'react-i18next'
import {getUser, deleteUser} from '../../services/api/UserServices'
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import { usePermissions } from "../../context/PermissionContext";
import useStorage from "../../hooks/useStorage";


  const SubUser = () => {

    const {t} = useTranslation();
    const {isRtl} = useContext(ThemeContext);
    const {can} = usePermissions()
    const arrowleft = clsx({'fa-solid fa-angle-right':isRtl, 'fa-solid fa-angle-left':!isRtl})
    const arrowright = clsx({'fa-solid fa-angle-left':isRtl, 'fa-solid fa-angle-right':!isRtl})
    //call get api from userservice
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true)
        const {data} = await getUser();
        setTableData(data)
        setIsLoading(false);
      };
      fetchData();
    }, []);
    
  const navigate = useNavigate();
  const {checkRole,checkUserName} = useStorage()
  const role = checkRole()
  const userName = checkUserName()
  const userData = JSON.parse(localStorage.getItem('userJsonData'))
  var UserData;
  if(checkRole() === 'COMPANY'){
    UserData = userData.filter((item)=> (item.role === 'user' && item.type === 'STAFF' ))
  }

  else if(checkRole() === 'BUSINESS_GROUP'){
    UserData = userData.filter((item)=> (item.role === 'user' && item.type === 'businessgroup' && item.parent === userName))
  } 
  else if(checkRole() === 'SUPER_ADMIN') UserData = userData.filter((item)=> item.role === 'USER' && (item.type === 'ADMIN' || item.type === 'STAFF') )

  const [tableData, setTableData] = useState([] );
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
  const onConfirmDelete = async (id) => {
     await deleteUser(id);
  
  };
  const editDrawerOpen = (item) => {
    navigate(`/subUser/edit/${item}`);
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
                      {can('subUser','add') && <Link
                        to={"/subUser/create"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        // onClick={()=>subuser.current.showModal()}
                      >
                        + {t('addUser')}
                      </Link>}{" "}
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
                          {(can('subUser','modify') || can('subUser','delete')) && <th>{t('action')}</th>}
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
    </>
  );
};

export default SubUser;
