import react from "react";
import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ClassifyTripTable from "../components/Tables/ClassifyTripTable";
import { classifyTripsSchema } from "../../yup";
import { deleteTrip, getTrips } from "../../services/api/ClassifyTripServices";
import { notifySuccess } from "../../utils/toast";
import { ThemeContext } from "../../context/ThemeContext";
import usePagination from "../../hooks/usePagination";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import ReactPaginate from "react-paginate";
const ActiveTab = ({ tableData1, tabType }) => {
  console.log("tabledata1",tableData1)
  const [tableData, setTableData] = useState(tableData1);
  const [status, setStatus] = useState("");

  useEffect(()=>{
    setTableData(tableData1);
  },[tableData1])
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(classifyTripsSchema),
  });
  const [editData, setEditData] = useState({
    id: 0,
    status: "",
    title: "",
    contact: 0,
    age: 0,
    drivingExperience: 0,
    gender: "",
    location: "",
  });
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
  const navigate = useNavigate();
  const { page, nextPage, prevPage, goToPage, setCount, totalCount, setPage } =
    usePagination();
    const itemsPerPage=10;

    const handlePageClick = ({ selected }) => {
      goToPage(selected + 1); 
    };
  
    const startIndex = (page - 1) * itemsPerPage;
    const slicedData = tableData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    let status = "";
    if (tabType === "Active Trips") {
      status = "ONGOING";
    } else if (tabType === "Planned Trips") {
      status = "JUST_STARTED";
    } else if (tabType === "Completed Trips") {
      status = "COMPLETED";
    }

    getAllTrips(status);
  }, [tabType, page]);

  const getAllTrips = async (status) => {
    try {
      const { data, success, totalLength } = await getTrips(page, status); 
      setTableData(data);
      setCount(totalLength);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const onConfirmDelete = async (id) => {
    await deleteTrip(id);
    setTableData(prevTableData => prevTableData.filter(trip => trip._id !== id));
    notifySuccess("Trip Deleted");
  };

  const editDrawerOpen = (item) => {
    const filteredData = tableData.filter((data) => data._id === item);
    navigate(`edit/${item}`, { state: filteredData });
  };

  const classifyTrips = useRef();
  const classifyTripsFilter = useRef();
  console.log(tableData);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
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
                        <th>Trip ID</th>
                        <th>Start Time</th>
                        <th>Start Location</th>
                        <th>Reach Time</th>
                        <th>Reach Location</th>
                        <th>Distance</th>
                        <th>Fuel Consumption</th>
                        <th>Driver</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <ClassifyTripTable
                        active={true}
                        editData={editData}
                        tableData={tableData}
                        onConfirmDelete={onConfirmDelete}
                        editDrawerOpen={editDrawerOpen}
                        setEditData={setEditData}
                        currentPage={page} 
                        itemsPerPage={itemsPerPage}
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
  );
};

export default ActiveTab;
