import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useMutation,
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";

import TableSkeleton from "@/components/Skeleton/Table";
import VehicleTable from "../components/Table";
import MainPagetitle from "@/components/MainPagetitle";
import Paginate from "@/components/Paginate";
import { deleteVehicle, getAllVehicles } from "../api";
import usePagination from "@/hooks/usePagination";
import { getApiErrorMessage } from "@/utils/helper";
import usePermissions from "@/hooks/usePermissions";
import { notifyError } from "@/utils/toast";

const VehicleList = () => {
  const { t } = useTranslation();
  const { can } = usePermissions();
  const { page, goToPage, setCount, totalCount } = usePagination();
  const itemsPerPage = 10;
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["vehicles", page],
    queryFn: () => getAllVehicles(page),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const { mutate: removeVehicle } = useMutation({
    onError: (err) => {
      notifyError(getApiErrorMessage(err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries("vehicles");
    },
    mutationFn: deleteVehicle,
  });

  useEffect(() => {
    if (data) setCount(data.totalCount);
  }, [data]);

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };

  const headers = [
    "vehicleName",
    "plateNumber",
    "branch",
    "simNumber",
    "IMEINumber",
    "registrationNumber",
    "weightCapacity",
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
                <div className="active-projects style-1 ItemsCheckboxSec shorting">
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
                              {headers.map((header) => (
                                <th key={header}>{t(header)}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {data.data?.length ? (
                              <VehicleTable
                                tableData={data.data}
                                onConfirmDelete={removeVehicle}
                                currentPage={page}
                                itemsPerPage={itemsPerPage}
                              />
                            ) : (
                              <tr>
                                <td colspan="10" rowSpan={2} height={150}>
                                  <h1 className="text-center">
                                    No Data found!
                                  </h1>
                                </td>
                              </tr>
                            )}
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

export default VehicleList;
