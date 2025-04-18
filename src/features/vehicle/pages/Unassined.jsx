import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import MainPagetitle from "@/components/MainPagetitle";
import usePagination from "@/hooks/usePagination";
import Paginate from "@/components/Paginate";
import UnassignedTable from "../components/UnassignedTable";
import TableSkeleton from "@/components/Skeleton/Table";
import usePermissions from "@/hooks/usePermissions";
import { getUnassignedVehicles } from "../api";

const UnassinedVehicleList = () => {
  const { t } = useTranslation();
  const { can } = usePermissions();

  const { page, goToPage, setCount, totalCount } = usePagination();
  const itemsPerPage = 10;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["vehicles", "unassigned", page],
    queryFn: () => getUnassignedVehicles(page),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) setCount(data.totalCount);
  }, [data]);

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t("unassigned-vehicle")}
        pageTitle={t("unassigned-vehicle")}
        parentTitle={t("home")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("unassigned-vehicle")}</h4>
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
                    <div className="table-responsive">
                      {isLoading || isFetching ? (
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
                            <UnassignedTable
                              tableData={data.data}
                              currentPage={page}
                              itemsPerPage={itemsPerPage}
                            />
                          </tbody>
                        </table>
                      )}
                    </div>
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

export default UnassinedVehicleList;
