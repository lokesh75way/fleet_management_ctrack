import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import MainPagetitle from "../../layouts/MainPagetitle";
import BusinessTable from "../../components/Tables/BusinessTable";
import { useTranslation } from "react-i18next";
import { clsx } from "clsx";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { usePermissions } from "../../../context/PermissionContext";
import { deleteGroup, getGroups } from "../../../services/api/BusinessGroup";
import usePagination from "../../../hooks/usePagination";
import { Loader } from "rsuite";
import ReactPaginate from "react-paginate";

const BusinessUser = () => {
  const [deleteId, setDeleteId] = useState();
  const { isRtl } = useContext(ThemeContext);
  const arrowleft = clsx({
    "fa-solid fa-angle-right": isRtl,
    "fa-solid fa-angle-left": !isRtl,
  });
  const arrowright = clsx({
    "fa-solid fa-angle-left": isRtl,
    "fa-solid fa-angle-right": !isRtl,
  });
  const [isLoading, setIsLoading] = useState();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { can, setUserPermission } = usePermissions();
  const [tableData, setTableData] = useState([]);
  const { page, nextPage, prevPage, goToPage, setCount, count, totalCount } =
    usePagination();
    const itemsPerPage=10;

    const handlePageClick = ({ selected }) => {
      goToPage(selected + 1); 
    };
  
    const startIndex = (page - 1) * itemsPerPage;
    const slicedData = tableData.slice(startIndex, startIndex + itemsPerPage);

  async function getGroupData() {
    try {
      const permissions = JSON.parse(localStorage.getItem("permission"));
      setUserPermission(permissions?.[0]?.permission);
      const { data, totalPage, totalCount } = await getGroups(page);
      setTableData(data);
      setCount(totalCount);
    } catch (error) {
      console.log("Error in fetching data", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getGroupData();
  }, [page]);

  const onConfirmDelete = async (id) => {
    await deleteGroup(id);
    await getGroupData();
  };
  const editDrawerOpen = (item) => {
    const filteredData = tableData.filter((data) => data._id === item);

    navigate(`/business/edit/${item}`, { state: filteredData });
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t("businessGroup")}
        pageTitle={t("businessGroup")}
        parentTitle={t("home")}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
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
                            key={tableData}
                            currentPage={page} 
                            itemsPerPage={itemsPerPage} 
                            tableData={tableData}
                            onConfirmDelete={onConfirmDelete}
                            editDrawerOpen={editDrawerOpen}
                          />
                        </tbody>
                      </table>
                      <div className="d-sm-flex text-center justify-content-between align-items-center">
                        <div className="dataTables_info">
                          {t("showing")} {(page - 1) * 10 + 1} {t("to")}{" "}
                          {Math.min(page * 10, totalCount)} {t("of")}{" "}
                          {totalCount} {t("entries")}
                        </div>
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="example2_paginate"
                        >
                          <ReactPaginate
                            previousLabel={<i className="fa-solid fa-angle-left"></i>}
                            nextLabel={<i className="fa-solid fa-angle-right"></i>}
                            breakLabel={"..."}
                            pageCount={Math.ceil(totalCount / itemsPerPage)} // Calculate pageCount based on totalCount and itemsPerPage
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
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
      )}
    </>
  );
};
export default BusinessUser;
