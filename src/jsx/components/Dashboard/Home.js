import React, { useContext, useEffect, useState } from "react";
//import loadable from "@loadable/component";
//import pMinDelay from "p-min-delay";

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import MainPagetitle from "../../layouts/MainPagetitle";
import CardWidget from "./elements/CardWidget";
import ProjectOverviewTab from "./elements/ProjectOverviewTab";
import ToDoList from "./elements/ToDoList";
import EarningBlog from "./elements/EarningBlog";
import ActiveProjects from "./elements/ActiveProjects";
import BestSellerTable from "./elements/BestSellerTable";
import ProjectStatusBlog from "./elements/ProjectStatusBlog";
import ChatElementBlog from "./elements/ChatElementBlog";
import EmployeesTableList from "./elements/EmployeesTableList";
import ActiveUserMap from "./elements/ActiveUserMap";
import UpcomingBlog from "./elements/UpcomingBlog";
import AllProjectDonutChart from "./elements/AllProjectDonutChart";
// import GradientArea from "../charts/Chartjs/gradinetArea";
import { FaCar } from "react-icons/fa";
import { BsFuelPumpFill } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { LuSiren } from "react-icons/lu";
import { SlSpeedometer } from "react-icons/sl";
import { GrLocation } from "react-icons/gr";
import { TbAirConditioning } from "react-icons/tb";
import { PiGraph } from "react-icons/pi";
import { FaThermometerHalf } from "react-icons/fa";
import { SiGraphql } from "react-icons/si";
import Select from "./Select";
import UiModal from "../bootstrap/Modal";
import CardModal from "./Model";
import Model from "./Model";
import BasicDatatable from "../table/BasicDatatable";
import SimpleDataTable from "../table/SimpleDataTable";
import OverspeedTable from "../table/OverspeedTable";
import FenceOverstayTable from "../table/FenceOverstayTable";
import ACMisuseTable from "../table/ACMisuseTable";
import StayAwayTable from "../table/StayAwayTable";
import StayInZoneTable from "../table/StayInZoneTable";
import TemperatureTable from "../table/TemperatureTable";
import FleetIdleTable from "../table/FleetIdleTable";
import MaintenanceReminderTable from "../table/MaintenanceReminderTable";
import ApexBar3 from "../charts/apexcharts/Bar3";
import LineChart1 from "../charts/Chartjs/line1";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

const speed = {
  data: [
    64, 24, 40, 76, 19, 0, 2, 46, 65, 12, 10, 6, 15, 57, 35, 81, 86, 12, 12, 21,
    53, 44, 2, 1, 58, 9, 61, 64, 42, 92, 58, 9, 34, 47, 89, 52, 3, 69, 33, 2,
    60, 71, 71, 22, 65, 70, 31, 81, 36, 89,
  ],
  overSpeed: 20,
};

const temp = {
  data: [
    64, 24, 40, 76, 19, 0, 2, 46, 65, 12, 10, 6, 15, 57, 35, 81, 86, 12, 12, 21,
    53, 44, 2, 1, 58, 9, 61, 64, 42, 92, 58, 9, 34, 47, 89, 52, 3, 69, 33, 2,
    60, 71, 71, 22, 65, 70, 31, 81, 36, 89,
  ],
  min: 20,
  max: 50,
};

const zone = {
  data: [
    64, 24, 40, 76, 19, 0, 2, 46, 65, 12, 10, 6, 15, 57, 35, 81, 86, 12, 12, 21,
    53, 44, 2, 1, 58, 9, 61, 64, 42, 92, 58, 9, 34, 47, 89, 52, 3, 69, 33, 2,
    60, 71, 71, 22, 65, 70, 31, 81, 36, 89,
  ],
  stayInZone: 20,
};

