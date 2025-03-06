import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import TableSkeleton from "@/components/Skeleton/Table";
import MainPagetitle from "../../components/MainPagetitle";
import Paginate from "../../components/Paginate";
import SubUserTable from "../components/Tables/SubUserTable";
import { getUser, deleteUser } from "../../services/api/UserServices";
import { usePermissions } from "../../context/PermissionContext";
import usePagination from "../../hooks/usePagination";

const SubUser = () => {
  const { t } = useTranslation();

  const { can, setUserPermission } = usePermissions();
  const [isLoading, setIsLoading] = useState(true);
  const { page, goToPage, setCount, totalCount } = usePagination();

  const fetchUser = async () => {
    setIsLoading(true);
    const { data, count } = await getUser(page);
    const permissions = JSON.parse(localStorage.getItem("permission"));
    setUserPermission(permissions?.[0]?.permission);
    setTableData(data);
    setCount(count);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchUser(page);
  }, [page]);

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const onConfirmDelete = async (id) => {
    await deleteUser(id);
    const data = tableData.filter((item) => item._id === id);
    setTableData(data);
  };

  const editDrawerOpen = (_id) => {
    const data = tableData.filter((item) => item._id === _id);
    navigate(`/user/edit/${_id}`, { state: { formData: data } });
  };

  const itemsPerPage = 10;

  const handlePageClick = ({ selected }) => {
    setTableData([]);
    goToPage(selected + 1);
  };

  const startIndex = (page - 1) * itemsPerPage;
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
                          // onClick={()=>subuser.current.showModal()}
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
                    {!tableData.length && isLoading ? (
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
                          <SubUserTable
                            key={tableData}
                            currentPage={page}
                            itemsPerPage={itemsPerPage}
                            tableData={tableData}
                            onConfirmDelete={onConfirmDelete}
                            editDrawerOpen={editDrawerOpen}
                          />
                        </tbody>
                      </table>
                    )}
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className="dataTables_info">
                        {totalCount > 0 ? (
                          <>
                            {t("showing")} {(page - 1) * 10 + 1} {t("to")}{" "}
                            {Math.min(page * 10, totalCount)} {t("of")}{" "}
                            {totalCount} {t("entries")}
                          </>
                        ) : (
                          <span className="text-gray-500">
                            {t("No User Found")}
                          </span>
                        )}
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

export default SubUser;
