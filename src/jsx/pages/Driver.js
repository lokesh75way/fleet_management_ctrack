import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainPagetitle from "../../components/MainPagetitle";
import DriverTable from "../components/Tables/DriverTable";
import { clsx } from "clsx";

import { ThemeContext } from "../../context/ThemeContext";
import useStorage from "../../hooks/useStorage";
import { useTranslation } from "react-i18next";
import { deleteDrivers, getDrivers } from "../../services/api/driverService";
import { notifyError } from "../../utils/toast";
import usePagination from "../../hooks/usePagination";
import ReactPaginate from "react-paginate";
import { ICON } from "../constant/theme";
import Paginate from "../../components/Paginate";
import TableSkeleton from "@/components/Skeleton/Table";
import { usePermissions } from "@/context/PermissionContext";

const Driver = () => {
  const { can } = usePermissions();
  const { isRtl } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const { page, nextPage, prevPage, goToPage, setCount, totalCount, setPage } =
    usePagination();

  const itemsPerPage = 10;

  const handlePageClick = ({ selected }) => {
    setTableData([]);
    goToPage(selected + 1);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const slicedData = tableData.slice(startIndex, startIndex + itemsPerPage);

  async function getDriversData(page) {
    try {
      setIsLoading(true);
      const { data, totalLength } = await getDrivers(page);
      setTableData(data);
      setCount(totalLength);
    } catch (error) {
      notifyError("Some error occured !!");
    } finally {
      setIsLoading(false);
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
                      {can("driver", "add") && (
                        <Link
                          to={"/driver/create"}
                          className="btn btn-primary btn-sm ms-1"
                          data-bs-toggle="offcanvas"
                        >
                          + {t("addDriver")}
                        </Link>
                      )}{" "}
                    </div>
                  </div>
                  <div
                    id="employee-tbl_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    {!tableData.length && isLoading ? (
                      <TableSkeleton />
                    ) : (
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
                    )}
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

export default Driver;
