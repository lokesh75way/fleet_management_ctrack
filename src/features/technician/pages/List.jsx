import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import TechnicianTable from "../components/TechnicianTable";

import TableSkeleton from "@/components/Skeleton/Table";
import usePermissions from "@/hooks/usePermissions";
import { getApiErrorMessage } from "@/utils/helper";
import { notifyError } from "@/utils/toast";
import usePagination from "@/hooks/usePagination";
import MainPagetitle from "@/components/MainPagetitle";
import Paginate from "@/components/Paginate";
import { deleteTechnician, getAllTechnicians } from "../api";

const TechnicianList = () => {
  const { t } = useTranslation();
  const { can } = usePermissions();
  const { page, goToPage, setCount, totalCount } = usePagination();
  const itemsPerPage = 10;
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["technicians", page],
    queryFn: () => getAllTechnicians(page),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    onError: (err) => {
      notifyError(getApiErrorMessage(err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries("technicians");
    },
    mutationFn: deleteTechnician,
  });

  useEffect(() => {
    if (data) setCount(data.totalCount);
  }, [data]);

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };

  const headers = [
    t("technicianId"),
    t("technicianName"),
    t("email"),
    t("contactNumber"),
    t("location"),
    t("technicianNumber"),
  ];

  if (can("technician", "modify") || can("technician", "delete")) {
    headers.push(t("action"));
  }

  return (
    <>
      <MainPagetitle
        mainTitle={t("technicianDetails")}
        pageTitle={t("technicianDetails")}
        parentTitle={t("home")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("technician")}</h4>
                    <div>
                      {can("technician", "add") && (
                        <Link
                          to={"/technician/create"}
                          className="btn btn-primary btn-sm ms-1"
                          data-bs-toggle="offcanvas"
                        >
                          + {t("technician")}
                        </Link>
                      )}
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
                              {headers.map((header) => (
                                <th key={header}>{t(header)}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <TechnicianTable
                              onConfirmDelete={mutate}
                              tableData={data.data || []}
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

export default TechnicianList;
