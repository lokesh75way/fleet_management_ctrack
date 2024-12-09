import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import TableSkeleton from "@/components/Skeleton/Table";
import MainPagetitle from "@/components/MainPagetitle";
import Paginate from "@/components/Paginate";
import UserTable from "../components/Table";
import { getAllUser, deleteUser } from "../api";
import usePagination from "@/hooks/usePagination";
import usePermissions from "@/hooks/usePermissions";
import { notifyError } from "@/utils/toast";
import { getApiErrorMessage } from "@/utils/helper";

const UserList = () => {
  const { t } = useTranslation();
  const { can } = usePermissions();
  const { page, goToPage, setCount, totalCount } = usePagination();
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getAllUser(page),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    onError: (err) => {
      notifyError(getApiErrorMessage(err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
    mutationFn: deleteUser,
  });

  useEffect(() => {
    if (data) setCount(data.totalCount);
  }, [data]);

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };

  const itemsPerPage = 10;

  return (
    <>
      <MainPagetitle mainTitle="User" pageTitle={"User"} parentTitle={"Home"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("users")}</h4>
                    <div>
                      {can("subUser", "add") && (
                        <Link
                          to={"/user/create"}
                          className="btn btn-primary btn-sm ms-1"
                          data-bs-toggle="offcanvas"
                        >
                          + {t("addUser")}
                        </Link>
                      )}{" "}
                    </div>
                  </div>
                  <div
                    id="employee-tbl_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    {isFetching && isLoading ? (
                      <TableSkeleton />
                    ) : (
                      <table
                        id="empoloyees-tblwrapper"
                        className="table ItemsCheckboxSec dataTable no-footer mb-0"
                      >
                        <thead>
                          <tr>
                            <th>{t("id")}</th>
                            <th>{t("username")}</th>
                            <th>{t("mobileNumber")}</th>
                            <th>{t("email")}</th>
                            <th>{t("location")}</th>
                            {(can("subUser", "modify") ||
                              can("subUser", "delete")) && (
                              <th>{t("action")}</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          <UserTable
                            currentPage={page}
                            itemsPerPage={itemsPerPage}
                            tableData={data.data}
                            onConfirmDelete={mutate}
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

export default UserList;
