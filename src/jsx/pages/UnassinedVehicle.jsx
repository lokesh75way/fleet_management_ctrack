import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainPagetitle from "../../components/MainPagetitle";
import { getUnassignedVehicles } from "../../services/api/VehicleService";
import { usePermissions } from "../../context/PermissionContext";
import { deleteVehicles } from "../../services/api/VehicleService";
import usePagination from "../../hooks/usePagination";
import { useTranslation } from "react-i18next";
import Paginate from "../../components/Paginate";
import UnassignedVehicleTable from "../components/Tables/UnassignedVehicleTable";
import TableSkeleton from "@/components/Skeleton/Table";

const UnassinedVehicle = () => {
  const { t } = useTranslation();
  const { can } = usePermissions();

  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setTableData([]);
    goToPage(selected + 1);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const slicedData = tableData.slice(startIndex, startIndex + itemsPerPage);

  async function getVehicleData(page) {
    try {
      setIsLoading(true);
      const { data, totalLength } = await getUnassignedVehicles(page);
      setCount(totalLength);
      setTableData(data);
      // setCount(totalCount);
    } catch (error) {
      console.log("Error in fetching data", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getVehicleData(page);
  }, [deleteId, page]);

  // delete function
  const onConfirmDelete = (id) => {
    deleteVehicles(id);
    getVehicleData(id);
    setDeleteId(id);
  };
  // Edit function
  const editDrawerOpen = (data) => {
    // tableData.map((table) => table.id === id && setEditData(table));

    // const data = tableData.filter((item) => item._id === id);

    // navigate(`edit/${id}`, { state: { formData: data } });
    navigate(`/vehicle/create`, { state: { vehicle: data } });
    // vehicle.current.showModal();
  };

  const vehicle = useRef();
  return (
    <>
      <MainPagetitle
        mainTitle={t("uanassigned-vehicle")}
        pageTitle={t("uanassigned-vehicle")}
        parentTitle={t("home")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("uanassigned-vehicle")}</h4>
                    {/* <div>
                      {can("vehicle", "add") && (
                        <Link
                          to={"/vehicle/create"}
                          className="btn btn-primary btn-sm ms-1"
                          data-bs-toggle="offcanvas"
                        >
                          + {t("addVehicleInfo")}
                        </Link>
                      )}{" "}
                    </div> */}
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
                            <th>{t("vehicleName")}</th>
                            {/* <th>{t("vehicleNumber")}</th> */}
                            <th>{t("vehicleModel")}</th>
                            <th>{t("vehicleType")}</th>
                            <th>{t("IMEINumber")}</th>
                            <th>{t("registrationNumber")}</th>
                            <th>{t("status")}</th>
                            {(can("vehicle", "modify") ||
                              can("vehicle", "delete")) && (
                              <th>{t("action")}</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          <UnassignedVehicleTable
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
                        {totalCount > 0 ? (
                          <>
                            {t("showing")}{" "}
                            {Math.min((page - 1) * 10 + 1, totalCount)}{" "}
                            {t("to")} {Math.min(page * 10, totalCount)}{" "}
                            {t("of")} {totalCount} {t("entries")}
                          </>
                        ) : (
                          <span className="text-gray-500">
                            {t("No Vehicle Found")}
                          </span>
                        )}
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

export default UnassinedVehicle;
