import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import VehicleTable from "../components/Tables/VehicleTable";
import { ThemeContext } from "../../context/ThemeContext";
import MainPagetitle from "../layouts/MainPagetitle";
import { clsx } from "clsx";
import VehicleServices from "../../services/api/VehicleService";
import { usePermissions } from "../../context/PermissionContext";
import { deleteVehicles, getVehicles } from "../../services/api/VehicleService";


const Vehicle = () => {
  const { isRtl } = useContext(ThemeContext);
  const {can} = usePermissions()
  const arrowleft = clsx({
    "fa-solid fa-angle-right": isRtl,
    "fa-solid fa-angle-left": !isRtl,
  });
  const arrowright = clsx({
    "fa-solid fa-angle-left": isRtl,
    "fa-solid fa-angle-right": !isRtl,
  });
  //   const { setAddVehicle, addVehicle } = useContext(ThemeContext);


  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState();
  const [data, setData] = useState(
    document.querySelectorAll("#employee-tbl_wrapper tbody tr")
  );
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState({
    id: 0,
    vehicleName: "",
    plateNumber: "",
    simNumber: 0,
    IMEINumber: 0,
    GPSDeviceType: "",
    distanceCounter: 0,
  });
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
  async function getVehicleData() {
    try {
      const { data , totalLength} = await getVehicles();
      console.log(data)
      setTableData(data);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  }

  console.log(tableData);
  useEffect(() => {
    setData(document.querySelectorAll("#employee-tbl_wrapper tbody tr"));
  }, [test]);

  useEffect(() => {
    getVehicleData();
  }, [deleteId]);

  activePage.current === 0 && chageData(0, sort);
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const onClick = (i) => {
    activePage.current = i;
    chageData(activePage.current * sort, (activePage.current + 1) * sort);
    settest(i);
  };

  // delete function
  const onConfirmDelete = (id) => {
    deleteVehicles(id);
    getVehicleData();
    setDeleteId(id);
  };
  // Edit function
  const editDrawerOpen = (item) => {
    tableData.map((table) => table.id === item && setEditData(table));
    navigate(`edit/${item}`);
    // vehicle.current.showModal();
  };


  const vehicle = useRef();
  return (
    <>
      <MainPagetitle
        mainTitle="Vehicle"
        pageTitle={"Vehicle"}
        parentTitle={"Home"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">Vehicle</h4>
                    <div>
                     {can('vehicle','add') && <Link
                        to={"/vehicle/create"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                      >
                        + Add Vehicle Info
                      </Link>}{" "}
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
                          <th>Vehicle Name</th>
                          <th>Plate Number</th>
                          <th>Branch</th>
                          <th>SIM Number</th>
                          <th>IMEI Number</th>
                          <th>Registration Number</th>
                          <th>Weight Capacity</th>
                          {(can('vehicle','modify') || can('vehicle','delete')) && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        <VehicleTable
                          tableData={tableData}
                          onConfirmDelete={onConfirmDelete}
                          editDrawerOpen={editDrawerOpen}
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
                          to="/vehicle"
                          onClick={() =>
                            activePage.current > 0 &&
                            onClick(activePage.current - 1)
                          }
                        >
                          <i className={arrowleft} />
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/vehicle"
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
                          to="/vehicle"
                          onClick={() =>
                            activePage.current + 1 < paggination.length &&
                            onClick(activePage.current + 1)
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
    </>
  );
};

export default Vehicle;
