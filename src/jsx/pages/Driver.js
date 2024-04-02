import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainPagetitle from "../layouts/MainPagetitle";
import DriverTable from "../components/Tables/DriverTable";
import { clsx } from "clsx";

import { ThemeContext } from "../../context/ThemeContext";
import useStorage from "../../hooks/useStorage";
import {useTranslation} from 'react-i18next'
import { deleteDrivers, getDrivers } from "../../services/api/driverService";
import { notifyError } from "../../utils/toast";

const Driver = () => {
  const { isRtl } = useContext(ThemeContext);
  const arrowleft = clsx({
    "fa-solid fa-angle-right": isRtl,
    "fa-solid fa-angle-left": !isRtl,
  });
  const arrowright = clsx({
    "fa-solid fa-angle-left": isRtl,
    "fa-solid fa-angle-right": !isRtl,
  });
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  async function getDriversData(pageNo = 1, limit = 10) {
    try {
      const { data, totalLength } = await getDrivers(pageNo, limit);
      setTableData(data);
    } catch (error) {
      notifyError("Some error occured !!");
    }
  }

  useEffect(() => {
    getDriversData();
  }, []);

  const [editData, setEditData] = useState({
    id: 0,
    status: "",
    title: "",
    contact: 0,
    age: 0,
    drivingExperience: 0,
    gender: "",
    location: "",
  });
  const [data, setData] = useState(
    document.querySelectorAll("#employee-tbl_wrapper tbody tr")
  );

  const {t} = useTranslation();
  const sort = 10;
  const activePage = useRef(0);
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
  }, [test, tableData]);

  activePage.current === 0 && chageData(0, sort);
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);
  const onClick = (i) => {
    activePage.current = i;
    chageData(activePage.current * sort, (activePage.current + 1) * sort);
    settest(i);
  };

  const onConfirmDelete = async (id) => {
    try {
      await deleteDrivers({ driverIds: [id] });
      const updatedData = tableData.filter((item) => item._id !== id);
      setTableData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };
  const editDrawerOpen = (item) => {
    setEditData(item);
    navigate(`/driver/edit/${item._id}`);
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t('drivers')}
        pageTitle={t('drivers')}
        parentTitle={t('home')}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t('drivers')}</h4>
                    <div>
                      <Link
                        to={"/driver/create"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        // onClick={() => employe.current.showModal()}
                      >
                        + {t('addDriver')}
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
                          <th>{t('employeeName')}</th>
                          <th>{t('age')}</th>
                          <th>{t('contactNumber')}</th>
                          <th>{t('drivingExperienceSince')}</th>
                          <th>{t('city')}</th>
                          <th>{t('status')}</th>
                          <th>{t('action')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <DriverTable
                          editData={editData}
                          tableData={tableData}
                          onConfirmDelete={onConfirmDelete}
                          editDrawerOpen={editDrawerOpen}
                          setEditData={setEditData}
                        />
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className="dataTables_info">
                      {t('showing')} {activePage.current * sort + 1} {t('to')}{" "}
                        {data.length > (activePage.current + 1) * sort
                          ? (activePage.current + 1) * sort
                          : data.length}{" "}
                        {t('of')} {data.length} {t('entries')}
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example2_paginate"
                      >
                        <Link
                          className="paginate_button previous disabled"
                          to="/driver"
                          onClick={() =>
                            activePage.current > 0 &&
                            onClick(activePage.current - 1)
                          }
                        >
                          <i className={arrowleft} />
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/driver"
                              className={`paginate_button  ${
                                activePage.current === i ? "current" : ""
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
                            activePage.current + 1 < paggination.length &&
                            onClick(activePage.current + 1)
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

export default Driver;
