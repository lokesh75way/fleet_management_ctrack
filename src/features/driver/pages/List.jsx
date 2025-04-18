import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import MainPagetitle from "@/components/MainPagetitle";
import DriverTable from "../components/Table";
import { deleteDrivers, getAllDrivers } from "../api";
import { notifyError } from "@/utils/toast";
import usePagination from "@/hooks/usePagination";
import Paginate from "@/components/Paginate";
import TableSkeleton from "@/components/Skeleton/Table";
import { getApiErrorMessage } from "@/utils/helper";
import usePermissions from "@/hooks/usePermissions";

const DriverList = () => {
  const { page, goToPage, setCount, totalCount } = usePagination();
  const itemsPerPage = 10;
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { can } = usePermissions();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["drivers", page],
    queryFn: () => getAllDrivers(page),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const { mutate: removeDriver } = useMutation({
    onError: (err) => {
      notifyError(getApiErrorMessage(err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries("drivers");
    },
    mutationFn: deleteDrivers,
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
        mainTitle={t("drivers")}
        pageTitle={t("drivers")}
        parentTitle={t("home")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="active-projects style-1 ItemsCheckboxSec shorting">
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
                    <div className="table-responsive">
                      {isFetching || isLoading ? (
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
                              {(can("driver", "delete") ||
                                can("driver", "modify")) && (
                                <th>{t("action")}</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {data?.data?.length ? (
                              <DriverTable
                                tableData={data?.data}
                                onConfirmDelete={(id) =>
                                  removeDriver({ driverIds: [id] })
                                }
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

export default DriverList;
