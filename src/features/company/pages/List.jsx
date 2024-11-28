import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
  useMutation,
} from "@tanstack/react-query";

import MainPagetitle from "@/components/MainPagetitle";
import CompanyTable from "../components/Table";
import { usePermissions } from "@/context/PermissionContext";
import { deleteCompany, getAllCompanies } from "../api";
import { notifyError } from "@/utils/toast";
import { getAllGroups } from "@/features/businessGroup/api";
import usePagination from "@/hooks/usePagination";
import Paginate from "@/components/Paginate";
import TableSkeleton from "@/components/Skeleton/Table";

const CompanyList = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [businessGroupNames, setBusinessGroupNames] = useState();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectFilter, setFilter] = useState({
    value: "All Business Groups",
    label: t("allBusinessGroup"),
  });
  const [businessGroupOptions, setBusinessGroupOptions] = useState([]);
  const [tempValue, setTempValue] = useState("All");
  const { groupId } = useParams();
  const { page, goToPage, setCount, totalCount, setPage } = usePagination();
  const itemsPerPage = 10;
  const { can, setUserPermission } = usePermissions();
  const queryClient = useQueryClient();
  const { control, setValue } = useForm();
  const isAdmin = useMemo(
    () => userDetails.user.role === "SUPER_ADMIN",
    [userDetails]
  );

  const fetchAllCompany = async () => {
    let gId = groupId;
    if (userDetails?.user?.role === "BUSINESS_GROUP") {
      const businessId = userDetails?.user?.businessGroupId[0]?._id;
      gId = groupId ?? businessId;
    }
    return getAllCompanies(page, gId);
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["companies", page, groupId],
    queryFn: () => fetchAllCompany,
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    onError: (err) => {
      const messge = err.response.data.message;
      notifyError(messge ?? "Something went wrong!!");
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

  useEffect(() => {
    const permissions = JSON.parse(localStorage.getItem("permission"));
    setUserPermission(permissions?.[0]?.permission);
  }, []);

  const handleChangeBusinessGroup = (selectedOption) => {
    setFilter(selectedOption);
    setPage(1);
    fetchAllCompany(1, selectedOption.value);
  };

  async function getGroupData() {
    try {
      const { data } = await getAllGroups();
      setBusinessGroupNames(data);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  }

  useEffect(() => {
    getGroupData();
  }, []);

  useEffect(() => {
    if (businessGroupNames) {
      setBusinessGroupOptions(
        businessGroupNames.map((item) => ({
          label: item.businessGroupId?.groupName,
          value: item.businessGroupId?._id,
        }))
      );
    }
  }, [businessGroupNames]);

  const editDrawerOpen = (_id) => {
    // TODO: remove this and get data from api in the edit page
    const formData = data?.data.filter((item) => item._id === _id);
    navigate(`/company/edit/${_id}`, { state: { formData } });
  };

  const handleClearFilter = () => {
    fetchAllCompany(page);
    setValue("companyOptions", "");
    setFilter({
      label: t("allBusinessGroup"),
      value: "All Business Group",
    });
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
                      {!isAdmin && (
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
                            Clear
                          </Link>
                          <Controller
                            name="parent"
                            control={control}
                            rules={{ required: true }}
                            render={({
                              field: { onChange, value, name, ref },
                            }) => (
                              <Select
                                onChange={(newValue) => {
                                  setTempValue(newValue.label);
                                  setValue("companyOptions", newValue.label);
                                  handleChangeBusinessGroup(newValue);
                                }}
                                ref={ref}
                                menuPortalTarget={document.body}
                                menuPosition={"fixed"}
                                name={name}
                                styles={{
                                  control: (base) => ({
                                    ...base,
                                    marginRight: "1rem",
                                    marginLeft: "1rem",
                                    width: "15rem",
                                    height: "0.6rem",
                                    menuPortal: (provided) => ({
                                      ...provided,
                                      zIndex: 9999,
                                    }),
                                    menu: (provided) => ({
                                      ...provided,
                                      zIndex: 9999,
                                    }),
                                  }),
                                }}
                                options={businessGroupOptions}
                                isDisabled={isAdmin}
                                value={value ? value : selectFilter}
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
                              <th className="text-center">
                                {t("companyName")}
                              </th>
                              <th className="text-center">
                                {t("businessGroup")}
                              </th>
                              {/* <th>{t('mobileNumber')}</th> */}
                              <th className="text-center">{t("location")}</th>
                              <th className="text-center">{t("email")}</th>
                              <th className="text-center">{t("branches")}</th>

                              {(can("company", "edit") ||
                                can("company", "delete")) && (
                                <th className="d-flex justify-content-center">
                                  {t("action")}
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            <CompanyTable
                              tableData={data?.data ?? []}
                              tempValue={tempValue}
                              currentPage={page}
                              itemsPerPage={itemsPerPage}
                              onConfirmDelete={mutate}
                              editDrawerOpen={editDrawerOpen}
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
export default CompanyList;
