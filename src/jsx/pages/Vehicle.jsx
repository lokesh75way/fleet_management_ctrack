import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import TableSkeleton from "@/components/Skeleton/Table";
import VehicleTable from "../components/Tables/VehicleTable";
import MainPagetitle from "../../components/MainPagetitle";
import Paginate from "../../components/Paginate";
import { usePermissions } from "../../context/PermissionContext";
import { deleteVehicles, getVehicles } from "../../services/api/VehicleService";
import usePagination from "../../hooks/usePagination";

const Vehicle = () => {
  const { t } = useTranslation();
  const { can } = usePermissions();
  //   const { setAddVehicle, addVehicle } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState();
  const [tableData, setTableData] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const [editData, setEditData] = useState({
    id: 0,
    vehicleName: "",
    plateNumber: "",
    simNumber: 0,
    IMEINumber: 0,
    GPSDeviceType: "",
    distanceCounter: 0,
  });

  const { page, goToPage, setCount, totalCount } = usePagination();
  const itemsPerPage = 10;

  const handlePageClick = ({ selected }) => {
    setTableData([]);
    goToPage(selected + 1);
  };

  async function getVehicleData(page) {
    try {
      setInitialLoad(true);
      const { data, totalLength } = await getVehicles(page);
      setCount(totalLength);
      setTableData(data);
      // setCount(totalCount);
    } catch (error) {
      console.log("Error in fetching data", error);
    } finally {
      setInitialLoad(false);
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
  const headers = [
    "vehicleName",
    "plateNumber",
    "branch",
    "simNumber",
    "IMEINumber",
    "registrationNumber",
  ];

  if (can("vehicle", "modify") || can("vehicle", "delete")) {
    headers.push("action");
  }

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
                    {!tableData.length && initialLoad ? (
                      <TableSkeleton />
                    ) : (
                      <table
                        id="empoloyees-tblwrapper"
                        className="table ItemsCheckboxSec dataTable no-footer mb-0"
                      >
                        <thead>
                          <tr>
                            {headers.map((header) => (
                              <th key={header}>{t(header)}</th>
                            ))}
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

export default Vehicle;
