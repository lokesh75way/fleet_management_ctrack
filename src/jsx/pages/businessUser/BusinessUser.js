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
import { usePagination } from "react-table";
import { Loader } from "rsuite";

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
  const { can } = usePermissions();
  const [tableData, setTableData] = useState([]);
  const { page, nextPage, prevPage, goToPage, setCount, totalCount } =
    usePagination();

  async function getGroupData() {
    try {
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
                          <Link
                            className={`paginate_button ${
                              page === 1 ? "previous disabled" : "previous"
                            }`}
                            to="/business"
                            onClick={() => prevPage(page - 1)}
                          >
                            <i className={arrowleft} />
                          </Link>
                          <span>
                            {[...Array(Math.ceil(totalCount / 10)).keys()].map(
                              (number) => (
                                <Link
                                  key={number}
                                  className={`paginate_button ${
                                    page === number + 1 ? "current" : ""
                                  }`}
                                  onClick={() => goToPage(number + 1)}
                                >
                                  {number + 1}
                                </Link>
                              )
                            )}
                          </span>
                          <Link
                            className={`paginate_button ${
                              page * 10 >= totalCount ? "next disabled" : "next"
                            }`}
                            to="/business"
                            onClick={() => nextPage(page + 1)}
                          >
                            <i className={arrowright} />
                          </Link>
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
