import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";

import { IMAGES } from "../../constant/theme";
import MainPagetitle from "../../layouts/MainPagetitle";
import InviteCustomer from "../../constant/ModalList";
import CompanyOffcanvas from "../../constant/CompanyOffcanvas";
// import {BusinessData} from "../../components/Tables/Tables";
import BusinessTable from "../../components/Tables/BusinessTable";
import { useTranslation } from "react-i18next";

import { clsx } from "clsx";

import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

import { usePermissions } from "../../../context/PermissionContext";
import { deleteGroup, getGroups } from "../../../services/api/BusinessGroup";

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

  const { t } = useTranslation();
  const { can } = usePermissions(); // calling can method from usePermission
  const [data, setData] = useState(
    document.querySelectorAll("#employee-tbl_wrapper tbody tr")
  );

  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState({
    id: 0,
    title: "sfds",
    contact: 0,
    email: "",
    status: "",
    location: "",
    usergroup: "",
  });
  const navigate = useNavigate();
  const sort = 10;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  async function getGroupData() {
    try {
      const { data, totalLength } = await getGroups();
      setTableData(data);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  }

  useEffect(() => {
    getGroupData();
  }, []);

  useEffect(() => {
    setData(document.querySelectorAll("#employee-tbl_wrapper tbody tr"));
  }, [test]);

  activePag.current === 0 && chageData(0, sort);
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };

  const onConfirmDelete = async (id) => {
    await deleteGroup(id);
    await getGroupData();
  };
  const editDrawerOpen = (item) => {
    const filteredData = tableData.filter((data) => data._id === item);

    navigate(`/business/edit/${item}`, { state: filteredData });
  };

  const company = useRef();
  const edit = useRef();
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
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("businessGroup")}</h4>
                    <div>
                      <Link
                        to={{
                          pathname: "/business/create",
                          state: "HEllo",
                        }}
                        className="btn btn-primary btn-sm ms-1 p-2"
                        data-bs-toggle="offcanvas"
                        style={{ paddingBlock: "9px" }}
                      >
                        {t("addBusinessGroup")}
                      </Link>
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
                          <th>{t("action")}</th>
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
                        {t("showing")} {activePag.current * sort + 1} {t("to")}{" "}
                        {data.length > (activePag.current + 1) * sort
                          ? (activePag.current + 1) * sort
                          : data.length}{" "}
                        {t("of")} {data.length} {t("entries")}
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example2_paginate"
                      >
                        <Link
                          className="paginate_button previous disabled"
                          to="/business"
                          onClick={() =>
                            activePag.current > 0 &&
                            onClick(activePag.current - 1)
                          }
                        >
                          <i className={arrowleft} />
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/business"
                              className={`paginate_button  ${
                                activePag.current === i ? "current" : ""
                              } `}
                              onClick={() => onClick(i)}
                            >
                              {number}
                            </Link>
                          ))}
                        </span>
                        <Link
                          className="paginate_button next"
                          to="/business"
                          onClick={() =>
                            activePag.current + 1 < paggination.length &&
                            onClick(activePag.current + 1)
                          }
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
      {/* <CompanyOffcanvas 
                ref={company}
                Title={ editData.id === 0 ? "Add Company" : "Edit Company"}
                handleSubmit={handleSubmit}
                editData={editData}
                setEditData={setEditData}
            /> */}
    </>
  );
};
export default BusinessUser;
