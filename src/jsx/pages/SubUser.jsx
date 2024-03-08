import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { IMAGES } from "../constant/theme";
import MainPagetitle from "../layouts/MainPagetitle";
import DeleteModal from "../components/Modal/DeleteModal";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useNavigate } from "react-router-dom";
// import CompanyOffcanvas from '../../constant/CompanyOffcanvas';
// const csvlink = {
//     headers : headers,
//     data : tableData,
//     filename: "csvfile.csv"
// }
const SubUser = () => {
    const navigate = useNavigate();
  const UserData = JSON.parse(localStorage.getItem("userData"));
  const [tableData, setTableData] = useState(UserData);
  const [editData, setEditData] = useState();
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
  const invite = useRef();
  // const employe = useRef();
  const subuser = useRef();
  const edit = useRef();
  const onConfirmDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);
  };
  const editDrawerOpen = (item) => {
    // tableData.map((table) => table.id === item && setEditData(table));
    navigate(`/subUser/edit/${item}`);
    // setEditTableData(item);
  };
  return (
    <>
      <MainPagetitle mainTitle="User" pageTitle={"User"} parentTitle={"Home"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">Users</h4>
                    <div>
                      <Link
                        to={"/subUser/create"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        // onClick={()=>subuser.current.showModal()}
                      >
                        + Add User
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
                          <th>User Name</th>
                          <th>Age</th>
                          <th>Mobile Number</th>
                          <th>Experience</th>
                          <th>Location</th>
                          <th>Branches</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <span>{item.id}</span>
                            </td>
                            <td>
                              <div className="products">
                                <img
                                  src={item.image || IMAGES.contact1}
                                  className="avatar avatar-md"
                                  alt=""
                                />
                                <div>
                                  <h6>{item.userName}</h6>
                                  <span>Web Designer</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span>{item.age}</span>
                            </td>
                            <td>
                              <span>{item.mobileNumber}</span>
                            </td>
                            <td>
                              <span className="text-primary">
                                {item.experience}
                              </span>
                            </td>
                            <td>
                              <span>{item.country}</span>
                            </td>
                            <td>
                              <Link
                                to={`/branch/${item.emplid}`}
                                className="text-primary badge badge-count"
                              >
                                {item.branches || 4}
                              </Link>
                            </td>
                            <td>
                              <span className="d-flex justify-content-center">
                                <span
                                  className="cursor-pointer"
                                  onClick={() => editDrawerOpen(item.id)}
                                >
                                  <FaEdit
                                    style={{
                                      color: "green",
                                      fontSize: "1.2rem",
                                    }}
                                  />
                                </span>
                                <DeleteModal
                                  className="cursor-pointer "
                                  onConfirmDelete={onConfirmDelete}
                                  id={item.id}
                                >
                                  <MdDelete
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                  />
                                </DeleteModal>
                              </span>
                            </td>
                            {/* <td>
                                                            <span className={`badge light border-0 ${item.status==="Active" ? 'badge-success' : 'badge-danger'} `}>{item.status}</span>
                                                        </td> */}
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
                          to="/subUser"
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
                              to="/subUser"
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
                          to="/subUser"
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
      {/* <CompanyOffcanvas 
                ref={subuser}
                Title="Add Sub User"
            /> */}
    </>
  );
};

export default SubUser;
