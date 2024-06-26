import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import VehicleTable from "../components/Tables/VehicleTable";
import { ThemeContext } from "../../context/ThemeContext";
import MainPagetitle from "../layouts/MainPagetitle";
import { clsx } from "clsx";
import VehicleServices from "../../services/api/VehicleService";
import { usePermissions } from "../../context/PermissionContext";
import { deleteVehicles, getVehicles } from "../../services/api/VehicleService";
import usePagination from "../../hooks/usePagination";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { ICON } from "../constant/theme";
import Paginate from "../components/Pagination/Paginate";

const Vehicle = () => {
  const { t } = useTranslation();
  const { can } = usePermissions();
  //   const { setAddVehicle, addVehicle } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState();
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState({
    id: 0,
    vehicleName: "",
    plateNumber: "",
    simNumber: 0,
    IMEINumber: 0,
    GPSDeviceType: "",
    distanceCounter: 0,
  });

  const { page, nextPage, prevPage, goToPage, setCount, count, totalCount } =
    usePagination();
  const itemsPerPage = 10;

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const slicedData = tableData.slice(startIndex, startIndex + itemsPerPage);

  async function getVehicleData(page) {
    try {
      const { data, totalLength } = await getVehicles(page);
      setCount(totalLength);
      setTableData(data);
      // setCount(totalCount);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  }

  useEffect(() => {
    getVehicleData(page);
  }, [deleteId, page]);

  // delete function
  const onConfirmDelete = (id) => {
    deleteVehicles(id);
    const updatedData = tableData.filter((item) => item._id !== id);
    setTableData(updatedData);
  };
  // Edit function
  const editDrawerOpen = (id) => {
    // tableData.map((table) => table.id === id && setEditData(table));

    const data = tableData.filter((item) => item._id === id);

    navigate(`edit/${id}`, { state: { formData: data } });
    // vehicle.current.showModal();
  };

  const vehicle = useRef();
  return (
    <>
      <MainPagetitle
        mainTitle={t("vehicle")}
        pageTitle={t("vehicle")}
        parentTitle={t("home")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("vehicle")}</h4>
                    <div>
                      {can("vehicle", "add") && (
                        <Link
                          to={"/vehicle/create"}
                          className="btn btn-primary btn-sm ms-1"
                          data-bs-toggle="offcanvas"
                        >
                          + {t("addVehicleInfo")}
                        </Link>
                      )}{" "}
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
                          <th>{t("vehicleName")}</th>
                          <th>{t("plateNumber")}</th>
                          <th>{t("branch")}</th>
                          <th>{t("simNumber")}</th>
                          <th>{t("IMEINumber")}</th>
                          <th>{t("registrationNumber")}</th>
                          <th>{t("weightCapacity")}</th>
                          {(can("vehicle", "modify") ||
                            can("vehicle", "delete")) && <th>{t("action")}</th>}
                        </tr>
                      </thead>
                      <tbody>
                        <VehicleTable
                          tableData={tableData}
                          onConfirmDelete={onConfirmDelete}
                          editDrawerOpen={editDrawerOpen}
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

export default Vehicle;
