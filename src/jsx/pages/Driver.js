import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";

import { IMAGES } from "../constant/theme";
import MainPagetitle from "../layouts/MainPagetitle";
import InviteCustomer from "../constant/ModalList";
import EmployeeOffcanvas from "../constant/EmployeeOffcanvas";
import DriverTable from "../components/Tables/DriverTable";

const Driver = (ref) => {
  const navigate = useNavigate();
  const allData = JSON.parse(localStorage.getItem('userJsonData'));
  const driverDataFromLocalStorage = allData.filter((item)=> item.Designation === "Driver")
  // const driverData =   
  const DriverDataMemoized = useMemo(() => {
      return  driverDataFromLocalStorage ? driverDataFromLocalStorage: [];
  }, [driverDataFromLocalStorage]);

  const [tableData, setTableData] = useState([]);

  useEffect(()=>{
    const loginCompanyId  = localStorage.getItem('loginDetails-email');
    console.log(DriverDataMemoized , loginCompanyId)
    const data1 = DriverDataMemoized.filter((driver)=> driver.branch === loginCompanyId);
    console.log(data1)
    if(loginCompanyId === 'admin@example.com'){
      setTableData(DriverDataMemoized)
      return;
    }
    setTableData(data1)
  },[])

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
  const activePage = useRef(0);
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
  }, [test, tableData]);

  activePage.current === 0 && chageData(0, sort);
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);
  const onClick = (i) => {
    activePage.current = i;
    chageData(activePage.current * sort, (activePage.current + 1) * sort);
    settest(i);
  };
  const onConfirmDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);

     // Remove item from local storage
  const updatedLocalStorageData = DriverDataMemoized.filter(
    (item) => item.id !== id
  );
  localStorage.setItem("driverData", JSON.stringify(updatedLocalStorageData));
  };
  const editDrawerOpen = (item) => {
    tableData.map((table) => table.id === item && setEditData(table));
    navigate(`/driver/edit/${item}`);
    // setEditTableData(item);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const updateTable = tableData.map((table) => {
  //     if (table.id === editData.id) {
  //       console.log(table.id);
  //       return { ...table, ...editData };
  //     }
  //     return table;
  //   });
  //   setTableData(updateTable);
  // };

  const employe = useRef();
  return (
    <>
      <MainPagetitle
        mainTitle="Drivers"
        pageTitle={"Drivers"}
        parentTitle={"Home"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">Drivers</h4>
                    <div>
                      <Link
                        to={"/driver/create"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        // onClick={() => employe.current.showModal()}
                      >
                        + Add Driver
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
                          <th>ID</th>
                          <th>Employee Name</th>
                          <th>Age</th>
                          <th>Contact Number</th>
                          <th>Driving Experience Since</th>
                          <th>City</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <DriverTable
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
                        Showing {activePage.current * sort + 1} to{" "}
                        {data.length > (activePage.current + 1) * sort
                          ? (activePage.current + 1) * sort
                          : data.length}{" "}
                        of {data.length} entries
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example2_paginate"
                      >
                        <Link
                          className="paginate_button previous disabled"
                          to="/driver"
                          onClick={() =>
                            activePage.current > 0 &&
                            onClick(activePage.current - 1)
                          }
                        >
                          <i className="fa-solid fa-angle-left" />
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/driver"
                              className={`paginate_button  ${
                                activePage.current === i ? "current" : ""
                              } `}
                              onClick={() => onClick(i)}
                            >
                              {number}
                            </Link>
                          ))}
                        </span>
                        <Link
                          className="paginate_button next"
                          to="/driver"
                          onClick={() =>
                            activePage.current + 1 < paggination.length &&
                            onClick(activePage.current + 1)
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
    
    </>
  );
};

export default Driver;
