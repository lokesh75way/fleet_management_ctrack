import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import Select from "react-select";
import DatePicker from "react-datepicker";
import MainPagetitle from "../../../layouts/MainPagetitle";
import { GeofenceData } from "../../../components/Tables/Tables";
import FilterOffcanvas from "../../../constant/FilterOffcanvas";
import GeofenceTable from "../../../components/Tables/GeofenceTable";
import { filterAlerts } from "../../../../utils/helper";
const reportData = [
  {
    invoice: "INV-00001",
    customer: "Ricky Antony",
    createdDate: "14 May 2023",
    parentCompany: "Company4",
    parentBusiness: "Business Group1",
    duedate: "25 May 2023",
    amount: "105",
    discount: "5",
    open: "120",
    adjust: "0.00",
    status: "Active",
  },
  {
    invoice: "INV-00002",
    customer: "Jack John",
    createdDate: "25 May 2023",
    parentCompany: "Company4",
    parentBusiness: "Business Group1",
    duedate: "01 June 2023",
    amount: "230",
    discount: "10",
    open: "150",
    adjust: "0.00",
    status: "Pending",
  },
  {
    invoice: "INV-00003",
    parentCompany: "Company3",
    customer: "Ricky Antony",
    createdDate: "14 May 2023",
    duedate: "25 May 2023",
    amount: "105",
    discount: "5",
    open: "120",
    adjust: "0.00",
    status: "Active",
  },
  {
    invoice: "INV-00004",
    parentCompany: "Company3",
    parentBusiness: "Business Group2",
    customer: "Jack John",
    createdDate: "25 May 2023",
    duedate: "01 June 2023",
    amount: "230",
    discount: "10",
    open: "150",
    adjust: "0.00",
    status: "Pending",
  },
  {
    invoice: "INV-00005",
    parentCompany: "Company2",
    parentBusiness: "Business Group2",
    customer: "Ricky Antony",
    createdDate: "14 May 2023",
    duedate: "25 May 2023",
    amount: "105",
    discount: "5",
    open: "120",
    adjust: "0.00",
    status: "Active",
  },
  {
    invoice: "INV-00006",
    parentCompany: "Company2",
    parentBusiness: "Business Group3",
    customer: "Jack John",
    createdDate: "25 May 2023",
    duedate: "01 June 2023",
    amount: "230",
    discount: "10",
    open: "150",
    adjust: "0.00",
    status: "Pending",
  },
  {
    invoice: "INV-00007",
    parentCompany: "Company1",
    parentBusiness: "Business Group3",

    customer: "Ricky Antony",
    createdDate: "14 May 2023",
    duedate: "25 May 2023",
    amount: "105",
    discount: "5",
    open: "120",
    adjust: "0.00",
    status: "Active",
  },
  {
    invoice: "INV-00008",
    parentCompany: "Company1",
    parentBusiness: "Business Group3",

    customer: "Jack John",
    createdDate: "25 May 2023",
    duedate: "01 June 2023",
    amount: "230",
    discount: "10",
    open: "150",
    adjust: "0.00",
    status: "Pending",
  },
  {
    invoice: "INV-00009",
    parentCompany: "Company5",
    parentBusiness: "Business Group4",

    customer: "Ricky Antony",
    createdDate: "14 May 2023",
    duedate: "25 May 2023",
    amount: "105",
    discount: "5",
    open: "120",
    adjust: "0.00",
    status: "Active",
  },
  {
    invoice: "INV-000010",
    parentCompany: "Company5",
    parentBusiness: "Business Group4",

    customer: "Jack John",
    date: "25 May 2023",
    duedate: "01 June 2023",
    amount: "230",
    discount: "10",
    open: "150",
    adjust: "0.00",
    status: "Pending",
  },
  {
    invoice: "INV-000011",
    parentCompany: "Company5",
    parentBusiness: "Business Group4",

    customer: "Ricky Antony",
    createdDate: "14 May 2023",
    duedate: "25 May 2023",
    amount: "105",
    discount: "5",
    open: "120",
    adjust: "0.00",
    status: "Active",
  },
  {
    invoice: "INV-000012",
    parentCompany: "Company1",
    parentBusiness: "Business Group5",

    customer: "Jack John",
    createdDate: "25 May 2023",
    duedate: "01 June 2023",
    amount: "230",
    discount: "10",
    open: "150",
    adjust: "0.00",
    status: "Pending",
  },
  {
    invoice: "INV-000013",
    parentCompany: "Company1",
    parentBusiness: "Business Group5",

    customer: "Ricky Antony",
    createdDate: "14 May 2023",
    duedate: "25 May 2023",
    amount: "105",
    discount: "5",
    open: "120",
    adjust: "0.00",
    status: "Active",
  },
  {
    invoice: "INV-000014",
    parentCompany: "Company2",
    parentBusiness: "Business Group5",

    customer: "Jack John",
    createdDate: "15 May 2023",
    duedate: "01 June 2023",
    amount: "230",
    discount: "10",
    open: "150",
    adjust: "0.00",
    status: "Pending",
  },
  {
    invoice: "INV-000015",
    parentCompany: "Company2",
    parentBusiness: "Business Group5",

    customer: "Ricky Antony",
    createdDate: "14 May 2023",
    duedate: "25 May 2023",
    amount: "105",
    discount: "5",
    open: "120",
    adjust: "0.00",
    status: "Active",
  },
  {
    invoice: "INV-000016",
    parentCompany: "Company3",
    customer: "Jack John",
    createdDate: "25 May 2023",
    duedate: "01 June 2023",
    amount: "230",
    discount: "10",
    open: "150",
    adjust: "0.00",
    status: "Pending",
  },
  {
    invoice: "INV-000017",
    parentCompany: "Company3",
    customer: "Ricky Antony",
    parentBusiness: "Business Group1",

    createdDate: "14 May 2023",
    duedate: "25 May 2023",
    amount: "105",
    discount: "5",
    open: "120",
    adjust: "0.00",
    status: "Active",
  },
  {
    invoice: "INV-000018",
    parentCompany: "Company4",
    parentBusiness: "Business Group1",

    customer: "Jack John",
    createdDate: "25 May 2023",
    duedate: "01 June 2023",
    amount: "230",
    discount: "10",
    open: "150",
    adjust: "0.00",
    status: "Pending",
  },
  {
    invoice: "INV-000019",
    parentCompany: "Company4",
    parentBusiness: "Business Group2",

    customer: "Ricky Antony",
    createdDate: "14 May 2023",
    duedate: "25 May 2023",
    amount: "105",
    discount: "5",
    open: "120",
    adjust: "0.00",
    status: "Active",
  },
  {
    invoice: "INV-000020",
    parentBusiness: "Business Group3",

    parentCompany: "Company2",
    customer: "Jack John",
    createdDate: "25 May 2023",
    duedate: "01 June 2023",
    amount: "230",
    discount: "10",
    open: "150",
    adjust: "0.00",
    status: "Pending",
  },
  {
    invoice: "INV-000021",
    parentCompany: "Company2",
    customer: "Ricky Antony",
    parentBusiness: "Business Group3",

    createdDate: "14 May 2023",
    duedate: "25 May 2023",
    amount: "105",
    discount: "5",
    open: "120",
    adjust: "0.00",
    status: "Active",
  },
  {
    invoice: "INV-000022",
    parentCompany: "Company5",
    customer: "Jack John",
    parentBusiness: "Business Group3",

    createdDate: "25 May 2023",
    duedate: "01 June 2023",
    amount: "230",
    discount: "10",
    open: "150",
    adjust: "0.00",
    status: "Pending",
  },
  {
    invoice: "INV-000023",
    parentCompany: "Company2",
    customer: "Ricky Antony",
    parentBusiness: "Business Group2",

    createdDate: "14 May 2023",
    duedate: "25 May 2023",
    amount: "105",
    discount: "5",
    open: "120",
    adjust: "0.00",
    status: "Active",
  },
  {
    invoice: "INV-000024",
    parentCompany: "Company3",
    customer: "Jack John",
    parentBusiness: "Business Group1",

    createdDate: "25 May 2023",
    duedate: "01 June 2023",
    amount: "230",
    discount: "10",
    open: "150",
    adjust: "0.00",
    status: "Pending",
  },
];

