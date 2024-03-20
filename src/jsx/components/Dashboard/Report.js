import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MainPagetitle from "../../layouts/MainPagetitle";
import { CSVLink } from "react-csv";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {
  filterAlerts,
  findHighestAndLowestDates,
} from "../../../utils/helper";
import { companyOptions } from "../TabComponent/VehicleTabs/Options";
import FilterOffcanvas from "../../constant/FilterOffcanvas";

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
  filename: "csvfile.csv",
};

const Report = () => {
  const [date, setDate] = useState({
    startDate: new Date(0),
    endDate: new Date(0),
  });
  const [businessFilter, setBusinessFilter] = useState("All Groups");
  const [companyFilter, setFilterCompany] = useState("All Companies");

  const [tableData, setTableData] = useState(reportData);
  const [data, setData] = useState(
    document.querySelectorAll("#report-tblwrapper tbody tr")
  );

  useEffect(() => {
    if (date?.startDate && date?.endDate) {
      const data = filterAlerts(
        date?.startDate,
        date?.endDate,
        companyFilter,
        businessFilter,
        reportData
      );
      setTableData(data);
    }
  }, [date?.startDate, date?.endDate, companyFilter, businessFilter]);

  useEffect(() => {
    setTableData(reportData);
  }, []);
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
    setData(document.querySelectorAll("#report-tblwrapper tbody tr"));
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
  const filter = useRef();
  return (
    <>
      <MainPagetitle
        mainTitle="Reports"
        pageTitle="Generated Report"
        parentTitle="Home"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects manage-client">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">Generated Report</h4>
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
                    id="report-tblwrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <table
                      id="reports-tbl"
                      className="table ItemsCheckboxSec dataTable no-footer mb-0"
                    >
                      <thead>
                        <tr>
                          <th>Invoice #</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Due Date</th>
                          <th>Amount</th>
                          <th>Discount</th>
                          <th>Amount Open</th>
                          <th>Adjustment</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <Link to={"#"} className="text-primary">
                                {item.invoice}
                              </Link>
                            </td>
                            <td>
                              <span>{item.customer}</span>
                            </td>
                            <td>
                              <span>{item.createdDate}</span>
                            </td>
                            <td>
                              <span>{item.duedate}</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {item.amount} $
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {item.discount} $
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {item.open} $
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {item.adjust}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge light border-0 ${
                                  item.status === "Active"
                                    ? "badge-success"
                                    : "badge-danger"
                                }`}
                                style={{ width: "5rem" }}
                              >
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
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
                          to="/reports"
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
                              to="/reports/generated"
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
                          to="/reports/generated"
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
        data={reportData}
        ref={filter}
        setBusinessHandler={setBusinessFilter}
        setCompanyHandler={setFilterCompany}
        setDatehandler={setDate}
        Title={"Add Filter"}
      />
    </>
  );
};

export default Report;