const Home = () => {
  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [selectedDataTable, setSelectedDataTable] = useState(null);

  const openModal = (dataTableComponent, title) => {
    setSelectedDataTable(dataTableComponent);
    setData({ title }); // Set the title in the data object
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Modal component */}
      {isModalOpen && (
        <Model onClose={closeModal}>
          {selectedDataTable && React.cloneElement(selectedDataTable, { data })}
        </Model>
      )}
      <MainPagetitle
        mainTitle="Dashboard"
        pageTitle="Dashboard"
        parentTitle="Home"
      />
      <div className="fluid container mt-3 mw-100">
        <div className="row" style={{ marginRight: "0.0rem" }}>
          <div className="col-xl-6 col-sm-12">
            <div className="card same-card p-2">
              <div className="d-flex justify-content-between">
                <p className="text-black text-md">Fleet Status</p>
              </div>

              <div className="card-body d-flex align-items-center justify-content-center  py-2">
                <AllProjectDonutChart
                  labels={["Running", "Idle", "Stopped"]}
                  width={300}
                  data={[12, 10, 15]}
                />
                <ul className="project-list">
                  <li>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="10" height="10" rx="3" fill="#3AC977" />
                    </svg>{" "}
                    Running
                  </li>
                  <li>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="10"
                        height="10"
                        rx="3"
                        fill="var(--primary)"
                      />
                    </svg>{" "}
                    Idle
                  </li>
                  <li>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="10"
                        height="10"
                        rx="3"
                        fill="var(--secondary)"
                      />
                    </svg>{" "}
                    Stopped
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-sm-12">
            <div className="card same-card p-2">
              <div className="d-flex justify-content-between">
                <p className="text-black text-md">Fleet Usage</p>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Select />
                </div>
              </div>
              <LineChart1 />
              {/* <div className="mt-5">
                <p>
                  Total Fleet Usage:{" "}
                  <span className="text-black">72.97 km</span>
                </p>
                <p>
                  Avg. Distance / Object:{" "}
                  <span className="text-black">72.97 km</span>
                </p>
              </div> */}
              {/* <div className="mt-3"><GradientArea /></div> */}
            </div>
          </div>
        </div>
        {/* <div className="col-xl-6 col-sm-12" style={{ paddingInline: "0px" }}> */}

        {/* </div> */}
        <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
          <div className="col-xl-6">
            <div
              className="card same-card mb-3 p-2"
              style={{ cursor: "pointer" }}
              onClick={() => openModal(<FleetIdleTable />, "Fleet Idle")}
            >
              <div className="d-flex justify-content-between">
                <p className="text-black text-md">Fleet Idle</p>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Select />
                </div>
              </div>
              <ApexBar3
                series={[
                  {
                    name: "Total Fleet Idle",
                    data: [420, 550, 850, 220, 650],
                  },
                  {
                    name: "Approx Fuel Waste",
                    data: [170, 850, 101, 90, 250],
                  },
                ]}
              />
              {/* <div className="d-flex justify-content-evenly">
                  <div className="">
                    <p >Total Fleet Idle</p>
                    <div className="d-flex justify-content-evenly align-items-center">
                      <FaCar color="#b3b300" />
                      <p style={{ color: "#b3b300" }}>O hr</p>
                    </div>
                  </div>
                  <div className="">
                    <p>Approx Fuel Waste</p>
                    <div className="d-flex justify-content-evenly align-items-center">
                      <BsFuelPumpFill color="#ffcccb" />
                      <p style={{ color: "red" }}>O ltr</p>
                    </div>
                  </div>
                </div>
                <div className="fs-6 text-align-center d-flex justify-content-between gap-1 mb-2">
                  <div>
                    <strong>Note:</strong>
                  </div>
                  <div className="fw-lighter">
                    Generally an idling car uses between 1.89 to 2.64 liter of
                    fuel per hour. Object with Movable category are considered
                    in Analytics.
                  </div>
                </div> */}
            </div>
          </div>
          <div className="col-xl-6">
            <div
              className="card same-card mb-3 p-2 "
              style={{ cursor: "pointer" }}
              onClick={() => openModal(<FleetIdleTable />, "Fleet Idle")}
            >
              <div className="d-flex justify-content-between">
                <p className="text-black text-md">Fleet Fuel</p>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Select />
                </div>
              </div>
              <ApexBar3
                series={[
                  {
                    name: "Total Fuel Refill",
                    data: [420, 550, 850, 220, 650],
                  },
                  {
                    name: "Approx Fuel Drain",
                    data: [170, 850, 101, 90, 250],
                  },
                ]}
              />
              {/* <div className="d-flex justify-content-evenly">
                  <div className="">
                    <p >Total Fleet Fuel</p>
                    <div className="d-flex justify-content-evenly align-items-center">
                      <FaCar color="#b3b300" />
                      <p style={{ color: "#b3b300" }}>O hr</p>
                    </div>
                  </div>
                  <div className="">
                    <p>Approx Fuel Waste</p>
                    <div className="d-flex justify-content-evenly align-items-center">
                      <BsFuelPumpFill color="#ffcccb" />
                      <p style={{ color: "red" }}>O ltr</p>
                    </div>
                  </div>
                </div>
                <div className="fs-6 text-align-center d-flex justify-content-between gap-1 mb-2">
                  <div>
                    <strong>Note:</strong>
                  </div>
                  <div className="fw-lighter">
                   
                  </div>
                </div> */}
            </div>
          </div>
        </div>

        <div
          className="row "
          style={{ marginLeft: "0.2rem", justifyContent: "space-between" }}
        >
          {/* Overspeed */}
          <div className="col-xl-3 col-sm-4" style={{ paddingInline: "4px" }}>
            <div
              className="card same-card p-2"
              style={{
                backgroundColor: "rgb(241 156 135 / 56%)",
                cursor: "pointer",
              }}
              onClick={() => openModal(<OverspeedTable />, "Overspeed")}
            >
              <div className="d-flex align-items-center justify-content-between">
                <p
                  className="text-black fs-4"
                  style={{
                    marginBottom: "0rem",
                    whiteSpace: "nowrap", // Added: prevent text from wrapping
                    overflow: "hidden", // Added: hide overflow
                    textOverflow: "ellipsis", // Added: show ellipsis for overflow
                  }}
                >
                  Overspeed
                </p>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Select />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center p-1 mb-2">
                <div>
                  <div className="text-red fs-6 ">Max Speed</div>
                  <div className="text-red fs-6 ">20 km/hr</div>
                  {/* <div className="fs-2 text-white d-flex justify-content-end">
                    0
                  </div>
                  <div className="text-black d-flex justify-content-end">
                    Alerts
                  </div>
                  <p
                    className="bg-danger d-flex justify-content-end"
                    style={{
                      color: "#ffb09c",
                      borderRadius: "5px",
                      outline: "none",
                      paddingLeft: "3px",
                      paddingRight: "3px",
                    }}
                  >
                    0% Object
                  </p> */}
                </div>
                <div
                  className="d-flex align-items-end mb-2"
                  style={{ height: "100%" }}
                >
                  {/* <SlSpeedometer color="white" size={50} /> */}
                </div>
              </div>
              <Sparklines data={speed.data} height={100}>
                <SparklinesLine color="var(--primary)" />
                <SparklinesReferenceLine
                  type="custom"
                  value={speed.overSpeed}
                  color="var(--primary)"
                />
              </Sparklines>
            </div>
          </div>

          {/* Stay In Zone */}
          <div className="col-xl-3 col-sm-4">
            <div
              className="card same-card p-2"
              style={{
                backgroundColor: "rgb(144 238 144 / 56%)",
                cursor: "pointer",
              }}
              onClick={() => openModal(<StayInZoneTable />, "Stay In Zone")}
            >
              <div className="d-flex align-items-center justify-content-between">
                <p
                  className="text-black fs-4"
                  style={{
                    marginBottom: "0rem",
                    whiteSpace: "nowrap", // Added: prevent text from wrapping
                    overflow: "hidden", // Added: hide overflow
                    textOverflow: "ellipsis", // Added: show ellipsis for overflow
                  }}
                >
                  Stay In Zone
                </p>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Select />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center p-1 mb-2">
                <div>
                  <div className="text-red fs-6">Zone area</div>
                  <div className="text-red fs-6">20 km</div>
                </div>
                <div
                  className="d-flex align-items-end mb-2"
                  style={{ height: "100%" }}
                >
                  {/* <SiGraphql color="white" size={50} />
                </div>

                {/* <div>
                  <div
                    className="fs-2 text-white d-flex justify-content-end"
                    style={{ marginTop: "2.5rem" }}
                  >
                    0
                  </div>
                  <div className="text-black d-flex justify-content-end">
                    Alerts
                  </div>
                  <p
                    className="d-flex justify-content-end"
                    style={{
                      color: "#808080",
                      backgroundColor: "#4ee44e",
                      borderRadius: "5px",
                      outline: "none",
                      paddingLeft: "3px",
                      paddingRight: "3px",
                    }}
                  >
                    0% Object
                  </p>*/}
                </div>
              </div>
              <Sparklines data={zone.data} height={100}>
                <SparklinesLine color="var(--primary)" />
                <SparklinesReferenceLine
                  type="custom"
                  value={zone.stayInZone}
                  color="var(--primary)"
                />
              </Sparklines>
            </div>
          </div>

          {/* Temperature */}
          <div className="col-xl-3 col-sm-4">
            <div
              className="card same-card p-2"
              style={{
                backgroundColor: "rgb(0 255 255 / 14%)",
                cursor: "pointer",
              }}
              onClick={() => openModal(<TemperatureTable />, "Temperature")}
            >
              <div className="d-flex align-items-center justify-content-between">
                <p
                  className="text-black fs-4"
                  style={{
                    marginBottom: "0rem",
                    whiteSpace: "nowrap", // Added: prevent text from wrapping
                    overflow: "hidden", // Added: hide overflow
                    textOverflow: "ellipsis", // Added: show ellipsis for overflow
                  }}
                >
                  Temperature
                </p>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Select />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center p-1 mb-2">
                <div>
                  <div className="text-red fs-6 d-flex justify-content-end">
                    Min Temp. 20.0 C
                  </div>
                  <div className="text-red fs-6 d-flex justify-content-end">
                    Max Temp. 50.0 C
                  </div>
                  {/* <div className="fs-2 text-white d-flex justify-content-end">
                    0
                  </div>
                  <div className="text-black d-flex justify-content-end">
                    Alerts
                  </div>
                  <p
                    className="d-flex justify-content-end"
                    style={{
                      backgroundColor: "#00e6e6",
                      color: "#ffb09c",
                      borderRadius: "5px",
                      outline: "none",
                      paddingLeft: "3px",
                      paddingRight: "3px",
                    }}
                  >
                    0% Object
                  </p> */}
                </div>

                <div
                  className="d-flex align-items-end mb-2"
                  style={{ height: "100%" }}
                >
                  {/* <FaThermometerHalf color="white" size={50} /> */}
                </div>
              </div>
                <Sparklines data={temp.data} height={100} >
                  <SparklinesLine color="var(--primary)" />
                  <SparklinesReferenceLine
                    type="custom"
                    value={temp.min}
                    color="var(--primary)"
                  />
                  <SparklinesReferenceLine
                    type="custom"
                    value={temp.max}
                    color="var(--primary)"
                  />
                </Sparklines>
            </div>
          </div>

          {/* <div className="col-xl-2 col-sm-12">
            <div
              className="card same-card p-2"
              style={{ backgroundColor: "#FFE36E",cursor : 'pointer'  }}
              onClick={() => openModal(<StayAwayTable />, "Stay Away From")}
            >
              <div className="d-flex justify-content-between">
                <p
                  className="text-black fs-4"
                  style={{
                    marginLeft: "0.3rem",
                    whiteSpace: "nowrap", // Added: prevent text from wrapping
                    overflow: "hidden", // Added: hide overflow
                    textOverflow: "ellipsis", // Added: show ellipsis for overflow
                  }}
                >
                  Stay Away From
                </p>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Select />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center p-1 mb-2">
                <div
                  className="d-flex align-items-end mb-2"
                  style={{ height: "100%" }}
                >
                  <PiGraph color="white" size={50} />
                </div>
                <div>
                  <div
                    className="fs-2 text-white d-flex justify-content-end"
                    style={{ marginTop: "2.5rem" }}
                  >
                    0
                  </div>
                  <div className="text-black d-flex justify-content-end">
                    Alerts
                  </div>
                  <p
                    className="d-flex justify-content-end"
                    style={{
                      color: "#808080",
                      backgroundColor: "#ffd422",
                      borderRadius: "5px",
                      outline: "none",
                      paddingLeft: "3px",
                      paddingRight: "3px",
                    }}
                  >
                    0% Object
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          <div className="col-xl-3 col-sm-12">
            <div
              className="card same-card p-2"
              // style={{ height: "20vh" }}
              onClick={() =>
                openModal(<MaintenanceReminderTable />, "Maintenance Reminder")
              }
            >
              <p
                className="text-black fs-4"
                style={{
                  marginLeft: "0.3rem",
                  whiteSpace: "nowrap", // Added: prevent text from wrapping
                  overflow: "hidden", // Added: hide overflow
                  textOverflow: "ellipsis", // Added: show ellipsis for overflow
                }}
              >
                Maintenance Reminder
              </p>
              <div
                className="text-center"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div className="mb-3">
                    <SlCalender color="#3dace3" size={20} />
                  </div>
                  <div style={{ color: "#3dace3", fontSize: "22px" }}>0</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div className="mb-3">
                    <LuSiren color="#ff3811" size={20} />
                  </div>
                  <div style={{ color: "#ff3811", fontSize: "22px" }}>0</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-12">
            <div
              className="card same-card p-2"
              // style={{ height: "20vh" }}
              onClick={() =>
                openModal(<MaintenanceReminderTable />, "Renewal Reminder")
              }
            >
              <p
                className="text-black fs-4"
                style={{
                  marginLeft: "0.3rem",
                  whiteSpace: "nowrap", // Added: prevent text from wrapping
                  overflow: "hidden", // Added: hide overflow
                  textOverflow: "ellipsis", // Added: show ellipsis for overflow
                }}
              >
                Renewal Reminder
              </p>
              <div
                className="text-center"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div className="mb-3">
                    <SlCalender color="#3dace3" size={20} />
                  </div>
                  <div style={{ color: "#3dace3", fontSize: "22px" }}>0</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div className="mb-3">
                    <LuSiren color="#ff3811" size={20} />
                  </div>
                  <div style={{ color: "#ff3811", fontSize: "22px" }}>0</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-xl-4 col-sm-12">
            <div className="card same-card p-2" style={{ height: "20vh" }}>
              <p className="text-black fs-4" style={{ marginLeft: "0.3rem" }}>
                Distance Classification
              </p>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Record Found
              </div>
            </div>
          </div>
           */}
        </div>
      </div>
    </>
  );
};
export default Home;
