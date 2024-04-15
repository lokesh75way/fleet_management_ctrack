import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MainPagetitle from "../layouts/MainPagetitle";
import InviteCustomer from "../constant/ModalList";
import EmployeeOffcanvas from "../constant/EmployeeOffcanvas";
import { GeofenceData } from "../components/Tables/Tables";
import GeofenceTable from "../components/Tables/GeofenceTable";
import { useTranslation } from "react-i18next";
import { notifyError, notifySuccess } from "../../utils/toast";
import {
  deleteGeofenceData,
  getGeofenceData,
} from "../../services/api/GeoFenceService";
import usePagination from "../../hooks/usePagination";
import { ThemeContext } from "../../context/ThemeContext";
import clsx from "clsx";
import ReactPaginate from "react-paginate";
import { ICON } from "../constant/theme";
import Paginate from "../components/Pagination/Paginate";

const headers = [
  { label: "Employee ID", key: "emplid" },
  { label: "Employee Name", key: "title" },
  { label: "Department", key: "department" },
  { label: "Email Address", key: "email" },
  { label: "Contact Number", key: "contact" },
  { label: "Gender", key: "gender" },
  { label: "Location", key: "location" },
  { label: "Status", key: "status" },
];

const Geofence = (ref) => {
 
  const navigate = useNavigate();
  const { page, nextPage, prevPage, goToPage, setCount, totalCount } =
    usePagination();

  const { isRtl } = useContext(ThemeContext);

  const [tableData, setTableData] = useState([]);
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

  const itemsPerPage=10;

    const handlePageClick = ({ selected }) => {
      goToPage(selected + 1); 
    };
  
    const startIndex = (page - 1) * itemsPerPage;
    const slicedData = tableData.slice(startIndex, startIndex + itemsPerPage);

  const getData = async () => {
    try {
      const { geofences, count } = await getGeofenceData(page);
      setCount(count);
      setTableData(geofences);
    } catch (error) {
      notifyError(error);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  const onConfirmDelete = async (id) => {
    try {
      const data = await deleteGeofenceData(id);
      if(data.success){
        notifySuccess(data.message);
      }
      getData(page);
    } catch (error) {
      notifyError(error)
    }
  
  };
  const editDrawerOpen = (item) => {
    navigate(`/settings/geofence/map/edit/${item}`);
  };

  const { t } = useTranslation();

  return (
    <>
      <MainPagetitle
        mainTitle={t("geofence")}
        pageTitle={t("geofence")}
        parentTitle={t("settings")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("geofence")}</h4>
                    <div className="d-flex">
                      <Link
                        to={"/settings/geofence/map"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        // onClick={() => employe.current.showModal()}
                      >
                        + {t("showMap")}
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
                          <th>{t("geofenceID")}</th>
                          <th>{t("geofenceName")}</th>
                          <th>{t("geofenceType")}</th>
                          <th>{t("contactNumber")}</th>
                          <th>{t("address")}</th>
                          <th>{t("description")}</th>
                          <th>{t("geofenceAccess")}</th>
                          <th>{t("action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <GeofenceTable
                          page={page}
                          editData={editData}
                          tableData={tableData}
                          onConfirmDelete={onConfirmDelete}
                          editDrawerOpen={editDrawerOpen}
                          setEditData={setEditData}
                          currentPage={page} 
                            itemsPerPage={itemsPerPage} 
                        />
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

export default Geofence;
