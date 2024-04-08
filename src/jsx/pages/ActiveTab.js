import react from 'react';
import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ClassifyTripTable from "../components/Tables/ClassifyTripTable";
import { classifyTripsSchema } from "../../yup";
import { deleteTrip, getTrips } from '../../services/api/ClassifyTripServices';
import { notifySuccess } from '../../utils/toast';
const ActiveTab = ({tableData1,tabType, getAllTrips}) => {

    const [tableData, setTableData] = useState(tableData1);

    useEffect(() => {
      // const data = tableData1.filter((data) => data.tripStatus === 'ONGOING');
      const filteredData = tableData1.filter((data) => {
        if (tabType === "Active Trips") {
          return data.tripStatus === "ONGOING";
        } else if (tabType === "Planned Trips") {
          return data.tripStatus === "JUST_STARTED";
        } else if (tabType === "Completed Trips") {
          return data.tripStatus === "COMPLETED";
        }
      });
  
      setTableData(filteredData);
    }, [tableData1]);
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
    const [data, setData] = useState(
      document.querySelectorAll("#employee-tbl_wrapper tbody tr")
    );
    const sort = 10;
    const navigate = useNavigate()
    const activePag = useRef(0);
    const [test, settest] = useState(0);
    const chageData = (frist, sec) => {
      for (var i = 0; i < data.length; ++i) {
        if (i >= frist && i < sec) {
          // data[i].classList.remove("d-none");
        } else {
          // data[i].classList.add("d-none");
        }
      }
    };
  
    // const[formData, setFormData] = useState()
  
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
      await deleteTrip(id);
      notifySuccess("Trip Deleted");
      await getAllTrips()
    };

    const editDrawerOpen = (item) => {
      const filteredData = tableData.filter((data) => data._id === item);
      navigate(`edit/${item}`, { state: filteredData });
    };
  
    const classifyTrips = useRef();
    const classifyTripsFilter = useRef();
    console.log(tableData)
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
                        />
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className="dataTables_info">
                        Showing {activePag.current * sort + 1} to{" "}
                        {data.length > (activePag.current + 1) * sort
                          ? (activePag.current + 1) * sort
                          : data.length}{" "}
                        of {data.length} entries
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example2_paginate"
                      >
                        <Link
                          className="paginate_button previous disabled"
                          to="/settings/classifyTrips"
                          onClick={() =>
                            activePag.current > 0 &&
                            onClick(activePag.current - 1)
                          }
                        >
                          <i className="fa-solid fa-angle-left" />
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/settings/classifyTrips"
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
                          to="/settings/classifyTrips"
                          onClick={() =>
                            activePag.current + 1 < paggination.length &&
                            onClick(activePag.current + 1)
                          }
                        >
                          <i className="fa-solid fa-angle-right" />
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
    );
  };

  export default ActiveTab;