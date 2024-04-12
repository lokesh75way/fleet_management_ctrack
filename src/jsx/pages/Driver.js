import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainPagetitle from "../layouts/MainPagetitle";
import DriverTable from "../components/Tables/DriverTable";
import { clsx } from "clsx";

import { ThemeContext } from "../../context/ThemeContext";
import useStorage from "../../hooks/useStorage";
import { useTranslation } from "react-i18next";
import { deleteDrivers, getDrivers } from "../../services/api/driverService";
import { notifyError } from "../../utils/toast";
import usePagination from "../../hooks/usePagination";
import ReactPaginate from "react-paginate";

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
  const { page, nextPage, prevPage, goToPage, setCount, totalCount, setPage } =
    usePagination();

  const itemsPerPage = 10;

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const slicedData = tableData.slice(startIndex, startIndex + itemsPerPage);

  async function getDriversData(page) {
    try {
      const { data, totalLength } = await getDrivers(page);
      console.log(data, totalCount, "ji");
      setTableData(data);
      setCount(totalLength);
    } catch (error) {
      notifyError("Some error occured !!");
    }
  }

  useEffect(() => {
    getDriversData(page);
  }, [page]);

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

  const { t } = useTranslation();

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
    // navigate(`/driver/edit/${item._id}`);
    setEditData(item);
    const filteredData = tableData.filter((data) => data._id === item._id);
    console.log("filtered", filteredData, item);
    navigate(`/driver/edit/${item._id}`, { state: filteredData });
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t("drivers")}
        pageTitle={t("drivers")}
        parentTitle={t("home")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("drivers")}</h4>
                    <div>
                      <Link
                        to={"/driver/create"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        // onClick={() => employe.current.showModal()}
                      >
                        + {t("addDriver")}
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
                          <th>{t("id")}</th>
                          <th>{t("employeeName")}</th>
                          <th>{t("age")}</th>
                          <th>{t("contactNumber")}</th>
                          <th>{t("drivingExperienceSince")}</th>
                          <th>{t("city")}</th>
                          <th>{t("status")}</th>
                          <th>{t("action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <DriverTable
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
                        <ReactPaginate
                          previousLabel={
                            <i className="fa-solid fa-angle-left"></i>
                          }
                          nextLabel={
                            <i className="fa-solid fa-angle-right"></i>
                          }
                          breakLabel={"..."}
                          pageCount={Math.ceil(totalCount / itemsPerPage)} // Calculate pageCount based on totalCount and itemsPerPage
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
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

export default Driver;