const headers = [
  { label: "Invoice", key: "invoice" },
  { label: "Customer", key: "customer" },
  { label: "Date", key: "date" },
  { label: "Due Date", key: "duedate" },
  { label: "Amount", key: "amount" },
  { label: "Discount", key: "discount" },
  { label: "Open", key: "open" },
  { label: "Adjustment", key: "adjust" },
  { label: "Status", key: "status" },
];
const csvlink = {
  headers: headers,
  data: reportData,
  filename: "Geofence Address Rep.csv",
};
const GeofenceAddress = (ref) => {
  const [date, setDate] = useState({
    startDate: new Date(0),
    endDate: new Date(0),
  });
  const [businessFilter, setBusinessFilter] = useState("All Groups");
  const [companyFilter, setFilterCompany] = useState("All Companies");

  const [tableData, setTableData] = useState(GeofenceData);
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

  useEffect(() => {
    if (date?.startDate && date?.endDate) {
      const data = filterAlerts(
        date?.startDate,
        date?.endDate,
        companyFilter,
        businessFilter,
        GeofenceData
      );
      setTableData(data);
    }
  }, [date?.startDate, date?.endDate, companyFilter, businessFilter]);

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

  const filter = useRef();
  return (
    <>
      <MainPagetitle
        mainTitle="GeofenceAddress"
        pageTitle={"GeofenceAddress"}
        parentTitle={"Reports"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">GeofenceAddress</h4>
                    <div className="d-flex">
                      <CSVLink
                        {...csvlink}
                        className="btn btn-primary light btn-sm me-1"
                      >
                        <i className="fa-solid fa-file-excel" /> Export Report
                      </CSVLink>
                      <Link
                        to={"#"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        onClick={() => filter.current.showModal()}
                      >
                        + Filter
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
                          <th>Geofence ID</th>
                          <th>Geofence Name</th>
                          <th>Geofence Type</th>
                          <th>Contact Number</th>
                          <th>Address</th>
                          <th>Description </th>
                          <th>Address</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <GeofenceTable
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
                          to="/geofenceAddress"
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
                              to="/settings/geofenceAddress"
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
                          to="/settings/geofenceAddress"
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
        ref={filter}
        data={GeofenceData}
        setBusinessHandler={setBusinessFilter}
        setCompanyHandler={setFilterCompany}
        setDatehandler={setDate}
        editData={editData}
        setEditData={setEditData}
        handleSubmit={handleSubmit}
        Title={editData.id === 0 ? "Add Filter" : "Edit Filter"}
      />
    </>
  );
};

export default GeofenceAddress;
