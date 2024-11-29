import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import MainPagetitle from "@/components/MainPagetitle";
import BusinessTable from "../components/Table";
import { usePermissions } from "@/context/PermissionContext";
import { deleteGroup, getAllGroups } from "../api";
import usePagination from "@/hooks/usePagination";
import Paginate from "@/components/Paginate";
import { notifyError } from "@/utils/toast";
import TableSkeleton from "@/components/Skeleton/Table";

const BusinessList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { can, setUserPermission } = usePermissions();
  const { page, setCount, totalCount, goToPage } = usePagination();
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["groups", page],
    queryFn: () => getAllGroups(page),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    onError: (err) => {
      const messge = err.response.data.message;
      notifyError(messge ?? "Something went wrong!!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
    },
    mutationFn: deleteGroup,
  });

  // Prefetch the next page!
  // useEffect(() => {
  //   if (!isPlaceholderData && data?.hasMore) {
  //     queryClient.prefetchQuery({
  //       queryKey: ["groups", page + 1],
  //       queryFn: () => getAllGroups(page + 1),
  //     });
  //   }
  // }, [data, isPlaceholderData, page, queryClient]);

  useEffect(() => {
    if (data) {
      setCount(data.totalCount);
    }
  }, [data]);

  useEffect(() => {
    const permissions = JSON.parse(localStorage.getItem("permission"));
    setUserPermission(permissions?.[0]?.permission);
  }, []);

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t("businessGroup")}
        pageTitle={t("businessGroup")}
        parentTitle={t("home")}
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("businessGroup")}</h4>
                    <div>
                      {can("business", "add") && (
                        <Link
                          to="/business/create"
                          className="btn btn-primary btn-sm ms-1 p-2"
                          data-bs-toggle="offcanvas"
                          style={{ paddingBlock: "9px" }}
                        >
                          {t("addBusinessGroup")}
                        </Link>
                      )}
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
                              <th>{t("id")}</th>
                              <th>{t("businessGroup")}</th>
                              <th>{t("mobileNumber")}</th>
                              <th>{t("email")}</th>
                              <th>{t("location")}</th>
                              <th>{t("companyCount")}</th>
                              {(can("business", "delete") ||
                                can("business", "modify")) && (
                                <th>{t("action")}</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            <BusinessTable
                              currentPage={page}
                              itemsPerPage={itemsPerPage}
                              tableData={data?.data ?? []}
                              onConfirmDelete={mutate}
                            />
                          </tbody>
                        </table>
                      )}
                    </div>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className="dataTables_info">
                        {t("showing")} {startIndex + 1} {t("to")}{" "}
                        {Math.min(startIndex + itemsPerPage, totalCount)}{" "}
                        {t("of")} {totalCount} {t("entries")}
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
export default BusinessList;
