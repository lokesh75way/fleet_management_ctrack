import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

import { IMAGES } from "../constant/theme";
import MainPagetitle from "../layouts/MainPagetitle";
import InviteCustomer from "../constant/ModalList";
import ClassifyTripTable from "../components/Tables/ClassifyTripTable";
import { ClassifyTripData } from "../components/Tables/Tables";
import ClassifyTripsFilterOffcanvas from "../constant/ClassifyTripsFilterOffcanvas";
import ClassifyTripsOffcanvas from "../constant/ClassifyTripsOffcanvas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { classifyTripsSchema } from "../../yup";
import { Nav, Tab } from "react-bootstrap";

const ClassifyTrip = (ref) => {
  const tabHeading = ["Active Trips", "Planned Trips", "Completed Trips"];
  const component = [ActiveTab, PlannedTab, CompletedTab];

  const [tableData, setTableData] = useState(ClassifyTripData);
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
  const onConfirmDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);
  };
  const editDrawerOpen = (item) => {
    tableData.map((table) => table.id === item && setEditData(table));

    // setEditTableData(item);
    classifyTrips.current.showModal();
  };
  // const handleSubmit=(e)=>{
  //     e.preventDefault();
  //     const updateTable = tableData.map((table)=>{
  //         if(table.id === editData.id) {
  //             console.log(table.id)
  //             return {...table, ...editData };
  //         }
  //         return table;
  //     })
  //     setTableData(updateTable)
  // }
  const onSubmit = (data) => {
    console.log(data);
  };

  const classifyTrips = useRef();
  const classifyTripsFilter = useRef();

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <MainPagetitle
        mainTitle="Classify Trip"
        pageTitle={"Classify Trip"}
        parentTitle={"Settings"}
      />
      <div className="m-2 p-2 classify_trip-container">
        <Tab.Container defaultActiveKey={tabHeading[0].toLowerCase()}>
          <Nav as="ul" className="nav-tabs classify-trips">
            <div>
              {tabHeading.map((data, i) => (
                <Nav.Item as="li" key={i}>
                  <Nav.Link
                    style={{ padding: ".5rem 2rem" }}
                    eventKey={data.toLowerCase()}
                    active={i === activeIndex}
                    onClick={() => setActiveIndex(i)}
                  >
                    {data}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </div>

            <div className="">
              <Link
                to={"#"}
                className="btn btn-primary btn-sm ms-1"
                data-bs-toggle="offcanvas"
                onClick={() => classifyTripsFilter.current.showModal()}
              >
                + Filter
              </Link>{" "}
              <Link
                to={"#"}
                className="btn btn-primary btn-sm ms-1"
                data-bs-toggle="offcanvas"
                onClick={() => classifyTrips.current.showModal()}
              >
                + Add Trips
              </Link>{" "}
            </div>
          </Nav>
          <Tab.Content className="pt-4">
            {tabHeading.map((data, i) => {
              const Component = component[i];
              return (
                <Tab.Pane
                  eventKey={data.toLowerCase()}
                  key={i}
                  active={i === activeIndex}
                >
                  <Component
                    data={tabHeading}
                    control={control}
                    setValue={setValue}
                    register={register}
                    getValues={getValues}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                  />
                </Tab.Pane>
              );
            })}
          </Tab.Content>
        </Tab.Container>
        <ClassifyTripsFilterOffcanvas
          ref={classifyTripsFilter}
          // editData={editData}
          // setEditData={setEditData}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          control={control}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          Title={"Add Filter"}
        />
        <ClassifyTripsOffcanvas
          ref={classifyTrips}
          // editData={editData}
          // setEditData={setEditData}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          control={control}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          Title={"Add Trips"}
        />
      </div>
    </>
  );
};

export default ClassifyTrip;

const ActiveTab = () => {
  const [tableData, setTableData] = useState(ClassifyTripData);
  useEffect(()=>{
    const data = ClassifyTripData.filter((data)=> data.status === 'active');
    setTableData(data)
  },[])
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
  const onConfirmDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);
  };
  const editDrawerOpen = (item) => {
    tableData.map((table) => table.id === item && setEditData(table));

    // setEditTableData(item);
    classifyTrips.current.showModal();
  };

  const classifyTrips = useRef();
  const classifyTripsFilter = useRef();

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

const PlannedTab = () => {
  const [tableData, setTableData] = useState(ClassifyTripData);
  useEffect(()=>{
    const data = ClassifyTripData.filter((data)=> data.status === 'planned');
    setTableData(data)
  },[])
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
  const onConfirmDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);
  };
  const editDrawerOpen = (item) => {
    tableData.map((table) => table.id === item && setEditData(table));

    // setEditTableData(item);
    classifyTrips.current.showModal();
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const classifyTrips = useRef();
  const classifyTripsFilter = useRef();
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

const CompletedTab = () => {
  const [tableData, setTableData] = useState(ClassifyTripData);
  useEffect(()=>{
    const data = ClassifyTripData.filter((data)=> data.status === 'completed');
    setTableData(data)
  },[])
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
  const onConfirmDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);
  };
  const editDrawerOpen = (item) => {
    tableData.map((table) => table.id === item && setEditData(table));

    // setEditTableData(item);
    classifyTrips.current.showModal();
  };
  // const handleSubmit=(e)=>{
  //     e.preventDefault();
  //     const updateTable = tableData.map((table)=>{
  //         if(table.id === editData.id) {
  //             console.log(table.id)
  //             return {...table, ...editData };
  //         }
  //         return table;
  //     })
  //     setTableData(updateTable)
  // }
  const onSubmit = (data) => {
    console.log(data);
  };

  const classifyTrips = useRef();
  const classifyTripsFilter = useRef();
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
