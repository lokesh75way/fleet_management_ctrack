import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

import { IMAGES } from "../constant/theme";
import MainPagetitle from "../layouts/MainPagetitle";
import AlertOffcanvas from "../constant/AlertOffcanvas";
import useAlertSubmit from "../../hooks/useAlertSubmit";
import { AlertData } from "../components/Tables/Tables";
import AlertTable from "../components/Tables/AlertTable";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { alertSchema } from "../../yup";
import Select from "react-select";
import { companyOptions } from "../components/TabComponent/VehicleTabs/Options";
import DatePicker from "react-datepicker";
import {
  filterAlerts,
  filterDataBetweenDates,
  findHighestAndLowestDates,
} from "../../utils/selectValues";

const headers = [
  { label: "Employee ID", key: "emplid" },
  { label: "Employee Name", key: "title" },
  { label: "Department", key: "department" },
  { label: "Email Address", key: "email" },
  { label: "Contact Number", key: "contact" },
  { label: "Location", key: "location" },
  { label: "Status", key: "status" },
  { label: "User Group", key: "usergroup" },
];

const Alert = () => {
  const [startDate, setStartDate] = useState(new Date(0));
  const [endDate, setEndDate] = useState(new Date(0));

  const dateRangeText = startDate.toLocaleDateString();

  const [selectFilter, setFilter] = useState({
    value: "All Companies",
    label: "All Companies",
  });
  const [tableData, setTableData] = useState(AlertData);
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
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(alertSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  const [data, setData] = useState(
    document.querySelectorAll("#employee-tbl_wrapper tbody tr")
  );
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

  useEffect(() => {
    const dates = findHighestAndLowestDates(AlertData);
    setStartDate(dates.lowestDate);
    setEndDate(dates.highestDate);
  }, []);

  useEffect(() => {
    console.log(startDate)
    if (startDate && endDate) {
      const data = filterAlerts(
        startDate,
        endDate,
        selectFilter.label,
        AlertData
      );
      setTableData(data);
    }
  }, [startDate, endDate, selectFilter.value]);

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
  const onConfirmDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);
  };
  const editDrawerOpen = (item) => {
    tableData.map((table) => table.id === item && setEditData(table));

    // setEditTableData(item);
    alert.current.showModal();
  };
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
  const invite = useRef();
  // const employe = useRef();
  const alert = useRef();

  return (
    <>
      <MainPagetitle
        mainTitle="Alert"
        pageTitle={"Alert"}
        parentTitle={"Settings"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0" style={{ flex: 1 }}>
                      Alert
                    </h4>
                    <div className="d-flex">
                      <DatePicker
                        // width="0px"
                        className="form-control"
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        onChange={(dates) => {
                          const [start, end] = dates;
                          setStartDate(start);
                          setEndDate(end);
                        }}
                        dateFormat="dd/MM/yy"
                        placeholderText={dateRangeText}
                      />

                      <Controller
                        name="parent"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <Select
                            onChange={(newValue) => {
                              setFilter({
                                value: newValue.value,
                                label: newValue.label,
                              });
                            }}
                            ref={ref}
                            name={name}
                            menuPortalTarget={document.body}
                            menuPosition={"fixed"}
                            styles={customStyles}
                            options={companyOptions}
                            value={selectFilter}

                            // defaultValue={{value:getValues("parent"),label:getValues("parent")}}
                          />
                        )}
                      />
                      <div>
                        <Link
                          to={"#"}
                          className="btn btn-primary btn-sm ms-1"
                          data-bs-toggle="offcanvas"
                          onClick={() => alert.current.showModal()}
                        >
                          + Add Alert
                        </Link>{" "}
                      </div>
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
                          <th>Alerts</th>
                          <th>Alert Name</th>
                          <th>Alert Type</th>
                          <th>Created Date</th>
                          <th>Notification</th>
                          <th>Reason</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AlertTable
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
                          to="/alert"
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
                              to="/alert"
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
                          to="/alert"
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
      <AlertOffcanvas
        ref={alert}
        Title="Add Alert"
        editData={editData}
        setEditData={setEditData}
        register={register}
        setValue={setValue}
        onSubmit={onSubmit}
        getValues={getValues}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Alert;
