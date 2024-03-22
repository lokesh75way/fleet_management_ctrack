import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";

import { IMAGES } from "../constant/theme";
import MainPagetitle from "../layouts/MainPagetitle";
import InviteCustomer from "../constant/ModalList";
import TechnicianTable from "../components/Tables/TechnicianTable";
import {useTranslation} from 'react-i18next'

import { clsx } from 'clsx';

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

// const csvlink = {
  //     headers : headers,
  //     data : tableData,
  //     filename: "csvfile.csv"
  // }
  
  const Technician = () => {

    const {t} = useTranslation();
    const {isRtl} = useContext(ThemeContext);
    const arrowleft = clsx({'fa-solid fa-angle-right':isRtl, 'fa-solid fa-angle-left':!isRtl})
    const arrowright = clsx({'fa-solid fa-angle-left':isRtl, 'fa-solid fa-angle-right':!isRtl})
    const userData = JSON.parse(localStorage.getItem("userJsonData"));
const techData = userData.filter((item)=>item.designation === 'Technician')

  const [tableData, setTableData] = useState(techData);
  const [editData, setEditData] = useState();
  const [data, setData] = useState(
    document.querySelectorAll("#employee-tbl_wrapper tbody tr")
  );
  const navigate = useNavigate();
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
  const onConfirmDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);

      // Remove item from local storage
      const updatedLocalStorageData = userData.filter((item) => item.id !== id);
      localStorage.setItem('userJsonData', JSON.stringify(updatedLocalStorageData)); 
  };
  const editDrawerOpen = (item) => {
    // tableData.map((table) => table.id === item && setEditData(table));
    navigate(`/technician/edit/${item}`);
    // setEditTableData(item);
  };

  const invite = useRef();
  const technical = useRef();
  return (
    <>
      <MainPagetitle
        mainTitle={t('technicianDetails')}
        pageTitle={t('technicianDetails')}
        parentTitle={t('technician')}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t('technician')}</h4>
                    <div>
                      {/* <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-1">
                                                <i className="fa-solid fa-file-excel" /> {" "} 
                                                Export Report
                                            </CSVLink>  */}
                      <Link
                        to={"/technician/details/create"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                      >
                        + {t('technician')}
                      </Link>{" "}
                      {/* <button type="button" className="btn btn-secondary btn-sm"                                                 
                                                onClick={() => invite.current.showInviteModal()}
                                            >+ Invite Employee
                                            </button> */}
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
                          <th>{t('technicianId')}</th>
                          <th>{t('technicianName')}</th>
                          <th>{t('email')}</th>
                          <th>{t('contactNumber')}</th>
                          <th>{t('location')}</th>
                          <th>{t('technicianNumber')}</th>
                          <th>{t('action')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <TechnicianTable
                          onConfirmDelete={onConfirmDelete}
                          editDrawerOpen={editDrawerOpen}
                          tableData={tableData}
                        />
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
                          to="/technician"
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
                              to="/technician"
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
                          to="/technician"
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
      {/* <TechnicalOffCanvas 
                ref={technical}
                Title="Add Technician"
            /> */}
      {/* <InviteCustomer
                ref={invite}       
                Title="Invite Employee"
            /> */}
    </>
  );
};

export default Technician;
