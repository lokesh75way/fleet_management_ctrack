import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainPagetitle from "../layouts/MainPagetitle";
import TechnicianTable from "../components/Tables/TechnicianTable";
import { useTranslation } from "react-i18next";
import { clsx } from "clsx";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import usePagination from "../../hooks/usePagination";
import {
  deleteTechnician,
  getTechnicians,
} from "../../services/api/TechnicianService";
import { notifyError, notifySuccess } from "../../utils/toast";
import ReactPaginate from "react-paginate";
import { ICON } from "../constant/theme";
import Paginate from "../components/Pagination/Paginate";

const Technician = () => {
  const { t } = useTranslation();
  const { isRtl } = useContext(ThemeContext);


  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const { page, nextPage, prevPage, goToPage, setCount, totalCount, setPage } =
    usePagination();

  const fetchAllTechnicians = async (page, businessGroupId) => {
    try {
      const { technicians, count } = await getTechnicians(page, 10);
      setTableData(technicians);
      setCount(count);
    } catch (error) {
      notifyError("Error in fetching data");
    }
  };
  useEffect(() => {
    fetchAllTechnicians(page);
  }, [page]);

  const onConfirmDelete = async (id) => {
    try {
      await deleteTechnician(id);
      const updatedData = tableData.filter((item) => item._id !== id);
      setTableData(updatedData);
      setCount(totalCount - 1);
      notifySuccess("Task Deleted");
    } catch (e) {
      notifyError("Something Went Wrong");
    }
  };
  const editDrawerOpen = (item) => {
    navigate(`/technician/edit/${item}`);
  };

  const itemsPerPage=10;
  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1); 
  };

  const startIndex = (page - 1) * itemsPerPage;
  const slicedData = tableData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <MainPagetitle
        mainTitle={t("technicianDetails")}
        pageTitle={t("technicianDetails")}
        parentTitle={t("technician")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("technician")}</h4>
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
                        + {t("technician")}
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
                          <th>{t("technicianId")}</th>
                          <th>{t("technicianName")}</th>
                          <th>{t("email")}</th>
                          <th>{t("contactNumber")}</th>
                          <th>{t("location")}</th>
                          <th>{t("technicianNumber")}</th>
                          <th>{t("action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <TechnicianTable
                          onConfirmDelete={onConfirmDelete}
                          editDrawerOpen={editDrawerOpen}
                          tableData={tableData}
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
                            totalCount={totalCount}
                            itemsPerPage={itemsPerPage}
                            handlePageClick={handlePageClick}
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

export default Technician;
