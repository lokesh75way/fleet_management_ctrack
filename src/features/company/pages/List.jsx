import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
  useMutation,
} from "@tanstack/react-query";

import MainPagetitle from "@/components/MainPagetitle";
import CompanyTable from "../components/Table";
import { deleteCompany, getAllCompanies } from "../api";
import { notifyError } from "@/utils/toast";
import usePagination from "@/hooks/usePagination";
import Paginate from "@/components/Paginate";
import TableSkeleton from "@/components/Skeleton/Table";
import GroupDropdownList from "@/features/businessGroup/components/DropDownList";
import { getApiErrorMessage } from "@/utils/helper";
import usePermissions from "@/hooks/usePermissions";

const customStyles = {
  control: (base) => ({
    ...base,
    marginRight: "1rem",
    marginLeft: "1rem",
    width: "15rem",
    height: "0.6rem",
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
  }),
};

const CompanyList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { page, goToPage, setCount, totalCount } = usePagination();
  const itemsPerPage = 10;
  const { can } = usePermissions();
  const queryClient = useQueryClient();
  const { control } = useForm();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["companies", page, groupId],
    queryFn: () => getAllCompanies(page, 10, { groupId }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    onError: (err) => {
      notifyError(getApiErrorMessage(err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries("companies");
    },
    mutationFn: deleteCompany,
  });

  useEffect(() => {
    if (data) setCount(data.totalCount);
  }, [data]);

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };

  const handleClearFilter = () => {
    navigate("/company");
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t("company")}
        pageTitle={t("company")}
        parentTitle={t("home")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("companies")}</h4>
                    <div className="d-flex align-items-center">
                      {can("business", "view") && (
                        <>
                          <Link
                            className="btn  btn-xxs"
                            data-bs-toggle="offcanvas"
                            onClick={handleClearFilter}
                            to={"/company"}
                            style={{
                              background: "gray",
                              border: "gray",
                              color: "white",
                            }}
                          >
                            {t("clear")}
                          </Link>
                          <Controller
                            name="companyOptions"
                            control={control}
                            rules={{ required: true }}
                            render={({
                              field: { onChange, value, name, ref },
                            }) => (
                              <GroupDropdownList
                                onChange={(newValue) => {
                                  navigate(`/company/gid/${newValue?.value}`);
                                }}
                                defaultValue={groupId}
                                value={
                                  !groupId && {
                                    value: "All Business Groups",
                                    label: t("allBusinessGroup"),
                                  }
                                }
                                customStyles={customStyles}
                                ref={ref}
                                isDisabled={!can("business", "view")}
                                name={name}
                              />
                            )}
                          />
                        </>
                      )}

                      {can("company", "add") && (
                        <Link
                          to={"/company/create"}
                          className="btn btn-primary btn-sm ms-1"
                          data-bs-toggle="offcanvas"
                          style={{ paddingBlock: "9px" }}
                        >
                          + {t("addCompany")}
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
                              <th>{t("companyName")}</th>
                              <th>{t("businessGroup")}</th>
                              {/* <th>{t('mobileNumber')}</th> */}
                              <th>{t("location")}</th>
                              <th>{t("email")}</th>
                              <th>{t("branches")}</th>

                              {(can("company", "modify") ||
                                can("company", "delete")) && (
                                <th className="d-flex justify-content-center">
                                  {t("action")}
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {data?.data?.length ? (
                              <CompanyTable
                                tableData={data?.data ?? []}
                                currentPage={page}
                                itemsPerPage={itemsPerPage}
                                onConfirmDelete={mutate}
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
export default CompanyList;
