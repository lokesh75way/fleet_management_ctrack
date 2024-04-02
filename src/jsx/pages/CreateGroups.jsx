import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MainPagetitle from "../layouts/MainPagetitle";
import GroupTable from "../components/Tables/GroupTable";
import { useNavigate } from "react-router-dom";
import TemplateServices, { getTemplates } from "../../services/api/TemplateServices";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import usePagination from "../../hooks/usePagination";
import { ThemeContext } from "../../context/ThemeContext";

const CreateGroups = () => {
    const { isRtl } = useContext(ThemeContext);
    const arrowleft = clsx({
      "fa-solid fa-angle-right": isRtl,
      "fa-solid fa-angle-left": !isRtl,
    });
    const arrowright = clsx({
      "fa-solid fa-angle-left": isRtl,
      "fa-solid fa-angle-right": !isRtl,
    });
  
  const { t } = useTranslation();
  // const templateData = JSON.parse(localStorage.getItem("templateData")) || []
  const { page, nextPage, prevPage, goToPage, setCount, totalCount } =
    usePagination();
    const fetchData = async (page) => {
        try {
          const templateData =  await getTemplates(page);
          console.log("Received template data:",templateData);
          setCount(templateData.data.totalCount)
          setGroupsDataState(templateData.data.data); // Assuming 'data' property contains template data array
        } catch (error) {
          console.error("Error fetching template data:", error);
        }
      };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  const [groupsDataState, setGroupsDataState] = useState([]);
  const [isEditTrue, setIsEditTrue] = useState(-1);

  const navigate = useNavigate();


  // useEffect(()=>{
  //     const data = getAllModules();
  //     setGroupsDataState(data)
  // },[])


  const onConfirmDelete = async (index, id) => {
    const newdata = groupsDataState.filter((e, i) => {
      if (index != i) return e;
    });
    localStorage.setItem("templateData", JSON.stringify(newdata));
    setGroupsDataState(newdata);
    await TemplateServices.deleteTemplate(id);
  };

  const handleAddGroup = () => {
    const props = {
      isEditTrue,
      setIsEditTrue,
    };
    navigate("permission", { state: JSON.stringify(props) });
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t("featureTemplates")}
        pageTitle={t("featureTemplates")}
        parentTitle={t("settings")}
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
                      <button
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        onClick={handleAddGroup}
                      >
                        + {t("addNew")}
                      </button>{" "}
                      {""}
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
                          <th>{t("shortName")}</th>
                          <th>{t("templateName")}</th>
                          <th>{t("username")}</th>
                          <th>{t("contactNumber")}</th>
                          <th>{t("location")}</th>
                          <th>{t("userTemplate")}</th>
                          <th>{t("status")}</th>
                          <th>{t("action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <GroupTable
                          isEditTrue={isEditTrue}
                          setIsEditTrue={setIsEditTrue}
                          tableData={groupsDataState}
                          onConfirmDelete={onConfirmDelete}
                        />
                      </tbody>
                    </table>
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
                        <Link
                          className={`paginate_button ${
                            page === 1 ? "previous disabled" : "previous"
                          }`}
                          to="/groups"
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
                          to="/groups"
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
    </>
  );
};
export default CreateGroups;
