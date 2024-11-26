import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

import MainPagetitle from "../../../layouts/MainPagetitle";
import { FuelData } from "../../../components/Tables/Tables";
import FilterOffcanvas from "../../../constant/FilterOffcanvas";
import { filterAlerts } from "../../../../utils/helper";
import FuelTable from "../../../components/Tables/FuelTable";
import { useTranslation } from "react-i18next";

const tableData = [
  {
    emplid: "1001",
    contact: "+12 123 456 7890",
    title: "Ricky Antony",
    email: "ra@gmail.com",
    gender: "Female",
    location: "India",
    status: "Active",
  },
  {
    emplid: "1002",
    contact: "+12 123 456 7890",
    title: "Ankites Risher",
    email: "abc@gmail.com",
    gender: "Male",
    location: "Brazil",
    status: "Active",
  },
  {
    emplid: "1003",
    contact: "+12 123 456 7890",
    title: "Ricky M",
    email: "pqr@gmail.com",
    gender: "Male",
    location: "France",
    status: "Active",
  },
  {
    emplid: "1004",
    contact: "+12 123 456 7890",
    title: "Elijah James",
    email: "stuy@gmail.com",
    gender: "Female",
    location: "Dubai",
    status: "Active",
  },
  {
    emplid: "1005",
    contact: "+12 123 456 7890",
    title: "Honey Risher",
    email: "xyz@gmail.com",
    gender: "Male",
    location: "USA",
    status: "Active",
  },
  {
    emplid: "1006",
    contact: "+12 123 456 7890",
    title: "Honey Risher",
    email: "xyz@gmail.com",
    gender: "Male",
    location: "USA",
    status: "Active",
  },
  {
    emplid: "1007",
    contact: "+12 123 456 7890",
    title: "Ankites Risher",
    email: "abc@gmail.com",
    gender: "Male",
    location: "Brazil",
    status: "Active",
  },
  {
    emplid: "1008",
    contact: "+12 123 456 7890",
    title: "Ricky M",
    email: "pqr@gmail.com",
    gender: "Male",
    location: "France",
    status: "Active",
  },
  {
    emplid: "1009",
    contact: "+12 123 456 7890",
    title: "Ricky Antony",
    email: "ra@gmail.com",
    gender: "Female",
    location: "India",
    status: "Active",
  },
  {
    emplid: "1010",
    contact: "+12 123 456 7890",
    title: "Elijah James",
    email: "stuy@gmail.com",
    gender: "Female",
    location: "Dubai",
    status: "Active",
  },
  {
    emplid: "1011",
    contact: "+12 123 456 7890",
    title: "Ankites Risher",
    email: "abc@gmail.com",
    gender: "Male",
    location: "Brazil",
    status: "Active",
  },
  {
    emplid: "1012",
    contact: "+12 123 456 7890",
    title: "Ricky Antony",
    email: "ra@gmail.com",
    gender: "Female",
    location: "India",
    status: "Active",
  },
  {
    emplid: "1013",
    contact: "+12 123 456 7890",
    title: "Elijah James",
    email: "stuy@gmail.com",
    gender: "Female",
    location: "Dubai",
    status: "Active",
  },
  {
    emplid: "1014",
    contact: "+12 123 456 7890",
    title: "Ricky M",
    email: "pqr@gmail.com",
    gender: "Male",
    location: "France",
    status: "Active",
  },
  {
    emplid: "1015",
    contact: "+12 123 456 7890",
    title: "Honey Risher",
    email: "xyz@gmail.com",
    gender: "Male",
    location: "USA",
    status: "Active",
  },
];

const headersTitle = [
  { label: "Employee ID", key: "emplid" },
  { label: "Employee Name", key: "title" },
  { label: "Email Address", key: "email" },
  { label: "Contact Number", key: "contact" },
  { label: "Gender", key: "gender" },
  { label: "Location", key: "location" },
  { label: "Status", key: "status" },
];

const csvlink = {
  headers: headersTitle,
  data: tableData,
  filename: "Fuel Rep.csv",
};

const Fuel = (ref) => {
  const { t } = useTranslation();
  const [date, setDate] = useState({
    startDate: new Date(0),
    endDate: new Date(0),
  });
  const [businessFilter, setBusinessFilter] = useState("All Groups");
  const [companyFilter, setFilterCompany] = useState("All Companies");

  const [tableData, setTableData] = useState(FuelData);
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
    filter.current.showModal();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updateTable = tableData.map((table) => {
      if (table.id === editData.id) {
        console.log(table.id);
        return { ...table, ...editData };
      }
      return table;
    });
    setTableData(updateTable);
  };

  useEffect(() => {
    if (date?.startDate && date?.endDate) {
      const data = filterAlerts(
        date?.startDate,
        date?.endDate,
        companyFilter,
        businessFilter,
        FuelData
      );
      setTableData(data);
    }
  }, [date?.startDate, date?.endDate, companyFilter, businessFilter]);

  const filter = useRef();
  return (
    <>
      <MainPagetitle
        mainTitle={t("fuel")}
        pageTitle={t("fuel")}
        parentTitle={t("Reports")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("fuel")}</h4>
                    <div className="d-flex">
                      <CSVLink
                        {...csvlink}
                        className="btn btn-primary light btn-sm me-1"
                      >
                        <i className="fa-solid fa-file-excel" />{" "}
                        {t("exportReport")}
                      </CSVLink>
                      <Link
                        to={"#"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        onClick={() => filter.current.showModal()}
                      >
                        + {t("filter")}
                      </Link>{" "}
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
                          <th>{t("employeeId")}</th>
                          <th>{t("vehicleName")}</th>
                          <th>{t("fuelConsumed")}</th>
                          <th>{t("mileage")}</th>
                          <th>{t("drain")}</th>
                          <th>{t("date")}</th>
                          <th>{t("maxStoppages")}</th>
                          <th>{t("distance")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <FuelTable
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
                          to="/reports/fuel"
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
                              to="/reports/fuel"
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
                          to="/reports/Fuel"
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
      <FilterOffcanvas
        data={FuelData}
        ref={filter}
        editData={editData}
        setEditData={setEditData}
        setBusinessHandler={setBusinessFilter}
        setCompanyHandler={setFilterCompany}
        setDatehandler={setDate}
        handleSubmit={handleSubmit}
        Title={editData.id === 0 ? "Add Filter" : "Edit Filter"}
      />
    </>
  );
};

export default Fuel;
