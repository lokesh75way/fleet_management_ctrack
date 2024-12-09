import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import MainPagetitle from "@/components/MainPagetitle";
import BranchTable from "../components/Table";
import { notifyError } from "@/utils/toast";
import usePagination from "@/hooks/usePagination";
import CompanyDropdownList from "@/features/company/components/DropDownList";
import Paginate from "@/components/Paginate";
import TableSkeleton from "@/components/Skeleton/Table";
import { deleteBranch, getAllBranch } from "../api";
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

const BranchList = () => {
  const { can } = usePermissions();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cId } = useParams();
  const { page, goToPage, setCount, totalCount } = usePagination();
  const queryClient = useQueryClient();
  const { control } = useForm();
  const itemsPerPage = 10;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["branches", page, cId],
    queryFn: () => getAllBranch(page, cId),
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
    mutationFn: deleteBranch,
  });

  useEffect(() => {
    if (data) setCount(data.totalCount);
  }, [data]);

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };

  const handleClearFilter = () => {
    navigate("/branch");
  };

  return (
    <>
      <MainPagetitle
        mainTitle="Branch"
        pageTitle={"Branch"}
        parentTitle={"Home"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("branches")}</h4>
                    <div className="d-flex align-items-center">
                      {can("company", "view") && (
                        <>
                          <Link
                            className="btn  btn-xxs"
                            data-bs-toggle="offcanvas"
                            onClick={handleClearFilter}
                            to={"/branch"}
                            style={{
                              background: "gray",
                              border: "gray",
                              color: "white",
                            }}
                          >
                            Clear
                          </Link>
                          <Controller
                            name="company"
                            control={control}
                            rules={{ required: true }}
                            render={({
                              field: { onChange, value, name, ref },
                            }) => (
                              <CompanyDropdownList
                                onChange={(newValue) => {
                                  navigate(`/branch/cid/${newValue?.value}`);
                                }}
                                defaultValue={cId}
                                value={
                                  cId ?? {
                                    label: t("allCompanies"),
                                    value: "All Companies",
                                  }
                                }
                                customStyles={customStyles}
                                name={name}
                                ref={ref}
                                isDisabled={!can("company", "view")}
                              />
                            )}
                          />
                        </>
                      )}
                      {can("branch", "add") && (
                        <Link
                          to={"/branch/create"}
                          className="btn btn-primary btn-sm ms-1"
                          style={{ paddingBlock: "9px" }}
                          data-bs-toggle="offcanvas"
                        >
                          + {t("addBranch")}
                        </Link>
                      )}{" "}
                    </div>
                  </div>
                  <div
                    id="employee-tbl_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <div className="table-responsive ">
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
                              <th>{t("branchName")}</th>
                              {/* <th>{t("parentBranch")}</th> */}
                              <th>{t("companyName")}</th>
                              <th>{t("businessGroup")}</th>
                              {/* <th>{t('mobileNumber')}</th> */}
                              <th>{t("location")}</th>
                              {/* <th>{t("childBranches")}</th> */}
                              {(can("branch", "modify") ||
                                can("branch", "delete")) && (
                                <th>{t("action")}</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            <BranchTable
                              tableData={data?.data ?? []}
                              currentPage={page}
                              itemsPerPage={itemsPerPage}
                              onConfirmDelete={mutate}
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
      {/* <SubCompanyOffcanvas
                ref={subCompany}
                editData={editData}
                setEditData={setEditData}
                handleSubmit={handleSubmit}
                Title={ editData.id === 0 ? "Add Branch" : "Edit Branch"}
            /> */}
    </>
  );
};
export default BranchList;
