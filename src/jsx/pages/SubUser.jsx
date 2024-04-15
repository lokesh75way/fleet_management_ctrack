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
import usePagination from "../../hooks/usePagination";
import ReactPaginate from "react-paginate";
import { ICON } from "../constant/theme";
import Paginate from "../components/Pagination/Paginate";


  const SubUser = () => {

    const {t} = useTranslation();
    const {isRtl} = useContext(ThemeContext);
    const {can, setUserPermission} = usePermissions()
    const arrowleft = clsx({'fa-solid fa-angle-right':isRtl, 'fa-solid fa-angle-left':!isRtl})
    const arrowright = clsx({'fa-solid fa-angle-left':isRtl, 'fa-solid fa-angle-right':!isRtl})
    //call get api from userservice
    const [isLoading, setIsLoading] = useState(true);
    const { page, nextPage, prevPage, goToPage, setCount, totalCount } =
    usePagination();

    const fetchUser = async () => {
      setIsLoading(true)
      const {data,count } = await getUser(page);
      const permissions = JSON.parse(localStorage.getItem('permission'));
      setUserPermission(permissions?.[0]?.permission);
      setTableData(data)
      setCount(count)
      setIsLoading(false);
    };
    useEffect(() => {
      fetchUser(page);
    }, [page]);
    
  const navigate = useNavigate();
  // const {checkRole,checkUserName} = useStorage()
  // const role = checkRole()
  // const userName = checkUserName()
  // const userData = JSON.parse(localStorage.getItem('userJsonData'))
  // const currUser = JSON.parse(localStorage.getItem('userDetails'))
  // var UserData;
  // if(checkRole() === 'COMPANY'){
  //   UserData = userData?.filter((item)=> (item.role === 'USER' && item.type === 'STAFF' && item.companyId === currUser.user.companyId))
  // }

  // else if(checkRole() === 'BUSINESS_GROUP'){
  //   UserData = userData?.filter((item)=> (item.role === 'user' && item.type === 'businessgroup' && item.parent === userName))
  // } 
  // else if(checkRole() === 'SUPER_ADMIN') UserData = userData?.filter((item)=> item.role === 'USER' && item.type === 'STAFF' )
  // else if(checkRole() === "USER") {
    // UserData = userData?.filter((item) => {
      // console.log(item, "iteeem");
      // return item.role === 'USER' && item.type === 'STAFF' && item.companyId === currUser.user.companyId;
    // });
  // }

  const [tableData, setTableData] = useState([] );

  const onConfirmDelete = async (id) => {
     await deleteUser(id);
  };

  const editDrawerOpen = (item) => {
    navigate(`/subUser/edit/${item}`);
  };

  const itemsPerPage=10;

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1); 
  };

  const startIndex = (page - 1) * itemsPerPage;
  const slicedData = tableData.slice(startIndex, startIndex + itemsPerPage);
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
                        <SubUserTable key={tableData} currentPage={page} 
                            itemsPerPage={itemsPerPage}  tableData={tableData} onConfirmDelete={onConfirmDelete} editDrawerOpen={editDrawerOpen} />
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className="dataTables_info">
                        {t("showing")} {(page - 1) * 10 + 1} {t("to")}{" "}
                        {Math.min(page * 10, totalCount)} {t("of")} {totalCount}{" "}
                        {t("entries")}
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example2_paginate"
                      >
                        <Paginate
                            pageCount={Math.ceil(totalCount / itemsPerPage)}
                            handlePageClick={handlePageClick}
                            isRtl={isRtl}
                          />
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
