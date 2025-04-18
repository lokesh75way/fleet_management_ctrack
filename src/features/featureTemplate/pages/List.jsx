import React, { useState, useEffect } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import TableSkeleton from "@/components/Skeleton/Table";
import usePermissions from "@/hooks/usePermissions";
import { notifyError } from "@/utils/toast";
import { getApiErrorMessage } from "@/utils/helper";
import { deleteTemplate, getAllTemplates } from "../api";
import usePagination from "@/hooks/usePagination";
import MainPagetitle from "@/components/MainPagetitle";
import Paginate from "@/components/Paginate";
import TemplateTable from "../components/Table";

const TemplateList = () => {
  const { t } = useTranslation();
  const { can } = usePermissions();
  const { page, goToPage, setCount, totalCount } = usePagination();
  const queryClient = useQueryClient();
  const itemsPerPage = 10;

  const [isEditTrue, setIsEditTrue] = useState(-1);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["groups", page],
    queryFn: () => getAllTemplates(page),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    onError: (err) => notifyError(getApiErrorMessage(err)),
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
    },
    mutationFn: deleteTemplate,
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
        mainTitle={t("featureTemplates")}
        pageTitle={t("featureTemplates")}
        parentTitle={t("home")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("featureTemplates")}</h4>
                    <div>
                      {can("groups", "add") && (
                        <Link
                          to={"/groups/create"}
                          className="btn btn-primary btn-sm ms-1"
                          data-bs-toggle="offcanvas"
                          style={{ paddingBlock: "9px" }}
                        >
                          + {t("addNew")}
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
                              <th className="text-center">
                                {t("serialNumber")}
                              </th>
                              <th className="text-center">
                                {t("templateName")}
                              </th>
                              {(can("groups", "modify") ||
                                can("groups", "delete")) && (
                                <th className="text-center">{t("action")}</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            <TemplateTable
                              isEditTrue={isEditTrue}
                              setIsEditTrue={setIsEditTrue}
                              tableData={data?.data ?? []}
                              onConfirmDelete={mutate}
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
export default TemplateList;
